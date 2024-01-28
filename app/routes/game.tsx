import { useEffect, useState } from "react";
import Cell from "~/components/Cell";
import { getPieceSrc } from "~/lib/pieces";

type BoardCell = {
  rowIndex: number;
  columnIndex: number;
  piece: string;
  pieceColor: "white" | "black" | "";
};

export default function GameBoard() {
  let [board, setBoard] = useState<null | BoardCell[][]>(null);
  let startBoard: BoardCell[][] = Array.from(Array(8).keys()).map(
    (row, rowIndex) =>
      Array.from(Array(8).keys()).map((cell, columnIndex) => ({
        rowIndex,
        columnIndex,
        piece: "",
        pieceColor: "",
      })),
  );
  startBoard.forEach((row, rowIdx) =>
    row.forEach((cell) => {
      if (rowIdx === 1) {
        cell.piece = "rook";
        cell.pieceColor = "black";
      }
    }),
  );
  console.log("startBoard", startBoard);
  // console.log("getPieceSrc", getPieceSrc("black", "rook"));
  useEffect(() => {
    console.log("startBoard effect", startBoard);
    setBoard(startBoard);
  }, []);

  return (
    <div className="p-4">
      {board?.map((row, rowIndex) => {
        console.log("rendering row", row);

        return (
          <div className="flex" key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <Cell
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                pieceSrc={getPieceSrc(cell.pieceColor, cell.piece)}
                key={rowIndex.toString() + columnIndex.toString()}
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
