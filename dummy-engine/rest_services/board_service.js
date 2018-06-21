/**
 * created by Dummy team
 * 2017-12-02
 */

var logger = require('../poem/logging/logger4js').helper;
var BoardResponse = require('../responses/board_response');
var BoolResponse = require('../responses/bool_response');
var PlayerResponse = require('../responses/player_response');
var TablesResponse = require('../responses/tables_response');
var boardLogic = require('../work_units/board_logic');

exports.createBoard = function (req, res) {
    var creator = req.body.phoneNumber;
    var gameName = req.body.gameName;

    var boardResponse = new BoardResponse();
    boardLogic.createBoardWorkUnit(creator, gameName, function (createBoardErr, board) {
        boardResponse.status = createBoardErr;
        boardResponse.entity = board;
        res.send(boardResponse);
        res.end();
    });
};

exports.updateBoard = function (req, res) {
    var ticket = req.body.ticket;
    var gameName = req.body.gameName;
    var newBoard = req.body.newBoard;

    var boardResponse = new BoardResponse();
    boardLogic.updateBoardWorkUnit(ticket, gameName, newBoard, function (updateBoardErr, board) {
        boardResponse.status = updateBoardErr;
        boardResponse.entity = board;
        res.send(boardResponse);
        res.end();
    });
};

exports.deleteBoard = function (req, res) {
    var token = req.body.token;
    var ticket = req.body.ticket;

    var serviceResponse = new ServiceResponse();
    boardLogic.deleteBoardWorkUnit(token, ticket, function (deleteBoardErr, result) {
        serviceResponse.status = deleteBoardErr;
        serviceResponse.entity = result;
        res.send(serviceResponse);
        res.end();
    });
};

exports.listBoards = function (req, res) {
    var status = req.body.status;
    var gameName = req.body.gameName;

    var boardResponse = new BoardResponse();
    boardLogic.listBoardsWorkUnit(status, gameName, function (listBoardsErr, boards) {
        boardResponse.status = listBoardsErr;
        boardResponse.entity = boards;
        res.send(boardResponse);
        res.end();
    });
};

exports.listActiveBoards = function (req, res) {
    var gameName = req.body.gameName;
    var from = req.body.from || 0;
    var count = req.body.count || 0;
    var searchName = req.body.searchName;

    var boardResponse = new BoardResponse();
    boardLogic.listActiveBoardsWorkUnit(gameName, from, count, searchName, function (listBoardsErr, boards) {
        boardResponse.status = listBoardsErr;
        boardResponse.entity = boards;
        res.send(boardResponse);
        res.end();
    });
};

exports.isCreatorBoard = function (req, res) {
    var token = req.body.token;
    var ticket = req.body.ticket;

    var boolResponse = new BoolResponse();
    boardLogic.isCreatorBoardWorkUnit(token, ticket, function (getBoardErr, result) {
        boolResponse.status = getBoardErr;
        boolResponse.entity = result;
        res.send(boolResponse);
        res.end();
    });
};

exports.listBoardPlayers = function (req, res) {
    var boardInstance = req.query.instance;

    var playerResponse = new PlayerResponse();
    boardLogic.listBoardPlayersWorkUnit(boardInstance, function (getBoardErr, result) {
        playerResponse.status = getBoardErr;
        playerResponse.entity = result;
        res.send(playerResponse);
        res.end();
    });
};
