import { BoardCell, ChessBoard, PieceColor } from "~/routes/game";
type PositionTuple = [number, number];

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
 * @param piece the chosen piece the user clicked on
 * @param board the state of the board
 * @returns an array of tuples with all the legal cells that are open for the player: [ [1,2]-[rowIndex, columnIndex] ]
 */

export function getOpenPositions(
  cell: {
    rowIndex: number;
    columnIndex: number;
    piece: string | null;
    pieceColor: PieceColor;
  },
  board: ChessBoard | null,
) {
  let { pieceColor, piece, rowIndex, columnIndex } = cell;
  let positionsArray: PositionTuple[] = [];
  if (!board) {
    return [];
  }
  if (!pieceColor) {
    return [];
  }

  if (pieceColor === "black") {
    if (piece === "pawn") {
      // checking diagnols
      if (rowIndex !== 7) {
        if (columnIndex > 0) {
          let leftDiagnolPiece = board[rowIndex + 1][columnIndex - 1].piece;
          let leftDiagnolPieceWhite =
            board[rowIndex + 1][columnIndex - 1].pieceColor === "white";
          if (leftDiagnolPiece && leftDiagnolPieceWhite) {
            positionsArray.push([rowIndex + 1, columnIndex - 1]);
          }
          let rightDiagnolPiece = board[rowIndex + 1][columnIndex + 1].piece;
          let rightDiagnolPieceWhite =
            board[rowIndex + 1][columnIndex + 1].pieceColor === "white";
          if (rightDiagnolPiece && rightDiagnolPieceWhite) {
            positionsArray.push([rowIndex + 1, columnIndex + 1]);
          }
        }
      }
      let isBlockedNext = board[rowIndex + 1][columnIndex].piece;
      if (isBlockedNext) {
        return positionsArray;
      }
      //checking if can go 2 moves (first not blocked)
      if (rowIndex === 1) {
        let isBlockedSecond = board[3][columnIndex].piece;
        console.log("isBlockedSecond", isBlockedSecond);
        if (isBlockedSecond) {
          positionsArray.push([2, columnIndex]);
          return positionsArray;
        }
        positionsArray.push([2, columnIndex]);
        positionsArray.push([3, columnIndex]);
        return positionsArray;
      }
    }
  }
}

export function copyBoard(board: ChessBoard): ChessBoard {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function movePiece(
  cell: BoardCell,
  destination: { rowIndex: number; columnIndex: number },
  board: ChessBoard,
) {
  let { rowIndex, columnIndex, piece, pieceColor } = cell;
  board[destination.rowIndex][destination.columnIndex].piece = piece;
  board[destination.rowIndex][destination.columnIndex].pieceColor = pieceColor;
  board[rowIndex][columnIndex].piece = "";
  board[rowIndex][columnIndex].pieceColor = "";
  return board;
}
