/**
 * Created by dummy team
 * 2017-07-22
 */
var rateLimit = require('ws-rate-limit')('10s', 100);
var WebSocketServer = require('ws').Server;
var logger = require('../poem/logging/logger4js').helper;
var PokerGame = require("./texasholdem/communicate.js");

var games = {};
var Enums = require('../constants/enums.js');
var enums = new Enums();

/**
 * Exported functions
 */

function init(socket) {
    socket.on('message', function (data) {
            try {
                var json = JSON.parse(data);
                if (json.eventName === "__join") {
                    var gameType = json.data.gameName;
                    switch (gameType) {
                        case enums.GAME_TEXAS_HOLDEM:
                            var pokerGame = games[gameType];
                            if (!pokerGame)
                                pokerGame = games[gameType] = new PokerGame.SkyRTC();
                            pokerGame.socketJoin(socket);
                            pokerGame.emit(json.eventName, json.data, socket);
                            break;
                        default:
                            break;
                    }
                } else {
                    logger.info("parameter is null, ignore it");
                }
            } catch (e) {
                logger.error(e.message);
            }
        }
    );

    socket.on('limited', function(data) {
        socket.close();
    });
}

exports.listen = function (server) {
    var SkyRTCServer;
    if (typeof server === 'number') {
        SkyRTCServer = new WebSocketServer({
            port: server
        });
    } else {
        SkyRTCServer = new WebSocketServer({
            server: server
        });
    }

    SkyRTCServer.on('connection', function (socket, req) {
        rateLimit(socket);

        var ip = req.connection.remoteAddress || req.socket.remoteAddress || socket._socket.remoteAddress;
        socket.ip = ip;
        init(socket);
        logger.info("receive connection request from -> " + ip);
    });

    return SkyRTCServer;
};
