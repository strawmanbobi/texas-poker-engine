/**
 * Created by dummy-team
 * 2017-10-12
 */

$(document).ready(function () {
    $('#dialogs').load('dialogs.html');
    validateSignIn(showWelcome);
});

function signOut() {
    $.ajax({
        url: '/api/players/sign_out',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            phoneNumber: phoneNumber,
            token: token
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                onSignedOut(true);
            } else {
                onSignedOut(false);
            }
        },
        error: function () {
            onSignedOut(false);
        }
    });
}

function onSignedOut(success) {
    if (success) {
        toastr.success('注销成功');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('token');
        window.location.reload();
    } else {
        toastr.error('注销失败');
    }
}
