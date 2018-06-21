/**
 * Created by Dummy team
 * 2017-12-02
 */

var app = require('../dummy.js');
var gameService = require('../rest_services/game_service');


app.post("/game/create_game", gameService.createGame);
