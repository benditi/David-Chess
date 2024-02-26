import { expect, test } from "vitest";
import {
  buildBoard,
  copyBoard,
  getOpenPositions,
  movePiece,
} from "~/lib/board";

let initialBoard = buildBoard();

test("expect pawn on b to have positions: [2,1], [3,1]", () => {
  const results = getOpenPositions(
    { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
    initialBoard,
  );
  expect(results).toContainEqual([3, 1]);
  expect(results).toContainEqual([2, 1]);
});

let secondBoard = copyBoard(initialBoard);
secondBoard[3][1].piece = "pawn";
secondBoard[3][1].pieceColor = "white";
secondBoard[3][1].columnIndex = 1;
secondBoard[3][1].rowIndex = 3;

test("expect pawn on b to have positions: [2,1] when [3,1] is occupied", () => {
  expect(
    getOpenPositions(
      { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
      secondBoard,
    ),
  ).toStrictEqual([[2, 1]]);
});
test("expect pawn on b to have positions: [2,1] when [3,1] is occupied", () => {
  expect(
    getOpenPositions(
      { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
      secondBoard,
    ),
  ).toStrictEqual([[2, 1]]);
});

let thirdBoard = copyBoard(initialBoard);
thirdBoard[3][1].piece = "pawn";
thirdBoard[3][1].pieceColor = "white";
thirdBoard[6][1].piece = "";
thirdBoard[6][1].pieceColor = "";
thirdBoard[6][2].piece = "";
thirdBoard[6][2].pieceColor = "";
thirdBoard[2][0].piece = "pawn";
thirdBoard[2][0].pieceColor = "white";

test("expect pawn on b to have positions: [2,1], [2,0] when [3,1] is occupied and [2,0] is with a white piece", () => {
  const results = getOpenPositions(
    { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
    thirdBoard,
  );
  expect(results).toContainEqual([2, 0]);
  expect(results).toContainEqual([2, 1]);
});

let fourthBoard = copyBoard(initialBoard);
movePiece(fourthBoard[6][0], { rowIndex: 4, columnIndex: 0 }, fourthBoard);

test("expect white pawn on [4,0]  to have positions: [3,0] when no piece in fron", () => {
  expect(
    getOpenPositions(
      { rowIndex: 4, columnIndex: 0, pieceColor: "white", piece: "pawn" },
      fourthBoard,
    ),
  ).toStrictEqual([[3, 0]]);
});

let fifthBoard = copyBoard(initialBoard);

test("expect white pawn on [6,0] to have positions: [5,0], [4,0] for initial forward movement", () => {
  expect(
    getOpenPositions(
      { rowIndex: 6, columnIndex: 0, pieceColor: "white", piece: "pawn" },
      fifthBoard,
    ),
  ).toStrictEqual([
    [5, 0],
    [4, 0],
  ]);
});
let sixthBoard = copyBoard(initialBoard);
movePiece(sixthBoard[6][0], { rowIndex: 0, columnIndex: 0 }, sixthBoard);

test("expect white pawn on [0,0] at the edge to have no forward positions", () => {
  expect(
    getOpenPositions(
      { rowIndex: 0, columnIndex: 0, pieceColor: "white", piece: "pawn" },
      sixthBoard,
    ),
  ).toStrictEqual([]);
});

let seventhBoard = copyBoard(initialBoard);
seventhBoard[0][7].piece = "pawn";
seventhBoard[0][7].pieceColor = "white";

test("expect white pawn on [0,7] at the edge to have no forward positions", () => {
  expect(
    getOpenPositions(
      { rowIndex: 0, columnIndex: 7, pieceColor: "white", piece: "pawn" },
      seventhBoard,
    ),
  ).toStrictEqual([]);
});

let eighthBoard = copyBoard(initialBoard);
movePiece(eighthBoard[1][0], { rowIndex: 7, columnIndex: 0 }, eighthBoard);
test("expect black pawn on [7,0] at the edge to have no forward positions", () => {
  expect(
    getOpenPositions(
      { rowIndex: 7, columnIndex: 0, pieceColor: "black", piece: "pawn" },
      eighthBoard,
    ),
  ).toStrictEqual([]);
});

test("expect black's bishop (white diagnol) on [3,3] to have diagonal movement options", () => {
  let board = copyBoard(initialBoard); // Copy the initial board state
  board[1][0].piece = null; // Simulate an occupied cell by removing the piece from [0,6]
  board[0][6].piece = "pawn"; // Simulate a pawn at [0,6] to prevent bishop movement there
  board[0][2].piece = null; // Ensure no three black bishops
  board[3][3].piece = "bishop";
  board[3][3].pieceColor = "black";
  const results = getOpenPositions(
    { rowIndex: 3, columnIndex: 3, pieceColor: "black", piece: "bishop" },
    board, // Use the adjusted board state
  );
  const expectedResults = [
    [2, 2],
    [2, 4],
    [4, 2],
    [5, 1],
    [6, 0],
    [4, 4],
    [5, 5],
    [6, 6],
  ];

  // Check that each expected result is contained in the actual results
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });

  // Ensure that the number of actual results matches the number of expected results
  expect(results?.length).toBe(expectedResults.length);
});

test("expect black's bishop (black diagnol) on [3,2] to have some diagonal movement options blocked by white pawn", () => {
  let board = copyBoard(initialBoard);
  board[5][0].piece = ""; // Move black bishop
  board[5][0].pieceColor = "";
  board[3][2].piece = "bishop"; // Place a black bishop
  board[3][2].pieceColor = "black";
  board[6][3].piece = ""; // Move white pawn
  board[6][3].pieceColor = "";
  board[4][3].piece = "pawn"; // Place a white pawn
  board[4][3].pieceColor = "white";
  const results = getOpenPositions(board[3][2], board);
  const expectedResults = [
    [2, 1],
    [2, 3],
    [4, 1],
    [5, 0],
    [4, 3],
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});

test("expect bishop at corner to have diagonal movement options after removing blocking pieces", () => {
  let board = copyBoard(initialBoard); // Copy the initial board state
  board[0][0].piece = "bishop"; // Place a bishop at the corner
  board[0][0].pieceColor = "white"; // Ensure it's a white bishop
  // free diagnol from pieces
  board[1][1].piece = "";
  board[1][1].pieceColor = "";
  board[6][6].piece = "";
  board[6][6].pieceColor = "";
  board[7][7].piece = "";
  board[7][7].pieceColor = "";
  const results = getOpenPositions(
    { rowIndex: 0, columnIndex: 0, pieceColor: "white", piece: "bishop" },
    board,
  );
  const expectedResults = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});

test("expect white knight to have correct movement options after moving to [3,4]", () => {
  let board = copyBoard(initialBoard); // Copy the initial board state
  // Move the white knight to position [3,4]
  board[3][4].piece = "knight";
  board[3][4].pieceColor = "white";
  board[7][6].piece = null;
  board[7][6].pieceColor = "";

  // Get the open positions for the white knight at [3,4]
  const results = getOpenPositions(
    { rowIndex: 3, columnIndex: 4, pieceColor: "white", piece: "knight" },
    board,
  );
  const expectedResults = [
    [1, 3], // Knight's L-shape movement options
    [1, 5],
    [2, 2],
    [2, 6],
    [4, 2],
    [4, 6],
    [5, 3],
    [5, 5],
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});

test("expect white knight to have correct movement options after moving to [5,5] and after some pawn movments", () => {
  let board = copyBoard(initialBoard);
  board[5][5].piece = "knight";
  board[5][5].pieceColor = "white";
  board[7][6].piece = null;
  board[7][6].pieceColor = "";
  // move white pawn up the file
  board[6][3].piece = null;
  board[6][3].pieceColor = "";
  board[4][3].piece = "pawn";
  board[4][3].pieceColor = "white";
  // move black pawn up the file
  board[1][4].piece = null;
  board[1][4].pieceColor = "";
  board[3][4].piece = "pawn";
  board[3][4].pieceColor = "black";
  // move second black pawn up only 1 file
  board[1][6].piece = null;
  board[1][6].pieceColor = "";
  board[2][6].piece = "pawn";
  board[2][6].pieceColor = "black";
  // Get the open positions for the white knight at [5,5]
  // { rowIndex:5, columnIndex: 5, pieceColor: "white", piece: "knight" },
  const results = getOpenPositions(board[5][5], board);

  const expectedResults = [
    [3, 4],
    [3, 6],
    [4, 7],
    [7, 6],
    [6, 3],
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});

test("expect white rook to have correct movement options after moving to [4,3]", () => {
  let board = copyBoard(initialBoard);
  board[4][3].piece = "rook";
  board[4][3].pieceColor = "white";
  board[7][7].piece = null;
  board[7][7].pieceColor = "";

  // Get the open positions for the white rook at [4,3]
  // { rowIndex: 4, columnIndex: 4, pieceColor: "white", piece: "rook" },
  const results = getOpenPositions(board[4][3], board);
  const expectedResults = [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [1, 3], // rook can capture black pawn
    [2, 3],
    [3, 3],
    [5, 3],
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});

test("expect white queen to have correct movement options after moving to [4,3]", () => {
  let board = copyBoard(initialBoard);
  board[4][3].piece = "queen";
  board[4][3].pieceColor = "white";
  board[7][3].piece = null;
  board[7][3].pieceColor = "";

  // Get the open positions for the white queen at [4,3]
  const results = getOpenPositions(board[4][3], board);
  const expectedResults = [
    [1, 0],
    [1, 3],
    [1, 6],
    [2, 1],
    [2, 3],
    [2, 5],
    [3, 2],
    [3, 3],
    [3, 4],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [5, 2],
    [5, 3],
    [5, 4],
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});
test("expect white queen to have correct movement options after moving to [4,4] and a couple of black and white moves", () => {
  let board = copyBoard(initialBoard);
  board[4][4].piece = "queen";
  board[4][4].pieceColor = "white";
  board[7][3].piece = null;
  board[7][3].pieceColor = "";
  board[5][5].piece = "knight";
  board[5][5].pieceColor = "white";
  board[7][6].piece = null;
  board[7][6].pieceColor = "";
  board[3][3].piece = "pawn";
  board[3][3].pieceColor = "black";
  board[1][3].piece = null;
  board[1][3].pieceColor = "";
  board[2][5].piece = "knight"; //this movement shouldn't interfere the queen
  board[2][5].pieceColor = "black";
  board[0][6].piece = null;
  board[0][6].pieceColor = "";

  // Get the open positions for the white queen at [4,4]
  const results = getOpenPositions(board[4][4], board);
  const expectedResults = [
    [1, 4],
    [1, 7], // capture black pawn
    [2, 4],
    [2, 6],
    [3, 3], // capture black pawn
    [3, 4],
    [3, 5],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 5],
    [4, 6],
    [4, 7],
    [5, 3],
    [5, 4],
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});
