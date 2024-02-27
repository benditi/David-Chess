import { twMerge } from "tailwind-merge";

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  pieceSrc: string;
  onClick: () => void;
  isSelected: boolean;
};
export default function Cell(props: CellProps) {
  let { columnIndex, rowIndex, pieceSrc, onClick, isSelected } = props;
  let cellClass =
    (columnIndex + rowIndex) % 2 === 0 ? "bg-white_cell" : "bg-black_cell";
  let isLeftColumn = columnIndex === 0;
  let isRightColumn = columnIndex === 7;
  if (isSelected) {
    console.log("cell selected!");
  }
  return (
    <div
      className={twMerge(
        "relative flex items-center justify-center border-gray-500 w-12 h-12 md:w-16 md:h-16",
        cellClass,
        isLeftColumn && rowIndex === 7 && "rounded-bl-sm",
        isRightColumn && rowIndex === 7 && "rounded-br-sm",
        isLeftColumn && rowIndex === 0 && "rounded-tl-sm",
        isRightColumn && rowIndex === 0 && "rounded-tr-sm",
        pieceSrc || (isSelected && "hover:cursor-pointer"),
      )}
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={rowIndex}
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
