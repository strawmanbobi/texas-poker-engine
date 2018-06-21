/**
 * Created by dummy-team
 * 2017-08-21
 */

// i18n
var VER_ENGLISH = 0;
var VER_CHINESE = 1;
var ver = VER_CHINESE;

// board images
var s_bg = './res/images/game_board/bg.png';
var s_winner_bg = './res/images/game_board/winner_bg.png';
var s_dec_bottom = './res/images/game_board/bg_chip.png';
var s_bg_board = './res/images/game_board/bg_table.png';
var s_bg_mm_2 = './res/images/game_board/img_beauty_3.png';
var s_tm_logo = './res/images/game_board/tm_logo.png';
var s_your_turn = './res/images/game_board/its_your_turn.png';

// player images
var s_avatar_panel_right = './res/images/game_board/bg_avatar_right.png';
var s_name_panel_right = './res/images/game_board/bg_name_right.png';
var s_avatar_panel_right_hl = './res/images/game_board/bg_avatar_right_hl.png';
var s_name_panel_right_hl = './res/images/game_board/bg_name_right_hl.png';
var s_avatar_mask_right = './res/images/game_board/bg_avatar_right_mask.png';
var s_name_mask_right = './res/images/game_board/bg_name_right_mask.png';

var s_avatar_panel_left = './res/images/game_board/bg_avatar_left.png';
var s_name_panel_left = './res/images/game_board/bg_name_left.png';
var s_avatar_panel_left_hl = './res/images/game_board/bg_avatar_left_hl.png';
var s_name_panel_left_hl = './res/images/game_board/bg_name_left_hl.png';
var s_avatar_mask_left = './res/images/game_board/bg_avatar_left_mask.png';
var s_name_mask_left = './res/images/game_board/bg_name_left_mask.png';

var s_chips = './res/images/game_board/chips.png';

// medals
var s_m_1st = './res/images/game_board/first.png';
var s_m_2nd = './res/images/game_board/second.png';
var s_m_3rd = './res/images/game_board/third.png';
var s_winner = './res/images/game_board/star.png';
var medalArray = [s_m_1st, s_m_2nd, s_m_3rd];

// dealer images
var s_start_button = './res/images/game_board/start_button.png';
var s_start_button_pressed = './res/images/game_board/start_button_pressed.png';
var s_start_button_disabled = './res/images/game_board/start_button_disabled.png';
var s_stop_button = './res/images/game_board/stop_button.png';
var s_stop_button_pressed = './res/images/game_board/stop_button_pressed.png';
var s_stop_button_disabled = './res/images/game_board/stop_button_disabled.png';
var s_click_icon = './res/images/game_board/click.png';

