/**
 * Created by dummy-team
 * 2017-08-21
 */

// data related
var ticket = null;
var port = null;
var phoneNumber = '';
var token = '';
var isHuman = false;
var password = '';
var playerName = '';
var gameBgm = 0;
var soundEffect = 0;
var autoStart = 0;
var commandInterval = 1;
var roundInterval = 15;
var commandTimeout = 2;
var lostTimeout = 10;
var defaultSb = 10;
var defaultChips = 1000;
var reloadChance = 2;
var danmu = 0;
var danmuWidth = 0;

// game board related
var gameBoard;
var winWidth, winHeight;
var gameWidth, gameHeight;
var audio1, audio2;

// game model related
var STATUS_GAME_STANDBY = 0;
var STATUS_GAME_PREPARING = 1;
var STATUS_GAME_RUNNING = 2;
var STATUS_GAME_FINISHED = 3;
var STATUS_GAME_ENDED = 4;

var ACTION_STATUS_NONE = 0;
var ACTION_STATUS_THINKING = 1;
var ACTION_STATUS_DECIDED = 2;

var MODE_LIVE = 0;
var MODE_PLAYER = 1;
var MODE_JUDGE = 2;

var gameStatus = STATUS_GAME_STANDBY;
var gameCountDown = 0;
var liveMode = MODE_JUDGE;
var playMode = MODE_LIVE;

var currentRoundName = '';
var currentRound = 1;
var currentRaiseCount = 0;
var currentBetCount = 0;

var yourTurn = false;
var turnAnimationShowed = false;
var playerMinBet = 0;
var playerMaxBet = 0;
var playerReloadCount = 0;

var reloadTime = false;

var PLAYER_AT_LEFT = 0;
var PLAYER_AT_RIGHT = 1;

var players = [];
var currentPlayers = 0;
var onLinePlayers = 0;
var winners = [];

var publicCards = [];

var currentSmallBlind = 0;
var currentBigBlind = 0;

// communication related
var rtc = SkyRTC();

/*
window.onbeforeunload = function () {
    return 'Are you sure to leave?';
};
*/

$(document).ready(function () {
    // initialize phoneNumber and token
    phoneNumber = getParameter('phoneNumber') || localStorage.getItem('phoneNumber');
    token = getParameter('token') || localStorage.getItem('token');
    ticket = getParameter('ticket');
    port = getParameter('port');
    playerName = getParameter('playerName');
    password = getParameter('password');
    isHuman = (getParameter('isHuman') == 'true') || false;

    autoStart = getParameter('auto') || 0;
    gameBgm = getParameter('bgm') || 0;
    soundEffect = getParameter('sound') || 0;
    commandInterval = getParameter('commandInterval') || 0.5;
    roundInterval = getParameter('roundInterval') || 10;
    defaultSb = getParameter('defaultSb') || 10;
    defaultChips = getParameter('defaultChips') || 1000;
    reloadChance = getParameter('reloadChance') || 2;
    commandTimeout = getParameter('commandTimeout') || 5;
    lostTimeout = getParameter('lostTimeout') || 10;
    danmu = getParameter('danmu') || 0;

    if (!ticket) {
        return;
    }

    if (!port) {
        return;
    }

    $('#copy_me').val(ticket);

    if (true === isHuman && playerName) {
        playMode = MODE_PLAYER;
        document.title = 'The Game';
    } else {
        liveMode = MODE_LIVE;
        document.title = 'THE Live';
    }
    isCreator(ticket);
    initGame();
});

var onSocketClosed = function(data) {
    console.log("socket closed : " + JSON.stringify(data));
    // refresh this page
    if (STATUS_GAME_ENDED !== gameStatus || STATUS_GAME_FINISHED !== gameStatus) {
        location.reload();
    }
};

