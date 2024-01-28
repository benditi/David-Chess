import { useEffect, useState } from "react";
import Cell from "~/components/Cell";
import { useUserConext } from "~/lib/AppContext";
import { getPieceSrc } from "~/lib/pieces";

type BoardCell = {
  rowIndex: number;
  columnIndex: number;
  piece: string | null;
  pieceColor: "white" | "black" | "";
};
type ChessBoard = BoardCell[][];

export default function GameBoard() {
  let [board, setBoard] = useState<null | ChessBoard>(null);
  let buildBoard = () => {
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
      }),
    );
    console.log("startBoard", startBoard);
    return startBoard;
  };
  let { user, setUser } = useUserConext();
  console.log("user", user);
  useEffect(() => {
    let startBoard = buildBoard();
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
