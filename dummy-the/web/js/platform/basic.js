/**
 * Created by dummy-team
 * 2017-10-12
 */

var phoneNumber;
var token;
var password;

// HTTP response code
var SUCCESS = 0;
var SESSION_TIMEOUT =2;
var FAILED = -1;
var WRONG_ENV = -2;
var AUTHENTICATION_FAILURE = -3;
var PLAYER_EXIST = -4;
var PLAYER_NOT_EXIST = -5;
var WRONG_VERIFICATION_CODE = -6;
var MULTI_ACTIVE_BOARD_CREATED = -7;
var LOGIN_FAILURE = -8;

// game status code
var STATUS_READY = 0;
var STATUS_PREPARING = 1;
var STATUS_RUNNING = 2;
var STATUS_FINISHED = 3;
var STATUS_ENDED = 4;

// global board information
var fullBoardList = [];
var currentBoardIndex = 0;
var currentBoard = null;

function setBoard(canSetBoard, player) {
    if (canSetBoard && player) {
        $('#goto_game_dialog').modal();
    } else {
        toastr.warning('请先登录之后再创建游戏');
        $('#goto_game_dialog').modal('hide');
        $('#signin_dialog').modal();
    }
}

function createBoard() {
    $.ajax({
        url: '/api/board/create_board',
        headers: {'phone-number': phoneNumber, 'token': token},
        type: 'POST',
        dataType: 'json',
        data: {
            gameName: 'texas_holdem',
            phoneNumber: phoneNumber
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var board = response.entity;
                onBoardCreated(board);
            } else if (response.status.code === MULTI_ACTIVE_BOARD_CREATED) {
                if (response.entity.ticket) {
                    gotoGame(response.entity.ticket, response.entity.port);
                }
            }
        },
        error: function () {
            popUpHintDialog('服务器暂时没有响应，请稍后重试');
        }
    });
}

function onBoardCreated(board) {
    gotoGame(board.ticket, board.port);
}

function gotoGame(boardTicket, instancePort) {
    var ticket = boardTicket;
    var port = instancePort;
    var defaultChips = $('#game_default_chips').val();
    var defaultSb = $('#game_default_sb').val();
    var defaultRoundInterval = $('#game_round_interval').val();
    var defaultCommandInterval = $('#game_command_interval').val();
    var defaultCommandTimeout = $('#game_command_timeout').val();
    var defaultLostTimeout = $('#game_lost_timeout').val();
    var reloadChance = $('#game_reload_chance').val();
    var bgm = $('#game_bgm').is(':checked') ? 1 : 0;
    var sound = $('#game_sound').is(':checked') ? 1 : 0;
    var autoRestart = $('#auto_restart').is(':checked') ? 1 : 0;

    var hostName = window.location.hostname + ':' + window.location.port;
    var gameURL = 'http://' + hostName + '/game.html?phoneNumber='+phoneNumber+'&token='+token+'&ticket='+ticket+
        '&port='+port+'&bgm='+bgm+'&sound='+sound+'&auto='+autoRestart+'&defaultChips='+defaultChips+
        '&defaultSb='+defaultSb+'&roundInterval='+defaultRoundInterval+'&commandInterval='+defaultCommandInterval+
        '&reloadChance='+reloadChance+'&commandTimeout='+defaultCommandTimeout+'&lostTimeout='+defaultLostTimeout;
    window.open(gameURL);
    $('#goto_game_dialog').modal('hide');
}

function gotoRegister() {
    $('#signin_dialog').modal('hide');
    $('#signup_dialog').modal();
}

function validateSignIn(callback) {
    phoneNumber = localStorage.getItem('phoneNumber');
    token = localStorage.getItem('token');
    password = localStorage.getItem('password');
    console.log("validate signin, phoneNumber = " + phoneNumber + ", token = " + token + ", password = " + password);
    if (phoneNumber && token) {
        // get player information at client side
        $.ajax({
            url: '/api/players/validate_sign_in',
            headers: {"phone-number": phoneNumber, "token": token},
            type: 'POST',
            dataType: 'json',
            data: {
                phoneNumber: phoneNumber,
                token: token
            },
            timeout: 20000,
            success: function (response) {
                if (response.status.code === 0 && response.entity) {
                    var player = response.entity;
                    onSignedIn(true, player, callback);
                } else {
                    onSignedIn(false, null, callback);
                }
            },
            error: function () {
                toastr.error('服务器暂时没有响应，请稍后重试');
                onSignedIn(false, null, callback);
            }
        });
    } else {
        onSignedIn(false, null, callback);
    }
}

