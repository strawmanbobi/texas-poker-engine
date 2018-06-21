/**
 * Created by Dummy team
 * 2018-04-07
 */

var app = require('../dummy.js');
var testService = require('../rest_services/test_service');

app.get("/test/heart_beat", testService.heartBeat);
