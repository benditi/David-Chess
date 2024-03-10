import { BoardCell, ChessBoard, PieceColor, PieceType } from "~/routes/game";
export type PositionTuple = [number, number];

type PositionProps = {
  cell: BoardCell;
  board: ChessBoard;
};

export type ChessMovement = {
  positions: PositionTuple[] | undefined;
  cell: BoardCell;
};

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

export function getOpenPositions(cell: BoardCell, board: ChessBoard | null) {
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
        board[rowIndex + rowMovementDirection][columnIndex - 1]?.piece;
      let leftDiagnolOppositeColor =
        board[rowIndex + rowMovementDirection][columnIndex - 1].pieceColor !==
        pieceColor;
      if (leftDiagnolPiece && leftDiagnolOppositeColor) {
        positionsArray.push([rowIndex + rowMovementDirection, columnIndex - 1]);
      }
      let rightDiagnolPiece =
        board[rowIndex + rowMovementDirection][columnIndex + 1]?.piece;
      let rightDiagnolOppositeColor =
        board[rowIndex + rowMovementDirection][columnIndex + 1]?.pieceColor !==
        pieceColor;
      if (rightDiagnolPiece && rightDiagnolOppositeColor) {
        positionsArray.push([rowIndex + rowMovementDirection, columnIndex + 1]);
      }
    }

    //
    let isBlockedNext =
      board[rowIndex + rowMovementDirection][columnIndex]?.piece;
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
      let isBlockedSecond = board[twoStepsIdx][columnIndex]?.piece;
      if (isBlockedSecond) {
        return positionsArray;
      }
      positionsArray.push([twoStepsIdx, columnIndex]);
    }
    return positionsArray;
  }
  if (piece === "bishop") {
    positionsArray = _getBishopPositions({ cell, board });
    return positionsArray;
  }
  if (piece === "knight") {
    for (let i = -2; i <= 2; i++) {
      if (i === 0) {
        continue;
      }
      let j = Math.abs(i) === 2 ? 1 : 2;
      let xIndex = rowIndex + i;
      if (xIndex < 0 || xIndex > 7) {
        continue;
      }
      let yIndex = columnIndex - j;
      if (0 <= yIndex && yIndex <= 7) {
        if (
          !board[xIndex][yIndex]?.piece ||
          board[xIndex][yIndex].pieceColor !== pieceColor
        ) {
          positionsArray.push([xIndex, yIndex]);
        }
      }
      yIndex = columnIndex + j;
      if (yIndex <= 7) {
        if (
          !board[xIndex][yIndex]?.piece ||
          board[xIndex][yIndex].pieceColor !== pieceColor
        ) {
          positionsArray.push([xIndex, yIndex]);
        }
      }
    }
    return positionsArray;
  }
  if (piece === "rook") {
    return _getRookPositions({ cell, board });
  }
  if (piece === "queen") {
    let rookPositions = _getRookPositions({ cell, board });
    let bishoPositions = _getBishopPositions({ cell, board });
    positionsArray = [...rookPositions, ...bishoPositions];
    return positionsArray;
  }
  if (piece === "king") {
    return _getKingPositions({ cell, board });
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
  board[rowIndex][columnIndex].piece = null;
  board[rowIndex][columnIndex].pieceColor = "";
  return board;
}

function _getRookPositions(props: PositionProps): PositionTuple[] {
  let positionsArray: PositionTuple[] = [];
  let { cell, board } = props;
  let { rowIndex, columnIndex, pieceColor } = cell;
  // down the file
  for (let i = rowIndex - 1; i >= 0; i--) {
    if (board[i][columnIndex].piece) {
      if (board[i][columnIndex].pieceColor !== pieceColor) {
        positionsArray.push([i, columnIndex]);
      }
      break;
    } else {
      positionsArray.push([i, columnIndex]);
    }
  }
  // up the file
  for (let i = rowIndex + 1; i <= 7; i++) {
    if (board[i][columnIndex].piece) {
      if (board[i][columnIndex].pieceColor !== pieceColor) {
        positionsArray.push([i, columnIndex]);
      }
      break;
    } else {
      positionsArray.push([i, columnIndex]);
    }
  }
  // right of file
  for (let i = columnIndex + 1; i <= 7; i++) {
    if (board[rowIndex][i].piece) {
      if (board[rowIndex][i].pieceColor !== pieceColor) {
        positionsArray.push([rowIndex, i]);
      }
      break;
    } else {
      positionsArray.push([rowIndex, i]);
    }
  }
  // left of file
  for (let i = columnIndex - 1; i >= 0; i--) {
    if (board[rowIndex][i].piece) {
      if (board[rowIndex][i].pieceColor !== pieceColor) {
        positionsArray.push([rowIndex, i]);
      }
      break;
    } else {
      positionsArray.push([rowIndex, i]);
    }
  }
  return positionsArray;
}

