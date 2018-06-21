/**
 * Created by dummy team
 * 2017-09-08
 */

var constants = require('../poem/configuration/constants');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var db = new Db(MONGO_DB_NAME, new Server(MONGO_DB_SERVER_ADDRESS, MONGO_DB_SERVER_PORT,
    { auto_reconnect: true, poolSize: 100 }),
    { safe:true });

module.exports = db;