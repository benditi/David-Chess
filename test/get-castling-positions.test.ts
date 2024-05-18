import { expect, test } from "vitest";

import {
  buildBoard,
  copyBoard,
  getCastlingPositions,
  getOpenPositions,
  movePiece,
} from "~/lib/board";

let initialBoard = buildBoard();

test("expect white player to have no castling positions : []", () => {
  const results = getCastlingPositions(
    { rowIndex: 1, columnIndex: 1, pieceColor: "black", piece: "pawn" },
    initialBoard,
    { hasKingMoved: false, hasLeftRookMoved: false, hasRightRookMoved: false },
  );
  expect(results).toEqual([]);
});
