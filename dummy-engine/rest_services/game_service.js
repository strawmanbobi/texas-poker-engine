/**
 * created by Dummy team
 * 2017-12-02
 */

var ServiceResponse = require('../responses/service_response');
var gameLogic = require('../work_units/game_logic');


exports.initDummies = function (req, res) {
    var count = req.query.count;

    var serviceResponse = new ServiceResponse();
    gameLogic.initDummiesWorkUnit(count, function (initDummiesErr) {
        serviceResponse.status = initDummiesErr;
        res.send(serviceResponse);
        res.end();
    });
};