function _getBishopPositions(props: PositionProps): PositionTuple[] {
  let positionsArray: PositionTuple[] = [];
  let { cell, board } = props;
  let { rowIndex, columnIndex, pieceColor } = cell;
  // top left
  for (let i = rowIndex - 1, j = columnIndex - 1; i >= 0 && j >= 0; i--, j--) {
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
  for (let i = rowIndex - 1, j = columnIndex + 1; i >= 0 && j <= 7; i--, j++) {
    if (board[i][j].piece) {
      if (board[i][j].pieceColor !== pieceColor) {
        positionsArray.push([i, j]);
      }
      break;
    } else {
      positionsArray.push([i, j]);
    }
  }
  // bottom left
  if (rowIndex !== 7 && columnIndex !== 0) {
    for (
      let i = rowIndex + 1, j = columnIndex - 1;
      i <= 7 && j >= 0;
      i++, j--
    ) {
      if (board[i][j].piece) {
        if (board[i][j].pieceColor !== pieceColor) {
          positionsArray.push([i, j]);
        }
        break;
      } else {
        positionsArray.push([i, j]);
      }
    }
  }
  // bottom right
  if (rowIndex !== 7 && columnIndex !== 7) {
    for (
      let i = rowIndex + 1, j = columnIndex + 1;
      i <= 7 && j <= 7;
      i++, j++
    ) {
      if (board[i][j].piece) {
        if (board[i][j].pieceColor !== pieceColor) {
          positionsArray.push([i, j]);
        }
        break;
      } else {
        positionsArray.push([i, j]);
      }
    }
  }
  return positionsArray;
}

function _getKingPositions(props: PositionProps): PositionTuple[] {
  let positionsArray: PositionTuple[] = [];
  let { cell, board } = props;
  let { rowIndex, columnIndex, pieceColor } = cell;
  let i = rowIndex === 0 ? 0 : rowIndex - 1;

  for (; i < rowIndex + 2 && i < 8; i++) {
    let j = columnIndex === 0 ? 0 : columnIndex - 1;
    for (; j < columnIndex + 2 && j < 8; j++) {
      if (i === rowIndex && j === columnIndex) {
        continue;
      }
      if (!board[i][j].piece || board[i][j].pieceColor !== pieceColor) {
        positionsArray.push([i, j]);
      }
    }
  }
  return positionsArray;
}

/**
 * A function checking whether the chosen king is under chess
 * @param props board- the state ot the board, cell: the cell in which the selected king is
 * @returns a boolean noting whether the king is under threat (chess)
 */

export function checkForCheckThreat(props: PositionProps): boolean {
  let { cell, board } = props;
  let { rowIndex, columnIndex, pieceColor, piece } = cell;
  if (piece !== "king") {
    throw Error("checkForCheckThreat is not check on the k");
  }
  // checking diagnols
  // top left
  for (let i = rowIndex - 1, j = columnIndex - 1; i >= 0 && j >= 0; i--, j--) {
    let currentCell = board[i][j];
    if (currentCell.piece) {
      if (currentCell.pieceColor === pieceColor) {
        break;
      }
      // checking black pawn threat against black king
      else if (
        i === rowIndex - 1 &&
        j === columnIndex - 1 &&
        currentCell.piece === "pawn" &&
        currentCell.pieceColor === "black"
      ) {
        return true;
      } else if (
        currentCell.piece === "queen" ||
        currentCell.piece === "bishop"
      ) {
        return true;
      }
      break;
    }
  }
  // top right
  for (let i = rowIndex - 1, j = columnIndex + 1; i >= 0 && j <= 7; i--, j++) {
    let currentCell = board[i][j];
    if (currentCell.piece) {
      if (currentCell.pieceColor === pieceColor) {
        break;
      }
      // checking black pawn threat against black king
      else if (
        i === rowIndex - 1 &&
        j === columnIndex + 1 &&
        currentCell.piece === "pawn" &&
        currentCell.pieceColor === "black"
      ) {
        return true;
      } else if (
        currentCell.piece === "queen" ||
        currentCell.piece === "bishop"
      ) {
        return true;
      }
      //case any other piece is blocking diagnal, no threat
      break;
    }
  }
  // bottom left
  if (rowIndex !== 7 && columnIndex !== 0) {
    for (
      let i = rowIndex + 1, j = columnIndex - 1;
      i <= 7 && j >= 0;
      i++, j--
    ) {
      let currentCell = board[i][j];

      if (currentCell.piece) {
        if (currentCell.pieceColor === pieceColor) {
          break;
        }
        // checking white pawn threat against black king
        else if (
          i === rowIndex + 1 &&
          j === columnIndex - 1 &&
          currentCell.piece === "pawn" &&
          currentCell.pieceColor === "white"
        ) {
          return true;
        } else if (
          currentCell.piece === "queen" ||
          currentCell.piece === "bishop"
        ) {
          return true;
        }
        break;
      }
    }
  }
  // bottom right
  if (rowIndex !== 7 && columnIndex !== 7) {
    for (
      let i = rowIndex + 1, j = columnIndex + 1;
      i <= 7 && j <= 7;
      i++, j++
    ) {
      let currentCell = board[i][j];
      if (currentCell.piece) {
        if (currentCell.pieceColor === pieceColor) {
          break;
        }
        // checking white pawn threat against black king
        else if (
          i === rowIndex + 1 &&
          j === columnIndex + 1 &&
          currentCell.piece === "pawn" &&
          currentCell.pieceColor === "white"
        ) {
          return true;
        } else if (
          currentCell.piece === "queen" ||
          currentCell.piece === "bishop"
        ) {
          return true;
        }
      }
      break;
    }
  }
  //
  // checking straight directions
  // down the file
  for (let i = rowIndex - 1; i >= 0; i--) {
    let currentCell = board[i][columnIndex];
    if (currentCell.piece) {
      if (currentCell.pieceColor === pieceColor) {
        break;
      } else if (
        currentCell.piece === "rook" ||
        currentCell.piece === "queen"
      ) {
        return true;
      }
      break;
    }
  }
  // up the file
  for (let i = rowIndex + 1; i <= 7; i++) {
    let currentCell = board[i][columnIndex];

    if (currentCell.piece) {
      if (currentCell.pieceColor === pieceColor) {
        break;
      } else if (
        currentCell.piece === "rook" ||
        currentCell.piece === "queen"
      ) {
        return true;
      }
      break;
    }
  }
  // right of file
  for (let i = columnIndex + 1; i <= 7; i++) {
    let currentCell = board[rowIndex][i];
    if (currentCell.piece) {
      if (currentCell.pieceColor === pieceColor) {
        break;
      } else if (
        currentCell.piece === "rook" ||
        currentCell.piece === "queen"
      ) {
        return true;
      }
      break;
    }
  }
  // left of file
  for (let i = columnIndex - 1; i >= 0; i--) {
    let currentCell = board[rowIndex][i];
    if (currentCell.piece) {
      if (currentCell.pieceColor === pieceColor) {
        break;
      } else if (
        currentCell.piece === "rook" ||
        currentCell.piece === "queen"
      ) {
        return true;
      }
      break;
    }
  }
  //

  // check knight threat
  for (let i = -2; i <= 2; i++) {
    if (i === 0) {
      continue;
    }
    let j = Math.abs(i) === 2 ? 1 : 2;
    let xIndex = rowIndex + i;
    if (xIndex < 0 || xIndex > 7) {
      continue;
    }
    let yIndex = columnIndex - j;

    if (0 <= yIndex && yIndex <= 7) {
      if (
        board[xIndex][yIndex].piece === "knight" &&
        board[xIndex][yIndex].pieceColor !== pieceColor
      ) {
        return true;
      }
    }
    yIndex = columnIndex + j;
    if (yIndex <= 7) {
      if (
        board[xIndex][yIndex].piece === "knight" &&
        board[xIndex][yIndex].pieceColor !== pieceColor
      ) {
        return true;
      }
    }
  }
  //
  // if no threat detected returning false
  return false;
}
/**
 * a function that is trigered after a chess on the king which returns an array with all the legal moves the player can make.
 * @param props  board- the state ot the board, cell: the cell in which the selected king is threatened
 * @returns an array containing all movable pieces with all of thier legal positions. Empty array is returned if checkmate.
 */
export function getChessOpenPositions(props: PositionProps): ChessMovement[] {
  let { cell, board } = props;
  let { pieceColor, piece } = cell;
  if (piece !== "king") {
    throw Error("checkForCheckThreat is not check on the king");
  }
  let defenderPieces = board.flatMap((row) =>
    row.filter((cell) => cell.pieceColor === pieceColor),
  );
  // creating every open position for each piece and checking if there is still a check threat in the new position
  let results = defenderPieces
    .map((piece) => ({
      cell: piece,
      positions: getOpenPositions(piece, board),
    }))
    .map((piece) => ({
      ...piece,
      positions: piece.positions?.filter((position) => {
        let newBoard = copyBoard(board);
        movePiece(
          piece.cell,
          { rowIndex: position[0], columnIndex: position[1] },
          newBoard,
        );
        // added case moved piece is the king himself
        return !checkForCheckThreat({
          cell:
            piece.cell.piece === "king"
              ? newBoard[position[0]][position[1]]
              : cell, //the king cell
          board: newBoard,
        });
      }),
    }))
    .filter((piece) => piece.positions?.length);
  return results;
}

/**
 * Finds the position of the selected piece. If piece not found returns undefined
 * @param props pieceType: type of piece, pieceColor: color of piece, board: board state
 * @returns an object with row and column indices
 */
export function getPiecePosition(props: {
  pieceType: PieceType;
  pieceColor: PieceColor;
  board: ChessBoard;
}) {
  let { pieceType, pieceColor, board } = props;
  for (let i = 0; i < 8; i++) {
    for (let k = 0; k < 8; k++) {
      if (
        board[i][k].piece === pieceType &&
        board[i][k].pieceColor === pieceColor
      ) {
        return { row: i, column: k };
      }
    }
  }
  return undefined;
}