function onSignIn() {
    $('#signin_dialog').modal();
}

function signIn(callback) {
    var phoneNumber = $('#phone_number').val();
    var password = $('#password').val();
    if (isEmpty(phoneNumber) || isEmpty(password) || !validatePhoneNumber(phoneNumber)) {
        toastr.error('请输入正确的电话号码和密码');
        return;
    }
    password = md5(password);
    $.ajax({
        url: '/api/players/sign_in',
        type: 'POST',
        dataType: 'json',
        data: {
            phoneNumber: phoneNumber,
            password: password
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var player = response.entity;
                localStorage.setItem('password', password);
                onSignedIn(true, player, callback);
            } else {
                onSignedIn(false, null, callback);
            }
        },
        error: function () {
            toastr.error('服务器暂时没有响应，请稍后重试');
            onSignedIn(false, null, callback);
        }
    });
}

function signUp(callback) {
    var phoneNumber = $('#reg_phone_number').val();
    var verificationCode = $('#verification_code').val();
    var name = $('#name').val();
    var password = $('#reg_password').val();
    var passwordConfirm = $('#reg_confirm').val();
    if (isEmpty(phoneNumber) || isEmpty(password) || !validatePhoneNumber(phoneNumber)) {
        toastr.error('请输入正确的电话号码和密码');
        return;
    }

    if (isEmpty(name)) {
        toastr.error('请填写验证码');
        return;
    }

    if (isEmpty(verificationCode)) {
        toastr.error('请填写验证码');
        return;
    }

    if (password !== passwordConfirm) {
        toastr.error('两次输入的密码不一致');
        return;
    }
    password = md5(password);
    $.ajax({
        url: '/api/players/sign_up',
        type: 'POST',
        dataType: 'json',
        data: {
            phoneNumber: phoneNumber,
            password: password,
            verificationCode: verificationCode,
            name: name
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var player = response.entity;
                localStorage.setItem('password', password);
                onSignedUp(true, player, callback);
            } else {
                onSignedUp(false, null, callback);
            }
        },
        error: function () {
            toastr.error('服务器暂时没有响应，请稍后重试');
            onSignedUp(false, null, callback);
        }
    });
}

function onSignedIn(success, player, callback) {
    if (success) {
        if (callback) {
            callback(true, player);
        }
    } else {
        if (callback) {
            callback(false, null);
        }
    }
}

function onSignedUp(success, player, callback) {
    if (success) {
        if (callback) {
            callback(true, player);
        }
    } else {
        if (callback) {
            callback(false, null);
        }
    }
}

function showSignedIn(show, player) {
    if (show && player) {
        toastr.success('登录成功');
    } else {
        toastr.error('登录失败，电话号码或密码错误');
    }
    if (showWelcome) {
        showWelcome(show, player);
    }
}

function autoSignIn(success, player) {
    if (success && player) {
        toastr.success('注册成功，自动登录');
        $.ajax({
            url: '/api/players/sign_in',
            type: 'POST',
            dataType: 'json',
            data: {
                phoneNumber: player.phoneNumber,
                password: player.password
            },
            timeout: 20000,
            success: function (response) {
                if (response.status.code === 0) {
                    var player = response.entity;
                    localStorage.setItem('password', password);
                    onSignedIn(true, player, showSignedIn);
                } else {
                    onSignedIn(false, null, showSignedIn);
                }
            },
            error: function () {
                toastr.error('服务器暂时没有响应，请稍后重试');
                onSignedIn(false, null, showSignedIn);
            }
        });
    } else {
        toastr.error('注册失败，电话号码或密码错误');
    }
}

function showWelcome(show, player) {
    if (show && player) {
        clearSignInModal();
        clearSignUpModal();
        $('#player_name').html(player.name);
        $('#login_button').hide();
        $('#welcome').show();
        rememberInLs(player);
    } else {
        $('#player_name').val('');
        $('#login_button').show();
        $('#welcome').hide();
        clearLs();
    }
}

