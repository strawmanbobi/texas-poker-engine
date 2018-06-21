/**
 * Created by Dummy team
 * 2017-12-01
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var boardDao = require('../models/board_dao');
var gameDao = require('../models/game_dao');
var playerDao = require('../models/player_dao');

var stringUtils = require('../poem/utils/string_utils');
var dateUtil = require('../poem/utils/date_utils');

var PlayerAuth = require('../authentication/player_auth.js');
var playerAuth = new PlayerAuth(REDIS_HOST, REDIS_PORT, null, REDIS_PASSWORD);

var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();

var Enums = require('../constants/enums.js');
var enums = new Enums();

var async = require('async');

exports.createBoardWorkUnit = function (creatorPhoneNumber, gameName, callback) {
    var currentTime = dateUtil.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
    var ticket = stringUtils.randomChar(30);

    // query create name from tb: players
    var playerCon = {
        phoneNumber: creatorPhoneNumber,
        status: 1
    };
    playerDao.getPlayers(playerCon, function (getPlayerErr, players) {

        if (getPlayerErr.code === errorCode.SUCCESS.code && null !== players && players.length > 0) {
            var port = players[0].instance;
            var creatorName = players[0].name;
            var creatorRealName = players[0].studentName;
            logger.info('creator phoneNumber = ' + creatorPhoneNumber);
            logger.info('creator name = ' + creatorName);
            gameDao.getGameInfo({name: gameName}, function (getGameErr, games) {
                if (getGameErr.code === errorCode.SUCCESS.code && games !== null && games.length > 0) {
                    var getBoardConditions = {
                        creator: creatorPhoneNumber,
                        gameName: gameName,
                        $or: [
                            {status: enums.GAME_STATUS_STANDBY},
                            {status: enums.GAME_STATUS_PREPARING},
                            {status: enums.GAME_STATUS_RUNNING}
                        ]
                    };
                    boardDao.getBoards(getBoardConditions, function (getBoardErr, boards) {
                        // get board info by {creator, gameName}
                        if (errorCode.SUCCESS.code === getBoardErr.code) { // get board succeed
                            if (boards === null || boards.length === 0) {
                                // create board
                                var board = {
                                    gameName: gameName,
                                    minPlayer: games[0].minPlayer,
                                    maxPlayer: games[0].maxPlayer,
                                    currentPlayer: [],
                                    status: 0,
                                    creator: creatorPhoneNumber,
                                    creatorName: creatorName,
                                    creatorRealName: creatorRealName,
                                    createTime: currentTime,
                                    updateTime: currentTime,
                                    ticket: ticket,
                                    type: 0,
                                    port: port
                                };
                                boardDao.createBoard(board, function (createBoardErr, result) {
                                    if (createBoardErr.code === errorCode.SUCCESS.code && null !== result.ops &&
                                        result.ops.length > 0) {
                                        logger.info('create board succeed.');
                                        callback(createBoardErr, board);
                                    } else {
                                        logger.info('create board failed.');
                                        callback(errorCode.FAILED, null);
                                    }
                                });
                            } else {
                                // creator cannot create multiple board that status is preparing(0) or active(1)
                                var board = boards[0];
                                logger.info('a creator can not create multiple active boards');
                                callback(errorCode.MULTI_ACTIVE_BOARD_CREATED, board);
                            }
                        } else { // get board failed
                            logger.info('get board failed.');
                            callback(errorCode.FAILED, null);
                        }
                    });
                } else { // get game failed
                    logger.info('get game failed');
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.info('get player failed, or an unregistered player is trying to create board');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.updateBoardWorkUnit = function (ticket, gameName, board, callback) {
    var date = dateUtil.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
    var condition = {
        ticket: ticket,
        gameName: gameName
    };

    var newBoard = {
        currentPlayer: board.currentPlayer,
        updateTime: date,
        type: parseInt(board.type)
    };

    if (undefined !== board.status && null !== board.status) {
        newBoard.status = board.status;
    }

    logger.info('board currentPlayer:' + JSON.stringify(newBoard.currentPlayer));
    logger.info('board status:' + newBoard.status);
    logger.info('board update time:' + newBoard.updateTime);
    logger.info('board type:' + newBoard.type);

    boardDao.updateBoard(condition, newBoard, function (updateBoardErr, board) {
        if (updateBoardErr.code === errorCode.SUCCESS.code) {
            logger.info('update board by ticket:' + ticket + ',gameName:' + gameName + ' succeed.');
            callback(updateBoardErr, newBoard);
        } else {
            logger.info('update board by ticket:' + ticket + ',gameName:' + gameName + ' failed.');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.getBoardByTicketWorkUnit = function (ticket, gameName, port, callback) {
    var condition = {
        ticket: ticket,
        gameName: gameName,
        port: parseInt(port)
    };
    boardDao.getBoards(condition, function (getBoardErr, board) {
        if (getBoardErr.code === errorCode.SUCCESS.code && board !== null && board.length > 0) {
            logger.info('the board that ticket = ' + ticket + ' exist in db');
            callback(getBoardErr, board);
        } else {
            // board not exist
            logger.info('board that ticket = : ' + ticket + ' not exist in db.');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.listBoardsWorkUnit = function (status, gameName, callback) {
    var condition = {
        status: parseInt(status),
        gameName: gameName
    };
    boardDao.getBoards(condition, function (getBoardErr, boards) {
        if (getBoardErr.code === errorCode.SUCCESS.code && boards !== null && boards.length > 0) {
            logger.info('query board list: ' + JSON.stringify(condition) + ' succeed');
            callback(getBoardErr, boards); //
        } else {
            // board not exist
            logger.error('query board list:' + JSON.stringify(condition) + ' failed.');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.listActiveBoardsWorkUnit = function (gameName, from, count, searchName, callback) {
    var conditions = null;

    if (searchName) {
        conditions = {
            gameName: gameName,
            $and: [
                {$or: [
                    {status: enums.GAME_STATUS_STANDBY},
                    {status: enums.GAME_STATUS_PREPARING},
                    {status: enums.GAME_STATUS_RUNNING}
                ]},
                {$or: [
                    {creator: searchName},
                    {creatorName: searchName},
                    {creatorRealName: searchName}
                ]}
            ]
        };
    } else {
        conditions = {
            gameName: gameName,
            $or: [
                {status: enums.GAME_STATUS_STANDBY},
                {status: enums.GAME_STATUS_PREPARING},
                {status: enums.GAME_STATUS_RUNNING}
            ]
        };
    }

    boardDao.listBoards(conditions, from, count, function (getBoardErr, boards) {
        if (getBoardErr.code === errorCode.SUCCESS.code && boards !== null) {
            logger.info('query board list: ' + JSON.stringify(conditions) + ' succeed');
            callback(getBoardErr, boards);
        } else {
            // board not exist
            logger.error('query board list:' + JSON.stringify(conditions) + ' failed.');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.isCreatorBoardWorkUnit = function (token, ticket, callback) {
    playerAuth.getAuthInfo(token, function (getValueErr, value) {
        if (getValueErr.code !== errorCode.SUCCESS.code) {
            callback(getValueErr, null);
        } else {
            var conditions = {
                creator: value,
                ticket: ticket,
                $or: [
                    {status: enums.GAME_STATUS_STANDBY},
                    {status: enums.GAME_STATUS_PREPARING},
                    {status: enums.GAME_STATUS_RUNNING}
                ]
            };
            boardDao.getBoards(conditions, function (getBoardsErr, boards) {
                if (errorCode.SUCCESS.code === getBoardsErr.code && null !== boards && boards.length > 0) {
                    var board = boards[0];
                    callback(errorCode.SUCCESS, true);
                } else {
                    callback(errorCode.SUCCESS, false);
                }
            });
        }
    });
};

exports.deleteBoardWorkUnit = function (token, ticket, callback) {
    playerAuth.getAuthInfo(token, function (getValueErr, value) {
        if (getValueErr.code !== errorCode.SUCCESS.code) {
            callback(getValueErr, null);
        } else {
            var conditions = {
                creator: value,
                ticket: ticket,
                $or: [
                    {status: enums.GAME_STATUS_STANDBY},
                    {status: enums.GAME_STATUS_PREPARING},
                    {status: enums.GAME_STATUS_RUNNING}
                ]
            };
            boardDao.deleteBoard(conditions, function (getBoardsErr) {
                if (errorCode.SUCCESS.code === getBoardsErr.code) {
                    callback(errorCode.SUCCESS);
                } else {
                    callback(errorCode.FAILED);
                }
            });
        }
    });
};

exports.listBoardPlayersWorkUnit = function (instance, callback) {
    var conditions = {
        port: parseInt(instance),
        $or: [
            {status: enums.GAME_STATUS_STANDBY},
            {status: enums.GAME_STATUS_PREPARING},
            {status: enums.GAME_STATUS_RUNNING}
        ]
    };

    boardDao.getBoards(conditions, function (getBoardsErr, boards) {
        if (errorCode.SUCCESS.code === getBoardsErr.code && null !== boards && boards.length > 0) {
            var affectedPlayers = [];
            for (var i = 0; i < boards.length; i++) {
                var board = boards[i];
                var players = board.currentPlayer;
                if (null !== players) {
                    for (var p = 0; p < players.length; p++) {
                        if (true === players[p].isOnline && !isPlayerAlreadyIn(affectedPlayers, players[p])) {
                            affectedPlayers.push(players[p]);
                        }
                    }
                }
            }
            var returnPlayers = [];
            async.eachSeries(affectedPlayers, function (affectedPlayer, innerCallback) {
                var innerConditions = {
                    name: affectedPlayer.playerName
                };
                playerDao.getPlayers(innerConditions, function(getPlayersErr, players) {
                    if (errorCode.SUCCESS.code === getPlayersErr.code && null !== players && players.length > 0) {
                        var realPlayer = players[0];
                        returnPlayers.push({
                            name: realPlayer.name,
                            studentName: realPlayer.studentName,
                            phoneNumber: realPlayer.phoneNumber,
                            mail: realPlayer.mail,
                            university: realPlayer.university
                        });
                        innerCallback();
                    } else {
                        innerCallback();
                    }
                });
            }, function (err) {
                callback(errorCode.SUCCESS, returnPlayers);
            });
        } else {
            callback(errorCode.FAILED, null);
        }
    });
};

// helper functions
function isPlayerAlreadyIn(players, player) {
    if (players) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].playerName === player.playerName) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}