// game communication with back-end
function initWebsock() {
    // initialize web communication
    var host = window.location.hostname;
    var serverAddress;
    serverAddress = 'ws://' + host + ':' + port;
    console.log('guest connect to server, playerName = ' + playerName + ', server = ' + serverAddress +
        ', ticket = ' + ticket);

    // TODO: to identify human and live role
    if (isHuman) {
        rtc.connect(serverAddress, playerName, password, phoneNumber, token, ticket, port, isHuman, danmu, onSocketClosed);
    } else {
        rtc.connect(serverAddress, playerName, null, null, token, ticket, port, isHuman, danmu, onSocketClosed);
    }

    rtc.on('__message', function (data) {
        console.log('receive danmu message : ' + JSON.stringify(data));
        gameBoard.spawnDanmu(data.content);
    });

    rtc.on('__new_peer', function (data) {
        console.log('legacy join : ' + JSON.stringify(data));
    });

    rtc.on('__new_peer_2', function (data) {
        var inPlayers = data.players;
        var tableStatus = data.tableStatus;

        if (gameStatus === STATUS_GAME_FINISHED || gameStatus === STATUS_GAME_ENDED) {
            return;
        }

        gameStatus = tableStatus;
        if (inPlayers) {
            console.log('player join : ' + JSON.stringify(data));
        } else {
            console.log('guest join');
        }

        if (undefined !== inPlayers && null !== inPlayers) {
            // rebuild player list
            players = [];
            currentPlayers = inPlayers.length;
            onLinePlayers = 0;
            for (var i = 0; i < inPlayers.length; i++) {
                var inPlayerName = inPlayers[i].playerName;
                var isHuman = (inPlayerName === playerName);
                var playerDisplayName = inPlayerName;
                console.log('create player ' + inPlayerName + ', displayName = ' + playerDisplayName);
                players[i] = new Player(inPlayerName, playerDisplayName,
                    defaultChips, true, isHuman, 0, inPlayers[i].isOnline);
                if (undefined !== inPlayers[i].isOnline && null !== inPlayers[i].isOnline && inPlayers[i].isOnline) {
                    onLinePlayers++;
                }

                if (gameBoard) {
                    gameBoard.resetPlayerLayers(players);
                }
            }
        }

        // sync game status here
        console.log('game status = ' + tableStatus);
        console.log('local players = ' + JSON.stringify(players));

        if (gameStatus === STATUS_GAME_RUNNING) {
            updateGame(data.basicData, false, false);
        }
    });

    rtc.on('__left', function (data) {
        console.log('legacy left : ' + JSON.stringify(data));
    });

    rtc.on('__left_2', function (data) {
        var inPlayers = data.players;
        var tableStatus = data.tableStatus;

        if (gameStatus === STATUS_GAME_FINISHED || gameStatus === STATUS_GAME_ENDED) {
            return;
        }

        if (inPlayers) {
            console.log('player left : ' + JSON.stringify(data));
        } else {
            console.log('guest left');
        }
        gameStatus = tableStatus;
        if (inPlayers) {
            var i;
            if (gameStatus === STATUS_GAME_RUNNING) {
                // update player online status while game is running
                currentPlayers = inPlayers.length;
                onLinePlayers = 0;
                for (i = 0; i < currentPlayers; i++) {
                    var targetPlayer = findTargetPlayer(inPlayers[i].playerName);
                    targetPlayer.setOnline(inPlayers[i].isOnline);
                    if (inPlayers[i].isOnline) {
                        onLinePlayers++;
                    }
                }
            } else if (gameStatus === STATUS_GAME_STANDBY) {
                // rebuild player list
                players = [];
                currentPlayers = inPlayers.length;
                onLinePlayers = 0;
                for (i = 0; i < currentPlayers; i++) {
                    console.log(inPlayers[i].playerName + ', online = ' + inPlayers[i].isOnline);
                    if (inPlayers[i].isOnline && true === inPlayers[i].isOnline) {
                        var inPlayerName = inPlayers[i].playerName;
                        var isHuman = (inPlayerName === playerName);
                        var playerDisplayName = inPlayerName;
                        console.log('create player ' + inPlayerName + ', displayName = ' + playerDisplayName);
                        players[i] = new Player(inPlayerName, playerDisplayName,
                            defaultChips, true, isHuman, 0, inPlayers[i].isOnline);
                        onLinePlayers++;
                    }
                }
                if (gameBoard) {
                    gameBoard.resetPlayerLayers(players);
                }
            }
        }
    });

    rtc.on('__game_over', function (data) {
        console.log('game over : ' + JSON.stringify(data));
        if (1 === parseInt(soundEffect)) {
            cc.audioEngine.playEffect(audio_win);
        }
        // set winners
        winners = data.winners;
        if (winners) {
            for (var index = 0; index < winners.length; index++) {
                winners[index].displayName = winners[index].playerName;
            }
            updateGame(data, true);
            gameStatus = STATUS_GAME_FINISHED;
        } else {
            // game ended by judge
            gameStatus = STATUS_GAME_ENDED;
            updateGame(data, true);
        }

        if (autoStart && parseInt(autoStart) === 1) {
            // auto start another game in 3s
            setTimeout(function () {
                startGame();
            }, 20 * 1000);
        }
    });

    rtc.on('__game_prepare', function (data) {
        console.log('game preparing : ' + JSON.stringify(data));
        if (1 === parseInt(soundEffect)) {
            cc.audioEngine.playEffect(audio_tick);
        }

        gameStatus = STATUS_GAME_PREPARING;
        gameCountDown = data.countDown;
    });

    rtc.on('__game_start', function (data) {
        // update in game engine
        console.log('game start : ' + JSON.stringify(data));
        gameStatus = STATUS_GAME_RUNNING;
    });

    rtc.on('__game_stop', function (data) {
        // update in game engine
        console.log('game stop : ' + JSON.stringify(data));
        gameStatus = STATUS_GAME_STANDBY;
    });

    rtc.on('__deal', function (data) {
        console.log('deal : ' + JSON.stringify(data));

        if (1 === parseInt(soundEffect)) {
            cc.audioEngine.playEffect(audio_deal);
        }
        var board_card = data.table.board;
        var board = '';
        for (var index = 0; index < board_card.length; index++) {
            board += board_card[index] + ',';
        }

        // update player actions
        for (var i = 0; i < currentPlayers; i++) {
            if (players[i]) {
                players[i].setTakeAction(ACTION_STATUS_NONE);
            }
        }

        // update in game engine
        gameStatus = STATUS_GAME_RUNNING;
        updateGame(data, false);
    });

    rtc.on('__new_round', function (data) {
        console.log('new round : ' + JSON.stringify(data));
        reloadTime = false;
        gameStatus = STATUS_GAME_RUNNING;
        // update in game engine
        updateGame(data, true);
    });

    rtc.on('__round_end', function (data) {
        console.log('round end : ' + JSON.stringify(data));

        gameStatus = data.table.status;
        reloadTime = true;
        updateGame(data, false, true);
    });

    // this request could be received in player mode only
    rtc.on('__action', function (data) {
        console.log('server request action : ' + JSON.stringify(data));
        gameStatus = STATUS_GAME_RUNNING;
        if (MODE_PLAYER === playMode) {
            console.log('self.name = ' + data.self.playerName + ', player name = ' + playerName);
            if (data.self.playerName.toLowerCase() === playerName.toLowerCase()) {
                turnAnimationShowed = false;
                yourTurn = true;
                playerMinBet = data.self.minBet;
                playerMaxBet = data.self.chips;
                playerReloadCount = data.self.reloadCount;
                console.log('your turn, binBet = ' + playerMinBet + ', maxBet = ' + playerMaxBet);
            } else {
                yourTurn = false;
            }
        }

        for (var i = 0; i < currentPlayers; i++) {
            if (players[i]) {
                if (players[i].playerName === data.self.playerName) {
                    players[i].setInTurn(true);
                    console.log('set player ' + data.self.playerName + ' thinking');
                    players[i].setTakeAction(ACTION_STATUS_THINKING);
                } else {
                    players[i].setInTurn(false);
                }
            }
        }
        updateGame(data);
    });

    rtc.on('__bet', function (data) {
        console.log('server request bet : ' + JSON.stringify(data));
        gameStatus = STATUS_GAME_RUNNING;
        // it's your turn !!
        if (MODE_PLAYER === playMode) {
            if (data.self.playerName.toLowerCase() === playerName.toLowerCase()) {
                turnAnimationShowed = false;
                yourTurn = true;
                playerMinBet = data.self.minBet;
                playerMaxBet = data.self.chips;
                playerReloadCount = data.self.reloadCount;
                console.log('your turn, binBet = ' + playerMinBet + ', maxBet = ' + playerMaxBet);
            } else {
                yourTurn = false;
            }
        }
        for (var i = 0; i < currentPlayers; i++) {
            if (players[i]) {
                if (players[i].playerName === data.self.playerName) {
                    players[i].setInTurn(true);
                    console.log('set player ' + data.self.playerName + ' thinking');
                    players[i].setTakeAction(ACTION_STATUS_THINKING);
                } else {
                    players[i].setInTurn(false);
                }
            }
        }
        updateGame(data);
    });

    rtc.on('__show_action', function (data) {
        console.log('show action : ' + JSON.stringify(data));

        gameStatus = STATUS_GAME_RUNNING;
        var roundAction = data.action;

        console.log('find targetPlayer by name ' + data.action.playerName);
        var targetPlayer = findTargetPlayer(data.action.playerName);
        console.log('players : ' + JSON.stringify(players));

        // play audio effect
        if (1 === parseInt(soundEffect)) {
            var audioIndex;
            if (ver === VER_ENGLISH) {
                audioIndex = roundAction.action;
            } else {
                if (roundAction.action === 'check') {
                    if (targetPlayer.gender === 0) {
                        audioIndex = 'audio_check_boy';
                    } else {
                        audioIndex = 'audio_check_girl';
                    }
                } else if (roundAction.action === 'bet') {
                    audioIndex = 'audio_bet';
                } else {
                    audioIndex = 'audio_' + roundAction.action + '_' + targetPlayer.avatarId;
                }
            }
            var audioEffect = audioMap.get(audioIndex);
            cc.audioEngine.playEffect(audioEffect);
        }

        if (roundAction.action === 'check' ||
            roundAction.action === 'fold' ||
            roundAction.action === 'raise' ||
            roundAction.action === 'call') {

            // update in game engine
            if (targetPlayer) {
                targetPlayer.setTakeAction(ACTION_STATUS_DECIDED);
                targetPlayer.setAction(roundAction.action);
                console.log('set targetPlayer ' + targetPlayer.playerName + ' decided : ' +
                    targetPlayer.action);
                if (roundAction.action === 'fold') {
                    targetPlayer.setBet(0);
                }
            }
        } else {
            // update in game engine
            if (targetPlayer) {
                targetPlayer.setTakeAction(ACTION_STATUS_DECIDED);
                targetPlayer.setAction(roundAction.action);
                console.log('set targetPlayer ' + targetPlayer.playerName + ' decided : ' +
                    targetPlayer.action);
            }
        }
        // remove your turn
        if (yourTurn) {
            yourTurn = false;
        }
        // set in turn
        for (var i = 0; i < currentPlayers; i++) {
            if (players[i]) {
                if (targetPlayer.playerName === players[i].playerName) {
                    targetPlayer.setInTurn(true);
                } else {
                    // targetPlayer.setInTurn(false);
                }
            }
        }
        updateGame(data, false);
    });
}

