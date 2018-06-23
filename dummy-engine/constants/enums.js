/**
 * Created by dummy team
 * 2017-09-08
 */


function Enums() {
    this.APP_PRODUCTION_MODE = "production";
    this.APP_DEVELOPMENT_MODE = "development";
    this.APP_USERDEBUG_MODE = "userdebug";

    this.GAME_STATUS_STANDBY = 0;
    this.GAME_STATUS_PREPARING = 1;
    this.GAME_STATUS_RUNNING = 2;
    this.GAME_STATUS_FINISHED = 3;
    this.GAME_STATUS_ENDED = 4;

    this.DANMU_RELAY_CLOSED = 0;
    this.DANMU_RELAY_OPENED = 1;

    this.GAME_TEXAS_HOLDEM = "texas_holdem";
    this.GAME_FLY_CHESS = "fly_chess";

    this.ROLE_PLAYER = 0;
    this.ROLE_DUMMY = 1;
}

module.exports = Enums;