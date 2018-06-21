/**
 * Created by dummy team
 * 2017-09-08
 */

ServiceResponse = require("./service_response");
function IntegerResponse(status, entity) {
    this.entity = entity;
    ServiceResponse.call(this, status);
}

module.exports = IntegerResponse;