/**
 * Created by dummy-team
 * 2017-09-12
 */

var currentTableNumber = 0;
var selectedPlayer = null;

$(document).ready(function () {
    initUI();
    initData();
});

function initUI() {
    $('#tables').select2({});

    $('#display_name_tip').tooltip();

    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd',
        minView: '2',
        maxView: '2'
    });

    var today = formatDate(new Date(), "yyyy-MM-dd");
    $('#dump_log_date').val(today);
}

function initData() {
    loadTables();
}

// data related functions
function loadTables() {
    $.ajax({
        url: '/table/list_tables',
        type: 'POST',
        dataType: 'json',
        data: {},
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                refreshTables(response.entity);
                if (0 === currentTableNumber) {
                    currentTableNumber = response.entity[0].tableNumber;
                    $('#table_number').val(currentTableNumber);
                    loadPlayersByTable();
                }
            } else {
                popUpHintDialog('获取游戏列表失败');
            }
        },
        error: function () {
            popUpHintDialog('获取游戏列表失败');
        }
    });
}

function loadPlayersByTable() {
    var url;
    url = '/player/get_players?tableNumber=' + currentTableNumber;
    var tableContainer = $('#player_table_container');
    tableContainer.empty();
    tableContainer.append('<table id="player_table" data-row-style="rowStyle"></table>');

    $('#player_table').bootstrapTable({
        method: 'get',
        url: url,
        cache: false,
        height: 530,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: true,
        showColumns: true,
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,
        singleSelect: true,
        showExport: true,
        exportDataType: 'all',
        exportTypes: ['txt', 'sql', 'excel'],
        columns: [{
            field: '',
            checkbox: true
        }, {
            field: 'plainName',
            title: '玩家名',
            align: 'left',
            valign: 'middle',
            sortable: true
        }, {
            field: '_id',
            title: 'ID',
            align: 'left',
            valign: 'middle',
            visible: false,
            sortable: true
        }, {
            field: 'playerName',
            title: 'Token',
            align: 'left',
            valign: 'middle',
            visible: true,
            sortable: true
        }, {
            field: 'displayName',
            title: '游戏名',
            align: 'left',
            valign: 'middle',
            sortable: true
        }, {
            field: 'tableNumber',
            title: '游戏桌号',
            align: 'left',
            valign: 'middle',
            sortable: true
        }]
    }).on('check.bs.table', function (e, row) {
        onPlayerSelected(row);
    }).on('uncheck.bs.table', function () {
        onPlayerUnselected();
    });
}

function onPlayerSelected(data) {
    selectedPlayer = data;
    $('#player_name').val(selectedPlayer.plainName);
    $('#display_name').val(selectedPlayer.displayName);
    $('#table_number').val(selectedPlayer.tableNumber);

    // show update and remove button
    $('#create_player_button').hide();
    $('#remove_player_button').show();
}

function onPlayerUnselected() {
    selectedPlayer = null;
    $('#player_name').val('');
    $('#table_number').val(currentTableNumber);
    $('#display_name').val('');

    // hide update and remove button
    $('#create_player_button').show();
    $('#remove_player_button').hide();
}

function onSelectedTableChanged() {
    currentTableNumber = $('#tables').val();
    if (0 !== currentTableNumber) {
        loadPlayersByTable();
        $('#table_number').val(currentTableNumber);
    }
}

// UI related functions
function refreshTables(tablesList) {
    var tables = $('#tables');
    tables
        .find('option')
        .remove()
        .end();

    if (tablesList.length > 0) {
        $.each(tablesList, function (i, table) {
            tables.append($('<option>', {
                value: table.tableNumber,
                text: table.tableNumber
            }));
        });
    } else {
        tables.append($('<option>', {
            value: 0,
            text: '请选择游戏桌号'
        }));
    }

    tables.select2({});
}

function updatePlayer() {
    var playerNameInput = $('#player_name');
    var tableNumberInput = $('#table_number');
    var displayNameInput = $('#display_name');

    var playerName = playerNameInput.val();
    var tableNumber = tableNumberInput.val();
    var displayName = displayNameInput.val();

    if (null === playerName ||
        null === tableNumber ||
        '' === playerName ||
        '' === tableNumber) {
        popUpHintDialog('玩家名或者游戏桌号为空');
        return;
    }

    if (null === displayName || "" === displayName) {
        displayName = playerName;
        displayNameInput.val(displayName);
    }

    if (null === selectedPlayer) {
        selectedPlayer = {};
    }
    selectedPlayer.playerName = playerName;
    selectedPlayer.displayName = displayName;
    selectedPlayer.tableNumber = tableNumber;

    $.ajax({
        url: '/player/update_player',
        type: 'POST',
        dataType: 'json',
        data: selectedPlayer,
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                popUpHintDialog('添加玩家成功');
                currentTableNumber = selectedPlayer.tableNumber;
                tableNumberInput.val(currentTableNumber);
                onPlayerUnselected();
                loadTables();
                loadPlayersByTable();
            } else if (response.status.code === 1) {
                popUpHintDialog('玩家已存在');
                currentTableNumber = selectedPlayer.tableNumber;
                tableNumberInput.val(currentTableNumber);
                onPlayerUnselected();
                loadTables();
                loadPlayersByTable();
            }
        },
        error: function () {
            popUpHintDialog('添加玩家失败');
            currentTableNumber = selectedPlayer.tableNumber;
            tableNumberInput.val(currentTableNumber);
            onPlayerUnselected();
            loadTables();
            loadPlayersByTable();
        }
    });
}

function removePlayer() {
    if (null === selectedPlayer) {
        popUpHintDialog('请选中一个玩家');
        return;
    }
    $.ajax({
        url: '/player/delete_player',
        type: 'POST',
        dataType: 'json',
        data: selectedPlayer,
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                onPlayerUnselected();
                loadTables();
                loadPlayersByTable();
            } else if (response.status.code === 1) {
                popUpHintDialog('删除玩家失败');
                onPlayerUnselected();
                loadTables();
                loadPlayersByTable();
            }
        },
        error: function () {
            popUpHintDialog('删除玩家失败');
            onPlayerUnselected();
            loadTables();
            loadPlayersByTable();
        }
    });
}

function popUpHintDialog(hint) {
    var textHint = $('#text_hint');
    textHint.empty();
    textHint.append(hint);
    $('#hint_dialog').modal();
}