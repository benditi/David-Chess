import { useEffect, useRef, useState } from "react";

import Cell from "~/components/Cell";
import {
  PositionTuple,
  buildBoard,
  getOpenPositions,
  movePiece,
} from "~/lib/board";
import { getPieceSrc } from "~/lib/pieces";

export type PieceColor = "white" | "black" | "";
export type BoardCell = {
  rowIndex: number;
  columnIndex: number;
  piece: string | null;
  pieceColor: PieceColor;
};
export type ChessBoard = BoardCell[][];

export default function GameBoard() {
  let [board, setBoard] = useState<null | ChessBoard>(null);
  let [openCells, setOpenCells] = useState<PositionTuple[] | undefined>(
    undefined,
  );
  let [seletedCell, setSelectedCell] = useState<BoardCell | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let startBoard = buildBoard();
    setBoard(startBoard);
  }, []);

  function onSelect(cell: {
    rowIndex: number;
    columnIndex: number;
    piece: string | null;
    pieceColor: PieceColor;
  }) {
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
    if (isCellOpen && seletedCell && board) {
      let newBoard = movePiece(seletedCell, cell, board);
      setBoard(newBoard);
      setOpenCells(undefined);
      setSelectedCell(null);
      return;
    }
    let openPositions = getOpenPositions(cell, board);
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
        const piece = target.getAttribute("data-piece");
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
    </div>
  );
}
