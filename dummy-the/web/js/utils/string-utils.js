/**
 * Created by strawmanbobi
 * 2018-03-27
 */

function validatePhoneNumber(phoneNumber) {
    if(!(/^1[123456789]\d{9}$/.test(phoneNumber))) {
        return false;
    }
    return true;
}

function isEmpty(value) {
    if (undefined === value || null === value || '' === value || 0 === value.length) {
        return true;
    }
    return false;
}
