/**
 * Created by Dummy team
 * 2017-11-25
 */

var db = require('../database/msession');
var logger = require('../poem/logging/logger4js').helper;

// pls. use local error code
var ErrorCode = require('../constants/error_code');
var errorCode = new ErrorCode();

/**
 * player
 * Fields:
 *      name(string)
 *      phoneNumber(string)(primary key)
 *      password(string)
 *      avatar(string)
 *      role(int): 0-player, 1-admin, 2-virtual
 *      status(int): 0-active, 1-deleted
 */

exports.createPlayer = function (player, callback) {
    db.collection('player', function (err, playerCollection) {
        if (err) {
            logger.error("connect to player table failed. " + err);
            callback(errorCode.FAILED, null);
        } else {
            playerCollection.insert(player, function (err, result) {
                if (err) {
                    logger.error("insert player failed: " + err);
                    callback(errorCode.FAILED, null);
                } else {
                    logger.info("insert player succeeded");
                    callback(errorCode.SUCCESS, result);
                }
            });
        }
    });
};

exports.getPlayers = function (conditions, callback) {
    db.collection('player', function (err, playerCollection) {
        if (!err) {
            playerCollection.find(conditions).toArray(function (err, result) {
                if (!err) {
                    callback(errorCode.SUCCESS, result);
                } else {
                    logger.error("get player error : " + err);
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.error("get player collection error : " + err);
            callback(errorCode.FAILED, null);
        }
    });
};

exports.updatePlayer = function (conditions, newPlayer, callback) {
    db.collection('player', function (err, playerCollection) {
        if (!err) {
            playerCollection.update(conditions, {$set: newPlayer}, function (err, result) {
                if (!err) {
                    logger.info("update player by conditions " + conditions + " successfully");
                    callback(errorCode.SUCCESS, result);
                } else {
                    logger.error("update board by conditions: " + conditions + " failed: " + err);
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.error("get player collection error : " + err);
            callback(errorCode.FAILED, null);
        }
    });
};