// operation buttons
var s_o_call_button = './res/images/game_board/btn_call.png';
var s_o_call_button_pressed = './res/images/game_board/btn_call_pressed.png';
var s_o_call_button_disabled = './res/images/game_board/btn_call_disabled.png';
var s_o_raise_button = './res/images/game_board/btn_raise.png';
var s_o_raise_button_pressed = './res/images/game_board/btn_raise_pressed.png';
var s_o_raise_button_disabled = './res/images/game_board/btn_raise_disabled.png';
var s_o_check_button = './res/images/game_board/btn_check.png';
var s_o_check_button_pressed = './res/images/game_board/btn_check_pressed.png';
var s_o_check_button_disabled = './res/images/game_board/btn_check_disabled.png';
var s_o_fold_button = './res/images/game_board/btn_fold.png';
var s_o_fold_button_pressed = './res/images/game_board/btn_fold_pressed.png';
var s_o_fold_button_disabled = './res/images/game_board/btn_fold_disabled.png';
var s_o_allin_button = './res/images/game_board/btn_allin.png';
var s_o_allin_button_pressed = './res/images/game_board/btn_allin_pressed.png';
var s_o_allin_button_disabled = './res/images/game_board/btn_allin_disabled.png';
var s_o_bet_button = './res/images/game_board/btn_bet.png';
var s_o_bet_button_pressed = './res/images/game_board/btn_bet_pressed.png';
var s_o_bet_button_disabled = './res/images/game_board/btn_bet_disabled.png';
var s_o_reload_button = './res/images/game_board/btn_reload.png';
var s_o_end_button = './res/images/game_board/btn_end.png';
var s_o_end_button_pressed = './res/images/game_board/btn_end_pressed.png';
var s_o_end_button_disabled = './res/images/game_board/btn_end_disabled.png';
var s_o_reload_button_pressed = './res/images/game_board/btn_reload_pressed.png';
var s_o_reload_button_disabled = './res/images/game_board/btn_reload_disabled.png';
var s_o_spinner = './res/images/game_board/bg_spinner.png';
var s_o_arrow_up = './res/images/game_board/btn_up.png';
var s_o_arrow_up_pressed = './res/images/game_board/btn_up_pressed.png';
var s_o_arrow_up_disabled = './res/images/game_board/btn_up_disabled.png';
var s_o_arrow_down = './res/images/game_board/btn_down.png';
var s_o_arrow_down_pressed = './res/images/game_board/btn_down_pressed.png';
var s_o_arrow_down_disabled = './res/images/game_board/btn_down_disabled.png';
var s_copy_button = './res/images/game_board/copy_button.png';
var s_copy_button_pressed = './res/images/game_board/copy_button_pressed.png';
var s_copy_button_disabled = './res/images/game_board/copy_button_disabled.png';

// poker cards
var s_p_2C = './res/images/poker/2C.png';
var s_p_2D = './res/images/poker/2D.png';
var s_p_2H = './res/images/poker/2H.png';
var s_p_2S = './res/images/poker/2S.png';
var s_p_3C = './res/images/poker/3C.png';
var s_p_3D = './res/images/poker/3D.png';
var s_p_3H = './res/images/poker/3H.png';
var s_p_3S = './res/images/poker/3S.png';
var s_p_4C = './res/images/poker/4C.png';
var s_p_4D = './res/images/poker/4D.png';
var s_p_4H = './res/images/poker/4H.png';
var s_p_4S = './res/images/poker/4S.png';
var s_p_5C = './res/images/poker/5C.png';
var s_p_5D = './res/images/poker/5D.png';
var s_p_5H = './res/images/poker/5H.png';
var s_p_5S = './res/images/poker/5S.png';
var s_p_6C = './res/images/poker/6C.png';
var s_p_6D = './res/images/poker/6D.png';
var s_p_6H = './res/images/poker/6H.png';
var s_p_6S = './res/images/poker/6S.png';
var s_p_7C = './res/images/poker/7C.png';
var s_p_7D = './res/images/poker/7D.png';
var s_p_7H = './res/images/poker/7H.png';
var s_p_7S = './res/images/poker/7S.png';
var s_p_8C = './res/images/poker/8C.png';
var s_p_8D = './res/images/poker/8D.png';
var s_p_8H = './res/images/poker/8H.png';
var s_p_8S = './res/images/poker/8S.png';
var s_p_9C = './res/images/poker/9C.png';
var s_p_9D = './res/images/poker/9D.png';
var s_p_9H = './res/images/poker/9H.png';
var s_p_9S = './res/images/poker/9S.png';
var s_p_TC = './res/images/poker/TC.png';
var s_p_TD = './res/images/poker/TD.png';
var s_p_TH = './res/images/poker/TH.png';
var s_p_TS = './res/images/poker/TS.png';
var s_p_JC = './res/images/poker/JC.png';
var s_p_JD = './res/images/poker/JD.png';
var s_p_JH = './res/images/poker/JH.png';
var s_p_JS = './res/images/poker/JS.png';
var s_p_QC = './res/images/poker/QC.png';
var s_p_QD = './res/images/poker/QD.png';
var s_p_QH = './res/images/poker/QH.png';
var s_p_QS = './res/images/poker/QS.png';
var s_p_KC = './res/images/poker/KC.png';
var s_p_KD = './res/images/poker/KD.png';
var s_p_KH = './res/images/poker/KH.png';
var s_p_KS = './res/images/poker/KS.png';
var s_p_AC = './res/images/poker/AC.png';
var s_p_AD = './res/images/poker/AD.png';
var s_p_AH = './res/images/poker/AH.png';
var s_p_AS = './res/images/poker/AS.png';
var s_p_empty = './res/images/poker/empty.png';
var s_p_back = './res/images/poker/back.png';
var s_p_mask = './res/images/poker/mask.png';

