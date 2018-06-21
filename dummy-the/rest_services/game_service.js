/**
 * created by dummy-team
 * 2017-12-05
 */

var BoardResponse = require('../responses/board_response.js');
var BoolResponse = require('../responses/bool_response.js');
var PlayerResponse = require('../responses/player_response.js');
var ServiceResponse = require('../responses/service_response.js');
var TablesResponse = require('../responses/tables_response.js');

var boardLogic = require('../work_units/board_logic.js');
var playerLogic = require('../work_units/player_logic.js');

exports.listActiveBoards = function (req, res) {
    var gameName = req.body.gameName;
    var from = req.body.from || 0;
    var count = req.body.count || 12;
    var searchName = req.body.searchName;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var boardResponse = new BoardResponse();
    boardLogic.listActiveBoardsWorkUnit(gameName, phoneNumber, token, from, count, searchName, function(listBoardsErr, boards) {
        boardResponse.status = listBoardsErr;
        boardResponse.entity = boards;
        res.send(boardResponse);
        res.end();
    });
};

exports.createBoard = function (req, res) {
    var gameName = req.body.gameName;
    var phoneNumber = req.body.phoneNumber || req.headers["phone-number"];
    var token = req.headers["token"];

    var boardResponse = new BoardResponse();
    boardLogic.createBoardWorkUnit(gameName, phoneNumber, token, function(createBoardsErr, board) {
        boardResponse.status = createBoardsErr;
        boardResponse.entity = board;
        res.send(boardResponse);
        res.end();
    });
};

exports.updateBoard = function (req, res) {
    var newBoard = req.body;
    var ticket = newBoard.ticket;
    var gameName = newBoard.gameName;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var boardResponse = new BoardResponse();
    boardLogic.updateBoardsWorkUnit(ticket, gameName, newBoard, phoneNumber, token, function(createBoardsErr, board) {
        boardResponse.status = createBoardsErr;
        boardResponse.entity = board;
        res.send(boardResponse);
        res.end();
    });
};

exports.deleteBoard = function (req, res) {
    var ticket = req.body.ticket;
    var paramToken = req.body.token;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var serviceResponse = new ServiceResponse();
    boardLogic.deleteBoardsWorkUnit(ticket, phoneNumber, paramToken, function(createBoardsErr, board) {
        serviceResponse.status = createBoardsErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.isCreatorBoard = function (req, res) {
    var ticket = req.body.ticket;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var boolResponse = new BoolResponse();
    boardLogic.isCreatorBoardWorkUnit(ticket, phoneNumber, token, function(isCreatorBoardErr, result) {
        boolResponse.status = isCreatorBoardErr;
        boolResponse.entity = result;
        res.send(boolResponse);
        res.end();
    });
};

exports.listMatchTables = function (req, res) {
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var tablesResponse = new TablesResponse();
    boardLogic.listTablesWorkUnit(function(listTablesErr, result) {
        tablesResponse.status = listTablesErr;
        tablesResponse.entity = result;
        res.send(tablesResponse);
        res.end();
    });
};

exports.validateSignIn = function (req, res) {
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"] || req.body.token;

    var playerResponse = new PlayerResponse();

    playerLogic.validateUserTokenWorkUnit(phoneNumber, token, function(getPlayerErr, player) {
        playerResponse.status = getPlayerErr;
        playerResponse.entity = player;
        res.send(playerResponse);
        res.end();
    });
};

exports.getPlayerByToken = function (req, res) {
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"] || req.body.token;

    var playerResponse = new PlayerResponse();

    playerLogic.getPlayerByTokenWorkUnit(phoneNumber, token, function(getPlayerErr, player) {
        playerResponse.status = getPlayerErr;
        playerResponse.entity = player;
        res.send(playerResponse);
        res.end();
    });
};

exports.sendSms = function (req, res) {
    var phoneNumber = req.body.phoneNumber;

    var serviceResponse = new ServiceResponse();
    playerLogic.sendSmsWorkUnit(phoneNumber, function(sendSmsErr) {
        serviceResponse.status = sendSmsErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.signUp = function (req, res) {
    var player = req.body;

    var playerResponse = new PlayerResponse();

    playerLogic.registerWorkUnit(player, function(registerPlayerErr, player) {
        // record sms sent from this peer
        playerResponse.status = registerPlayerErr;
        playerResponse.entity = player;
        res.send(playerResponse);
        res.end();
    });
};

exports.sendSmsForUpdate = function (req, res) {
    var phoneNumber = req.body.phoneNumber;

    var serviceResponse = new ServiceResponse();

    playerLogic.sendSmsForUpdateWorkUnit(phoneNumber, function(sendSmsErr) {
        serviceResponse.status = sendSmsErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.signIn = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;

    var playerResponse = new PlayerResponse();

    playerLogic.signInWorkUnit(phoneNumber, password, function(signInErr, player) {
        playerResponse.status = signInErr;
        playerResponse.entity = player;
        res.send(playerResponse);
        res.end();
    });
};

exports.signOut = function (req, res) {
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"] || req.body.token;

    var serviceResponse = new ServiceResponse();

    playerLogic.signOutWorkUnit(phoneNumber, token, function(signOutErr) {
        serviceResponse.status = signOutErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.resetPassword = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var verificationCode = req.body.verificationCode;
    var password = req.body.password;

    var serviceResponse = new ServiceResponse();

    playerLogic.resetPasswordWorkUnit(phoneNumber, verificationCode, password, function(resetPasswordErr) {
        serviceResponse.status = resetPasswordErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.getRandomDummy = function (req, res) {
    var playerResponse = new PlayerResponse();

    playerLogic.getRandomDummyWorkUnit(function(getRandomDummyErr, dummy) {
        playerResponse.status = getRandomDummyErr;
        playerResponse.entity = dummy;
        res.send(playerResponse);
        res.end();
    });
};

exports.fetchPasscode = function (req, res) {
    var phoneNumber = req.headers["phone-number"] || req.body.phoneNumber;
    var token = req.headers["token"] || req.body.token;

    var serviceResponse = new ServiceResponse();

    playerLogic.fetchMatchPasscodeWorkUnit(phoneNumber, token, function(fetchPasscodeErr) {
        serviceResponse.status = fetchPasscodeErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.getContestants = function (req, res) {
    var playerResponse = new PlayerResponse();

    playerLogic.getContestantsWorkUnit(function(getContestantsErr, contestants) {
        playerResponse.status = getContestantsErr;
        playerResponse.entity = contestants;
        res.send(playerResponse);
        res.end();
    });
};

exports.getKanbanContestants = function (req, res) {
    var tableNumber = req.query.table_number;
    var adminPassword = req.query.password;

    var playerResponse = new PlayerResponse();

    console.log('get kanban contestants with admin password = ' + adminPassword);
    playerLogic.getKanbanContestantsWorkUnit(tableNumber, adminPassword, function(getContestantsErr, contestants) {
        playerResponse.status = getContestantsErr;
        playerResponse.entity = contestants;
        res.send(playerResponse);
        res.end();
    });
};