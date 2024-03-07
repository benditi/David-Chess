import { twMerge } from "tailwind-merge";

import { CellColor } from "~/routes/game";

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  pieceSrc: string;
  isSelected: boolean;
  piece: string | null;
  pieceColor: CellColor;
};
export default function Cell(props: CellProps) {
  let { columnIndex, rowIndex, pieceSrc, isSelected, piece, pieceColor } =
    props;
  let cellClass =
    (columnIndex + rowIndex) % 2 === 0 ? "bg-white_cell" : "bg-black_cell";
  let isLeftColumn = columnIndex === 0;
  let isRightColumn = columnIndex === 7;

  return (
    <div
      className={twMerge(
        "cell relative flex items-center justify-center border-gray-500 w-12 h-12 md:w-16 md:h-16",
        cellClass,
        isLeftColumn && rowIndex === 7 && "rounded-bl-sm",
        isRightColumn && rowIndex === 7 && "rounded-br-sm",
        isLeftColumn && rowIndex === 0 && "rounded-tl-sm",
        isRightColumn && rowIndex === 0 && "rounded-tr-sm",
        pieceSrc || (isSelected && "hover:cursor-pointer"),
      )}
      role="button"
      tabIndex={rowIndex}
      data-row={rowIndex}
      data-column={columnIndex}
      data-piece={piece}
      data-piece-color={pieceColor}
    >
      {pieceSrc ? <img src={pieceSrc} alt="" className="w-8" /> : null}
      {isSelected ? (
        <div
          className={
            pieceSrc
              ? "h-full w-full absolute border-4 rounded-full border-openGrey"
              : "p-2 bg-openGrey rounded-full"
          }
        ></div>
      ) : null}
    </div>
  );
}
