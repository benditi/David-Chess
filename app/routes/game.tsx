import { useEffect, useState } from "react";
import Cell from "~/components/Cell";
import { useUserConext } from "~/lib/AppContext";
import { buildBoard, getOpenPositions } from "~/lib/board";
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

  useEffect(() => {
    let startBoard = buildBoard();
    setBoard(startBoard);
  }, []);

  return (
    <div className="p-4">
      {board?.map((row, rowIndex) => {
        return (
          <div className="flex" key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <Cell
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                pieceSrc={getPieceSrc(cell.pieceColor, cell.piece)}
                key={rowIndex.toString() + columnIndex.toString()}
                onClick={() =>
                  getOpenPositions(
                    {
                      rowIndex,
                      columnIndex,
                      piece: cell.piece,
                      pieceColor: cell.pieceColor,
                    },
                    board,
                  )
                }
              />
            ))}
          </div>
        );
      })}
      <div className="absolute bottom-4 left-4 right-0">
        Chess Icons By Cburnett - Own work{" "}
        <a
          href="//commons.wikimedia.org/wiki/User:Cburnett"
          title="User:Cburnett"
        />{" "}
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
