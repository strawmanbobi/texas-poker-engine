/**
 * Created by dummy-team
 * 2017-10-05
 */

var WinnerLayer = cc.LayerColor.extend({

    // constants
    titleFont: 'IMPACT',
    titleTextSize: 64,
    winnerFont: 'IMPACT',
    winnerTextSize: 28,
    debug: true,
    maxWinners: 5,

    // game model variables
    size: null,
    validWidth: 0,
    validHeight: 0,
    winners: [],

    // scales
    gameScale: 1.0,
    bgScaleX: 1.0,
    bgScaleY: 1.0,

    // sprites
    bgSprite: null,

    // labels
    congratulationLabel: null,
    winnerLabels: [],

    // buttons

    // menus

    // layers

    // design specs
    titleTextWidth: 640,
    titleTextHeight: 64,
    titleTextMarginBottom: 500,
    winnerTextWidth: 320,
    winnerTextHeight: 40,
    winnerTextMarginBottom: 440,

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

        // initiate layout on DealerLayer
        this.validWidth = gameWidth;
        this.validHeight = gameHeight;
        this.size = cc.size(this.validWidth, this.validHeight);

        // initialize background
        this.bgSprite = new cc.Sprite(s_winner_bg);
        this.bgSprite.setAnchorPoint(0, 0);
        this.bgScaleY = this.validHeight / this.bgSprite.getContentSize().height;
        this.bgScaleX = this.validWidth / this.bgSprite.getContentSize().width;
        this.bgSprite.setScaleX(this.bgScaleX);
        this.bgSprite.setScaleY(this.bgScaleY);
        this.bgSprite.setPosition(0, 0);
        this.addChild(this.bgSprite, 0);

        // initialize title
        this.congratulationLabel = new cc.LabelTTF('CONGRATULATIONS', this.titleFont, this.titleTextSize);
        this.congratulationLabel.setColor(cc.color(255, 255, 0, 255));
        this.congratulationLabel.setAnchorPoint(0, 0);
        this.congratulationLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.congratulationLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.congratulationLabel.boundingWidth = this.titleTextWidth;
        this.congratulationLabel.boundingHeight = this.titleTextHeight;
        var shadowColor = cc.color(255, 0, 255);
        this.congratulationLabel.enableShadow(shadowColor, cc.size(0, -5), 0);
        this.congratulationLabel.setScale(this.gameScale);
        this.congratulationLabel
            .setPosition((this.bgSprite.getContentSize().width * this.bgScaleX -
                this.congratulationLabel.getContentSize().width * this.gameScale) / 2,
                this.titleTextMarginBottom * this.gameScale);
        this.addChild(this.congratulationLabel, 2);

        var winnerIndex;
        this.winnerLabels = [];
        for (winnerIndex = 0; winnerIndex < this.maxWinners; winnerIndex++) {
            this.winnerLabels[winnerIndex] = new cc.LabelTTF('',
                this.winnerFont, this.winnerTextSize);
            this.winnerLabels[winnerIndex].setColor(cc.color(255, 255, 255, 255));
            this.winnerLabels[winnerIndex].setAnchorPoint(0, 0);
            this.winnerLabels[winnerIndex].setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.winnerLabels[winnerIndex].setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.winnerLabels[winnerIndex].boundingWidth = this.winnerTextWidth;
            this.winnerLabels[winnerIndex].boundingHeight = this.winnerTextHeight;
            this.winnerLabels[winnerIndex].setScale(this.gameScale);
            this.winnerLabels[winnerIndex]
                .setPosition((this.bgSprite.getContentSize().width * this.bgScaleX -
                    this.winnerLabels[winnerIndex].getContentSize().width * this.gameScale) / 2,
                    (this.winnerTextMarginBottom -
                        this.winnerLabels[winnerIndex].getContentSize().height * winnerIndex) * this.gameScale);
            this.addChild(this.winnerLabels[winnerIndex], 2);
        }

        // event management
        this.eventListener = new cc.EventListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (/*touch, event*/) {
                return true;
            },
            // trigger when moving touch
            onTouchMoved: function (/*touch, event*/) {
                return true;
            },
            // process the touch end event
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
        var winnerIndex;
        if (this.winners) {
            var winnersCount = Math.min(this.maxWinners, this.winners.length);
            for (winnerIndex = 0; winnerIndex < this.maxWinners; winnerIndex++) {
                if (winnerIndex < winnersCount) {
                    this.winnerLabels[winnerIndex].setString(this.winners[winnerIndex].displayName + ' : ' +
                        this.winners[winnerIndex].chips);
                    this.winnerLabels[winnerIndex].setVisible(true);
                } else {
                    this.winnerLabels[winnerIndex].setString('');
                    this.winnerLabels[winnerIndex].setVisible(false);
                }
            }
        }
    },

    setWinners: function (_winners) {
        this.winners = _winners;
    }
});
