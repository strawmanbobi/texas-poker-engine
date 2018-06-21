/**
 * Created by Dummy team
 * 2017-11-26
 */

var app = require('../dummy.js');
var playerService = require('../rest_services/player_service.js');

app.post("/players/send_sms", playerService.sendSms);
app.post("/players/send_sms_for_update", playerService.sendSmsForUpdate);
app.post("/players/sign_up", playerService.signUp);
app.post("/players/sign_in", playerService.signIn);
app.post("/players/sign_out", playerService.signOut);
app.post("/players/reset_password", playerService.resetPassword);
app.post("/players/validate_sign_in", playerService.validateSignIn);
app.post("/players/get_player_by_token", playerService.getPlayerByToken);
app.post("/players/get_random_dummy", playerService.getRandomDummy);