function clearSignInModal() {
    $('#phone_number').val('');
    $('#password').val('');

    $('#signin_dialog').modal('hide');
}

function clearSignUpModal() {
    $('#reg_phone_number').val('');
    $('#reg_password').val('');
    $('#reg_confirm').val('');
    $('#verification_code').val('');
    $('#name').val('');

    $('#signup_dialog').modal('hide');
}

function onResetPassword() {
    $('#signin_dialog').modal('hide');
    $('#reset_password_dialog').modal();
}

function resetPassword() {
    var phoneNumber = $('#reset_password_phone_number').val();
    var verificationCode = $('#reset_password_verification_code').val();
    var password = $('#reset_password_password').val();
    var confirm = $('#reset_password_confirm').val();

    if (isEmpty(phoneNumber) || !validatePhoneNumber(phoneNumber)) {
        toastr.error('手机号码格式不正确');
        return;
    }
    if (isEmpty(verificationCode)) {
        toastr.error('请填写验证码');
        return;
    }
    if (isEmpty(password)) {
        toastr.error('请填写密码');
        return;
    }
    if (isEmpty(confirm)) {
        toastr.error('请重复填写密码');
        return;
    }
    if (confirm !== password) {
        toastr.error('两次填写的密码不一致');
        return;
    }
    password = md5(password);
    $.ajax({
        url: '/api/players/reset_password',
        type: 'POST',
        data: JSON.stringify({
            phoneNumber: phoneNumber,
            verificationCode: verificationCode,
            password: password
        }),
        contentType: 'application/json; charset=utf-8',
        timeout: 20000,
        success: function(response) {
            if (response.status.code === 0) {
                toastr.success('密码修改成功');
                localStorage.setItem('password', password);
                clearResetPasswordModal();
            } else {
                toastr.error('密码修改失败');
            }
        },
        error: function() {
            toastr.success('密码修改失败');
        }
    });
}

function clearResetPasswordModal() {
    $('#reset_password_phone_number').val('');
    $('#reset_password_verification_code').val('');
    $('#reset_password_password').val('');
    $('#reset_password_confirm').val('');

    $('#reset_password_dialog').modal('hide');
}

function sendSmsForSignup() {
    var phoneNumber = $('#reg_phone_number').val();
    if (null === phoneNumber || !validatePhoneNumber(phoneNumber)) {
        toastr.error('手机号码格式不正确');
        return;
    }
    $.ajax({
        url: '/api/players/send_sms',
        type: 'POST',
        data: JSON.stringify({phoneNumber: phoneNumber}),
        contentType: 'application/json; charset=utf-8',
        timeout: 20000,
        success: function(response) {
            if (response.status.code === 0) {
                toastr.success('短信验证码发送成功');
            } else {
                toastr.error('短信发送失败, 请检查手机号码是否正确');
            }
        },
        error: function() {
            toastr.error('短信发送失败, 请检查手机号码是否正确');
        }
    });
}

function sendSmsForUpdate() {
    var phoneNumber = $('#reset_password_phone_number').val();
    if (null === phoneNumber || !validatePhoneNumber(phoneNumber)) {
        toastr.error('手机号码格式不正确');
        return;
    }
    $.ajax({
        url: '/api/players/send_sms_for_update',
        type: 'POST',
        data: JSON.stringify({phoneNumber: phoneNumber}),
        contentType: 'application/json; charset=utf-8',
        timeout: 20000,
        success: function(response) {
            if (response.status.code === 0) {
                toastr.success('短信验证码发送成功');
            } else {
                toastr.error('短信发送失败, 请检查手机号码是否正确');
            }
        },
        error: function() {
            toastr.error('短信发送失败, 请检查手机号码是否正确');
        }
    });
}

function rememberInLs(player) {
    phoneNumber = player.phoneNumber;
    token = player.token;
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('token', token);
}

function clearLs() {
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('token');
    localStorage.removeItem('password');
}

function popUpHintDialog(hint) {
    $('#text_hint').empty();
    $('#text_hint').append(hint);
    $('#hint_dialog').modal();
}
