/**
 * Created by dummy team
 * 2017-07-22
 */

var SkyRTC = function () {
    function EventEmitter() {
        this.events = {};
    }

    EventEmitter.prototype.on = function (eventName, callback) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    };

    EventEmitter.prototype.emit = function (eventName, _) {
        var events = this.events[eventName],
            args = Array.prototype.slice.call(arguments, 1),
            i, m;

        if (!events) {
            return;
        }
        for (i = 0, m = events.length; i < m; i++) {
            events[i].apply(null, args);
        }
    };

    function skyrtc() {
        this.socket = null;
        this.socket_danmu = null;
    }

    skyrtc.prototype = new EventEmitter();

    /**
     *
     * @param server
     * @param playerName - used for Human client join
     * @param password
     * @param phoneNumber - used for Live creator client join
     * @param token - used for Live creator client join
     * @param ticket - used for Live join
     * @param isHuman
     * @param danmu
     */
    skyrtc.prototype.connect = function (server, playerName, password, phoneNumber, token, ticket, port, isHuman, danmu,
                                         onSocketClosed) {
        var socket,
            that = this;

        socket = this.socket = new WebSocket(server);
        socket.onopen = function () {
            console.log('on socket connected, send join : ' + playerName + ', ' + password + ', ' + ticket);
            socket.send(JSON.stringify({
                "eventName": "__join",
                "data": {
                    "phoneNumber": phoneNumber,
                    "token": token,
                    "password": password,
                    "ticket": ticket,
                    "port": port,
                    "isHuman": isHuman,
                    "danmu": danmu,
                    "gameName": "texas_holdem"
                }
            }));
            that.emit("socket_opened", socket);
        };

        socket.onmessage = function (message) {
            var json = JSON.parse(message.data);
            if (json.eventName) {
                that.emit(json.eventName, json.data);
            } else {
                that.emit("socket_receive_message", socket, json);
            }
        };

        socket.onerror = function (error) {
            that.emit("socket_error", error, socket);
        };

        socket.onclose = function (data) {
            that.emit('socket_closed', socket);
            if (onSocketClosed) {
                onSocketClosed(data);
            }
        };

        this.on('_peers', function (data) {
            that.emit('connected', socket);
        });

        this.on('_remove_peer', function (data) {

            that.emit("remove_peer", data.socketId);
        });
    };

    /*
    // use danmu replay instead
    skyrtc.prototype.connectDanmu = function (server, tableNumber) {
        var socket,
            that = this;

        socket = this.socket_danmu = new WebSocket(server);
        socket.onopen = function () {
            socket.send(JSON.stringify({
                "eventName": "__join",
                "data": {
                    "tableNumber": tableNumber,
                    "isGame": true
                }
            }));
            that.emit("socket_opened", socket);
        };

        socket.onmessage = function (message) {
            var json = JSON.parse(message.data);
            if (json.eventName) {
                that.emit(json.eventName, json.data);
            } else {
                that.emit("socket_receive_message", socket, json);
            }
        };

        socket.onerror = function (error) {
            that.emit("socket_error", error, socket);
        };

        socket.onclose = function (data) {
            that.emit('socket_closed', socket);
        };
    };
    */

    skyrtc.prototype.Bet = function (amount) {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__action",
            "data": {
                "action": "bet",
                "amount": amount
            }
        }));
    };
    skyrtc.prototype.Call = function () {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__action",
            "data": {
                "action": "call"
            }
        }));
    };
    skyrtc.prototype.Check = function () {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__action",
            "data": {
                "action": "check"
            }
        }));
    };

    skyrtc.prototype.Raise = function () {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__action",
            "data": {
                "action": "raise"
            }
        }));
    };

    skyrtc.prototype.AllIn = function () {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__action",
            "data": {
                "action": "allin"
            }
        }));
    };

    skyrtc.prototype.Fold = function () {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__action",
            "data": {
                "action": "fold"
            }
        }));
    };

    skyrtc.prototype.startGame = function(ticket, phoneNumber, token,
                                          commandInterval, roundInterval,
                                          defaultSb, defaultChips, reloadChance,
                                          commandTimeout, lostTimeout) {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__prepare_game",
            "data": {
                "phoneNumber": phoneNumber,
                "token": token,
                "ticket": ticket,
                // legacy tableNumber field
                "tableNumber": ticket,
                "commandInterval": commandInterval,
                "roundInterval": roundInterval,
                "defaultSb": defaultSb,
                "defaultChips": defaultChips,
                "reloadChance": reloadChance,
                "commandTimeout": commandTimeout,
                "lostTimeout": lostTimeout
            }
        }));
    };

    skyrtc.prototype.stopGame = function(ticket, phoneNumber, token) {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__stop_game",
            "data": {
                // legacy tableNumber field
                "tableNumber": ticket,
                "phoneNumber": phoneNumber,
                "token": token
            }
        }));
    };

    skyrtc.prototype.endGame = function(ticket, phoneNumber, token) {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__end_game",
            "data": {
                // legacy tableNumber field
                "tableNumber": ticket,
                "phoneNumber": phoneNumber,
                "token": token
            }
        }));
    };

    skyrtc.prototype.Reload = function () {
        var that = this;
        that.socket.send(JSON.stringify({
            "eventName": "__reload",
            "data": {}
        }));
    };

    return new skyrtc();
};