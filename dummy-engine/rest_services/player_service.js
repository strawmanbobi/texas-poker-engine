/**
 * created by Dummy team
 * 2017-11-26
 */

var PlayerResponse = require('../responses/player_response');

var playerLogic = require('../work_units/player_logic');
var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();
var ServiceResponse = require('../responses/service_response');
var PlayerAuth = require('../authentication/player_auth.js');
var playerAuth = new PlayerAuth(REDIS_HOST, REDIS_PORT, null, REDIS_PASSWORD);

var logger = require('../poem/logging/logger4js').helper;

exports.signUp = function (req, res) {
    var player = req.body;
    var playerResponse = new PlayerResponse();

    playerLogic.registerWorkUnit(player, function (registerErr, player) {
        playerResponse.status = registerErr;
        playerResponse.entity = player;
        res.send(playerResponse);
        res.end();
    });
};

exports.signIn = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;

    var playerResponse = new PlayerResponse();
    playerLogic.validatePlayerWorkUnit(phoneNumber, password, function (getPlayerErr, player) {
        playerResponse.status = getPlayerErr;
        playerResponse.entity = player;
        res.send(playerResponse);
        res.end();
    });
};

exports.validateSignIn = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var token = req.body.token;

    var playerResponse = new PlayerResponse();
    playerLogic.verifyTokenWorkUnit(token, phoneNumber, function (validateTokenErr, result) {
        if (errorCode.SUCCESS.code !== validateTokenErr.code) {
            playerResponse.status = validateTokenErr;
            playerResponse.entity = null;
            res.send(playerResponse);
            res.end();
        } else {
            playerLogic.getPlayerByPhoneNumberWorkUnit(phoneNumber, function (getPlayerErr, player) {
                if (errorCode.SUCCESS.code === getPlayerErr.code && null !== player) {
                    player.token = token;
                    delete player.password;
                    playerResponse.status = errorCode.SUCCESS;
                    playerResponse.entity = player;
                    res.send(playerResponse);
                    res.end();
                } else {
                    playerResponse.status = errorCode.FAILED;
                    playerResponse.entity = null;
                    res.send(playerResponse);
                    res.end();
                }
            });
        }
    });
};

exports.getPlayerByToken = function (req, res) {
    var token = req.body.token;

    var playerResponse = new PlayerResponse();
    playerLogic.getPhoneNumberByTokenWorkUnit(token, function (getPhoneNumberErr, phoneNumber) {
        if (getPhoneNumberErr.code !== errorCode.SUCCESS.code) {
            playerResponse.status = errorCode.FAILED;
            playerResponse.entity = null;
            res.send(playerResponse);
            res.end();
        } else {
            playerLogic.getPlayerByPhoneNumberWorkUnit(phoneNumber, function(getPlayerErr, players) {
                if (getPlayerErr.code === errorCode.SUCCESS.code && null != players && players.length > 0) {
                    playerResponse.status = errorCode.SUCCESS;
                    playerResponse.entity = players[0];
                } else {
                    playerResponse.status = errorCode.FAILED;
                    playerResponse.entity = null;
                }

                res.send(playerResponse);
                res.end();
            });
        }
    });
};

exports.getRandomDummy = function (req, res) {
    var playerResponse = new PlayerResponse();
    playerLogic.getRandomDummyWorkUnit(function (getRandomDummyErr, dummy) {
        playerResponse.status = getRandomDummyErr;
        playerResponse.entity = dummy;
        res.send(playerResponse);
        res.end();
    });
};

exports.sendSms = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    var serviceResponse = new ServiceResponse();
    playerLogic.sendSmsWorkUnit(ip, phoneNumber, function(sendSmsErr) {
        serviceResponse.status = sendSmsErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.sendSmsForUpdate = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    var serviceResponse = new ServiceResponse();

    logger.info('send sms for update request');
    playerLogic.sendSmsForUpdateWorkUnit(ip, phoneNumber, function(sendSmsErr) {
        serviceResponse.status = sendSmsErr;
        res.send(serviceResponse);
        res.end();
    });
};

exports.signOut = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var token = req.body.token;

    var serviceResponse = new ServiceResponse();
    playerAuth.deleteAuthInfo(phoneNumber, function (deletePhoneNumberErr) {
        if (deletePhoneNumberErr.code === errorCode.SUCCESS.code) {
            logger.info('phone Number ' + phoneNumber + ' as key deleted');
            playerAuth.deleteAuthInfo(token, function (deleteTokenErr) {
                if (deleteTokenErr.code === errorCode.SUCCESS.code) {
                    logger.info('token ' + token + ' as key deleted');
                } else {
                    logger.warn('token ' + token + ' as key delete failed');
                }
                serviceResponse.status = errorCode.SUCCESS;
                res.send(serviceResponse);
                res.end();
            });
        } else {
            serviceResponse.status = errorCode.FAILED;
            res.send(serviceResponse);
            res.end();
        }
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
