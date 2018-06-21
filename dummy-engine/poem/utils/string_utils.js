/*
 * Created by Strawmanbobi
 * 2015-03-02
 */

exports.randomChar = function (l) {
    var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
    var tmp = "";
    for (var i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
};

exports.randomNumber = function (l) {
    var x = "0123456789";
    var tmp = "";
    for (var i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
};

exports.randomDigital = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

exports.validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

exports.genVerificationCode = function (start, end) {
    var array = [];
    for (var i = start; i < end; ++i) array.push(i);
    return array.map(function (x) {
        return Math.floor(Math.random() * 10);
    }).join('')
};

exports.getHashCode = function (str, caseSensitive) {
    if(!caseSensitive){
        str = str.toLowerCase();
    }
    var hash = 1315423911, i, ch;
    for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= ((hash << 5) + ch + (hash >> 2));
    }

    return (hash & 0x7FFFFFFF);
};

exports.paddingNumber = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

function rnd() {
    var today = new Date();
    var seed = today.getTime();
    seed = (seed * 9301 + 49297) % 233280;
    return seed / (233280.0);
}

function cr(number) {
    return Math.ceil(rnd() * number);
}

function isNumber() {
    var r = /^[0-9]*[1-9][0-9]*$/;
    return r.test(str);
}
