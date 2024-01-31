import { ChessBoard, PieceColor } from "~/routes/game";

export function buildBoard() {
  let startBoard: ChessBoard = Array.from(Array(8).keys()).map(
    (row, rowIndex) =>
      Array.from(Array(8).keys()).map((cell, columnIndex) => ({
        rowIndex,
        columnIndex,
        piece: null,
        pieceColor: "",
      })),
  );

  startBoard.forEach((row, rowIdx) =>
    row.forEach((cell, cellIdx) => {
      if (rowIdx === 0) {
        if (cellIdx === 0 || cellIdx === 7) {
          cell.piece = "rook";
          cell.pieceColor = "black";
        } else if (cellIdx === 1 || cellIdx === 6) {
          cell.piece = "knight";
          cell.pieceColor = "black";
        } else if (cellIdx === 2 || cellIdx === 5) {
          cell.piece = "bishop";
          cell.pieceColor = "black";
        } else if (cellIdx === 4) {
          cell.piece = "king";
          cell.pieceColor = "black";
        } else {
          cell.piece = "queen";
          cell.pieceColor = "black";
        }
      }
      if (rowIdx === 1) {
        cell.piece = "pawn";
        cell.pieceColor = "black";
      }
      if (rowIdx === 6) {
        cell.piece = "pawn";
        cell.pieceColor = "white";
      }
      if (rowIdx === 7) {
        if (cellIdx === 0 || cellIdx === 7) {
          cell.piece = "rook";
          cell.pieceColor = "white";
        } else if (cellIdx === 1 || cellIdx === 6) {
          cell.piece = "knight";
          cell.pieceColor = "white";
        } else if (cellIdx === 2 || cellIdx === 5) {
          cell.piece = "bishop";
          cell.pieceColor = "white";
        } else if (cellIdx === 4) {
          cell.piece = "king";
          cell.pieceColor = "white";
        } else {
          cell.piece = "queen";
          cell.pieceColor = "white";
        }
      }
    }),
  );
  return startBoard;
}

/**
 *
 * @param piece the chosen cell the user clicked on
 * @param board the state of the board
 * @returns an array of tupples with all the legal cells that are open for the player: [ [1,2]-[rowIndex, columnIndex] ]
 */

export function onSelectCell(
  cell: {
    rowIndex: number;
    columnIndex: number;
    piece: string | null;
    pieceColor: PieceColor;
  },
  board: ChessBoard | null,
) {
  let { pieceColor, piece, rowIndex, columnIndex } = cell;
  if (!pieceColor) {
    return [];
  }
  if (pieceColor === "white") {
    if (piece === "pawn") {
      //checking if can go to moves
      if (columnIndex === 1) {
        return [
          [2, columnIndex],
          [3, columnIndex],
        ];
      }
    }
  }
}
