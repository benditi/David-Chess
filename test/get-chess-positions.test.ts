import {
  PositionTuple,
  buildBoard,
  copyBoard,
  getChessOpenPositions,
} from "~/lib/board";
import { BoardCell } from "~/routes/game";
let initialBoard = buildBoard();

test("expect black to  have queen and king moves", () => {
  // Build the initial board
  let board = copyBoard(initialBoard);

  board[1][4].piece = null;
  board[1][4].pieceColor = "";
  board[3][4].piece = "pawn";
  board[3][4].pieceColor = "black";
  board[1][5].piece = null;
  board[1][5].pieceColor = "";
  board[2][5].piece = "pawn";
  board[2][5].pieceColor = "black";

  // white moves (3 moves)
  board[7][1].piece = null;
  board[7][1].pieceColor = "";
  board[1][2].piece = "knight";
  board[1][2].pieceColor = "white";

  const results = getChessOpenPositions({ cell: board[0][4], board });

  const expectedResults: {
    cell: BoardCell;
    positions: PositionTuple[];
  }[] = [
    { cell: board[0][3], positions: [[1, 2]] },
    {
      cell: board[0][4],
      positions: [
        [1, 4],
        [1, 5],
      ],
    },
  ];
  expectedResults.forEach((expected) => {
    expect(results).toContainEqual(expected);
  });
  expect(results?.length).toBe(expectedResults.length);
});
