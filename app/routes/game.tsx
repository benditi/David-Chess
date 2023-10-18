import Cell from "~/components/Cell"

export default function GameBoard() {
  let board = Array.from(Array(8).keys()).map((row, rowIndex) =>
    Array.from(Array(8).keys()).map((cell, columnIndex) => ({
      rowIndex,
      columnIndex,
    })),
  );
  console.log("board", board);

  return <div className="p-4">
   {board.map((row,rowIndex)=>
   <div className="flex">
    {row.map((cell,columnIndex)=>
     <Cell rowIndex={rowIndex} columnIndex={columnIndex}/>
    )}
   </div>
   )}
  </div>;
}