function initGame() {
    var d = document;
    var container = document.getElementById('gameContainer');

    // the reference proportion HEIGHT / WIDTH = 3 / 4 = 0.75;
    var refProportion = 0.75;

    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;

    var realProportion = winHeight / winWidth;

    if (realProportion > refProportion) {
        // not likely
        gameWidth = winWidth;
        gameHeight = winWidth * refProportion;
    } else {
        // probably always
        gameHeight = winHeight;
        gameWidth = winHeight / refProportion;
    }

    container.innerHTML = '<canvas id="gameCanvas" width="' + gameWidth + '" height="' + gameHeight + '"></canvas>';
    if (!d.createElement('canvas').getContext) {
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 !</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology ' +
            'to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank">' +
            '<img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s, null);

        d.body.style.background = '#000000';
        return;
    }
    window.addEventListener('DOMContentLoaded', function () {
        ccLoad();
    });
}

function ccLoad() {
    cc.game.onStart = function () {
        //load resources
        cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);
        cc.LoaderScene.preload(resources, function () {
            var theScene = cc.Scene.extend({
                onEnter: function () {
                    this._super();
                    gameBoard = new BoardLayer();
                    gameBoard.init();
                    this.addChild(gameBoard);
                    initWebsock();
                    if (1 === parseInt(gameBgm)) {
                        playBgm();
                    }
                }
            });
            cc.director.runScene(new theScene());
        }, this);
    };
    cc.game.run('gameCanvas');
}

