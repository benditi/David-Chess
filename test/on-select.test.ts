import { expect, test } from "vitest";
import {
  buildBoard,
  copyBoard,
  getOpenPositions,
  movePiece,
} from "~/lib/board";

let initialBoard = buildBoard();
// console.log(
//   "test",
//   getOpenPositions(
//     { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
//     initialBoard,
//   ),
// );

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

// console.log(
//   "test 2",
//   getOpenPositions(
//     { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
//     secondBoard,
//   ),
// );

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
      { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
      thirdBoard,
    ),
  ).toStrictEqual([[3, 0]]);
});
