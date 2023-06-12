import React from "react";
import { ISeatList } from "./models/GeneralModels";
import Seat from "./Seat";

const SeatList: React.FC<ISeatList> = ({ seats, handleSelectSeat }) => {
  //I'm supposing that each row will have same column count
  const list = seats.map((row, rowIndex) => (
    <ul key={"row" + rowIndex} className={"columnsContainer"}>
      {row.map((col, colIndex) => (
        <Seat
          handleSelectSeat={handleSelectSeat}
          rowIndex={rowIndex}
          colIndex={colIndex}
          isReserve={seats[rowIndex][colIndex] != 0}
        />
      ))}
    </ul>
  ));
  return <section className={"listContainer"}>{list}</section>;
};

export default SeatList;
