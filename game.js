// internal helpers
function positionIsEmptyInBoard(position, board) {
  /* 
   * Checks if given position is empty ("-") in the board.

   * :param position: Two-elements array representing a
   *                  position in the board. Example: [0, 1]
   * :param board: Game board.

   * Returns True if given position is empty, False otherwise.
   */ 
   
   if(board[position[0]][position[1]] == "-"){
			return true;
    }else{
			return false;
	}
  
}

function positionIsValid(position) {
  /* 
   * Checks if given position is a valid. To consider a position as valid, it
   * must be a two-elements tuple, containing values from 0 to 2.
   * Examples of valid positions: (0,0), (1,0)
   * Examples of invalid positions: (0,0,1), (9,8), False

   * :param position: Two-elements tuple representing a
   *                  position in the board. Example: (0, 1)

   * Returns True if given position is valid, False otherwise.
   */ 
 
if ( typeof (position) !== "object" )
	return false;

if ( position.length >= 3 )
	return false;

//return ( position[0] >= 0 && position[0] <= 2 && position[1] >= 0 && position[1] <= 2 ); 
 
if( position[0] >= 0 && position[0] <= 2 && position[1] >= 0 && position[1] <= 2 ){
			return true;
    }else{
			return false;
	}
 
}

function boardIsFull(board) {
  /*
   * Returns True if all positions in given board are occupied.
   * :param board: Game board.
   */ 
   
   for (var i = 0; i <= 2; i++) {
    for (var j = 0; j < 2; j++) {
		if(board[i][j] == "-"){
			return false;
    }
   }
   }
   return true;

}

function isWinningCombination(board, combination, player) {
  /* 
   * Checks if all 3 positions in given combination are occupied by given player.

   * :param board: Game board.
   * :param combination: Array containing three position elements.
   *                     Example: [[0,0], [0,1], [0,2]]

   * Returns True of all three positions in the combination belongs to given
   * player, False otherwise.
   */ 
   
   
   if ( board[ combination[0][0] ][ combination[0][1] ] == player && board[ combination[1][0] ][ combination[1][1] ] == player && board[ combination[2][0] ][ combination[2][1] ] == player ){
	  
		return true;
		
  }
  
  return false;
  
}


function CheckWinningCombinations(board, player) {
  /* 
   * There are 8 posible combinations (3 horizontals, 3, verticals and 2 diagonals)
   * to win the Tic-tac-toe game.
   * This helper loops through all these combinations and checks if any of them
   * belongs to the given player.

   * :param board: Game board.
   * :param player: One of the two playing players.

   * Returns the player (winner) of any of the winning combinations is completed
   * by given player, or undefined otherwise.
  */
  var winner = undefined;

//Check for Horizontals
  
  if ( board[0][0] == player && board[0][1] == player && board[0][2] == player){
	  
		return winner = player;
		
  }
  
  if ( board[1][0] == player && board[1][1] == player && board[1][2] == player){
	  
		return winner = player;
		
  }
 
 if ( board[2][0] == player && board[2][1] == player && board[2][2] == player){
	  
		return winner = player;
		
  }
  
//Check for Verticals
  
  if ( board[0][0] == player && board[1][0] == player && board[2][0] == player){
	  
		return winner = player;
		
  }
  
  if ( board[0][1] == player && board[1][1] == player && board[2][1] == player){
	  
		return winner = player;
		
  }
  
  if ( board[0][2] == player && board[1][2] == player && board[2][2] == player){
	  
		return winner = player;
		
  }
  
  //Check for Diagonals
  
  if ( board[0][0] == player && board[1][1] == player && board[2][2] == player){
	  
		return winner = player;
  }
  
  if ( board[0][2] == player && board[1][1] == player && board[2][0] == player){
	  
		return winner = player;
  }
  
}

// public interface
function startNewGame(player1, player2) {
  // this one's ready to use.

  // game object holds the game state.
  var game = {};
  game['player1'] = player1;
  game['player2'] = player2;
  game['board'] = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"]
  ];
  
  game['next_turn'] = player1;
  game['winner'] = undefined;
  
  return game;
}
 

function getWinner(game) {
  /*
   * Returns the winner player if any, or undefined otherwise.
   */
   if (CheckWinningCombinations(game.board, game.player1) == game.player1){
	   return game.player1;
   }
   
   if (CheckWinningCombinations(game.board, game.player2) == game.player2){
	   return game.player2;
   }
   
  return undefined;
}


function move(game, player, position) {
  /* 
   * Performs a player movement in the game. Must ensure all the pre requisites
   * checks before the actual movement is done.
   * After registering the movement it must check if the game is over.
   */
 if ( positionIsEmptyInBoard(position, game.board) == false ){
	   
	   return undefined;
	   
   }
   
  if  ( boardIsFull(board) == true ){
	  
	  return undefined;
	  
  }
  
  if ( positionIsValid(position) == false ){
	  
	  return undefined;
	  
  }
  
   
  if ( player != game.next_turn ){
	  
	  game.next_turn = player;
	  
  }
  
  
  game.board[ position[0] ] [ position[1] ] = player;  
  
  
 if  ( getWinner(game) == player ){
	 
	 game.winner = player;
	 
	return game.winner;
	
 }
  
  game.next_turn = GetNextTurn(game);
  
  return game;
   
}


function getBoardAsString(game) {
  /*
   * Returns a string representation of the game board in the current state.
   */
   
   var boardToString = game.board.toString();
   
   return boardToString;
}

function GetNextTurn(game) {
  /* 
   * Returns the player who plays next, or undefined if the game is already over.
   */
   if ( CheckWinningCombinations(game.board, game.next_turn) == undefined && boardIsFull(game.board) == false ){
	   
	   if (game.next_turn == game.player1){
		   
		   return game.player2;
		   
	   } else{
		   
		   return game.player1;
		   
	   }
	   
   }
   
   return undefined;
   
}

module.exports = {
  startNewGame: startNewGame,
  positionIsValid: positionIsValid,
  positionIsEmptyInBoard: positionIsEmptyInBoard,
  boardIsFull: boardIsFull,
  CheckWinningCombinations: CheckWinningCombinations,
  move: move,
  getWinner: getWinner,
  GetNextTurn: GetNextTurn,
}
