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
console.log("fourthBoard", fourthBoard);

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
console.log("eighthBoard", eighthBoard);
test("expect black pawn on [7,0] at the edge to have no forward positions", () => {
  expect(
    getOpenPositions(
      { rowIndex: 7, columnIndex: 0, pieceColor: "black", piece: "pawn" },
      eighthBoard,
    ),
  ).toStrictEqual([]);
});
