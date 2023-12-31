import { twMerge } from "tailwind-merge";
import BlackQueen from '~/assets/images/Chess_rdt45.svg'


type CellProps = {
  columnIndex: number;
  rowIndex: number;
};
export default function Cell(props: CellProps) {
  let { columnIndex, rowIndex } = props;
  let cellClass =
    (columnIndex + rowIndex) % 2 === 0 ? "bg-black_cell" : "bg-white_cell";
  let isLeftColumn = columnIndex === 0;
  let isRightColumn = columnIndex === 7;

  return (
    <div
      className={twMerge(
        "p-4 border-gray-500 w-fit",
        cellClass,
        isLeftColumn && rowIndex === 7 && "rounded-bl-sm",
        isRightColumn && rowIndex === 7 && "rounded-br-sm",
        isLeftColumn && rowIndex === 0 && "rounded-tl-sm",
        isRightColumn && rowIndex === 0 && "rounded-tr-sm",
      )}
    >
      <img src={BlackQueen} alt="" className="w-8" />
    </div>
  );
}