// game helper
function isCreator(ticket) {
    $.ajax({
        url: '/api/board/is_creator_board',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            ticket: ticket,
            token: token
        },
        timeout: 20000,
        success: function (response) {
            console.log("isCreatorBoard response = " + JSON.stringify(response));
            if (response.status.code === 0) {
                var isCreatorBoard = response.entity;
                if (isCreatorBoard === true) {
                    liveMode = MODE_JUDGE;
                } else {
                    liveMode = MODE_LIVE;
                }
            } else {
                liveMode = MODE_LIVE;
            }
        },
        error: function () {
            liveMode = MODE_LIVE;
        }
    });
}

function playBgm() {
    audio1 = new Audio('./res/audio/bgm.mp3');
    audio1.addEventListener('ended', function() {
        this.currentTime = 0;
        this.pause();
        audio2.play();
    }, false);
    audio2 = new Audio('./res/audio/bgm.mp3');
    audio2.addEventListener('ended', function() {
        this.currentTime = 0;
        this.pause();
        audio1.play();
    }, false);

    audio1.play();
}

function startGame() {
    rtc.startGame(ticket, phoneNumber, token, commandInterval, roundInterval,
        defaultSb, defaultChips, reloadChance, commandTimeout, lostTimeout);
    gameStatus = STATUS_GAME_PREPARING;
}

