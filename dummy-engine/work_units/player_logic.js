/**
 * created by Dummy team
 * 2017-11-26
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var playerDao = require('../models/player_dao');

var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();

var Enums = require('../constants/enums.js');
var enums = new Enums();

var SmsSender = require('../poem/sms/sms_sender');

var PlayerAuth = require('../authentication/player_auth.js');
var playerAuth = new PlayerAuth(REDIS_HOST, REDIS_PORT, null, REDIS_PASSWORD);

var stringUtils = require('../poem/utils/string_utils.js');
var MD5 = require('../poem/crypto/md5');

exports.registerWorkUnit = function (player, callback) {
    // validate verification code
    var verificationCode = player.verificationCode;
    var phoneNumber = player.phoneNumber;

    var conditions = {
        $or: [
            {phoneNumber: phoneNumber},
            {name: player.name}
        ]
    };
    playerDao.getPlayers(conditions, function(getPlayerErr, players) {
        if (errorCode.SUCCESS.code === getPlayerErr.code && null !== players && players.length > 0) {
            var existedPlayer = players[0];
            logger.info('player : ' + phoneNumber + ' already existed');
            playerAuth.deleteAuthInfo(phoneNumber, function(deleteAuthErr) {

            });
            callback(errorCode.PLAYER_EXIST, existedPlayer);
        } else {
            playerAuth.getAuthInfo(phoneNumber, function (getValueErr, savedCode) {
                if (getValueErr.code === errorCode.SUCCESS.code &&
                    null !== savedCode &&
                    verificationCode === savedCode) {
                    logger.info('verification code validate passed');
                    player.role = enums.ROLE_PLAYER;
                    player.status = 1;
                    player.verificationCode = null;
                    player.instance = BASE_PORT + (stringUtils.getHashCode(phoneNumber, false) % MULTIPLE_INSTANCE);
                    logger.info('phoneNumber hashed instance = ' + player.instance);
                    playerDao.createPlayer(player, function(createPlayerErr, createdPlayer) {
                        if (errorCode.SUCCESS.code === createPlayerErr.code) {
                            logger.info('player created : ' + JSON.stringify(player));
                        }
                        playerAuth.deleteAuthInfo(phoneNumber, function(deleteAuthErr) {

                        });
                        callback(createPlayerErr, player);
                    });
                } else {
                    logger.error('verification code validate failed');
                    callback(errorCode.AUTHENTICATION_FAILURE, null);
                }
            });
        }
    });
};

exports.getPlayerWorkUnit = function (phoneNumber, password, callback) {
    var conditions = {
        phoneNumber: phoneNumber,
        password: password
    };

    playerDao.getPlayers(conditions, function (getPlayerErr, players) {
        if (errorCode.SUCCESS.code === getPlayerErr.code && null !== players && players.length > 0) {
            var player = players[0];
            callback(getPlayerErr, player);
        } else {
            callback(errorCode.FAILED, null);
        }
    });
};

exports.validatePlayerWorkUnit = function (phoneNumber, password, callback) {
    var conditions = {
        phoneNumber: phoneNumber,
        password: password
    };

    playerDao.getPlayers(conditions, function (getPlayerErr, players) {
        if (getPlayerErr.code === errorCode.SUCCESS.code && players !== null && players.length > 0) {
            var player = players[0];
            var token,
                ttl = 24 * 60 * 60 * 14,
                timeStamp;

            timeStamp = new Date().getTime();
            token = MD5.MD5(password + timeStamp);
            var keyToken = token;
            var valuePhoneNumber = player.phoneNumber;
            playerAuth.setAuthInfo(keyToken, valuePhoneNumber, ttl, function (setPlayerAuthErr) {
                if (setPlayerAuthErr.code === errorCode.SUCCESS.code) {
                    player.token = keyToken;
                    delete player.password;
                    callback(errorCode.SUCCESS, player);
                } else {
                    callback(errorCode.FAILED, null);
                }
            });
        } else {
            logger.info('player: ' + phoneNumber + ' not exist');
            callback(errorCode.PLAYER_NOT_EXIST, null);
        }
    });
};

exports.getPlayerByPhoneNumberWorkUnit = function (phoneNumber, callback) {
    var conditions = {
        phoneNumber: phoneNumber
    };
    playerDao.getPlayers(conditions, function (getPlayerErr, players) {
        if (getPlayerErr.code === errorCode.SUCCESS.code && players !== null && players.length > 0) {
            var player = players[0];
            callback(errorCode.SUCCESS, player);
        } else {
            logger.info('player : ' + phoneNumber + ' not exist');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.getRandomDummyWorkUnit = function (callback) {
    var conditions = {
        role: 2
    };
    playerDao.getPlayers(conditions, function(getPlayersErr, players) {
        if (errorCode.SUCCESS.code === getPlayersErr.code && null != players && players.length > 0) {
            var randIndex = Math.floor((Math.random() * players.length));
            var player = players[randIndex];
            callback(errorCode.SUCCESS, player);
        } else {
            callback(errorCode.FAILED, null);
        }
    });
};

exports.verifyTokenWorkUnit = function (key, value, callback) {
    playerAuth.validateAuthInfo(key, value, function (validatePlayerAuthErr, result) {
        if (validatePlayerAuthErr.code !== errorCode.SUCCESS.code) {
            logger.info('token validation failed');
        }
        callback(validatePlayerAuthErr, result);
    });
};

exports.getPhoneNumberByTokenWorkUnit = function (token, callback) {
    playerAuth.getAuthInfo(token, function (getValueErr, value) {
        if (getValueErr.code !== errorCode.SUCCESS.code) {
            callback(getValueErr, null);
        } else {
            callback(getValueErr, value);
        }
    });
};

exports.sendSmsWorkUnit = function (ip, phoneNumber, callback) {
    var verificationCode = stringUtils.genVerificationCode(0, 6);
    var ttl = 60;

    playerAuth.setAuthInfo(phoneNumber, verificationCode, ttl, function (setPlayerAuthErr) {
        if (setPlayerAuthErr.code === errorCode.SUCCESS.code) {
            var sender = new SmsSender(SMS_ACCESSKEY_ID, SMS_ACCESSKEY_SEC, SMS_SIGN_NAME);
            sender.sendVerifyKey(phoneNumber, verificationCode, function (sendErr) {
                if (sendErr === errorCode.SUCCESS.code) {
                    logger.info('send verification code successfully');
                    callback(errorCode.SUCCESS);
                } else {
                    logger.info('send verification code failed');
                    callback(errorCode.FAILED);
                }
            });
        } else {
            callback(errorCode.FAILED);
        }
    });
};

exports.sendSmsForUpdateWorkUnit = function (ip, phoneNumber, callback) {
    var conditions = {
        phoneNumber: phoneNumber
    };
    playerDao.getPlayers(conditions, function(getPlayerErr, players) {
        if (errorCode.SUCCESS.code === getPlayerErr.code && null != players && players.length > 0) {
            var verificationCode = stringUtils.genVerificationCode(0, 6);
            var ttl = 60;
            playerAuth.setAuthInfo(phoneNumber, verificationCode, ttl, function (setPlayerAuthErr) {
                if (setPlayerAuthErr.code === errorCode.SUCCESS.code) {
                    var sender = new SmsSender(SMS_ACCESSKEY_ID, SMS_ACCESSKEY_SEC, SMS_SIGN_NAME);
                    sender.sendVerifyKey(phoneNumber, verificationCode, function (sendErr) {
                        if (sendErr === errorCode.SUCCESS.code) {
                            logger.info('send verification code successfully');
                            callback(errorCode.SUCCESS);
                        } else {
                            logger.info('send verification code failed');
                            callback(errorCode.FAILED);
                        }
                    });
                } else {
                    callback(errorCode.FAILED);
                }
            });
        } else {
            logger.error('player: ' + phoneNumber + ' does not exist');
            callback(errorCode.PLAYER_NOT_EXIST);
        }
    });
};

exports.resetPasswordWorkUnit = function (phoneNumber, verificationCode, password, callback) {
    var conditions = {
        phoneNumber: phoneNumber
    };

    playerDao.getPlayers(conditions, function(getPlayerErr, players) {
        if (errorCode.SUCCESS.code === getPlayerErr.code && null != players && players.length > 0) {
            var player = players[0];
            playerAuth.getAuthInfo(player.phoneNumber, function (getValueErr, verifyCode) {
                if (getValueErr.code === errorCode.SUCCESS.code &&
                    null !== verifyCode && verifyCode === verificationCode) {
                    player.password = password;
                    playerDao.updatePlayer(conditions, player, function(updatePlayerErr) {
                        callback(updatePlayerErr);
                    });
                } else {
                    callback(errorCode.WRONG_VERIFICATION_CODE);
                }
            });
        } else {
            logger.error('player: ' + phoneNumber + ' not exist');
            callback(errorCode.PLAYER_NOT_EXIST);
        }
    });
};
