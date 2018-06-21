/**
 * Created by donna
 * 2014-08-30
 */

var constants = require('../configuration/constants');
var Enums = require('../configuration/enums');
var log4js = require('log4js');
var enums = new Enums();
var dateUtils = require('../utils/date_utils');

var helper = helper || {};
exports.helper = helper;

var logRoot = "./logs/";
var userDebugLogFolder = "user_debug/" + LISTEN_PORT + "/";
var devLogFolder = "dev/" + LISTEN_PORT + "/";
var productionLogFolder = "production/" + LISTEN_PORT + "/";

var logFile = "common.log";

log4js.configure({
    appenders: {
        default: {
            type: "dateFile",
            filename: logRoot + devLogFolder + logFile,
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: false
        },
        userProductionLog: {
            type: "file",
            filename: logRoot + productionLogFolder + logFile,
            maxLogSize: 104857600,
            backups: 10,
            compress: true
        },
        userDebugLog: {
            type: "file",
            filename: logRoot + userDebugLogFolder + logFile,
            maxLogSize: 104857600,
            backups: 10,
            compress: true
        },
        userDevelopmentLog: {
            type: "dateFile",
            filename: logRoot + devLogFolder + logFile,
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: false
        }
    },
    categories: {
        default: {appenders: ['userProductionLog', 'default'], level: 'info'},
        userProductionLog: {appenders: ['userProductionLog'], level: 'info'},
        userDebugLog: {appenders: ['userDebugLog'], level: 'info'},
        userDevelopmentLog: {appenders: ['userDevelopmentLog'], level: 'info'}
    },
    replaceConsole: true
});

var userProductionLog = log4js.getLogger('userProductionLog');
var userDebugLog = log4js.getLogger('userDebugLog');
var userDevelopmentLog = log4js.getLogger('userDevelopmentLog');

helper.info = function (msg) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss S");
    if (enums.APP_DEVELOPMENT_MODE === ENV) {
        console.log(date + ": " + msg);
    } else if (enums.APP_PRODUCTION_MODE === ENV) {
        userProductionLog.info(date + ": " + msg);
    } else {
        userDebugLog.info(date + ": " + msg);
    }
};

helper.error = function (msg) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss S");
    if (enums.APP_DEVELOPMENT_MODE === ENV) {
        console.log(date + ": " + msg);
    } else if (enums.APP_PRODUCTION_MODE === ENV) {
        userProductionLog.error(date + ": " + msg);
    } else {
        userDebugLog.error(date + ": " + msg);
    }
};

helper.warn = function (msg) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss S");
    if (enums.APP_DEVELOPMENT_MODE === ENV) {
        console.log(date + ": " + msg);
    } else if (enums.APP_PRODUCTION_MODE === ENV) {
        userProductionLog.warn(date + ": " + msg);
    } else {
        userDebugLog.warn(date + ": " + msg);
    }
};

helper.debug = function (msg) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss S");
    if (enums.APP_DEVELOPMENT_MODE === ENV) {
        console.log(date + ": " + msg);
    } else if (enums.APP_PRODUCTION_MODE === ENV) {
        userProductionLog.debug(date + ": " + msg);
    } else {
        userDebugLog.debug(date + ": " + msg);
    }
};

helper.trace = function (msg) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss S");
    if (enums.APP_DEVELOPMENT_MODE === ENV) {
        console.log(date + ": " + msg);
    } else if (enums.APP_PRODUCTION_MODE === ENV) {
        userProductionLog.trace(date + ": " + msg);
    } else {
        userDebugLog.trace(date + ": " + msg);
    }
};

helper.fatal = function (msg) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss S");
    if (enums.APP_DEVELOPMENT_MODE === ENV) {
        console.log(date + ": " + msg);
    } else if (enums.APP_PRODUCTION_MODE === ENV) {
        userProductionLog.fatal(date + ": " + msg);
    } else {
        userDebugLog.fatal(date + ": " + msg);
    }
};
