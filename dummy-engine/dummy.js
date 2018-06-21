/**
 * Created by dummy team
 * 2017-09-08
 */

var constants = require('./poem/configuration/constants');
// initialize RUNTIME env
var systemConfig = require('./configuration/system_configs');
systemConfig.setupEnvironment();

// initialize listen port
LISTEN_PORT = process.argv[2] || LISTEN_PORT;

var playerLogic = require("./work_units/player_logic.js");
var ErrorCode = require("./constants/error_code");
var errorCode = new ErrorCode();

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./database/msession');
var flash = require('connect-flash');
var app = module.exports = express();

var httpServer = require('http').createServer(app);
var httpPort = normalizePort(LISTEN_PORT);


httpServer.listen(httpPort);

var SkyRTC = require('./game_services/communication.js').listen(httpServer);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

db.open(function (err, db) {
    db.authenticate(MONGO_DB_USER, MONGO_DB_PASSWORD, function () {
    });
});

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }));

app.use(cookieParser());

app.use(tokenValidation);
app.use('/', express.static(__dirname + '/web/'));
require('./routes');

console.log('dummy engine is running, listening on port ' + httpPort);

// token validation helper
var authenticationURLList = [
    '/board/create_board',
    '/board/update_board',
    '/board/delete_board',
    '/board/is_creator_board',
    '/game/create_game',
    '/player/fetch_passcode'
];

function tokenValidation (req, res, next) {
    if (isReqNeedAuthentication(req.url)) {
        console.log("headers : " + JSON.stringify(req.headers));
        var phoneNumber = req.headers["phone-number"];
        var token = req.headers["token"];
        // key: token, value:phoneNumber
        playerLogic.verifyTokenWorkUnit(token, phoneNumber, function(validateTokenErr, token) {
            var fakeResponse;

            if(errorCode.SUCCESS.code !== validateTokenErr.code) {
                fakeResponse = {
                    status: errorCode.AUTHENTICATION_FAILURE,
                    entity: null
                };
                console.log("!! " + req.url + " is a dangerous request, but validation is not passed");
                res.send(fakeResponse);
                res.end();
            } else {
                next();
            }
        });

    } else {
        next();
    }
}

function isReqNeedAuthentication(url) {
    for (var i = 0; i < authenticationURLList.length; i++) {
        if (-1 !== url.indexOf(authenticationURLList[i])) {
            return true;
        }
    }
    return false;
}