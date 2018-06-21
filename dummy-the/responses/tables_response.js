/**
 * Created by Dummy team
 * 2017-12-02
 */

ServiceResponse = require("./service_response");
function TablesResponse(status, entity) {
    this.entity = entity;
    ServiceResponse.call(this, status);
}

module.exports = TablesResponse;