var pokerMap = new Map();
pokerMap.set('2C', s_p_2C);
pokerMap.set('2D', s_p_2D);
pokerMap.set('2H', s_p_2H);
pokerMap.set('2S', s_p_2S);
pokerMap.set('3C', s_p_3C);
pokerMap.set('3D', s_p_3D);
pokerMap.set('3H', s_p_3H);
pokerMap.set('3S', s_p_3S);
pokerMap.set('4C', s_p_4C);
pokerMap.set('4D', s_p_4D);
pokerMap.set('4H', s_p_4H);
pokerMap.set('4S', s_p_4S);
pokerMap.set('5C', s_p_5C);
pokerMap.set('5D', s_p_5D);
pokerMap.set('5H', s_p_5H);
pokerMap.set('5S', s_p_5S);
pokerMap.set('6C', s_p_6C);
pokerMap.set('6D', s_p_6D);
pokerMap.set('6H', s_p_6H);
pokerMap.set('6S', s_p_6S);
pokerMap.set('7C', s_p_7C);
pokerMap.set('7D', s_p_7D);
pokerMap.set('7H', s_p_7H);
pokerMap.set('7S', s_p_7S);
pokerMap.set('8C', s_p_8C);
pokerMap.set('8D', s_p_8D);
pokerMap.set('8H', s_p_8H);
pokerMap.set('8S', s_p_8S);
pokerMap.set('9C', s_p_9C);
pokerMap.set('9D', s_p_9D);
pokerMap.set('9H', s_p_9H);
pokerMap.set('9S', s_p_9S);
pokerMap.set('TC', s_p_TC);
pokerMap.set('TD', s_p_TD);
pokerMap.set('TH', s_p_TH);
pokerMap.set('TS', s_p_TS);
pokerMap.set('JC', s_p_JC);
pokerMap.set('JD', s_p_JD);
pokerMap.set('JH', s_p_JH);
pokerMap.set('JS', s_p_JS);
pokerMap.set('QC', s_p_QC);
pokerMap.set('QD', s_p_QD);
pokerMap.set('QH', s_p_QH);
pokerMap.set('QS', s_p_QS);
pokerMap.set('KC', s_p_KC);
pokerMap.set('KD', s_p_KD);
pokerMap.set('KH', s_p_KH);
pokerMap.set('KS', s_p_KS);
pokerMap.set('AC', s_p_AC);
pokerMap.set('AD', s_p_AD);
pokerMap.set('AH', s_p_AH);
pokerMap.set('AS', s_p_AS);

// actions, NOTE: sizes of action images must be exactly the same
var action_empty = './res/images/game_board/action_empty.png';
var action_allin = './res/images/game_board/action_all_in.png';
var action_bet_left = './res/images/game_board/action_left_bet.png';
var action_call_left = './res/images/game_board/action_left_call.png';
var action_check_left = './res/images/game_board/action_left_check.png';
var action_fold_left = './res/images/game_board/action_left_fold.png';
var action_raise_left = './res/images/game_board/action_left_raise.png';
var action_sb_left = './res/images/game_board/action_left_sb.png';
var action_bb_left = './res/images/game_board/action_left_bb.png';
var action_sb_right = './res/images/game_board/action_right_sb.png';
var action_bb_right = './res/images/game_board/action_right_bb.png';
var action_wait_left = './res/images/game_board/action_left_wait.png';
var action_wait_right = './res/images/game_board/action_right_wait.png';

