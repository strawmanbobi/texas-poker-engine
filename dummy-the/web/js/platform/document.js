/**
 * Created by dummy-team
 * 2017-09-20
 */

$(document).ready(function () {
    $('#dialogs').load('dialogs.html');
    validateSignIn();
});

function createDummy() {
    var ticket = $('#ticket').val();
    var port = $('#port').val();
    var phoneNumber = $('#phone_number').val();
    var password = $('#password').val();

    if (isEmpty(ticket) || isEmpty(port)) {
        return;
    }

    if (isEmpty(phoneNumber) || isEmpty(password)) {
        $.ajax({
            url: '/api/players/get_random_dummy',
            headers: {"phone-number": phoneNumber, "token": token},
            type: 'POST',
            dataType: 'json',
            data: {
            },
            timeout: 20000,
            success: function (response) {
                console.log("get random dummy response = " + JSON.stringify(response));
                if (response.status.code === 0) {
                    var dummyPlayer = response.entity;
                    if (null !== dummyPlayer) {
                        var hostName = window.location.hostname + ':' + window.location.port;
                        var dummyURL = 'http://' + hostName + '/dummy.html?ticket='+ticket+'&port='+port+
                            '&phoneNumber='+dummyPlayer.phoneNumber+'&password='+dummyPlayer.password;
                        window.open(dummyURL);
                        $('#ticket').val('');
                        $('#port').val('');
                        $('#phone_number').val('');
                        $('#password').val('');
                    } else {
                        console.log('failed to get dummy');
                    }
                } else {
                    console.log('failed to get dummy');
                }
            },
            error: function () {
                console.log('failed to get dummy');
            }
        });
    } else {
        var password = md5(password);
        var hostName = window.location.hostname + ':' + window.location.port;
        var dummyURL = 'http://' + hostName + '/dummy.html?ticket='+ticket+'&port='+port+
            '&phoneNumber='+phoneNumber+'&password='+password;
        window.open(dummyURL);
        $('#ticket').val('');
        $('#port').val('');
        $('#phone_number').val('');
        $('#password').val('');
    }
}

function hashName() {
    var playerName = $('#hash_name_in').val();
    var digest = md5(playerName);
    $('#hash_name_out').val(digest);
}
