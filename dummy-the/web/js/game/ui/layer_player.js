/**
 * Created by dummy-team
 * 2017-10-03
 */

var PlayerLayer = cc.Layer.extend({

    // constants
    nameFont: '微软雅黑',
    nameTextSize: 14,
    chipsFont: 'Tw Cen MT',
    chipsTextSize: 20,
    blindFont: 'IMPACT',
    blindTextSize: 18,
    reloadFont: 'Arial',
    reloadTextSize: '24',
    debug: true,
    maxChipLevel: 10,

    // game model variables
    size: null,
    validWidth: 0,
    validHeight: 0,
    playerType: PLAYER_AT_LEFT,
    player: null,
    actionMap: null,
    actionSB: null,
    actionBB: null,
    actionWait: null,
    nameNormal: null,
    avatarNormal: null,
    nameHighLight: null,
    avatarHighLight: null,

    currentChipLevel: 0,

    // scales
    avatarScale: 1.0,
    nameScale: 1.0,
    cardsScale: 1.0,

    // sprites
    avatarPanel: null,
    namePanel: null,
    avatarMask: null,
    nameMask: null,
    avatar: null,
    betChips0: null,
    betChips1: null,
    betChips2: null,
    betChips3: null,
    actionPanel: null,
    privateCard0: null,
    privateCard1: null,
    privateCardMask0: null,
    privateCardMask1: null,

    // labels
    nameLabel: null,
    chipsLabel: null,
    betChipsLabel: null,
    accChipsLabel: null,
    blindLabel: null,
    reloadLabel: null,

    // menus

    // layers

    // design specs
    avatarNameGap: -1,
    avatarMarginLeft: 6,
    avatarWidth: 48,
    avatarPanelLeftPadding: 16,
    avatarPanelBottomPadding: 16,
    avatarPanelWidth: 58,
    chipsHorizontalGap: 0,
    chipsVerticalGap: 20,
    actionPanelGap: 10,
    accMargin: 18,
    betChipsLabelMarginLeft: 5,
    privateCardsMarginBottom: 46,
    cardVisualHeight: 100,
    cardVisualWidth: 72,
    cardMargin: 48,
    accLabelMarginTop: 8,
    betLabelMoveDistance: 10,
    accWidth: 128,
    accHeight: 32,
    chipsYFix: 0,
    chipsXFix: 0,

    // pre-loaded frames
    nameHighLightFrame: null,
    avatarHighLightFrame: null,
    nameNormalFrame: null,
    avatarNormalFrame: null,
    avatarFrames: [],
    pokerFrames: null,
    pokerBackFrame: null,
    pokerEmptyFrame: null,
    actionFrames: null,
    actionEmptyFrame: null,
    actionSBFrame: null,
    actionBBFrame: null,
    actionWaitFrame: null,

    // constructor
    ctor: function (playerType, chipsYFix, chipsXFix) {
        this._super();
        this.playerType = playerType;
        this.chipsYFix = chipsYFix;
        this.chipsXFix = chipsXFix;
    },

    // game initializer
    init: function () {
        this._super();

        // initiate layout on PlayerLayer
        this.validWidth = gameWidth;
        this.validHeight = gameHeight;
        this.size = cc.size(this.validWidth, this.validHeight);

        var betChipIndex;
        var avatarIndex;
        var avatarGap;
        if (this.playerType === PLAYER_AT_RIGHT) {

            // add avatar panel
            this.avatarPanel = new cc.Sprite(s_avatar_panel_right);
            this.avatarPanel.setAnchorPoint(0, 0);
            this.avatarPanel.setPosition(0, 0);
            this.addChild(this.avatarPanel, 4);

            // add avatar
            avatarIndex = 0;
            this.avatar = new cc.Sprite(avatars[avatarIndex]);
            this.avatar.setAnchorPoint(0, 0);
            this.avatarScale = this.avatarWidth / this.avatar.getContentSize().width;
            avatarGap = (this.avatarPanelWidth - this.avatarWidth) / 2;
            this.avatar
                .setPosition(this.avatarPanel.getPositionX() + this.avatarPanelLeftPadding + avatarGap - 3,
                    this.avatarPanelBottomPadding + avatarGap);

            this.avatar.setScale(this.avatarScale);
            this.addChild(this.avatar, 5);

            // add avatar mask
            this.avatarMask = new cc.Sprite(s_avatar_mask_right);
            this.avatarMask.setAnchorPoint(0, 0);
            this.avatarMask.setPosition(0, 0);
            this.avatarMask.setVisible(false);
            this.addChild(this.avatarMask, 6);

            // add name panel
            this.namePanel = new cc.Sprite(s_name_panel_right);
            this.namePanel.setAnchorPoint(0, 0);
            this.namePanel.setPosition(this.avatarPanel.getContentSize().width + this.avatarNameGap, 0);
            this.addChild(this.namePanel, 4);

            // add name label
            this.nameLabel = new cc.LabelTTF('', this.nameFont, this.nameTextSize);
            this.nameLabel.setColor(cc.color(255, 255, 255, 255));
            this.nameLabel.setAnchorPoint(0, 0);
            this.nameLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.nameLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.nameLabel.boundingWidth = this.namePanel.getContentSize().width - this.avatarPanelLeftPadding;
            this.nameLabel.boundingHeight =
                (this.namePanel.getContentSize().height - this.avatarPanelBottomPadding) / 2;
            this.nameLabel.setPosition(this.namePanel.getPositionX(),
                this.nameLabel.getContentSize().height + this.avatarPanelBottomPadding / 4);
            this.addChild(this.nameLabel, 5);

            // add chips label
            this.chipsLabel = new cc.LabelTTF('', this.chipsFont, this.chipsTextSize);
            this.chipsLabel.setColor(cc.color(255, 255, 0, 255));
            this.chipsLabel.setAnchorPoint(0, 0);
            this.chipsLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.chipsLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.chipsLabel.boundingWidth = this.namePanel.getContentSize().width - this.avatarPanelLeftPadding;
            this.chipsLabel.boundingHeight =
                (this.namePanel.getContentSize().height - this.avatarPanelBottomPadding) / 2;
            this.chipsLabel.setPosition(this.namePanel.getPositionX(),
                (this.nameLabel.getContentSize().height + this.avatarPanelBottomPadding / 2) / 4);
            this.addChild(this.chipsLabel, 5);

            // add name mask
            this.nameMask = new cc.Sprite(s_name_mask_right);
            this.nameMask.setAnchorPoint(0, 0);
            this.nameMask.setPosition(this.avatarPanel.getContentSize().width + this.avatarNameGap, 0);
            this.nameMask.setVisible(false);
            this.addChild(this.nameMask, 6);

            // add bet chips sprite
            this.betChips = [];
            for (betChipIndex = 0; betChipIndex < this.maxChipLevel; betChipIndex++) {
                this.betChips[betChipIndex] = new cc.Sprite(s_chips);
                this.betChips[betChipIndex].setAnchorPoint(0, 0);
                this.betChips[betChipIndex].setPosition(this.avatarPanel.getPositionX() -
                    (this.betChips[betChipIndex].getContentSize().width + this.chipsHorizontalGap) + this.chipsXFix,
                    this.chipsVerticalGap + (betChipIndex * 3) + this.chipsYFix);
                this.betChips[betChipIndex].setVisible(false);
                this.addChild(this.betChips[betChipIndex], 7 + betChipIndex);
            }

            // add acc chips
            this.accChipsLabel = new cc.LabelTTF('', this.chipsFont, this.chipsTextSize);
            this.accChipsLabel.setColor(cc.color(255, 255, 255, 255));
            this.accChipsLabel.setAnchorPoint(0, 0);
            this.accChipsLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.accChipsLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.accChipsLabel.setPosition(this.betChips[0].getPositionX() +
                (this.betChips[0].getContentSize().width -
                    this.accChipsLabel.getContentSize().width) / 2 - this.accMargin,
                this.betChips[0].getPositionY() -
                this.betChips[0].getContentSize().height / 2 - this.accLabelMarginTop);
            this.addChild(this.accChipsLabel, 7);

            // add blind label
            this.blindLabel = new cc.LabelTTF('', this.blindFont, this.blindTextSize);
            this.blindLabel.setColor(cc.color(255, 128, 0, 255));
            this.blindLabel.setAnchorPoint(0, 0);
            this.blindLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.blindLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.blindLabel.setPosition(this.namePanel.getPositionX(),
                this.namePanel.getPositionY() - this.accLabelMarginTop);
            this.addChild(this.blindLabel, 7);

            // add reload label
            this.reloadLabel = new cc.LabelTTF('', this.reloadFont, this.reloadTextSize);
            this.reloadLabel.setColor(cc.color(0, 255, 63, 255));
            this.reloadLabel.setAnchorPoint(0, 0);
            this.reloadLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.reloadLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.reloadLabel.setPosition(this.avatarPanel.getPositionX() + this.avatarPanelLeftPadding,
                this.avatarPanel.getPositionY() - this.accLabelMarginTop);
            this.addChild(this.reloadLabel, 7);

            // add action panel
            this.actionMap = actionRightMap;
            this.actionSB = action_sb_right;
            this.actionBB = action_bb_right;
            this.actionWait = action_wait_right;
            this.nameNormal = s_name_panel_right;
            this.nameHighLight = s_name_panel_right_hl;
            this.avatarNormal = s_avatar_panel_right;
            this.avatarHighLight = s_avatar_panel_right_hl;

            this.actionPanel = new cc.Sprite(action_allin);
            this.actionPanel.setAnchorPoint(0, 0);
            this.actionPanel.setPosition(this.avatarPanel.getPositionX() - this.actionPanel.getContentSize().width / 2,
                this.avatarPanel.getPositionY() +
                this.avatarPanel.getContentSize().height - this.avatarPanelBottomPadding - this.actionPanelGap);
            this.addChild(this.actionPanel, 21);

            // add bet chips
            this.betChipsLabel = new cc.LabelTTF('', this.chipsFont, this.chipsTextSize);
            this.betChipsLabel.setColor(cc.color(0, 255, 0, 255));
            this.betChipsLabel.setAnchorPoint(0, 0);
            this.betChipsLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.betChipsLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.betChipsLabel.boundingWidth = this.actionPanel.getContentSize().width;
            this.betChipsLabel
                .setPosition(this.actionPanel.getPositionX(),
                    this.actionPanel.getPositionY() + this.actionPanel.getContentSize().height);
            this.addChild(this.betChipsLabel, 20);

            // add private cards
            this.privateCard0 = new cc.Sprite(s_p_back);
            this.privateCardMask0 = new cc.Sprite(s_p_mask);
            this.privateCard0.setAnchorPoint(0, 0);
            this.privateCardMask0.setAnchorPoint(0, 0);
            this.cardsScale =
                Math.max(this.cardVisualHeight / this.privateCard0.getContentSize().height,
                    this.cardVisualWidth / this.privateCard0.getContentSize().width);
            this.privateCard0.setScale(this.cardsScale);
            this.privateCardMask0.setScale(this.cardsScale);
            this.privateCard0.setPosition(this.namePanel.getPositionX() + this.namePanel.getContentSize().width -
                this.cardMargin - (this.privateCard0.getContentSize().width * this.cardsScale) -
                this.avatarPanelLeftPadding,
                this.namePanel.getPositionY() + this.privateCardsMarginBottom);
            this.privateCardMask0.setPosition(this.namePanel.getPositionX() + this.namePanel.getContentSize().width -
                this.cardMargin - (this.privateCard0.getContentSize().width * this.cardsScale) -
                this.avatarPanelLeftPadding,
                this.namePanel.getPositionY() + this.privateCardsMarginBottom);
            this.addChild(this.privateCard0, 0);
            this.privateCardMask0.setVisible(false);
            this.addChild(this.privateCardMask0, 1);

            this.privateCard1 = new cc.Sprite(s_p_back);
            this.privateCardMask1 = new cc.Sprite(s_p_mask);
            this.privateCard1.setAnchorPoint(0, 0);
            this.privateCardMask1.setAnchorPoint(0, 0);
            this.cardsScale =
                Math.max(this.cardVisualHeight / this.privateCard1.getContentSize().height,
                    this.cardVisualWidth / this.privateCard1.getContentSize().width);
            this.privateCard1.setScale(this.cardsScale);
            this.privateCardMask1.setScale(this.cardsScale);
            this.privateCard1.setPosition(this.namePanel.getPositionX() + this.namePanel.getContentSize().width -
                (this.privateCard1.getContentSize().width * this.cardsScale) -
                this.avatarPanelLeftPadding,
                this.namePanel.getPositionY() + this.privateCardsMarginBottom);
            this.privateCardMask1.setPosition(this.namePanel.getPositionX() + this.namePanel.getContentSize().width -
                (this.privateCard1.getContentSize().width * this.cardsScale) -
                this.avatarPanelLeftPadding,
                this.namePanel.getPositionY() + this.privateCardsMarginBottom);

            this.addChild(this.privateCard1, 2);
            this.privateCardMask1.setVisible(false);
            this.addChild(this.privateCardMask1, 3);

        } else if (this.playerType === PLAYER_AT_LEFT) {

            // add name panel
            this.namePanel = new cc.Sprite(s_name_panel_left);
            this.namePanel.setAnchorPoint(0, 0);
            this.namePanel.setPosition(0, 0);
            this.addChild(this.namePanel, 4);

            // add name label
            this.nameLabel = new cc.LabelTTF('', this.nameFont, this.nameTextSize);
            this.nameLabel.setColor(cc.color(255, 255, 255, 255));
            this.nameLabel.setAnchorPoint(0, 0);
            this.nameLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.nameLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.nameLabel.boundingWidth = this.namePanel.getContentSize().width - this.avatarPanelLeftPadding;
            this.nameLabel.boundingHeight =
                (this.namePanel.getContentSize().height - this.avatarPanelBottomPadding) / 2;
            this.nameLabel.setPosition(this.namePanel.getPositionX() + this.avatarPanelLeftPadding,
                this.nameLabel.getContentSize().height + this.avatarPanelBottomPadding / 4);
            this.addChild(this.nameLabel, 5);

            // add chips label
            this.chipsLabel = new cc.LabelTTF('', this.chipsFont, this.chipsTextSize);
            this.chipsLabel.setColor(cc.color(255, 255, 0, 255));
            this.chipsLabel.setAnchorPoint(0, 0);
            this.chipsLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.chipsLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.chipsLabel.boundingWidth = this.namePanel.getContentSize().width - this.avatarPanelLeftPadding;
            this.chipsLabel.boundingHeight =
                (this.namePanel.getContentSize().height - this.avatarPanelBottomPadding) / 2;
            this.chipsLabel.setPosition(this.namePanel.getPositionX() + this.avatarPanelLeftPadding,
                (this.nameLabel.getContentSize().height + this.avatarPanelBottomPadding / 2) / 4);
            this.addChild(this.chipsLabel, 5);

            // add name mask
            this.nameMask = new cc.Sprite(s_name_mask_left);
            this.nameMask.setAnchorPoint(0, 0);
            this.nameMask.setPosition(0, 0);
            this.nameMask.setVisible(false);
            this.addChild(this.nameMask, 6);

            // add avatar panel
            this.avatarPanel = new cc.Sprite(s_avatar_panel_left);
            this.avatarPanel.setAnchorPoint(0, 0);
            this.avatarPanel.setPosition(this.namePanel.getContentSize().width + this.avatarNameGap, 0);
            this.addChild(this.avatarPanel, 4);

            // add avatar
            avatarIndex = 0;
            this.avatar = new cc.Sprite(avatars[avatarIndex]);
            this.avatar.setAnchorPoint(0, 0);
            this.avatarScale = this.avatarWidth / this.avatar.getContentSize().width;
            avatarGap = (this.avatarPanelWidth - this.avatarWidth) / 2;
            this.avatar
                .setPosition(this.avatarPanel.getPositionX() + avatarGap,
                    this.avatarPanelBottomPadding + avatarGap);
            this.avatar.setScale(this.avatarScale);
            this.addChild(this.avatar, 5);

            // add avatar mask
            this.avatarMask = new cc.Sprite(s_avatar_mask_left);
            this.avatarMask.setAnchorPoint(0, 0);
            this.avatarMask.setPosition(this.namePanel.getContentSize().width + this.avatarNameGap, 0);
            this.avatarMask.setVisible(false);
            this.addChild(this.avatarMask, 6);

            // add bet chips sprite
            this.betChips = [];
            for (betChipIndex = 0; betChipIndex < this.maxChipLevel; betChipIndex++) {
                this.betChips[betChipIndex] = new cc.Sprite(s_chips);
                this.betChips[betChipIndex].setAnchorPoint(0, 0);
                this.betChips[betChipIndex].setPosition(this.avatarPanel.getPositionX() +
                    this.avatarPanel.getContentSize().width + this.chipsHorizontalGap + this.chipsXFix,
                    this.chipsVerticalGap + (betChipIndex * 3) + this.chipsYFix);
                this.betChips[betChipIndex].setVisible(false);
                this.addChild(this.betChips[betChipIndex], 7 + betChipIndex);
            }

            // add acc chips
            this.accChipsLabel = new cc.LabelTTF('', this.chipsFont, this.chipsTextSize);
            this.accChipsLabel.setColor(cc.color(255, 255, 255, 255));
            this.accChipsLabel.setAnchorPoint(0, 0);
            this.accChipsLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.accChipsLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.accChipsLabel.setPosition(this.betChips[0].getPositionX() +
                (this.betChips[0].getContentSize().width -
                    this.accChipsLabel.getContentSize().width) / 2 - this.accMargin,
                this.betChips[0].getPositionY() -
                this.betChips[0].getContentSize().height / 2 - this.accLabelMarginTop);
            this.addChild(this.accChipsLabel, 7);

            // add blind label
            this.blindLabel = new cc.LabelTTF('', this.blindFont, this.blindTextSize);
            this.blindLabel.setColor(cc.color(255, 128, 0, 255));
            this.blindLabel.setAnchorPoint(0, 0);
            this.blindLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.blindLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.blindLabel.setPosition(this.namePanel.getPositionX() + this.avatarPanelLeftPadding,
                this.namePanel.getPositionY() - this.accLabelMarginTop);
            this.addChild(this.blindLabel, 7);

            // add reload label
            this.reloadLabel = new cc.LabelTTF('', this.reloadFont, this.reloadTextSize);
            this.reloadLabel.setColor(cc.color(0, 255, 63, 255));
            this.reloadLabel.setAnchorPoint(0, 0);
            this.reloadLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.reloadLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.reloadLabel.setPosition(this.avatarPanel.getPositionX(),
                this.avatarPanel.getPositionY() - this.accLabelMarginTop);
            this.addChild(this.reloadLabel, 7);

            // add action panel
            this.actionMap = actionLeftMap;
            this.actionSB = action_sb_left;
            this.actionBB = action_bb_left;
            this.actionWait = action_wait_left;
            this.nameNormal = s_name_panel_left;
            this.nameHighLight = s_name_panel_left_hl;
            this.avatarNormal = s_avatar_panel_left;
            this.avatarHighLight = s_avatar_panel_left_hl;

            this.actionPanel = new cc.Sprite(action_raise_left);
            this.actionPanel.setAnchorPoint(0, 0);
            this.actionPanel.setPosition(this.avatarPanel.getPositionX() + this.avatarPanel.getContentSize().width / 2,
                this.avatarPanel.getPositionY() +
                this.avatarPanel.getContentSize().height - this.avatarPanelBottomPadding - this.actionPanelGap);
            this.addChild(this.actionPanel, 21);

            // add bet chips
            this.betChipsLabel = new cc.LabelTTF('', this.chipsFont, this.chipsTextSize);
            this.betChipsLabel.setColor(cc.color(0, 255, 0, 255));
            this.betChipsLabel.setAnchorPoint(0, 0);
            this.betChipsLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.betChipsLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.betChipsLabel.boundingWidth = this.actionPanel.getContentSize().width;
            this.betChipsLabel
                .setPosition(this.actionPanel.getPositionX(),
                    this.actionPanel.getPositionY() + this.actionPanel.getContentSize().height);
            this.addChild(this.betChipsLabel, 20);

            // add private cards
            this.privateCard0 = new cc.Sprite(s_p_back);
            this.privateCardMask0 = new cc.Sprite(s_p_mask);
            this.privateCard0.setAnchorPoint(0, 0);
            this.privateCardMask0.setAnchorPoint(0, 0);
            this.cardsScale =
                Math.max(this.cardVisualHeight / this.privateCard0.getContentSize().height,
                    this.cardVisualWidth / this.privateCard0.getContentSize().width);
            this.privateCard0.setScale(this.cardsScale);
            this.privateCardMask0.setScale(this.cardsScale);
            this.privateCard0
                .setPosition(this.namePanel.getPositionX() +
                    this.avatarPanelLeftPadding,
                    this.namePanel.getPositionY() + this.privateCardsMarginBottom);
            this.privateCardMask0
                .setPosition(this.namePanel.getPositionX() +
                    this.avatarPanelLeftPadding,
                    this.namePanel.getPositionY() + this.privateCardsMarginBottom);
            this.addChild(this.privateCard0, 0);
            this.privateCardMask0.setVisible(false);
            this.addChild(this.privateCardMask0, 1);

            this.privateCard1 = new cc.Sprite(s_p_back);
            this.privateCardMask1 = new cc.Sprite(s_p_mask);
            this.privateCard1.setAnchorPoint(0, 0);
            this.privateCardMask1.setAnchorPoint(0, 0);
            this.cardsScale =
                Math.max(this.cardVisualHeight / this.privateCard1.getContentSize().height,
                    this.cardVisualWidth / this.privateCard1.getContentSize().width);
            this.privateCard1.setScale(this.cardsScale);
            this.privateCardMask1.setScale(this.cardsScale);
            this.privateCard1
                .setPosition(this.namePanel.getPositionX() +
                    this.avatarPanelLeftPadding + this.cardMargin,
                    this.namePanel.getPositionY() + this.privateCardsMarginBottom);
            this.privateCardMask1
                .setPosition(this.namePanel.getPositionX() +
                    this.avatarPanelLeftPadding + this.cardMargin,
                    this.namePanel.getPositionY() + this.privateCardsMarginBottom);
            this.addChild(this.privateCard1, 2);
            this.privateCardMask1.setVisible(false);
            this.addChild(this.privateCardMask1, 3);
        }

        this.initializeAltFrames();
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
        if (!this.player) {
            return;
        }

        // update player survival
        if (!this.player.isSurvive) {
            this.nameMask.setVisible(true);
            this.avatarMask.setVisible(true);
        } else {
            this.nameMask.setVisible(false);
            this.avatarMask.setVisible(false);
        }

        // update player offline
        if (true === this.player.online) {
            if (false === this.player.isHuman) {
                this.nameLabel.setColor(cc.color(255, 255, 255, 255));
            } else {
                this.nameLabel.setColor(cc.color(0, 255, 255, 255));
            }
        } else {
            this.nameLabel.setColor(cc.color(127, 127, 127, 255));
        }

        // update chips
        this.chipsLabel.setString(this.player.chips);

        // update accumulate
        if (this.player.accumulate > 0 && this.player.isSurvive) {
            var accString = this.player.accumulate;
            this.accChipsLabel.setString(accString);
        } else {
            this.accChipsLabel.setString('');
        }

        // update chip sprites
        if (this.player.isSurvive === false) {
            this.currentChipLevel = 0;
        } else {
            this.currentChipLevel = Math.min(this.maxChipLevel,
                Math.ceil(this.player.accumulate / currentBigBlind));
        }

        for (var betChipIndex = 0; betChipIndex < this.maxChipLevel; betChipIndex++) {
            if (betChipIndex < this.currentChipLevel) {
                this.betChips[betChipIndex].setVisible(true);
            } else {
                this.betChips[betChipIndex].setVisible(false);
            }
        }

        // update blind flag
        if (this.player.isSmallBlind) {
            this.blindLabel.setString('SB : ' + currentSmallBlind);
        } else if (this.player.isBigBlind) {
            this.blindLabel.setString('BB : ' + currentBigBlind);
        } else {
            this.blindLabel.setString('');
        }

        // update reload count flag
        var reloadIndex;
        var reloadCountLeft = reloadChance - this.player.reloadCount;
        var reloadString = '';
        for (reloadIndex = 0; reloadIndex < reloadCountLeft; reloadIndex++) {
            reloadString += '■';
        }
        this.reloadLabel.setString(reloadString);

        // update action
        if (!this.player.isSurvive) {
            this.changeSpriteImage(this.actionPanel, this.actionEmptyFrame);
        } else if (this.player.folded) {
            this.changeSpriteImage(this.actionPanel, this.actionFrames.get('fold'));
        } else if (this.player.isSmallBlind && currentRoundName === 'Deal' && !this.player.takeAction) {
            this.changeSpriteImage(this.actionPanel, this.actionSBFrame);
        } else if (this.player.isBigBlind && currentRoundName === 'Deal' && !this.player.takeAction) {
            this.changeSpriteImage(this.actionPanel, this.actionBBFrame);
        } else if (this.player.takeAction === ACTION_STATUS_THINKING) {
            this.changeSpriteImage(this.actionPanel, this.actionWaitFrame);
        } else if (this.player.takeAction === ACTION_STATUS_DECIDED) {
            if (this.player.action !== '') {
                this.changeSpriteImage(this.actionPanel, this.actionFrames.get(this.player.action));
            } else {
                console.log('action error, player decided but no action is taken');
                this.changeSpriteImage(this.actionPanel, this.actionEmptyFrame);
            }
        } else {
            this.changeSpriteImage(this.actionPanel, this.actionEmptyFrame);
        }

        // update in turn
        if (this.player.inTurn) {
            this.changeSpriteImage(this.namePanel, this.nameHighLightFrame);
            this.changeSpriteImage(this.avatarPanel, this.avatarHighLightFrame);
        } else {
            this.changeSpriteImage(this.namePanel, this.nameNormalFrame);
            this.changeSpriteImage(this.avatarPanel, this.avatarNormalFrame);
        }

        // update current bet
        if (this.player.bet > 0) {
            this.betChipsLabel.setString('+' + this.player.bet);
        } else {
            this.betChipsLabel.setString('');
        }

        // update private cards
        if (this.player.privateCards[0] && this.player.isSurvive) {
            this.changeSpriteImage(this.privateCard0, this.pokerFrames.get(this.player.privateCards[0]));

            this.privateCard0.setVisible(true);
        } else {
            if (MODE_PLAYER !== playMode) {
                this.changeSpriteImage(this.privateCard0, this.pokerEmptyFrame);
                this.privateCard0.setVisible(false);
            } else {
                if (this.player.isSurvive) {
                    this.changeSpriteImage(this.privateCard0, this.pokerBackFrame);
                    this.privateCard0.setVisible(true);
                } else {
                    this.changeSpriteImage(this.privateCard0, this.pokerEmptyFrame);
                    this.privateCard0.setVisible(false);
                }
            }
        }

        if (this.player.privateCards[1] && this.player.isSurvive) {
            this.changeSpriteImage(this.privateCard1, this.pokerFrames.get(this.player.privateCards[1]));
            if (this.player.folded) {
                this.privateCardMask1.setVisible(true);
            } else {
                this.privateCardMask1.setVisible(false);
            }
            this.privateCard1.setVisible(true);
        } else {
            if (MODE_PLAYER !== playMode) {
                this.changeSpriteImage(this.privateCard1, this.pokerEmptyFrame);
                this.privateCard1.setVisible(false);
            } else {
                if (this.player.isSurvive) {
                    this.changeSpriteImage(this.privateCard1, this.pokerBackFrame);
                    this.privateCard1.setVisible(true);
                } else {
                    this.changeSpriteImage(this.privateCard1, this.pokerEmptyFrame);
                    this.privateCard1.setVisible(false);
                }
            }
        }

        // update fold mask
        if (this.player.isSurvive && this.player.folded) {
            this.privateCardMask0.setVisible(true);
            this.privateCardMask1.setVisible(true);
        } else {
            this.privateCardMask0.setVisible(false);
            this.privateCardMask1.setVisible(false);
        }
    },

    setPlayer: function (_player) {
        this.player = _player;

        // change name and avatar
        if (this.player) {
            this.nameLabel.setString(this.player.displayName);
            var avatarIndex = this.player.avatarId || 0;
            this.changeSpriteImage(this.avatar, this.avatarFrames[avatarIndex]);
        }
    },

    // UI helpers
    initializeAltFrames: function () {
        this.nameHighLightFrame = new cc.SpriteFrame(this.nameHighLight, cc.rect(0, 0,
            this.namePanel.getContentSize().width, this.namePanel.getContentSize().height));

        this.avatarHighLightFrame = new cc.SpriteFrame(this.avatarHighLight, cc.rect(0, 0,
            this.avatarPanel.getContentSize().width, this.avatarPanel.getContentSize().height));

        this.nameNormalFrame = new cc.SpriteFrame(this.nameNormal, cc.rect(0, 0,
            this.namePanel.getContentSize().width, this.namePanel.getContentSize().height));

        this.avatarNormalFrame = new cc.SpriteFrame(this.avatarNormal, cc.rect(0, 0,
            this.avatarPanel.getContentSize().width, this.avatarPanel.getContentSize().height));

        var index;
        for (index = 0; index < avatars.length; index++) {
            this.avatarFrames[index] = new cc.SpriteFrame(avatars[index], cc.rect(0, 0,
                this.avatar.getContentSize().width, this.avatar.getContentSize().height));
        }

        this.pokerBackFrame = new cc.SpriteFrame(s_p_back, cc.rect(0, 0,
            this.privateCard0.getContentSize().width, this.privateCard0.getContentSize().height));

        this.pokerEmptyFrame = new cc.SpriteFrame(s_p_empty, cc.rect(0, 0,
            this.privateCard0.getContentSize().width, this.privateCard0.getContentSize().height));

        var pokerKeys = pokerMap.keys();
        this.pokerFrames = new Map();
        for (index = 0; index < pokerKeys.length; index++) {
            var pokerFrame = new cc.SpriteFrame(pokerMap.get(pokerKeys[index]), cc.rect(0, 0,
                this.privateCard0.getContentSize().width, this.privateCard0.getContentSize().height));
            this.pokerFrames.set(pokerKeys[index], pokerFrame);
        }

        this.actionEmptyFrame = new cc.SpriteFrame(action_empty, cc.rect(0, 0,
            this.actionPanel.getContentSize().width, this.actionPanel.getContentSize().height));

        this.actionSBFrame = new cc.SpriteFrame(this.actionSB, cc.rect(0, 0,
            this.actionPanel.getContentSize().width, this.actionPanel.getContentSize().height));

        this.actionBBFrame = new cc.SpriteFrame(this.actionBB, cc.rect(0, 0,
            this.actionPanel.getContentSize().width, this.actionPanel.getContentSize().height));

        this.actionWaitFrame = new cc.SpriteFrame(this.actionWait, cc.rect(0, 0,
            this.actionPanel.getContentSize().width, this.actionPanel.getContentSize().height));

        var actionKeys = this.actionMap.keys();
        this.actionFrames = new Map();
        for (index = 0; index < actionKeys.length; index++) {
            var actionFrame = new cc.SpriteFrame(this.actionMap.get(actionKeys[index]), cc.rect(0, 0,
                this.actionPanel.getContentSize().width, this.actionPanel.getContentSize().height));
            this.actionFrames.set(actionKeys[index], actionFrame);
        }
    },

    changeSpriteImage: function (sprite, srcFrame) {
        if (sprite && srcFrame) {
            sprite.setSpriteFrame(srcFrame);
        }
    }
});
