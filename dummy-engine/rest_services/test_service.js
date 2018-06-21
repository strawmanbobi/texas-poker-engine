/**
 * created by Dummy team
 * 2017-12-02
 */

var ServiceResponse = require('../responses/service_response');

var ErrorCode = require('../constants/error_code');
var errorCode = new ErrorCode();

var logger = require('../poem/logging/logger4js').helper;

exports.heartBeat = function (req, res) {
    logger.info('heart beat request received from client');
    var serviceResponse = new ServiceResponse();
    serviceResponse.status = errorCode.SUCCESS;
    res.send(serviceResponse);
    res.end();
};
