/**
 * Created by dummy-team
 * 2017-10-04
 */

var DealerLayer = cc.LayerColor.extend({

    // constants
    defaultFont: 'Tw Cen MT',
    titleFont: 'IMPACT',
    titleTextSize: 64,
    boardFont: 'IMPACT',
    boardTextSize: 36,
    ticketFont: 'Tw Cen MT',
    ticketTextSize: 14,
    nameFont: 'IMPACT',
    nameTextSize: 28,
    debug: true,
    maxPlayerCount: 10,
    minPlayerCount: 3,
    countDownSec: 3,

    // toggle color of ticket copying hint label time interval
    toggleInterval: 10,
    hintLabelWhite: true,

    // visualization variables
    size: null,
    validWidth: 0,
    validHeight: 0,

    // scales
    gameScale: 1.0,
    buttonScale: 1.0,

    // sprites
    clickSprite: null,

    // labels
    titleLabel: null,
    boardLabel: null,
    ticketLabel: null,
    playerLabels: [],

    // buttons
    startButton: null,
    stopButton: null,
    copyButton: null,

    // menus
    controlMenu: null,

    // layers

    // design specs
    titleTextWidth: 800,
    titleTextHeight: 144,
    boardTextWidth: 640,
    boardTextHeight: 40,
    nameTextHeight: 32,
    roundTextMarginBottom: 480,
    copyButtonMarginBottom: 560,
    ticketMarginBottom: 530,
    clickHintMarginBottom: 560,

    // event managers
    eventListener: null,

    // constructor
    ctor: function (gameScale) {
        this._super();
        this.gameScale = gameScale;
    },

    // game initializer
    init: function () {
        this._super(cc.color(0, 0, 0, 239));

        // initialize layout on DealerLayer
        this.validWidth = gameWidth;
        this.validHeight = gameHeight;
        this.size = cc.size(this.validWidth, this.validHeight);

        // initialize start and stop button
        if (MODE_JUDGE === liveMode) {
            this.buttonScale = this.gameScale * 0.7;
            this.startButton = new ccui.Button(s_start_button, s_start_button_pressed, s_start_button_disabled);
            this.startButton.setAnchorPoint(0, 0);
            this.startButton.setScale(this.buttonScale);
            this.startButton.setPosition((this.validWidth -
                this.startButton.getContentSize().width * this.buttonScale) / 2,
                this.validHeight / 12);
            this.addChild(this.startButton, 2);
            this.enableButton(this.startButton, false);
            this.startButton.addTouchEventListener(function (sender, type) {
                if (ccui.Widget.TOUCH_ENDED === type) {
                    if (STATUS_GAME_RUNNING !== gameStatus) {
                        console.log('prepare start game');
                        this.resetCountDown();
                        startGame();
                    }
                }
            }, this);

            this.stopButton = new ccui.Button(s_stop_button, s_stop_button_pressed, s_stop_button_disabled);
            this.stopButton.setAnchorPoint(0, 0);
            this.stopButton.setScale(this.buttonScale);
            this.stopButton.setPosition((this.validWidth -
                this.stopButton.getContentSize().width * this.buttonScale) / 2,
                this.validHeight / 12);
            this.addChild(this.stopButton, 2);
            this.enableButton(this.stopButton, false);
            this.stopButton.addTouchEventListener(function (sender, type) {
                if (ccui.Widget.TOUCH_ENDED === type) {
                    if (STATUS_GAME_RUNNING === gameStatus) {
                        console.log('stop game');
                        stopGame();
                    }
                }
            }, this);
        }

        this.copyButton = new ccui.Button(s_copy_button, s_copy_button_pressed, s_copy_button_disabled);
        this.copyButton.setAnchorPoint(0.5, 0);
        this.copyButton.setScale(this.buttonScale * 0.5);
        this.copyButton.setPosition((this.validWidth -
            this.copyButton.getContentSize().width * this.buttonScale * 0.5) / 2,
            this.copyButtonMarginBottom * this.gameScale);
        this.addChild(this.copyButton, 2);
        this.enableButton(this.copyButton, true);
        this.copyButton.addTouchEventListener(function (sender, type) {
            if (ccui.Widget.TOUCH_ENDED === type) {
                if (STATUS_GAME_RUNNING !== gameStatus) {
                    copyToClipboard();
                    /*
                    $('#board_ticket').select();
                    document.execCommand("copy");
                    */
                    this.clickSprite.setVisible(false);
                }
            }
        }, this);

        // initialize title
        this.titleLabel = new cc.LabelTTF('Texas Hold\'em AI Game',
            this.titleFont, this.titleTextSize);
        this.titleLabel.setColor(cc.color(255, 128, 0, 255));
        this.titleLabel.setAnchorPoint(0, 0);
        this.titleLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.titleLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.titleLabel.boundingWidth = this.validWidth;
        this.titleLabel.boundingHeight = this.titleTextHeight;
        var shadowColor = cc.color(128, 128, 0);
        this.titleLabel.enableShadow(shadowColor, cc.size(0, -4), 0);
        this.titleLabel.setScale(this.gameScale);
        this.titleLabel.setPosition((this.validWidth - this.titleLabel.getContentSize().width * this.gameScale) / 2,
            this.validHeight / 12 * 9);
        this.addChild(this.titleLabel, 2);

        // initialize board number
        this.boardLabel = new cc.LabelTTF('GET READY',
            this.boardFont, this.boardTextSize);
        this.boardLabel.setColor(cc.color(255, 255, 255, 255));
        this.boardLabel.setAnchorPoint(0, 0);
        this.boardLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.boardLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.boardLabel.boundingWidth = this.boardTextWidth;
        this.boardLabel.boundingHeight = this.boardTextHeight;
        this.boardLabel.setScale(this.gameScale);
        this.boardLabel.setPosition((this.validWidth - this.boardLabel.getContentSize().width * this.gameScale) / 2,
            this.roundTextMarginBottom * this.gameScale);
        this.addChild(this.boardLabel, 2);

        // ticket label and copy button
        this.ticketLabel = new cc.LabelTTF('Click to Copy Board Ticket (Port : ' + port + ')',
            this.ticketFont, this.ticketTextSize);
        this.ticketLabel.setColor(cc.color(255, 255, 255, 255));
        this.ticketLabel.setAnchorPoint(0, 0);
        this.ticketLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.ticketLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.ticketLabel.boundingWidth = this.boardTextWidth;
        this.ticketLabel.boundingHeight = this.boardTextHeight;
        this.ticketLabel.setScale(this.gameScale);
        this.ticketLabel.setPosition((this.validWidth - this.ticketLabel.getContentSize().width * this.gameScale) / 2,
            this.ticketMarginBottom * this.gameScale);
        this.addChild(this.ticketLabel, 2);

        // click on ticket
        this.clickSprite = new cc.Sprite(s_click_icon);
        this.clickSprite.setAnchorPoint(0, 0);
        this.clickSprite.setScale(this.gameScale);
        this.clickSprite.setPosition((this.validWidth - this.clickSprite.getContentSize().width * this.gameScale) / 2,
            this.clickHintMarginBottom * this.gameScale);
        this.addChild(this.clickSprite, 3);

        // add start and stop button
        this.controlMenuScale = this.gameScale * 0.6;

        // initialize name labels
        var playerIndex;
        this.playerLabels = [];
        for (playerIndex = 0; playerIndex < this.maxPlayerCount; playerIndex++) {
            this.playerLabels[playerIndex] = new cc.LabelTTF('',
                this.nameFont, this.nameTextSize);
            this.playerLabels[playerIndex].setColor(cc.color(255, 255, 255, 255));
            this.playerLabels[playerIndex].setAnchorPoint(0, 0);
            this.playerLabels[playerIndex].setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.playerLabels[playerIndex].setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.playerLabels[playerIndex].boundingWidth = this.validWidth / 4 / this.gameScale;
            this.playerLabels[playerIndex].boundingHeight = this.nameTextHeight;
            this.playerLabels[playerIndex].setScale(this.gameScale);
            if (playerIndex < 4) {
                this.playerLabels[playerIndex].setPosition(this.validWidth / 4 * (playerIndex),
                    this.validHeight / 12 * 6);
            } else if (playerIndex < 8) {
                this.playerLabels[playerIndex].setPosition(this.validWidth / 4 * (playerIndex - 4),
                    this.validHeight / 12 * 5);
            } else {
                this.playerLabels[playerIndex].setPosition(this.validWidth / 4 * (playerIndex - 8),
                    this.validHeight / 12 * 4);
            }
            this.addChild(this.playerLabels[playerIndex], 2);
        }

        // event management
        this.eventListener = new cc.EventListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (/*touch, event*/) {
                return true;
            },

            onTouchMoved: function (/*touch, event*/) {
                return true;
            },

            onTouchEnded: function (/*touch, event*/) {
                return true;
            }
        });
        cc.eventManager.addListener(this.eventListener, this);
    },

    // game operations
    update: function () {
        this.doUpdate();
    },

    reset: function () {
    },

    removeAll: function () {
        this.reset();
    },

    doUpdate: function () {
        if (MODE_JUDGE === liveMode) {
            this.updateControl();
        }
        this.updateCountDown();
        this.updatePlayers();
    },

    updatePlayers: function () {
        var playerIndex;
        if (players && this.playerLabels) {
            for (playerIndex = 0; playerIndex < this.maxPlayerCount; playerIndex++) {
                // clear player slot
                this.playerLabels[playerIndex].setVisible(false);
                if (this.playerLabels[playerIndex] && players[playerIndex]) {
                    var playerName = players[playerIndex].playerName;
                    var displayName = players[playerIndex].displayName;
                    this.playerLabels[playerIndex].setString(displayName);
                    var targetPlayer = findTargetPlayer(playerName);
                    // console.log(' === ' + JSON.stringify(targetPlayer));
                    if (targetPlayer && true === targetPlayer.online) {
                        this.playerLabels[playerIndex].setVisible(true);
                        this.playerLabels[playerIndex].setColor(cc.color(255, 255, 0, 255));
                    }
                }
                if (playerIndex >= this.maxPlayerCount) {
                    return;
                }
            }
        }
    },

    updateControl: function () {
        // update click label
        if (this.toggleInterval > 0) {
            this.toggleInterval--;
        } else {
            if (this.hintLabelWhite) {
                // toggle to green
                this.ticketLabel.setColor(cc.color(0, 255, 0, 255));
                this.hintLabelWhite = false;
            } else {
                // toggle to white
                this.ticketLabel.setColor(cc.color(255, 255, 255, 255));
                this.hintLabelWhite = true;
            }
            this.toggleInterval = 10;
        }
        if (gameStatus === STATUS_GAME_STANDBY || gameStatus === STATUS_GAME_FINISHED) {
            this.stopButton.setVisible(false);
            this.startButton.setVisible(true);
            if (players && onLinePlayers >= this.minPlayerCount) {
                this.enableButton(this.startButton, true);
            } else {
                this.enableButton(this.startButton, false);
            }
            this.enableButton(this.stopButton, false);
        } else if (gameStatus === STATUS_GAME_PREPARING) {
            this.stopButton.setVisible(false);
            this.startButton.setVisible(true);
            this.enableButton(this.startButton, false);
        } else if (gameStatus === STATUS_GAME_RUNNING) {
            this.stopButton.setVisible(true);
            this.startButton.setVisible(false);
            if (players && onLinePlayers >= this.minPlayerCount) {
                this.enableButton(this.stopButton, true);
            } else {
                this.enableButton(this.stopButton, false);
            }
            this.enableButton(this.startButton, false);
        }
    },

    updateCountDown: function () {
        if (gameStatus === STATUS_GAME_PREPARING) {
            if (gameCountDown > 1) {
                this.boardLabel.setString('Game will start in ' + gameCountDown + ' seconds');
            } else {
                this.boardLabel.setString('Game will start in ' + gameCountDown + ' second');
            }

        } else {
            this.boardLabel.setString('GET READY');
        }
    },

    resetCountDown: function () {
        gameCountDown = 5;
    },

    isPlayerIn: function (playerName) {
        if (!players) {
            return false;
        }
        var playerIndex;
        for (playerIndex = 0; playerIndex < players.length; playerIndex++) {
            if (players[playerIndex] &&
                players[playerIndex].playerName === playerName) {
                return true;
            }
        }
        return false;
    },

    // UI helpers
    enableButton: function (button, enable) {
        if (button && button.isEnabled() !== enable) {
            button.setEnabled(enable);
            button.setBright(enable);
        }
    }
});
