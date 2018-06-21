/**
 * Created by dummy-team
 * 2017-09-23
 */

var self;
var roundBets;
var bets;
var board;
var minBet;
var raiseCount;
var players;
var playerActions = {};
var gameStatus = 0;
var risk = 1;
var danger = 2;
var rtc = SkyRTC();
var ticket = '';
var serverAddress = '';
var maxCommands = 500;
var commandCount = 0;
var playerName = '';
var port = '';
var phoneNumber = '';
var password = '';

$(document).ready(function () {
    ticket = getParameter('ticket');
    port = getParameter('port');
    phoneNumber = getParameter('phoneNumber');
    password = getParameter('password');

    var host = window.location.hostname;
    serverAddress = 'ws://' + host + ':' + port;

    writeToCommands('player : Dummy, server : ' + serverAddress);
    $('#player_name').html('Dummy');
    document.title = 'THE Dummy';
    playerName = 'Dummy';

    initRTC();
});

function initRTC() {
    rtc.connect(serverAddress, '', password, phoneNumber, '', ticket, port, false, 0);

    rtc.on('__action', function (data) {
        writeToCommands('<<< action: ' + JSON.stringify(data, null, 4));
        self = data.self;
        roundBets = data.game.roundBets;
        bets = data.game.bets;
        board = data.game.board;
        minBet = data.game.minBet;
        raiseCount = data.game.raiseCount;
        players = data.game.players;
        takeAction(self.cards, self.cards.concat(board), players);
    });

    rtc.on('__bet', function (data) {
        writeToCommands('<<< bet: ' + JSON.stringify(data, null, 4));
        self = data.self;
        roundBets = data.game.roundBets;
        bets = data.game.bets;
        board = data.game.board;
        minBet = data.game.minBet;
        raiseCount = data.game.raiseCount;
        players = data.game.players;
        takeAction(self.cards, self.cards.concat(board), players);
    });

    rtc.on('__new_round', function (data) {
        writeToCommands('<<< new round: ' + JSON.stringify(data, null, 4));
        playerActions = {};
        gameStatus = 0;
    });

    rtc.on('__show_action', function (data) {
        writeToCommands('<<< show action: ' + JSON.stringify(data, null, 4));
        var playerAction = data.action;


        if (!playerActions[playerAction.playerName]) {
            playerActions[playerAction.playerName] = [];
        }
        var currentPlayer = playerActions[playerAction.playerName];
        currentPlayer.push(playerAction.action);
        if (data.table.roundName === 'Flop' &&
            (playerAction.action === 'raise' || playerAction.action === 'allin') &&
            currentPlayer.toString().indexOf('raise') === -1) {
            gameStatus = risk;
        }
        if (data.table.roundName === 'Turn' &&
            (playerAction.action === 'raise' || playerAction.action === 'allin') &&
            currentPlayer.toString().indexOf('raise') === -1) {
            gameStatus = danger;
        }
    });

    rtc.on('__deal', function (data) {
        writeToCommands('<<< deal: ' + JSON.stringify(data, null, 4));
    });

    rtc.on('__start_reload', function (data) {
        writeToCommands('<<< start reload: ' + JSON.stringify(data, null, 4));
        reload();
    });

    rtc.on('__round_end', function (data) {
        writeToCommands('<<< round end: ' + JSON.stringify(data, null, 4));
    });

    rtc.on('__game_over', function (data) {
        writeToCommands('<<< game over: ' + JSON.stringify(data, null, 4));
    });
}