function stopGame() {
    rtc.stopGame(ticket, phoneNumber, token);
}

function endGame() {
    rtc.endGame(ticket, phoneNumber, token);
}

function updateGame(data, isNewRound, roundClear) {
    var i;

    // update round
    if (data.table) {
        if (undefined !== data.table.status && null !== data.table.status) {
            gameStatus = data.table.status;
        }
        if (undefined !== data.table.roundCount && null !== data.table.roundCount) {
            currentRound = data.table.roundCount;
        }
        if (undefined !== data.table.raiseCount && null !== data.table.raiseCount) {
            currentRaiseCount = data.table.raiseCount;
        }
        if (undefined !== data.table.betCount && null !== data.table.betCount) {
            currentBetCount = data.table.betCount;
        }
        if (undefined !== data.table.roundName && null !== data.table.roundName) {
            currentRoundName = data.table.roundName;
        }
        if (undefined !== data.table.initChips && null !== data.table.initChips) {
            defaultChips = data.table.initChips;
        }
        if (undefined !== data.table.maxReloadCount && null !== data.table.maxReloadCount) {
            reloadChance = data.table.maxReloadCount;
        }
        if (data.table.currentPlayer) {
            if (data.table.currentPlayer === playerName) {
                // show thinking
                var targetPlayer = findTargetPlayer(playerName);
                if (targetPlayer) {
                    targetPlayer.setInTurn(true);
                    console.log('set player ' + targetPlayer.playerName + ' thinking after reloaded');
                    turnAnimationShowed = false;
                    yourTurn = true;
                    playerMinBet = data.table.bigBlind.amount;
                    playerMaxBet = targetPlayer.chips;
                    targetPlayer.setTakeAction(ACTION_STATUS_THINKING);
                }
            }
        }
        publicCards = [null, null, null, null, null];
        for (i = 0; i < data.table.board.length; i++) {
            publicCards[i] = data.table.board[i];
        }
        currentSmallBlind = data.table.smallBlind.amount;
        currentBigBlind = data.table.bigBlind.amount;
        // update players
        if (data.players) {
            updateBoardPlayers(data, isNewRound, roundClear);
        }
    } else if (data.game) {
        if (undefined !== data.game.status && null !== data.game.status) {
            gameStatus = data.game.status;
        }
        if (undefined !== data.game.roundCount && null !== data.game.roundCount) {
            currentRound = data.game.roundCount;
        }
        if (undefined !== data.game.raiseCount && null !== data.game.raiseCount) {
            currentRaiseCount = data.game.raiseCount;
        }
        if (undefined !== data.game.betCount && null !== data.game.betCount) {
            currentBetCount = data.game.betCount;
        }
        if (undefined !== data.game.roundName && null !== data.game.roundName) {
            currentRoundName = data.game.roundName;
        }
        publicCards = [null, null, null, null, null];
        for (i = 0; i < data.game.board.length; i++) {
            publicCards[i] = data.game.board[i];
        }
        currentSmallBlind = data.game.smallBlind.amount;
        currentBigBlind = data.game.bigBlind.amount;
        if (data.game.players) {
            updateBoardPlayers(data.game, isNewRound, roundClear);
        }
    }
}

