/**
 * Created by Dummy team
 * 2017-12-02
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var gameDao = require('../models/game_dao');
var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();

exports.createGameWorkUnit = function (gameName, minPlayer, maxPlayer, callback) {
    var game = {
        name: gameName,
        minPlayer: minPlayer,
        maxPlayer: maxPlayer
    };
    gameDao.createGame(game, function (createGameErr, game) {
        logger.info(createGameErr);
        if (createGameErr.code === errorCode.SUCCESS.code) {
            logger.info('create a new game succeed.');
            callback(createGameErr, game);
        } else {
            logger.info('create a new game failed.');
            callback(errorCode.FAILED, null);
        }
    });
}
