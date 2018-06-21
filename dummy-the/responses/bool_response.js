/**
 * Created by dummy team
 * 2017-12-17
 */

ServiceResponse = require("./service_response");
function BoolResponse(status, entity) {
    this.entity = entity;
    ServiceResponse.call(this, status);
}

module.exports = BoolResponse;