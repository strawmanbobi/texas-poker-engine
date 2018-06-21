/**
 * Created by Dummy team
 *  2017/12/01
 */

var db = require('../database/msession');
var logger = require('../poem/logging/logger4js').helper;
var ErrorCode = require('../constants/error_code');
var errorCode = new ErrorCode();

exports.createBoard = function (board, callback) {
    db.collection('board', function (err, boardCollection) {
        if (err) {
            logger.error("connect to board table failed. " + err);
            callback(errorCode.FAILED, null);
        } else {
            boardCollection.insert(board, function (err, result) {
                if (err) {
                    logger.error("insert board failed: " + err);
                    callback(errorCode.FAILED, null);
                } else {
                    logger.info("insert board succeed");
                    callback(errorCode.SUCCESS, result);
                }
            });
        }
    });
};

exports.updateBoard = function (conditions, newBoard, callback) {
    db.collection('board', function (err, boardCollection) {
        if (!err) {
            boardCollection.update(conditions, {$set: newBoard}, function (err, result) {
                if (!err) {
                    logger.info("update board by conditions " + conditions + " successfully");
                    callback(errorCode.SUCCESS, result);
                } else {
                    logger.error("update board by conditions: " + conditions + " failed: " + err);
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.error("update board collection error. " + err);
            callback(errorCode.FAILED, null);
        }
    });
};

exports.deleteBoard = function (conditions, callback) {
    db.collection('board', function (err, boardCollection) {
        if (!err) {
            boardCollection.deleteOne(conditions, function (err) {
                if (!err) {
                    logger.info("delete board by conditions " + conditions + " successfully");
                    callback(errorCode.SUCCESS);
                } else {
                    logger.error("delete board by conditions: " + conditions + " failed: " + err);
                    callback(errorCode.FAILED);
                }
            });
        } else {
            logger.error("delete board collection error. " + err);
            callback(errorCode.FAILED);
        }
    });
};

exports.getBoards = function (conditions, callback) {
    db.collection('board', function (err, boardCollection) {
        if (!err) {
            boardCollection.find(conditions).toArray(function (err, result) {
                if (!err) {
                    logger.info("get board by conditions " + JSON.stringify(conditions) +
                        " successfully" + JSON.stringify(result));
                    callback(errorCode.SUCCESS, result); //return board array
                } else {
                    logger.error("get board by conditions: " + JSON.stringify(conditions) + " failed: " + err);
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.error("get board collection error. " + err);
            callback(errorCode.FAILED, null);
        }
    });
};

exports.listBoards = function (conditions, from, count, callback) {
    db.collection('board', function (err, boardCollection) {
        if (!err) {
            boardCollection.find(conditions, {}, {
                "limit": parseInt(count),
                "skip": parseInt(from),
                "sort": [['createTime','desc']]
            }).toArray(function (err, result) {
                if (!err) {
                    logger.info("list boards by conditions " + JSON.stringify(conditions) +
                        " successfully" + JSON.stringify(result));
                    callback(errorCode.SUCCESS, result); //return board array
                } else {
                    logger.error("list boards by conditions: " + JSON.stringify(conditions) + " failed: " + err);
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.error("get board collection error. " + err);
            callback(errorCode.FAILED, null);
        }
    });
};
