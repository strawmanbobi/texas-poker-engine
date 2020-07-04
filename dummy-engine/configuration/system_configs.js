/**
 * Created by dummy team
 * 2017-09-01
 */

require('../poem/configuration/constants');
var Enums = require('../constants/enums');
var enums = new Enums();

fs = require('fs');

global.OSS_CREDENTIAL_FILE = '/data/dummy/oss_credential.json';

exports.setupEnvironment = function () {
    var env = process.env.NODE_ENV || 'development';
    ENV = env;

    let ossCredentialJSON = fs.readFileSync(OSS_CREDENTIAL_FILE,
        {
            encoding: 'utf8',
            flag:'r'
        });
    let ossCredential = JSON.parse(ossCredentialJSON.toString());
    let ossAppID = ossCredential.ossAppID;
    let ossAppSecret = ossCredential.ossAppSecret;

    if (undefined === typeof env || null === env || "" === env || enums.APP_DEVELOPMENT_MODE === env) {
        LISTEN_PORT = "8080";
        MONGO_DB_SERVER_ADDRESS = "127.0.0.1";
        MONGO_DB_SERVER_PORT = "27017";
        MONGO_DB_NAME = "the_game";
        MONGO_DB_USER = 'admin';
        MONGO_DB_PASSWORD = '123456';
        REDIS_HOST = "127.0.0.1";
        REDIS_PORT = "6379";
        REDIS_PASSWORD = null;
        SMS_ACCESSKEY_ID = ossAppID;
        SMS_ACCESSKEY_SEC = ossAppSecret;
        SMS_SIGN_NAME = "大米AI编程平台";
        MULTIPLE_INSTANCE = 20;
        BASE_PORT = 9000;
    } else if (enums.APP_PRODUCTION_MODE === env) {
        LISTEN_PORT = "8080";
        MONGO_DB_SERVER_ADDRESS = "127.0.0.1";
        MONGO_DB_SERVER_PORT = "27017";
        MONGO_DB_NAME = "the_game";
        MONGO_DB_USER = 'admin';
        MONGO_DB_PASSWORD = '123456';
        REDIS_HOST = "127.0.0.1";
        REDIS_PORT = "6379";
        REDIS_PASSWORD = null;
        SMS_ACCESSKEY_ID = ossAppID;
        SMS_ACCESSKEY_SEC = ossAppSecret;
        SMS_SIGN_NAME = "大米AI编程平台";
        MULTIPLE_INSTANCE = 20;
        BASE_PORT = 9000;
    } else if (enums.APP_USERDEBUG_MODE === env) {
        LISTEN_PORT = "8080";
        MONGO_DB_SERVER_ADDRESS = "127.0.0.1";
        MONGO_DB_SERVER_PORT = "27017";
        MONGO_DB_NAME = "the_game";
        MONGO_DB_USER = 'admin';
        MONGO_DB_PASSWORD = '123456';
        REDIS_HOST = "127.0.0.1";
        REDIS_PORT = "6379";
        REDIS_PASSWORD = null;
        SMS_ACCESSKEY_ID = ossAppID;
        SMS_ACCESSKEY_SEC = ossAppSecret;
        SMS_SIGN_NAME = "大米AI编程平台";
        MULTIPLE_INSTANCE = 20;
        BASE_PORT = 9000;
    }
};
