import { twMerge } from "tailwind-merge"

type CellProps= {
    columnIndex:number,
    rowIndex:number
}
export default function Cell (props:CellProps){
    let {columnIndex,rowIndex}= props
    let cellClass= (columnIndex+rowIndex)%2===0?'bg-black_cell':'bg-white_cell'
    return <div className={twMerge("p-4 border-gray-500  w-fit", cellClass)}></div>
}