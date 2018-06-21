/**
 * Created by Dummy team
 * 2017-11-26
 */

ServiceResponse = require("./service_response");
function PlayersResponse(status, entity) {
    this.entity = entity;
    ServiceResponse.call(this, status);
}

module.exports = PlayersResponse;