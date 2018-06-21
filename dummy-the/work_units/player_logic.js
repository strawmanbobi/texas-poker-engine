/**
 * Created by dummy-team
 * 2017-12-29
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();
var RequestSender = require('../poem/http/request.js');
var Map = require('../poem/mem/map.js');


var SEND_SMS_SERVICE = '/players/send_sms';
var SEND_SMS_FOR_UPDATE_SERVICE = '/players/send_sms_for_update';
var SIGN_UP_SERVICE = '/players/sign_up';
var SIGN_IN_SERVICE = '/players/sign_in';
var SIGN_OUT_SERVICE = '/players/sign_out';
var VALIDATE_SIGN_IN_SERVICE = '/players/validate_sign_in';
var GET_PLAYER_BY_TOKEN_SERVICE = '/players/get_player_by_token';
var RESET_PASSWORD_SERVICE = '/players/reset_password';
var GET_RANDOM_DUMMY_SERVICE = '/players/get_random_dummy';
var GET_CONTESTANTS_SERVICE = '/players/get_contestants';
var GET_KANBAN_CONTESTANTS_SERVICE = '/players/get_kanban_contestants';
var FETCH_PASSCODE_SERVICE = '/players/fetch_passcode';

exports.registerWorkUnit = function (player, callback) {
    // send HTTP request to engine server to sign up a new account
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            SIGN_UP_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json'
    };

    var signUpParameters = player;

    requestSender.sendPostRequest(signUpParameters, headers, function (signUpErr, signUpResponse) {
        logger.info('signUp response = ' + JSON.stringify(signUpResponse));

        if (errorCode.SUCCESS.code === signUpErr &&
            JSON.parse(signUpResponse).status.code === errorCode.SUCCESS.code) {
            var player = JSON.parse(signUpResponse).entity;
            logger.info('sign Up successfully, player = ' + JSON.stringify(player));
            callback(errorCode.SUCCESS, player);
        } else {
            logger.error('sign up request failed');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.sendSmsWorkUnit = function (phoneNumber, callback) {
    // send HTTP request to engine server to send verification code
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            SEND_SMS_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json'
    };

    var sendSmsParameters = {
        phoneNumber: phoneNumber
    };

    requestSender.sendPostRequest(sendSmsParameters, headers, function (sendSmsErr, sendSmsResponse) {
        if (errorCode.SUCCESS.code === sendSmsErr) {
            callback(JSON.parse(sendSmsResponse).status);
        } else {
            logger.error('send sms failed');
            callback(errorCode.FAILED);
        }
    });
};

exports.sendSmsForUpdateWorkUnit = function (phoneNumber, callback) {
    // send HTTP request to engine server to send verification code
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            SEND_SMS_FOR_UPDATE_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json'
    };

    var sendSmsParameters = {
        phoneNumber: phoneNumber
    };

    requestSender.sendPostRequest(sendSmsParameters, headers, function (sendSmsErr, sendSmsResponse) {
        if (errorCode.SUCCESS.code === sendSmsErr) {
            callback(JSON.parse(sendSmsResponse).status);
        } else {
            logger.error('send sms failed');
            callback(errorCode.FAILED);
        }
    });
};

exports.signInWorkUnit = function (phoneNumber, password, callback) {
    // send HTTP request to engine server to sign this player in
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            SIGN_IN_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json'
    };

    var signInParameters = {
        phoneNumber: phoneNumber,
        password: password
    };

    requestSender.sendPostRequest(signInParameters, headers, function (signInErr, signInResponse) {
        if (errorCode.SUCCESS.code === signInErr &&
            JSON.parse(signInResponse).status.code === errorCode.SUCCESS.code) {
            var player = JSON.parse(signInResponse).entity;
            callback(errorCode.SUCCESS, player);
        } else {
            logger.error('sign in request failed');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.signOutWorkUnit = function (phoneNumber, token, callback) {
    // send HTTP request to engine server to sign this player out
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            SIGN_OUT_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var signOutParameters = {
        phoneNumber: phoneNumber,
        token: token
    };

    requestSender.sendPostRequest(signOutParameters, headers, function (signOutErr, signOutResponse) {
        if (errorCode.SUCCESS.code === signOutErr &&
            JSON.parse(signOutResponse).status.code === errorCode.SUCCESS.code) {
            logger.info('sign out successfully');
            callback(errorCode.SUCCESS);
        } else {
            logger.error('sign out failed');
            callback(errorCode.FAILED);
        }
    });
};

exports.validateUserTokenWorkUnit = function (phoneNumber, token, callback) {
    // send HTTP request to engine server to validate user
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            VALIDATE_SIGN_IN_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var validateSignInParameters = {
        phoneNumber: phoneNumber,
        token: token
    };

    requestSender.sendPostRequest(validateSignInParameters, headers, function (getPlayerErr, playerResponse) {
        if (errorCode.SUCCESS.code === getPlayerErr &&
            JSON.parse(playerResponse).status.code === errorCode.SUCCESS.code) {
            var player = JSON.parse(playerResponse).entity;
            callback(errorCode.SUCCESS, player);
        } else {
            logger.error('get player failed');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.getPlayerByTokenWorkUnit = function (phoneNumber, token, callback) {
    // send HTTP request to engine server to get player
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            GET_PLAYER_BY_TOKEN_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var getPlayerParameters = {
        token: token
    };

    requestSender.sendPostRequest(getPlayerParameters, headers, function (getPlayerErr, playerResponse) {
        if (errorCode.SUCCESS.code === getPlayerErr &&
            JSON.parse(playerResponse).status.code === errorCode.SUCCESS.code) {
            logger.info('get player successfully');
            var player = JSON.parse(playerResponse).entity;
            logger.info('response of player = ' + JSON.stringify(player));
            callback(errorCode.SUCCESS, player);
        } else {
            logger.error('get player failed');
            callback(errorCode.FAILED, null);
        }
    });
};

exports.resetPasswordWorkUnit = function (phoneNumber, verificationCode, password, callback) {
    // send HTTP request to engine server to reset password
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            RESET_PASSWORD_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json'
    };

    var resetPasswordParameters = {
        phoneNumber: phoneNumber,
        verificationCode: verificationCode,
        password: password
    };

    requestSender.sendPostRequest(resetPasswordParameters, headers,
        function (resetPasswordErr, resetPasswordResponse) {
        if (errorCode.SUCCESS.code === resetPasswordErr &&
            JSON.parse(resetPasswordResponse).status.code === errorCode.SUCCESS.code) {
            logger.info('reset password successfully');
            callback(errorCode.SUCCESS);
        } else {
            logger.error('reset password failed');
            callback(errorCode.FAILED);
        }
    });
};

exports.getRandomDummyWorkUnit = function (callback) {
    // send HTTP request to engine server to reset password
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            GET_RANDOM_DUMMY_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json'
    };

    requestSender.sendPostRequest({}, headers,
        function (getRandomDummyErr, playerResponse) {
            if (errorCode.SUCCESS.code === getRandomDummyErr &&
                JSON.parse(playerResponse).status.code === errorCode.SUCCESS.code) {
                var player = JSON.parse(playerResponse).entity;
                callback(errorCode.SUCCESS, player);
            } else {
                logger.error('get dummy failed');
                callback(errorCode.FAILED, null);
            }
        });
};

exports.fetchMatchPasscodeWorkUnit = function (phoneNumber, token, callback) {
    // send HTTP request to engine server to reset password
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            FETCH_PASSCODE_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var fetchPasscodeParameters = {
        phoneNumber: phoneNumber,
        token: token
    };

    requestSender.sendPostRequest(fetchPasscodeParameters, headers, function (fetchPasscodeErr, serviceResponse) {
        if (errorCode.SUCCESS.code === fetchPasscodeErr &&
            JSON.parse(serviceResponse).status.code === errorCode.SUCCESS.code) {
            callback(errorCode.SUCCESS);
        } else {
            logger.error('fetch passcode failed');
            var status = JSON.parse(serviceResponse).status;
            callback(status);
        }
    });
};

exports.getContestantsWorkUnit = function (callback) {
    // send HTTP request to engine server to list contestants for specific table
    var queryParams = new Map();

    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            GET_CONTESTANTS_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json'
    };

    requestSender.sendGetRequest({}, headers,
        function (getContestantsErr, playerResponse) {
            if (errorCode.SUCCESS.code === getContestantsErr &&
                JSON.parse(playerResponse).status.code === errorCode.SUCCESS.code) {
                var contestants = JSON.parse(playerResponse).entity;
                callback(errorCode.SUCCESS, contestants);
            } else {
                logger.error('get contestants failed');
                callback(errorCode.FAILED, null);
            }
        });
};

exports.getKanbanContestantsWorkUnit = function (tableNumber, adminPassword, callback) {
    // send HTTP request to engine server to list contestants for specific table
    var queryParams = new Map();
    queryParams.put('table_number', tableNumber);
    if (undefined !== adminPassword && null !== adminPassword) {
        queryParams.put('password', adminPassword);
    }
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            GET_KANBAN_CONTESTANTS_SERVICE,
            queryParams);

    var headers = {
        'Content-Type': 'application/json'
    };

    requestSender.sendGetRequest({}, headers,
        function (getContestantsErr, playerResponse) {
            if (errorCode.SUCCESS.code === getContestantsErr &&
                JSON.parse(playerResponse).status.code === errorCode.SUCCESS.code) {
                var kanbanContestants = JSON.parse(playerResponse).entity;
                callback(errorCode.SUCCESS, kanbanContestants);
            } else {
                logger.error('get contestants failed');
                callback(errorCode.FAILED, null);
            }
        });
};