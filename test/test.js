let assert = require('assert');
let gameFuncs = require('../game.js');

describe("startNewGame", function () {
  it('Should return correct game object', function () {
    let newGame = gameFuncs.startNewGame('X', 'O');
    assert.deepEqual(
      newGame.board, 
      [[ '-', '-', '-' ], [ '-', '-', '-' ], [ '-', '-', '-' ]]
    );
    assert.equal(newGame.next_turn, 'X');
  });
});

describe("validPositions", function() {
  it("should be all valid", function() {
    let valid_positions = [
        [0,0], [0,1], [0,2],
        [1,0], [1,1], [1,2],
        [2,0], [2,1], [2,2],
    ]
    for (let item in valid_positions) {
      assert.equal(true, gameFuncs.positionIsValid(valid_positions[item]));
    }
  });
  it("should be invalid", function() {
    let invalidPositions = [
      [2,3], [3,2], [3,3], [9,9], [-1,-1], 1, "something", false, [0,0,0]
    ];
    for (let item in invalidPositions) {
      assert.equal(false, gameFuncs.positionIsValid(invalidPositions[item]));
    }
  });
});

describe("positionIsEmptyInBoard",  function() {
  it("should be empty position", function () {
    let newGame = gameFuncs.startNewGame("X", "O");
    empty_positions = [
      [0,0], [0,1], [0,2],
      [1,0], [1,1], [1,2],
      [2,0], [2,1], [2,2],
    ];
    for (let item in empty_positions) {
      assert.equal(
        true,
        gameFuncs.positionIsEmptyInBoard(empty_positions[item], newGame.board)
      );
    }
  });
});

describe("boardIsFull", function() {
  it("board should be full", function() {
    let board = [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["O", "X", "O"],
    ]
    assert.equal(true, gameFuncs.boardIsFull(board));
  });
  it("should not be full", function() {
    board = [
      ["X", "O", "O"],
      ["O", "-", "-"],
      ["O", "X", "O"],
    ]
    assert.equal(false, gameFuncs.boardIsFull(board));
  });
});

describe("checkWinningCombinations", function() {
  it("should not have winner", function() {
    board = [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["O", "X", "O"],
    ];
   assert.equal(undefined, gameFuncs.CheckWinningCombinations(board, "X"));
  });

  it("should have winner X", function() {
    board = [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["O", "O", "X"],
    ];
    assert.equal("X", gameFuncs.CheckWinningCombinations(board, "X"));
  });
  it("should have winner O", function() {
   board = [
      ["O", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ];
    assert.equal("O", gameFuncs.CheckWinningCombinations(board, "O"));
  });
});

describe("test play", function() {
  it("should have no winner", function() {
    // [
    //     ["X", "O", "X"],
    //     ["O", "O", "X"],
    //     ["X", "X", "O"],
    // ]
    let newGame = gameFuncs.startNewGame("X", "O");

    gameFuncs.move(newGame, "X", [0, 0]);
    gameFuncs.move(newGame, "O", [0, 1]);
    gameFuncs.move(newGame, "X", [0, 2]);
    gameFuncs.move(newGame, "O", [1, 0]);
    gameFuncs.move(newGame, "X", [1, 2]);
    gameFuncs.move(newGame, "O", [1, 1]);
    gameFuncs.move(newGame, "X", [2, 0]);
    gameFuncs.move(newGame, "O", [2, 2]);
    gameFuncs.move(newGame, "X", [2, 1]);
    
    assert.equal(gameFuncs.getWinner(newGame));
  });
});

describe("test get next turn", function() {
  it("should return correct player", function() {
    let newGame = gameFuncs.startNewGame("X", "O");
    gameFuncs.move(newGame, "X", [0, 0]);
    assert.equal(gameFuncs.GetNextTurn(newGame), "O");
    gameFuncs.move(newGame, "O", [0, 1]);
    assert.equal(gameFuncs.GetNextTurn(newGame), "X");
  });
});
