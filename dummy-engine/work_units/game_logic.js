/**
 * Created by Dummy team
 * 2017-12-02
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var gameDao = require('../models/game_dao');
var playerDao = require('../models/player_dao');

var Enums = require('../constants/enums');
var enums = new Enums();

var ErrorCode = require('../constants/error_code');
var errorCode = new ErrorCode();

var async = require('async');

exports.initDummiesWorkUnit = function (count, callback) {
    var conditions = {
        name: 'texas_holdem',
    };
    var game;
    var dummyCount = 0;
    gameDao.getGames(conditions, function (getGamesErr, games) {
        logger.info(getGamesErr);
        if (getGamesErr.code === errorCode.SUCCESS.code && null != games && games.length > 0) {
            game = games[0];
            dummyCount = game.dummyCount;
            if (undefined === dummyCount || null === dummyCount) {
                dummyCount = 0;
            }
            var newDummies = [];
            for (var i = 0; i < count; i++) {
                var dummyNumber = dummyCount + '';
                var dummyPhone = '1' + dummyNumber.padStart(10, '0');
                var dummyPlayer = {
                    phoneNumber : dummyPhone,
                    password : 'e10adc3949ba59abbe56e057f20f883e',
                    name : 'D-' + dummyNumber,
                    role : enums.ROLE_DUMMY,
                    status : 1,
                    instance : 0
                };
                newDummies.push(dummyPlayer);
                dummyCount++;
            }

            async.eachSeries(newDummies, function (dummy, innerCallback) {
                playerDao.createPlayer(dummy, function(createPlayerErr) {
                    innerCallback();
                });
            }, function (err) {
                game.dummyCount = dummyCount;
                gameDao.updateGame(conditions, game, function(updateGameErr) {
                    callback(updateGameErr);
                });
            });
        } else {
            logger.info('get game failed.');
            callback(errorCode.FAILED, null);
        }
    });
}