var actionLeftMap = new Map();
actionLeftMap.set('allin', action_allin);
actionLeftMap.set('bet', action_bet_left);
actionLeftMap.set('call', action_call_left);
actionLeftMap.set('check', action_check_left);
actionLeftMap.set('fold', action_fold_left);
actionLeftMap.set('raise', action_raise_left);

var action_bet_right = './res/images/game_board/action_right_bet.png';
var action_call_right = './res/images/game_board/action_right_call.png';
var action_check_right = './res/images/game_board/action_right_check.png';
var action_fold_right = './res/images/game_board/action_right_fold.png';
var action_raise_right = './res/images/game_board/action_right_raise.png';

var actionRightMap = new Map();
actionRightMap.set('allin', action_allin);
actionRightMap.set('bet', action_bet_right);
actionRightMap.set('call', action_call_right);
actionRightMap.set('check', action_check_right);
actionRightMap.set('fold', action_fold_right);
actionRightMap.set('raise', action_raise_right);

// avatars
var s_a_avatar_0 = './res/images/avatars/avatar_0.png';
var s_a_avatar_1 = './res/images/avatars/avatar_1.png';
var s_a_avatar_2 = './res/images/avatars/avatar_2.png';
var s_a_avatar_3 = './res/images/avatars/avatar_3.png';
var s_a_avatar_4 = './res/images/avatars/avatar_4.png';
var s_a_avatar_5 = './res/images/avatars/avatar_5.png';
var s_a_avatar_6 = './res/images/avatars/avatar_6.png';
var s_a_avatar_7 = './res/images/avatars/avatar_7.png';
var s_a_avatar_8 = './res/images/avatars/avatar_8.png';
var s_a_avatar_9 = './res/images/avatars/avatar_9.png';
var s_a_avatar_a = './res/images/avatars/avatar_a.png';
var s_a_avatar_b = './res/images/avatars/avatar_b.png';
var s_a_avatar_c = './res/images/avatars/avatar_c.png';
var s_a_avatar_d = './res/images/avatars/avatar_d.png';
var s_a_avatar_e = './res/images/avatars/avatar_e.png';
var s_a_avatar_f = './res/images/avatars/avatar_f.png';

var avatars = [s_a_avatar_0, s_a_avatar_1, s_a_avatar_2, s_a_avatar_3, s_a_avatar_4, s_a_avatar_5,
    s_a_avatar_6, s_a_avatar_7, s_a_avatar_8, s_a_avatar_9, s_a_avatar_a, s_a_avatar_b,
    s_a_avatar_c, s_a_avatar_d, s_a_avatar_e, s_a_avatar_f];