function takeAction(selfCard, cards, players) {
    if (cards.length === 2) {
        call();
        return;
    }
    var handRanks = [];
    var handSuits = [];
    var isTonghua = false;
    var isShunzi = false;
    var isSitiao = false;
    var isSantiao = false;
    var pairNumber = 0;
    var pairValue = '';
    var maxPairValue = '0';

    var temp = 1;

    var i = 0;
    for (i = 0; i < cards.length; i++) {
        handRanks[i] = cards[i].substr(0, 1);
        handSuits[i] = cards[i].substr(1, 2);
    }
    for (i = 0; i < selfCard.length; i++)
        selfCard[i] = selfCard[i].substr(0, 1);
    handRanks = handRanks.sort().toString().replace(/\W/g, '');
    handSuits = handSuits.sort().toString().replace(/\W/g, '');

    for (i = 1; i < handRanks.length; i++) {
        if (handRanks[i].charCodeAt(0) - handRanks[i - 1].charCodeAt(0) === 1) {
            temp++;
            if (temp === 5)
                isShunzi = true;
        } else {
            temp = 1;
        }
    }

    temp = 1;
    for (i = 1; i < handRanks.length; i++) {
        if (handRanks[i] === handRanks[i - 1]) {
            temp++;
            if (temp === 4)
                isSitiao = true;
            else if (temp === 3)
                isSantiao = true;
            else if (temp === 2) {
                pairNumber++;
                pairValue += handRanks[i];
                if (handRanks[i] === 'A' && maxPairValue === '0')
                    maxPairValue = '1';
                else if (handRanks[i] === 'T' && maxPairValue < 'I')
                    maxPairValue = 'I';
                else if (handRanks[i] > maxPairValue)
                    maxPairValue = handRanks[i];
            }
        } else {
            temp = 1;
        }
    }

    temp = 1;
    for (i = 1; i < handSuits.length; i++) {
        if (handSuits[i] === handSuits[i - 1]) {
            temp++;
            if (temp === 5) {
                isTonghua = true;
            }
        }
        else
            temp = 1;
    }

    if (isTonghua || isShunzi) {
        if (handRanks.indexOf('T') > -1 && handRanks.indexOf('J') > -1 && handRanks.indexOf('Q') > -1 && handRanks.indexOf('K') > -1 && handRanks.indexOf('A') > -1)
            allin();
        else if (isTonghua && isShunzi)
            raise();
        else if (gameStatus !== danger)
            raise();
        else
            call();
        return;
    }

    if (isSitiao) {
        if (gameStatus !== danger)
            raise();
        else
            call();
        return;
    }

    if (isSantiao || pairNumber > 1) {
        if (isSantiao && (pairNumber > 1 || maxPairValue > '9') && gameStatus !== danger)
            raise();
        else if (gameStatus === danger && !isSantiao && !(pairValue.indexOf(selfCard[0]) > -1 && pairValue.indexOf(selfCard[1]) > -1 && selfCard[0] !== selfCard[1]) && maxPairValue < 'I')
            fold();
        else
            call();
        return;
    }

    if (pairNumber > 0 && (pairValue.toString().indexOf(selfCard[0]) > -1 || pairValue.toString().indexOf(selfCard[1]) > -1)) {
        if ((gameStatus === risk && maxPairValue < '6') || (gameStatus === danger && maxPairValue < 'I'))
            fold();
        else
            call();
        return;
    }

    if (cards.length > 5)
        fold();
    else
        call();
}

function reload() {
    writeToCommands('>>> reload');
    rtc.Reload();
}

function bet() {
    writeToCommands('>>> bet: 100');
    rtc.Bet(100);
}

function call() {
    writeToCommands('>>> call');
    rtc.Call();
}

function check() {
    writeToCommands('>>> check');
    rtc.Check();
}

function raise() {
    writeToCommands('>>> raise');
    rtc.Raise();
}

function allin() {
    writeToCommands('>>> allin');
    rtc.AllIn();
}

function fold() {
    writeToCommands('>>> fold');
    rtc.Fold();
}

// utils
function getQueryStringRegExp(name) {
    var reg = new RegExp('(^|\\?|&|)' + name + '=([^&]*)(\\s|&|$|)', 'i');
    if (reg.test(decodeURI(location.href))) return unescape(RegExp.$2.replace(/\+/g, ' '));
    return "";
}

function getParameter(name) {
    var rawParam = getQueryStringRegExp(name);
    var sharpPos = rawParam.indexOf('#');
    var p = rawParam;
    if (sharpPos >= 0) {
        p = p.substring(0, sharpPos);
    }
    return p;
}

function writeToCommands(text) {
    if (commandCount > maxCommands) {
        commandCount = 0;
        clearCommands();
    }
    commandCount++;
    document.getElementById('commands').value += text;
    document.getElementById('commands').value += '\r\n';
    console.log(text);
}

function clearCommands() {
    document.getElementById('commands').value = "";
}