function updateBoardPlayers(data, isNewRound, roundClear) {
    currentPlayers = data.players.length;
    for (var i = 0; i < data.players.length; i++) {
        var targetPlayer = findTargetPlayer(data.players[i].playerName);
        if (null === targetPlayer) {
            continue;
        }
        targetPlayer.setDisplayName(data.players[i].playerName);
        targetPlayer.setOnline(data.players[i].isOnline);
        targetPlayer.setIsHuman(data.players[i].isHuman);
        if (undefined !== data.players[i].reloadCount && null !== data.players[i].reloadCount) {
            targetPlayer.setReloadCount(data.players[i].reloadCount);
        }

        if (isNewRound) {
            targetPlayer.setAction('');
            targetPlayer.setPrivateCards(null, null);
            targetPlayer.setAccumulate(0);
            targetPlayer.setBet(0);
            targetPlayer.setRoundBet(0);
            targetPlayer.setTakeAction(ACTION_STATUS_NONE);
            targetPlayer.setFolded(false);
            targetPlayer.setAllin(false);
        } else {
            if (data.players[i].cards && data.players[i].cards.length === 2) {
                targetPlayer.setPrivateCards(data.players[i].cards[0], data.players[i].cards[1]);
            }
            targetPlayer.setBet(data.players[i].bet);
            targetPlayer.setRoundBet(data.players[i].roundBet);
            targetPlayer.setChips(data.players[i].chips);
            targetPlayer.setTotalChips(defaultChips, reloadChance);
            targetPlayer.setSurvive(data.players[i].isSurvive);
            targetPlayer.setFolded(data.players[i].folded);
            targetPlayer.setAllin(data.players[i].allIn);
            targetPlayer.setReloadCount(data.players[i].reloadCount);
        }

        if (roundClear) {
            if (undefined !== data.players[i].hand && null !== data.players[i].hand) {
                targetPlayer.setHand(data.players[i].hand);
            }
            if (undefined !== data.players[i].winMoney && null !== data.players[i].winMoney) {
                targetPlayer.setPrize(data.players[i].winMoney);
            }
        } else {
            targetPlayer.setHand(null);
            targetPlayer.setPrize(null);
        }

        if (data.table) {
            targetPlayer.setSmallBlind(targetPlayer.playerName === data.table.smallBlind.playerName);
            targetPlayer.setBigBlind(targetPlayer.playerName === data.table.bigBlind.playerName);
        } else if (data.game) {
            targetPlayer.setSmallBlind(targetPlayer.playerName === data.game.smallBlind.playerName);
            targetPlayer.setBigBlind(targetPlayer.playerName === data.game.bigBlind.playerName);
        }
    }

    // play round clear sound
    if (1 === parseInt(soundEffect)) {
        if (roundClear) {
            for (var i = 0; i < data.players.length; i++) {
                var targetPlayer = findTargetPlayer(data.players[i].playerName);
                if (targetPlayer.prize > 0) {
                    var audioIndex;
                    if (ver === VER_ENGLISH) {
                    } else {
                        audioIndex = 'audio_round_clear_' + targetPlayer.avatarId;
                    }
                    var audioEffect = audioMap.get(audioIndex);
                    cc.audioEngine.playEffect(audioEffect);
                    break;
                }
            }
        }
    }
}

function findTargetPlayer(playerName) {
    for (var i = 0; i < players.length; i++) {
        if (players[i] && players[i].playerName === playerName) {
            return players[i];
        }
    }
    return null;
}

function playerOnline(playerName, playerList) {
    if (playerList) {
        for (var i = 0; i < playerList.length; i++) {
            if (playerList[i] === playerName) {
                return true;
            }
        }
        return false;
    }
    return true;
}

// UI helper
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

function copyToClipboardFF() {
}

function copyToClipboard() {
    var success   = true,
        range     = document.createRange(),
        selection;

    var input = $("#copy_me");

    if (window.clipboardData) {
        window.clipboardData.setData("Text", input.val());
    } else {
        // Create a temporary element off screen.
        var tmpElem = $('<div>');
        tmpElem.css({
            position: "absolute",
            left:     "-1000px",
            top:      "-1000px"
        });
        // Add the input value to the temp element.
        tmpElem.text(input.val());
        $("body").append(tmpElem);
        // Select temp element.
        range.selectNodeContents(tmpElem.get(0));
        selection = window.getSelection ();
        selection.removeAllRanges ();
        selection.addRange (range);
        // Lets copy.
        try {
            success = document.execCommand("copy", false, null);
        }
        catch (e) {
            copyToClipboardFF(input.val());
        }
        if (success) {
            // remove temp element.
            tmpElem.remove();
        }
    }
}

// Action helper
function reload() {
    console.log('>>> reload');
    rtc.Reload();
}

function bet(amount) {
    console.log('>>> bet: ' + amount);
    rtc.Bet(amount);
}

function call() {
    console.log('>>> call');
    rtc.Call();
}

function check() {
    console.log('>>> check');
    rtc.Check();
}

function raise() {
    console.log('>>> raise');
    rtc.Raise();
}

function allin() {
    console.log('>>> allin');
    rtc.AllIn();
}

function fold() {
    console.log('>>> fold');
    rtc.Fold();
}