// audio
if (ver === VER_ENGLISH) {
    var audio_allin = './res/audio/english/allin.ogg';
    var audio_call = './res/audio/english/call.ogg';
    var audio_bet = './res/audio/english/bet.ogg';
    var audio_check = './res/audio/english/check.ogg';
    var audio_fold = './res/audio/english/fold.ogg';
    var audio_raise = './res/audio/english/raise.ogg';
} else {
    var audio_round_clear_0 = './res/audio/chinese/avatar0.ogg';
    var audio_round_clear_1 = './res/audio/chinese/avatar1.ogg';
    var audio_round_clear_2 = './res/audio/chinese/avatar2.ogg';
    var audio_round_clear_3 = './res/audio/chinese/avatar3.ogg';
    var audio_round_clear_4 = './res/audio/chinese/avatar4.ogg';
    var audio_round_clear_5 = './res/audio/chinese/avatar5.ogg';
    var audio_round_clear_6 = './res/audio/chinese/avatar6.ogg';
    var audio_round_clear_7 = './res/audio/chinese/avatar7.ogg';
    var audio_round_clear_8 = './res/audio/chinese/avatar8.ogg';
    var audio_round_clear_9 = './res/audio/chinese/avatar9.ogg';
    var audio_round_clear_10 = './res/audio/chinese/avatar10.ogg';
    var audio_round_clear_11 = './res/audio/chinese/avatar11.ogg';
    var audio_round_clear_12 = './res/audio/chinese/avatar12.ogg';
    var audio_round_clear_13 = './res/audio/chinese/avatar13.ogg';
    var audio_round_clear_14 = './res/audio/chinese/avatar14.ogg';
    var audio_round_clear_15 = './res/audio/chinese/avatar15.ogg';

    var audio_allin_0 = './res/audio/chinese/avatar0_allin.ogg';
    var audio_allin_1 = './res/audio/chinese/avatar1_allin.ogg';
    var audio_allin_2 = './res/audio/chinese/avatar2_allin.ogg';
    var audio_allin_3 = './res/audio/chinese/avatar3_allin.ogg';
    var audio_allin_4 = './res/audio/chinese/avatar4_allin.ogg';
    var audio_allin_5 = './res/audio/chinese/avatar5_allin.ogg';
    var audio_allin_6 = './res/audio/chinese/avatar6_allin.ogg';
    var audio_allin_7 = './res/audio/chinese/avatar7_allin.ogg';
    var audio_allin_8 = './res/audio/chinese/avatar8_allin.ogg';
    var audio_allin_9 = './res/audio/chinese/avatar9_allin.ogg';
    var audio_allin_10 = './res/audio/chinese/avatar10_allin.ogg';
    var audio_allin_11 = './res/audio/chinese/avatar11_allin.ogg';
    var audio_allin_12 = './res/audio/chinese/avatar12_allin.ogg';
    var audio_allin_13 = './res/audio/chinese/avatar13_allin.ogg';
    var audio_allin_14 = './res/audio/chinese/avatar14_allin.ogg';
    var audio_allin_15 = './res/audio/chinese/avatar15_allin.ogg';

    var audio_bet = './res/audio/chinese/bet.ogg';
    var audio_tick = './res/audio/tick.ogg';
    var audio_check_boy = './res/audio/chinese/check_boy.ogg';
    var audio_check_girl = './res/audio/chinese/check_girl.ogg';

    var audio_raise_0 = './res/audio/chinese/avatar0_raise.ogg';
    var audio_raise_1 = './res/audio/chinese/avatar1_raise.ogg';
    var audio_raise_2 = './res/audio/chinese/avatar2_raise.ogg';
    var audio_raise_3 = './res/audio/chinese/avatar3_raise.ogg';
    var audio_raise_4 = './res/audio/chinese/avatar4_raise.ogg';
    var audio_raise_5 = './res/audio/chinese/avatar5_raise.ogg';
    var audio_raise_6 = './res/audio/chinese/avatar6_raise.ogg';
    var audio_raise_7 = './res/audio/chinese/avatar7_raise.ogg';
    var audio_raise_8 = './res/audio/chinese/avatar8_raise.ogg';
    var audio_raise_9 = './res/audio/chinese/avatar9_raise.ogg';
    var audio_raise_10 = './res/audio/chinese/avatar10_raise.ogg';
    var audio_raise_11 = './res/audio/chinese/avatar11_raise.ogg';
    var audio_raise_12 = './res/audio/chinese/avatar12_raise.ogg';
    var audio_raise_13 = './res/audio/chinese/avatar13_raise.ogg';
    var audio_raise_14 = './res/audio/chinese/avatar14_raise.ogg';
    var audio_raise_15 = './res/audio/chinese/avatar15_raise.ogg';

    var audio_call_0 = './res/audio/chinese/avatar0_call.ogg';
    var audio_call_1 = './res/audio/chinese/avatar1_call.ogg';
    var audio_call_2 = './res/audio/chinese/avatar2_call.ogg';
    var audio_call_3 = './res/audio/chinese/avatar3_call.ogg';
    var audio_call_4 = './res/audio/chinese/avatar4_call.ogg';
    var audio_call_5 = './res/audio/chinese/avatar5_call.ogg';
    var audio_call_6 = './res/audio/chinese/avatar6_call.ogg';
    var audio_call_7 = './res/audio/chinese/avatar7_call.ogg';
    var audio_call_8 = './res/audio/chinese/avatar8_call.ogg';
    var audio_call_9 = './res/audio/chinese/avatar9_call.ogg';
    var audio_call_10 = './res/audio/chinese/avatar10_call.ogg';
    var audio_call_11 = './res/audio/chinese/avatar11_call.ogg';
    var audio_call_12 = './res/audio/chinese/avatar12_call.ogg';
    var audio_call_13 = './res/audio/chinese/avatar13_call.ogg';
    var audio_call_14 = './res/audio/chinese/avatar14_call.ogg';
    var audio_call_15 = './res/audio/chinese/avatar15_call.ogg';

    var audio_fold_0 = './res/audio/chinese/avatar0_fold.ogg';
    var audio_fold_1 = './res/audio/chinese/avatar1_fold.ogg';
    var audio_fold_2 = './res/audio/chinese/avatar2_fold.ogg';
    var audio_fold_3 = './res/audio/chinese/avatar3_fold.ogg';
    var audio_fold_4 = './res/audio/chinese/avatar4_fold.ogg';
    var audio_fold_5 = './res/audio/chinese/avatar5_fold.ogg';
    var audio_fold_6 = './res/audio/chinese/avatar6_fold.ogg';
    var audio_fold_7 = './res/audio/chinese/avatar7_fold.ogg';
    var audio_fold_8 = './res/audio/chinese/avatar8_fold.ogg';
    var audio_fold_9 = './res/audio/chinese/avatar9_fold.ogg';
    var audio_fold_10 = './res/audio/chinese/avatar10_fold.ogg';
    var audio_fold_11 = './res/audio/chinese/avatar11_fold.ogg';
    var audio_fold_12 = './res/audio/chinese/avatar12_fold.ogg';
    var audio_fold_13 = './res/audio/chinese/avatar13_fold.ogg';
    var audio_fold_14 = './res/audio/chinese/avatar14_fold.ogg';
    var audio_fold_15 = './res/audio/chinese/avatar15_fold.ogg';
}

