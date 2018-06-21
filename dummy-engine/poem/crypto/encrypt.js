/**
 * created by Dummy team
 * 2017-12-04
 */
var crypto = require('crypto');

/**
 * encrypt a string
 * @param str
 */
function encryptStr(str) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    var encryStr = sha1.digest('hex');
    return encryStr;
}

exports.encryptStr = encryptStr;
