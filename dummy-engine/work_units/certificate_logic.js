/**
 * Created by dummy-team
 * 2017-12-05
 */

require('../poem/configuration/constants');

var Admin = require('../models/admin_dao.js');
var AdminAuth = require('../authentication/player_auth.js');
var MD5 = require('../poem/crypto/md5.js');
var StringUtils = require('../poem/utils/string_utils.js');

var Enums = require('../constants/enums.js');
var ErrorCode = require('../constants/error_code.js');
var logger = require('../poem/logging/logger4js').helper;

var enums = new Enums();
var errorCode = new ErrorCode();

var adminAuth = new AdminAuth(REDIS_HOST, REDIS_PORT, null, REDIS_PASSWORD);

var RequestSender = require('../poem/http/request.js');
var Map = require('../poem/mem/map.js');

var SIGN_IN_SERVICE = "/irext-server/app/app_login";
