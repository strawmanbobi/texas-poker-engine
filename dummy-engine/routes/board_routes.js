/**
 * Created by Dummy team
 * 2017-12-02
 */

var app = require('../dummy.js');
var boardService = require('../rest_services/board_service');


app.post('/board/create_board', boardService.createBoard);
app.post('/board/update_board', boardService.updateBoard);
app.post('/board/delete_board', boardService.deleteBoard);
app.post('/board/list_boards', boardService.listBoards);
app.post('/board/list_active_boards', boardService.listActiveBoards);
app.post('/board/is_creator_board', boardService.isCreatorBoard);

app.get('/board/list_board_players', boardService.listBoardPlayers);