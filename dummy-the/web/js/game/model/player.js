/**
 * Created by dummy-team
 * 2017-08-22
 */

/**
 *
 * @param _playerName
 * @param _displayName
 * @param _chips
 * @param _isSurvive
 * @param _reloadCount
 * @param _online
 * @constructor
 */
var Player = function (_playerName, _displayName, _chips, _isSurvive, _isHuman, _reloadCount, _online) {
    this.id = 0;
    this.playerName = _playerName;
    this.displayName = _displayName;
    this.isSurvive = _isSurvive;
    this.isHuman = _isHuman;
    if (undefined !== _online && null !== _online) {
        this.online = _online;
    } else {
        this.online = false;
    }
    this.chips = _chips;
    this.totalChips = 0;
    this.reloadCount = _reloadCount;
    this.bet = 0;
    this.roundBet = 0;
    this.accumulate = 0;
    this.action = "";
    this.inTurn = 0;
    this.isSmallBlind = false;
    this.isBigBlind = false;
    this.privateCards = [];
    var avatarId = Math.abs(hashCode(this.playerName) % 16);
    this.avatarId = avatarId || 0;
    this.gender = getGender(this.avatarId);
    this.fold = false;
    this.allin = false;
    this.takeAction = false;

    // optional fields for round clear
    this.hand = null;
    this.prize = 0;
    this.reloadCount = 0;
};

Player.prototype.setId = function (_id) {
    this.id = _id;
};

Player.prototype.setDisplayName = function (_displayName) {
    this.displayName = _displayName;
};

Player.prototype.setSurvive = function (_isSurvive) {
    this.isSurvive = _isSurvive;
};

Player.prototype.setOnline = function (_online) {
    this.online = _online;
};

Player.prototype.setChips = function (_chips) {
    this.chips = _chips;
};

Player.prototype.setTotalChips = function (defaultChips, reloadChance) {
    this.totalChips = this.chips + defaultChips * (reloadChance - this.reloadCount);
};

Player.prototype.setReloadCount = function (_reloadCount) {
    this.reloadCount = _reloadCount;
};

Player.prototype.setBet = function (_bet) {
    this.bet = _bet;
    this.accumulate = this.bet + this.roundBet;
};

Player.prototype.setRoundBet = function (_roundBet) {
    this.roundBet = _roundBet;
    this.accumulate = this.bet + this.roundBet;
};

Player.prototype.setAccumulate = function (_accumulate) {
    this.accumulate = _accumulate;
};

Player.prototype.setAction = function (_action) {
    this.action = _action;
};

Player.prototype.setInTurn = function (_inTurn) {
    this.inTurn = _inTurn;
};

Player.prototype.setSmallBlind = function (_isSmallBlind) {
    this.isSmallBlind = _isSmallBlind;
};

Player.prototype.setBigBlind = function (_isBigBlind) {
    this.isBigBlind = _isBigBlind;
};

Player.prototype.setPrivateCards = function (_privateCard0, _privateCard1) {
    this.privateCards[0] = _privateCard0;
    this.privateCards[1] = _privateCard1;
};

Player.prototype.setFolded = function (_folded) {
    this.folded = _folded;
};

Player.prototype.setAllin = function (_allin) {
    this.allin = _allin;
};

Player.prototype.setTakeAction = function (_takeAction) {
    this.takeAction = _takeAction;
};

Player.prototype.setHand = function (_hand) {
    this.hand = _hand;
};

Player.prototype.setPrize = function (_prize) {
    this.prize = _prize;
};

Player.prototype.setIsHuman = function (_isHuman) {
    this.isHuman = _isHuman;
};

// avatar hash helper
function hashCode(str) {
    var hash = 0;
    var char;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

function getGender(avatarId) {
    var intAvatarId = parseInt(avatarId);
    var maleAvatars = [2, 3, 4, 5, 6, 7, 8, 9];
    if (maleAvatars.indexOf(intAvatarId) !== -1) {
        return 0;
    } else {
        return 1;
    }
}