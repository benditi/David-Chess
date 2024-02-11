import { BoardCell, ChessBoard, PieceColor } from "~/routes/game";
export type PositionTuple = [number, number];

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

  if (piece === "pawn") {
    let rowMovementDirection = pieceColor === "black" ? 1 : -1;
    console.log("rowMovementDirection", rowMovementDirection);

    // checking edge rows
    if (
      (rowIndex === 0 && pieceColor === "white") ||
      (rowIndex === 7 && pieceColor === "black")
    ) {
      return [];
    }
    // checking diagnols
    if (columnIndex > 0) {
      let leftDiagnolPiece =
        board[rowIndex + rowMovementDirection][columnIndex - 1].piece;
      let leftDiagnolOppositeColor =
        board[rowIndex + rowMovementDirection][columnIndex - 1].pieceColor !==
        pieceColor;
      if (leftDiagnolPiece && leftDiagnolOppositeColor) {
        positionsArray.push([rowIndex + rowMovementDirection, columnIndex - 1]);
      }
      let rightDiagnolPiece =
        board[rowIndex + rowMovementDirection][columnIndex + 1].piece;
      let rightDiagnolOppositeColor =
        board[rowIndex + rowMovementDirection][columnIndex + 1].pieceColor !==
        pieceColor;
      if (rightDiagnolPiece && rightDiagnolOppositeColor) {
        positionsArray.push([rowIndex + rowMovementDirection, columnIndex + 1]);
      }
    }

    //
    let isBlockedNext =
      board[rowIndex + rowMovementDirection][columnIndex].piece;
    if (isBlockedNext) {
      return positionsArray;
    }
    positionsArray.push([rowIndex + rowMovementDirection, columnIndex]);
    //checking if can go 2 moves (first not blocked)
    if (
      (rowIndex === 1 && pieceColor === "black") ||
      (rowIndex === 6 && pieceColor === "white")
    ) {
      let twoStepsIdx = rowIndex + 2 * rowMovementDirection;
      let isBlockedSecond = board[twoStepsIdx][columnIndex].piece;
      if (isBlockedSecond) {
        return positionsArray;
      }
      positionsArray.push([twoStepsIdx, columnIndex]);
    }
    return positionsArray;
  }
  if (piece === "bishop") {
    // bottom left
    for (
      let i = rowIndex - 1, j = columnIndex - 1;
      i >= 0 && j >= 0;
      i--, j--
    ) {
      console.log("bottom left i,j", i, j);
      if (board[i][j].piece) {
        if (board[i][j].pieceColor !== pieceColor) {
          positionsArray.push([i, j]);
        }
        break;
      } else {
        positionsArray.push([i, j]);
      }
    }
    // bottom right
    for (
      let i = rowIndex - 1, j = columnIndex + 1;
      i >= 0 && j <= 7;
      i--, j++
    ) {
      console.log("bottom right i,j", i, j);
      if (board[i][j].piece) {
        if (board[i][j].pieceColor !== pieceColor) {
          positionsArray.push([i, j]);
        }
        break;
      } else {
        positionsArray.push([i, j]);
      }
    }
    // top left
    for (
      let i = rowIndex + 1, j = columnIndex - 1;
      i <= 7 && j >= 0;
      i++, j--
    ) {
      console.log("top left i,j", i, j);
      if (board[i][j].piece) {
        if (board[i][j].pieceColor !== pieceColor) {
          positionsArray.push([i, j]);
        }
        break;
      } else {
        positionsArray.push([i, j]);
      }
    }
    // top right
    for (
      let i = rowIndex + 1, j = columnIndex + 1;
      i <= 7 || j <= 7;
      i++, j++
    ) {
      console.log("top right i,j", i, j);

      if (board[i][j].piece) {
        if (board[i][j].pieceColor !== pieceColor) {
          positionsArray.push([i, j]);
        }
        break;
      } else {
        positionsArray.push([i, j]);
      }
    }
    return positionsArray;
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
