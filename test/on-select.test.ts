import { expect, test } from "vitest";
import { buildBoard, onSelectCell } from "~/lib/board";

function sum(a: number, b: number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

let initialBoard = buildBoard();
console.log(
  "test",
  onSelectCell(
    { rowIndex: 1, columnIndex: 1, pieceColor: "white", piece: "pawn" },
    initialBoard,
  ),
);

test("expect pawn on b to have positions: [2,1], [3,1]", () => {
  expect(
    onSelectCell(
      { rowIndex: 1, columnIndex: 1, pieceColor: "white", piece: "pawn" },
      initialBoard,
    ),
  ).toStrictEqual([
    [2, 1],
    [3, 1],
  ]);
});
