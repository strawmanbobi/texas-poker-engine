/**
 * Created by dummy-team
 * 2017-12-04
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();
var RequestSender = require('../poem/http/request.js');
var Map = require('../poem/mem/map.js');

var LIST_ACTIVE_BOARDS_SERVICE = '/board/list_active_boards';
var CREATE_BOARD_SERVICE = '/board/create_board';
var UPDATE_BOARD_SERVICE = '/board/update_board';
var DELETE_BOARD_SERVICE = '/board/delete_board';
var IS_CREAGOR_BOARD_SERVICE = '/board/is_creator_board';
var LIST_MATCH_TABLES_SERVICE = '/board/list_match_tables';

exports.listActiveBoardsWorkUnit = function (gameName, phoneNumber, token, from, count, searchName, callback) {
    // send HTTP request to engine server to list boards
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            LIST_ACTIVE_BOARDS_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json'
    };

    var listActiveBoardsParameters = {
        gameName: gameName,
        from: from,
        count: count,
        searchName: searchName
    };

    requestSender.sendPostRequest(listActiveBoardsParameters, headers, function (listBoardsErr, boardsResponse) {
        if (errorCode.SUCCESS.code === listBoardsErr &&
            JSON.parse(boardsResponse).status.code === errorCode.SUCCESS.code) {
            logger.info("list boards successfully");
            var boards = JSON.parse(boardsResponse).entity;
            logger.info("response of boards = " + JSON.stringify(boards));
            callback(errorCode.SUCCESS, boards);
        } else {
            logger.error("list boards failed");
            callback(errorCode.FAILED, null);
        }
    });
};

exports.createBoardWorkUnit = function (gameName, phoneNumber, token, callback) {
    if (null === gameName || null === phoneNumber) {
        callback(errorCode.FAILED, null);
        return;
    }

    // send HTTP request to engine server to list boards
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            CREATE_BOARD_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };
    var createBoardParameters = {
        phoneNumber: phoneNumber,
        gameName: gameName
    };

    requestSender.sendPostRequest(createBoardParameters, headers, function (createBoardErr, boardsResponse) {
        if (errorCode.SUCCESS.code === createBoardErr) {
            logger.info("call create board successfully");
            var boards = JSON.parse(boardsResponse).entity;
            logger.info("response of create board = " + JSON.stringify(boards));
            callback(JSON.parse(boardsResponse).status, boards);
        } else {
            callback(errorCode.FAILED, null);
        }
    });
};

exports.updateBoardsWorkUnit = function (ticket, gameName, newBoard, phoneNumber, token, callback) {
    // send HTTP request to engine server to list boards
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            UPDATE_BOARD_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var updateBoardParameters = {
        ticket: ticket,
        gameName: gameName,
        newBoard: newBoard
    };

    requestSender.sendPostRequest(updateBoardParameters, headers, function (listBoardsErr, boardsResponse) {
        if (errorCode.SUCCESS.code === listBoardsErr &&
            JSON.parse(boardsResponse).status.code === errorCode.SUCCESS.code) {
            logger.info("update board successfully");
            var boards = JSON.parse(boardsResponse).entity;
            logger.info("response of updated board = " + JSON.stringify(boards));
            callback(errorCode.SUCCESS, boards);
        } else {
            logger.error("update board failed");
            callback(errorCode.FAILED, null);
        }
    });
};

exports.deleteBoardsWorkUnit = function (ticket, phoneNumber, token, callback) {
    // send HTTP request to engine server to list boards
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            DELETE_BOARD_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var deleteBoardParameters = {
        token: token,
        ticket: ticket
    };

    requestSender.sendPostRequest(deleteBoardParameters, headers, function (deleteBoardErr, serviceResponse) {
        if (errorCode.SUCCESS.code === deleteBoardErr &&
            JSON.parse(serviceResponse).status.code === errorCode.SUCCESS.code) {
            logger.info("delete board successfully");
            callback(errorCode.SUCCESS);
        } else {
            logger.error("delete board failed");
            callback(errorCode.FAILED);
        }
    });
};

exports.isCreatorBoardWorkUnit = function (ticket, phoneNumber, token, callback) {
    // send HTTP request to engine server to confirm this is a creator board
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            IS_CREAGOR_BOARD_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var isCreatorBoardParameters = {
        ticket: ticket,
        token: token
    };

    requestSender.sendPostRequest(isCreatorBoardParameters, headers, function (isCreatorBoardErr, boolResponse) {
        if (errorCode.SUCCESS.code === isCreatorBoardErr &&
            JSON.parse(boolResponse).status.code === errorCode.SUCCESS.code) {
            logger.info("get is creator board successfully");
            var isCreatorBoard = JSON.parse(boolResponse).entity;
            logger.info("response of creator board = " + JSON.stringify(isCreatorBoard));
            callback(errorCode.SUCCESS, isCreatorBoard);
        } else {
            logger.error("get is creator board failed");
            callback(errorCode.FAILED, null);
        }
    });
};

exports.listTablesWorkUnit = function (callback) {
    // send HTTP request to engine server to list match tables
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            LIST_MATCH_TABLES_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json'
    };

    requestSender.sendGetRequest({}, headers, function (listTablesErr, tablesResponse) {
        if (errorCode.SUCCESS.code === listTablesErr &&
            JSON.parse(tablesResponse).status.code === errorCode.SUCCESS.code) {
            logger.info("list tables successfully");
            var tables = JSON.parse(tablesResponse).entity;
            logger.info("response of updated board = " + JSON.stringify(tables));
            callback(errorCode.SUCCESS, tables);
        } else {
            logger.error("delete board failed");
            callback(errorCode.FAILED, null);
        }
    });
};