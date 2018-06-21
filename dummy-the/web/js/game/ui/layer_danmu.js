/**
 * Created by dummy-team
 * 2017-10-28
 */

var DanmuLayer = cc.LayerColor.extend({

    // constants
    danmuFont: '微软雅黑',
    danmuTextSize: 24,

    // game model variables
    size: null,
    validWidth: 0,
    validHeight: 0,
    maxDanmu: 15,
    danmuLines: 5,
    danmuPerLine: 5,
    danmus: [],
    danmuSpeed: 4,

    // scales
    gameScale: 1.0,

    // sprites

    // labels
    danmuLabels: [],

    // buttons

    // menus

    // layers

    // design specs

    // event managers
    eventListener: null,

    // constructor
    ctor: function (gameScale) {
        this._super();
        this.gameScale = gameScale;
    },

    // game initializer
    init: function () {
        this._super(cc.color(0, 0, 0, 0));

        // initiate layout on DealerLayer
        this.validWidth = gameWidth;
        this.validHeight = gameHeight;
        this.size = cc.size(this.validWidth, this.validHeight);

        // initialize danmu labels
        this.danmuLabels = [];
        this.danmus = [];
        var danmuLine;
        for (danmuLine = 0; danmuLine < this.danmuLines; danmuLine++) {
            this.danmuLabels[danmuLine] = [];
            this.danmus[danmuLine] = [];
            for (var danmuIndex = 0; danmuIndex < this.danmuPerLine; danmuIndex++) {
                this.danmuLabels[danmuLine][danmuIndex] = new cc.LabelTTF('我是弹幕',
                    this.danmuFont, this.danmuTextSize);
                this.danmuLabels[danmuLine][danmuIndex].setColor(cc.color(255, 255, 255, 255));
                this.danmuLabels[danmuLine][danmuIndex].setAnchorPoint(0, 0);
                this.danmuLabels[danmuLine][danmuIndex].setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.danmuLabels[danmuLine][danmuIndex].setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.danmuLabels[danmuLine][danmuIndex].setScale(this.gameScale);
                this.danmuLabels[danmuLine][danmuIndex]
                    .setPosition(this.validWidth,
                        this.validHeight / 20 * (19 - danmuLine));
                this.addChild(this.danmuLabels[danmuLine][danmuIndex], 3);
                this.danmus[danmuLine][danmuIndex] = 0;
            }
        }
    },

    // game operations
    update: function (delta) {
        this.doUpdate(delta);
    },

    reset: function () {
    },

    removeAll: function () {
        this.reset();
    },

    doUpdate: function (delta) {
        var row, col;
        for (row = 0; row < this.danmuLines; row++) {
            for (col = 0; col < this.danmuPerLine; col++) {
                if (this.danmus[row][col] !== 0) {
                    // danmu slot in use, update its position X
                    var lastPositionX = this.danmuLabels[row][col].getPositionX();
                    this.danmuLabels[row][col].setPositionX(lastPositionX - this.danmus[row][col] * delta);
                    var currentPositionX = this.danmuLabels[row][col].getPositionX();
                    var danmuWidth = this.danmuLabels[row][col].getContentSize().width * this.gameScale;
                    if (currentPositionX + danmuWidth < 0) {
                        // this danmu is scrolled over, reset it
                        // reset the slot
                        this.danmus[row][col] = 0;
                        // reset the position
                        this.danmuLabels[row][col].setPositionX(this.validWidth);
                    }
                }
            }
        }
    },

    spawnDanmu: function(text) {
        for (var row = 0; row < this.danmuLines; row++) {
            for (var col = 0; col < this.danmuPerLine; col++) {
                if (0 === this.danmus[row][col]) {
                    // spawn next danmu slot
                    this.danmus[row][col] = this.getRandomDanmuSpeed();;
                    this.danmuLabels[row][col].setString(text);
                    return;
                }
            }
        }
    },

    getRandomDanmuSpeed: function() {
        return parseInt(Math.random() * (140 - 120 + 1) + 120, 10);
    }
});
