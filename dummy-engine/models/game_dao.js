/**
 * Created by Dummy team
 *  2017/12/02
 */

var db = require('../database/msession');
var logger = require('../poem/logging/logger4js').helper;
var ErrorCode = require('../constants/error_code');
var errorCode = new ErrorCode();

exports.getGameInfo = function (gameName, callback) {
    db.collection('game', function (err, gameCollection) {
        if (!err) {
            gameCollection.find(gameName).toArray(function (err, result) {
                if (!err) {
                    logger.info("get game info by gameName: " + gameName.name + " successfully");
                    callback(errorCode.SUCCESS, result); //return board array
                } else {
                    logger.error("get game info by gameName: " + gameName.name + " failed: " + err);
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.error("get game collection error. " + err);
            callback(errorCode.FAILED, null);
        }
    });
};

exports.createGame = function (game, callback) {
    db.collection('game', function (err, gameCollection) {
        if (err) {
            logger.error("connect to game table failed. " + err);
            callback(errorCode.FAILED, null);
        } else {
            gameCollection.insert(game, function (err, result) {
                if (err) {
                    logger.error("create new game failed: " + err);
                    callback(errorCode.FAILED, null);
                } else {
                    logger.info("create new game successfully");
                    callback(errorCode.SUCCESS, result);
                }
            });
        }
    });
};