var audio_deal = './res/audio/deal.ogg';
var audio_round_clear = './res/audio/round_clear.ogg';
var audio_win = './res/audio/win.ogg';

var audioMap = new Map();
if (ver === VER_ENGLISH) {
    audioMap.set('allin', audio_allin);
    audioMap.set('bet', audio_bet);
    audioMap.set('call', audio_call);
    audioMap.set('check', audio_check);
    audioMap.set('fold', audio_fold);
    audioMap.set('raise', audio_raise);
} else {
    audioMap.set('audio_allin_0', audio_allin_0);
    audioMap.set('audio_allin_1', audio_allin_1);
    audioMap.set('audio_allin_2', audio_allin_2);
    audioMap.set('audio_allin_3', audio_allin_3);
    audioMap.set('audio_allin_4', audio_allin_4);
    audioMap.set('audio_allin_5', audio_allin_5);
    audioMap.set('audio_allin_6', audio_allin_6);
    audioMap.set('audio_allin_7', audio_allin_7);
    audioMap.set('audio_allin_8', audio_allin_8);
    audioMap.set('audio_allin_9', audio_allin_9);
    audioMap.set('audio_allin_10', audio_allin_10);
    audioMap.set('audio_allin_11', audio_allin_11);
    audioMap.set('audio_allin_12', audio_allin_12);
    audioMap.set('audio_allin_13', audio_allin_13);
    audioMap.set('audio_allin_14', audio_allin_14);
    audioMap.set('audio_allin_15', audio_allin_15);

    audioMap.set('audio_bet', audio_bet);

    audioMap.set('audio_call_0', audio_call_0);
    audioMap.set('audio_call_1', audio_call_1);
    audioMap.set('audio_call_2', audio_call_2);
    audioMap.set('audio_call_3', audio_call_3);
    audioMap.set('audio_call_4', audio_call_4);
    audioMap.set('audio_call_5', audio_call_5);
    audioMap.set('audio_call_6', audio_call_6);
    audioMap.set('audio_call_7', audio_call_7);
    audioMap.set('audio_call_8', audio_call_8);
    audioMap.set('audio_call_9', audio_call_9);
    audioMap.set('audio_call_10', audio_call_10);
    audioMap.set('audio_call_11', audio_call_11);
    audioMap.set('audio_call_12', audio_call_12);
    audioMap.set('audio_call_13', audio_call_13);
    audioMap.set('audio_call_14', audio_call_14);
    audioMap.set('audio_call_15', audio_call_15);

    audioMap.set('audio_check_boy', audio_check_boy);
    audioMap.set('audio_check_girl', audio_check_girl);

    audioMap.set('audio_raise_0', audio_raise_0);
    audioMap.set('audio_raise_1', audio_raise_1);
    audioMap.set('audio_raise_2', audio_raise_2);
    audioMap.set('audio_raise_3', audio_raise_3);
    audioMap.set('audio_raise_4', audio_raise_4);
    audioMap.set('audio_raise_5', audio_raise_5);
    audioMap.set('audio_raise_6', audio_raise_6);
    audioMap.set('audio_raise_7', audio_raise_7);
    audioMap.set('audio_raise_8', audio_raise_8);
    audioMap.set('audio_raise_9', audio_raise_9);
    audioMap.set('audio_raise_10', audio_raise_10);
    audioMap.set('audio_raise_11', audio_raise_11);
    audioMap.set('audio_raise_12', audio_raise_12);
    audioMap.set('audio_raise_13', audio_raise_13);
    audioMap.set('audio_raise_14', audio_raise_14);
    audioMap.set('audio_raise_15', audio_raise_15);

    audioMap.set('audio_fold_0', audio_fold_0);
    audioMap.set('audio_fold_1', audio_fold_1);
    audioMap.set('audio_fold_2', audio_fold_2);
    audioMap.set('audio_fold_3', audio_fold_3);
    audioMap.set('audio_fold_4', audio_fold_4);
    audioMap.set('audio_fold_5', audio_fold_5);
    audioMap.set('audio_fold_6', audio_fold_6);
    audioMap.set('audio_fold_7', audio_fold_7);
    audioMap.set('audio_fold_8', audio_fold_8);
    audioMap.set('audio_fold_9', audio_fold_9);
    audioMap.set('audio_fold_10', audio_fold_10);
    audioMap.set('audio_fold_11', audio_fold_11);
    audioMap.set('audio_fold_12', audio_fold_12);
    audioMap.set('audio_fold_13', audio_fold_13);
    audioMap.set('audio_fold_14', audio_fold_14);
    audioMap.set('audio_fold_15', audio_fold_15);

    audioMap.set('audio_round_clear_0', audio_round_clear_0);
    audioMap.set('audio_round_clear_1', audio_round_clear_1);
    audioMap.set('audio_round_clear_2', audio_round_clear_2);
    audioMap.set('audio_round_clear_3', audio_round_clear_3);
    audioMap.set('audio_round_clear_4', audio_round_clear_4);
    audioMap.set('audio_round_clear_5', audio_round_clear_5);
    audioMap.set('audio_round_clear_6', audio_round_clear_6);
    audioMap.set('audio_round_clear_7', audio_round_clear_7);
    audioMap.set('audio_round_clear_8', audio_round_clear_8);
    audioMap.set('audio_round_clear_9', audio_round_clear_9);
    audioMap.set('audio_round_clear_10', audio_round_clear_10);
    audioMap.set('audio_round_clear_11', audio_round_clear_11);
    audioMap.set('audio_round_clear_12', audio_round_clear_12);
    audioMap.set('audio_round_clear_13', audio_round_clear_13);
    audioMap.set('audio_round_clear_14', audio_round_clear_14);
    audioMap.set('audio_round_clear_15', audio_round_clear_15);
}

