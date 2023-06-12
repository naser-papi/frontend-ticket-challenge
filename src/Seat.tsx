import React from "react";
import { ISeat } from "./models/GeneralModels";

const Seat: React.FC<ISeat> = ({ rowIndex, colIndex, isReserve, handleSelectSeat }) => {
  const classes = ["seat"];
  if (isReserve) {
    classes.push("selected");
  }
  return <li className={classes.join(" ")}>{"#" + rowIndex + "." + colIndex}</li>;
};

export default Seat;
