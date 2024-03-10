import { useEffect, useRef, useState } from "react";

import Cell from "~/components/Cell";
import Popup from "~/components/Popup";
import {
  ChessMovement,
  PositionTuple,
  buildBoard,
  checkForCheckThreat,
  copyBoard,
  getChessOpenPositions,
  getOpenPositions,
  getPiecePosition,
  movePiece,
} from "~/lib/board";
import { getPieceSrc } from "~/lib/pieces";

export type PieceColor = "white" | "black";
export type CellColor = PieceColor | "";
export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";
export type BoardCell = {
  rowIndex: number;
  columnIndex: number;
  piece: PieceType | null;
  pieceColor: CellColor;
};
export type ChessBoard = BoardCell[][];

export default function GameBoard() {
  let [board, setBoard] = useState<null | ChessBoard>(null);
  let [openCells, setOpenCells] = useState<PositionTuple[] | undefined>(
    undefined,
  );
  let [seletedCell, setSelectedCell] = useState<BoardCell | null>(null);
  let [gameState, setGameState] = useState<{
    playerTurn: PieceColor;
    isChessState: boolean;
    chessMovements: ChessMovement[];
  }>({ playerTurn: "white", isChessState: false, chessMovements: [] });
  const [popupState, setPopupState] = useState({
    isOpen: false,
    winningPlayer: "",
  });

  const containerRef = useRef(null);

  useEffect(() => {
    let startBoard = buildBoard();
    setBoard(startBoard);
  }, []);

  function onSelect(cell: {
    rowIndex: number;
    columnIndex: number;
    piece: PieceType | null;
    pieceColor: PieceColor;
  }) {
    // case no board throw error
    if (!board) {
      throw Error("No board state");
    }
    // case not your turn
    if (!seletedCell && cell.pieceColor !== gameState.playerTurn) {
      console.log(`It's ${gameState.playerTurn}'s turn`);
      return;
    }
    // case clicking allready selected cell
    if (
      seletedCell?.columnIndex === cell.columnIndex &&
      seletedCell.rowIndex === cell.rowIndex
    ) {
      setOpenCells(undefined);
      setSelectedCell(null);
      return;
    }
    let isCellOpen = openCells?.length
      ? openCells.some(
          (tuple) =>
            tuple[0] === cell.rowIndex && tuple[1] === cell.columnIndex,
        )
        ? true
        : false
      : false;
    // case chooosing a viable cell to move (completing turn)
    if (isCellOpen && seletedCell) {
      let newBoard = movePiece(seletedCell, cell, board);
      setBoard(newBoard);
      setOpenCells(undefined);
      setSelectedCell(null);
      let rivalKingPosition = getPiecePosition({
        pieceColor: gameState.playerTurn === "white" ? "black" : "white",
        pieceType: "king",
        board: newBoard,
      });
      console.log("rivalKingPosition", rivalKingPosition);

      if (!rivalKingPosition) {
        throw Error("Could not find rival king!");
      }
      let { row, column } = rivalKingPosition;
      let isChess = checkForCheckThreat({
        cell: board[row][column],
        board: newBoard,
      });
      console.log("isChess", isChess);

      if (isChess) {
        let openPiecesPositions = getChessOpenPositions({
          cell: board[row][column],
          board: newBoard,
        });
        // check for check mate
        if (!openPiecesPositions.length) {
          console.log(`player ${gameState.playerTurn} won!`);
          setPopupState({ isOpen: true, winningPlayer: gameState.playerTurn });
          return;
        }
        setGameState((prevState) => ({
          ...prevState,
          isChessState: true,
          playerTurn: prevState.playerTurn === "white" ? "black" : "white",
          chessMovements: openPiecesPositions,
        }));
        return;
      }
      setGameState((prevState) => ({
        ...prevState,
        isChessState: false,
        playerTurn: prevState.playerTurn === "white" ? "black" : "white",
        chessMovements: [],
      }));
      return;
    }
    // case no cell selected yet
    // case there's a chess threat
    if (gameState.isChessState) {
      let selectedPiece = gameState.chessMovements.find(
        (piece) =>
          piece.cell.rowIndex === cell.rowIndex &&
          piece.cell.columnIndex === cell.columnIndex &&
          piece.cell.piece === cell.piece,
      );
      if (!selectedPiece?.positions?.length) {
        console.log("does not stop chess");
        return;
      }
      setOpenCells(selectedPiece.positions);
      setSelectedCell(selectedPiece.cell);
      return;
    }
    // regular case (no chess threat)
    let rivalKingPosition = getPiecePosition({
      pieceColor: gameState.playerTurn === "white" ? "black" : "white",
      pieceType: "king",
      board,
    });
    console.log("rivalKingPosition", rivalKingPosition);

    if (!rivalKingPosition) {
      throw Error("Could not find rival king!");
    }
    let openPositions = getOpenPositions(cell, board);
    // filter positions for possible chess
    openPositions = openPositions?.filter((position) => {
      let newBoard = copyBoard(board!);
      movePiece(
        cell,
        { rowIndex: position[0], columnIndex: position[1] },
        newBoard,
      );
      return !checkForCheckThreat({
        cell: board![rivalKingPosition!.row][rivalKingPosition!.column],
        board: board!,
      });
    });
    setOpenCells(openPositions);
    setSelectedCell(cell);
  }
  // event delegation of cell click events
  let handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // Ensure that the clicked element is a cell
    let target = event.target as HTMLElement | null;
    while (target && target !== containerRef.current) {
      if (target.classList.contains("cell")) {
        const rowIndex = parseInt(target.getAttribute("data-row") as string);
        const columnIndex = parseInt(
          target.getAttribute("data-column") as string,
        );
        const piece = target.getAttribute("data-piece") as PieceType;
        const pieceColor = target.getAttribute(
          "data-piece-color",
        ) as PieceColor;
        onSelect({ rowIndex, columnIndex, piece, pieceColor });
        break;
      }
      target = target.parentElement;
    }
  };

  return (
    <div className="p-4 flex items-center justify-center h-full bg-darkGrey">
      <div
        onClick={handleClick}
        onKeyUp={() => console.log(`clicking on cell`)}
        role="button"
        tabIndex={0}
        ref={containerRef}
      >
        {board?.map((row, rowIndex) => {
          return (
            <div className="flex" key={rowIndex}>
              {row.map((cell, columnIndex) => {
                return (
                  <Cell
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    piece={cell.piece}
                    pieceColor={cell.pieceColor}
                    pieceSrc={getPieceSrc(cell.pieceColor, cell.piece)}
                    key={rowIndex.toString() + columnIndex.toString()}
                    isSelected={
                      openCells?.length
                        ? openCells.some(
                            (tuple) =>
                              tuple[0] === rowIndex && tuple[1] === columnIndex,
                          )
                          ? true
                          : false
                        : false
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-4 right-0">
        Chess Icons By Cburnett - Own work{" "}
        <span className="int-own-work" lang="en"></span>{" "}
        <a
          href="http://creativecommons.org/licenses/by-sa/3.0/"
          title="Creative Commons Attribution-Share Alike 3.0"
        >
          CC BY-SA 3.0
        </a>
        ,{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=1499806">
          Link
        </a>
      </div>
      <Popup
        isOpen={popupState.isOpen}
        onClose={() =>
          setPopupState((prevState) => ({ ...prevState, isOpen: false }))
        }
        headerText={`The ${popupState.winningPlayer} player has won!`}
        paragraphText={`The ${popupState.winningPlayer} player has won. Keep on playing!`}
      />
    </div>
  );
}
