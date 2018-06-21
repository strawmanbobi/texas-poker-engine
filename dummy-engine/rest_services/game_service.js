/**
 * created by Dummy team
 * 2017-12-02
 */

var logger = require('../poem/logging/logger4js').helper;
var BoardResponse = require('../responses/board_response');
var gameLogic = require('../work_units/game_logic');


exports.createGame = function (req, res) {
    var name = req.body.game_name;
    var min = parseInt(req.body.min);
    var max = parseInt(req.body.max);

    var boardResponse = new BoardResponse();
    gameLogic.createGameWorkUnit(name, min, max, function (createBoardErr, board) {
        boardResponse.status = createBoardErr;
        boardResponse.entity = board;
        res.send(boardResponse);
        res.end();
    });
};