import React, { useEffect, useRef } from "react";
import { ISeat } from "./models/GeneralModels";
import useIntersection from "./hooks/useIntersection";

const Seat: React.FC<ISeat> = ({
  rowIndex,
  colIndex,
  isReserve,
  selectHandler,
  isLast,
  lastSeen,
  setLastSeen
}) => {
  let ref = null;
  let inViewport = null;
  if (isLast) {
    ref = useRef();
    inViewport = useIntersection(ref, "0px");
  }

  useEffect(() => {
    if (inViewport && ref) {
      console.log("inViewPort", ref.current);
      const element = ref.current as HTMLElement;
      if (element) {
        const seatNum = Number(element.dataset.seatnum);

        if (seatNum > lastSeen) {
          setLastSeen(seatNum);
        }
      }
    }
  }, [inViewport]);

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
      ref={ref}
      data-seatnum={rowIndex * colIndex}
      key={rowIndex + "." + colIndex}
      className={classes.join(" ")}
      onClick={seatSelectHandler}
    >
      {"#" + rowIndex + "." + colIndex}
    </li>
  );
};

export default Seat;