// global resource list
var resources = [
    s_bg,
    s_winner_bg,
    s_dec_bottom,
    s_bg_board,
    s_bg_mm_2,
    s_avatar_panel_right,
    s_name_panel_right,
    s_avatar_panel_right_hl,
    s_name_panel_right_hl,
    s_avatar_mask_right,
    s_name_mask_right,
    s_avatar_panel_left,
    s_name_panel_left,
    s_avatar_panel_left_hl,
    s_name_panel_left_hl,
    s_avatar_mask_left,
    s_name_mask_left,
    s_chips,
    s_m_1st,
    s_m_2nd,
    s_m_3rd,
    s_winner,
    s_tm_logo,
    s_your_turn,
    s_start_button,
    s_start_button_pressed,
    s_start_button_disabled,
    s_stop_button,
    s_stop_button_pressed,
    s_stop_button_disabled,
    s_o_call_button,
    s_o_call_button_pressed,
    s_o_call_button_disabled,
    s_o_raise_button,
    s_o_raise_button_pressed,
    s_o_raise_button_disabled,
    s_o_check_button,
    s_o_check_button_pressed,
    s_o_check_button_disabled,
    s_o_fold_button,
    s_o_fold_button_pressed,
    s_o_fold_button_disabled,
    s_o_allin_button,
    s_o_allin_button_pressed,
    s_o_allin_button_disabled,
    s_o_bet_button,
    s_o_bet_button_pressed,
    s_o_bet_button_disabled,
    s_o_reload_button,
    s_o_reload_button_pressed,
    s_o_reload_button_disabled,
    s_o_spinner,
    s_o_arrow_up,
    s_o_arrow_up_pressed,
    s_o_arrow_up_disabled,
    s_o_arrow_down,
    s_o_arrow_down_pressed,
    s_o_arrow_down_disabled,
    s_a_avatar_0,
    s_a_avatar_1,
    s_a_avatar_2,
    s_a_avatar_3,
    s_a_avatar_4,
    s_a_avatar_5,
    s_a_avatar_6,
    s_a_avatar_7,
    s_a_avatar_8,
    s_a_avatar_9,
    s_a_avatar_a,
    s_a_avatar_b,
    s_a_avatar_c,
    s_a_avatar_d,
    s_a_avatar_e,
    s_a_avatar_f,
    s_p_2C,
    s_p_2D,
    s_p_2H,
    s_p_2S,
    s_p_3C,
    s_p_3D,
    s_p_3H,
    s_p_3S,
    s_p_4C,
    s_p_4D,
    s_p_4H,
    s_p_4S,
    s_p_5C,
    s_p_5D,
    s_p_5H,
    s_p_5S,
    s_p_6C,
    s_p_6D,
    s_p_6H,
    s_p_6S,
    s_p_7C,
    s_p_7D,
    s_p_7H,
    s_p_7S,
    s_p_8C,
    s_p_8D,
    s_p_8H,
    s_p_8S,
    s_p_9C,
    s_p_9D,
    s_p_9H,
    s_p_9S,
    s_p_TC,
    s_p_TD,
    s_p_TH,
    s_p_TS,
    s_p_JC,
    s_p_JD,
    s_p_JH,
    s_p_JS,
    s_p_QC,
    s_p_QD,
    s_p_QH,
    s_p_QS,
    s_p_KC,
    s_p_KD,
    s_p_KH,
    s_p_KS,
    s_p_AC,
    s_p_AD,
    s_p_AH,
    s_p_AS,
    s_p_empty,
    s_p_back,
    s_p_mask,
    action_empty,
    action_allin,
    action_bet_left,
    action_call_left,
    action_check_left,
    action_fold_left,
    action_raise_left,
    action_bet_right,
    action_call_right,
    action_check_right,
    action_fold_right,
    action_raise_right,
    action_sb_left,
    action_bb_left,
    action_sb_right,
    action_bb_right,
    audio_deal,
    audio_round_clear,
    audio_win,
    audio_tick
    ];

// add audio resource to preload list
var audioRes = audioMap.values();
resources = resources.concat(audioRes);
