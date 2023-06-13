import React from "react";
import { ISeat } from "./models/GeneralModels";

const Seat: React.FC<ISeat> = ({ rowIndex, colIndex, isReserve, selectHandler }) => {
  const classes = ["seat"];
  if (isReserve) {
    classes.push("selected");
  }
  const seatSelectHandler = () => {
    if (isReserve) {
      alert("seat is reserved");
      return;
    }
    if (selectHandler) {
      selectHandler({ rowIndex, colIndex });
    }
  };
  return (
    <li
      data-cy={"seat"}
      key={rowIndex + "." + colIndex}
      className={classes.join(" ")}
      onClick={seatSelectHandler}
    >
      {"#" + rowIndex + "." + colIndex}
    </li>
  );
};

export default Seat;
