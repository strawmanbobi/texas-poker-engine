/**
 * Created by Elsie
 * 2017-11-26
 */

ServiceResponse = require("./service_response");
function PlayerResponse(status, entity) {
    this.entity = entity;
    ServiceResponse.call(this, status);
}

module.exports = PlayerResponse;