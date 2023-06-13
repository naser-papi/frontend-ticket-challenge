import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Seat from "./Seat";
import useCallApi from "./hooks/useCallApi";
import { ISeat } from "./models/GeneralModels";

const SeatList = () => {
  const { mapId } = useParams();
  const [seats, setSeats] = useState([]);
  const [callApi] = useCallApi();

  useEffect(() => {
    callApi({
      method: "GET",
      url: `map/${mapId}`,
      successHandler: (list: []) => {
        setSeats(list);
      }
    });
  }, []);
  const selectSeatHandler = (seat: ISeat) => {
    callApi({
      method: "POST",
      url: `map/${mapId}/ticket`,
      getBody: () => ({ y: seat.rowIndex, x: seat.colIndex }),
      successHandler: (data) => {
        alert("your ticked has been registered successfully");
        setSeats((prevState) => {
          prevState[seat.rowIndex][seat.colIndex] = 1;
          return prevState;
        });
      }
    });
  };
  const list = seats.map((row, rowIndex) => (
    <ul key={"row" + rowIndex} className={"columnsContainer"}>
      {row.map((col, colIndex) => (
        <Seat
          selectHandler={selectSeatHandler}
          rowIndex={rowIndex}
          colIndex={colIndex}
          isReserve={seats[rowIndex][colIndex] != 0}
        />
      ))}
    </ul>
  ));
  return (
    <section className={"listContainer"}>
      {seats.length ? list : <p>please wait for loading map seats</p>}
    </section>
  );
};

export default SeatList;
