import { buildBoard, checkForCheckThreat, copyBoard } from "~/lib/board";
let initialBoard = buildBoard();

test("expect white king to be threatened by black queen - fools mate", () => {
  // Build the initial board
  let board = copyBoard(initialBoard);

  board[6][5].piece = null;
  board[6][5].pieceColor = "";
  board[5][5].piece = "pawn";
  board[5][5].pieceColor = "white";
  board[6][6].piece = null;
  board[6][6].pieceColor = "";
  board[4][6].piece = "pawn";
  board[4][6].pieceColor = "white";
  //black moves
  board[1][4].piece = null;
  board[1][4].pieceColor = "";
  board[3][4].piece = "pawn";
  board[3][4].pieceColor = "black";
  board[0][3].piece = null;
  board[0][3].pieceColor = "";
  board[4][7].piece = "queen";
  board[4][7].pieceColor = "black";

  // Check if the black king at [7,4] is threatened
  const isThreatened = checkForCheckThreat({
    cell: board[7][4],
    board,
  });

  // Expected result: The white king should be threatened by the black queen
  expect(isThreatened).toBe(true);
});

test("expect white king to be threatened by black bishop", () => {
  // Build the initial board
  let board = copyBoard(initialBoard);

  board[6][3].piece = null;
  board[6][3].pieceColor = "";
  board[4][3].piece = "pawn";
  board[4][3].pieceColor = "white";
  //white captures black pawn
  board[4][3].piece = null;
  board[4][3].pieceColor = "";
  board[3][4].piece = "pawn";
  board[3][4].pieceColor = "white";
  //black moves
  board[1][4].piece = null;
  board[1][4].pieceColor = "";
  board[3][4].piece = "pawn";
  board[3][4].pieceColor = "black";
  board[0][5].piece = null;
  board[0][5].pieceColor = "";
  board[4][1].piece = "bishop";
  board[4][1].pieceColor = "black";

  // Check if the white king at [7,4] is threatened
  const isThreatened = checkForCheckThreat({
    cell: board[7][4],
    board,
  });

  // Expected result: The white king should be threatened by the white bishop
  expect(isThreatened).toBe(true);
});
test("expect no chess on black and white kings in initial position", () => {
  // Build the initial board
  let board = copyBoard(initialBoard);

  // Check if the black king at [7,4] is threatened
  const isWhiteThreatened = checkForCheckThreat({
    cell: board[7][4],
    board,
  });
  const isBlackThreatened = checkForCheckThreat({
    cell: board[0][4],
    board,
  });

  // Expected result: The black king should be threatened by the white rook
  expect(isWhiteThreatened).toBe(false);
  expect(isBlackThreatened).toBe(false);
});
test("expect black king to be threatend by white pawn", () => {
  // Build the initial board
  let board = copyBoard(initialBoard);

  board[1][4].piece = null;
  board[1][4].pieceColor = "";
  board[3][4].piece = "pawn";
  board[3][4].pieceColor = "white";
  board[0][4].piece = null;
  board[0][4].pieceColor = "";
  board[1][4].piece = "king";
  board[1][4].pieceColor = "white";
  // white moves
  board[6][3].piece = null;
  board[6][3].pieceColor = "";
  board[2][3].piece = "pawn";
  board[2][3].pieceColor = "white";

  // Check if the white king at [1,4] is threatened
  const isWhiteThreatened = checkForCheckThreat({
    cell: board[1][4],
    board,
  });

  // Expected result: The black king should be threatened by the white pawn
  expect(isWhiteThreatened).toBe(true);
});

test("expect white king to be threatend by black rook (straight right threat)", () => {
  // Build the initial board
  let board = copyBoard(initialBoard);

  board[1][0].piece = null;
  board[1][0].pieceColor = "";
  board[3][0].piece = "pawn";
  board[3][0].pieceColor = "black";
  board[0][0].piece = null;
  board[0][0].pieceColor = "";
  board[5][1].piece = "rook";
  board[5][1].pieceColor = "black";

  // white moves
  board[6][4].piece = null;
  board[6][4].pieceColor = "";
  board[4][4].piece = "pawn";
  board[4][4].pieceColor = "white";
  board[6][3].piece = null;
  board[6][3].pieceColor = "";
  board[4][3].piece = "pawn";
  board[4][3].pieceColor = "white";
  board[7][4].piece = null;
  board[7][4].pieceColor = "";
  board[5][4].piece = "king";
  board[5][4].pieceColor = "white";
  // Check if the white king at [5,4] is threatened
  const isWhiteThreatened = checkForCheckThreat({
    cell: board[5][4],
    board,
  });

  // Expected result: The white king should be threatened by the black rook
  expect(isWhiteThreatened).toBe(true);
});
