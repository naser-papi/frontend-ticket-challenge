import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Seat from "./Seat";
import useCallApi from "./hooks/useCallApi";
import { ISeat } from "./models/GeneralModels";

const PAGE_COUNT = 400;
const SeatList = () => {
  const { mapId } = useParams();
  const [seats, setSeats] = useState([]);
  const [lastSeen, setLastSeen] = useState(1);
  const [callApi] = useCallApi();

  useEffect(() => {
    callApi({
      method: "GET",
      url: `map/${mapId}`,
      successHandler: (list: []) => {
        setSeats(list);
      }
    });
    // const rnd = () => Math.floor(Math.random());
    // const sl = Array((100 * 1000) / 4)
    //   .fill(0)
    //   .map(() => [rnd(), rnd(), rnd(), rnd()]);
    // setSeats(sl);
  }, []);
  const selectSeatHandler = (seat: ISeat) => {
    callApi({
      method: "POST",
      url: `map/${mapId}/ticket`,
      getBody: () => ({ y: seat.rowIndex, x: seat.colIndex }),
      successHandler: (data) => {
        alert("your ticked has been registered successfully");
        setSeats((prevState) => {
          prevState[seat.rowIndex - 1][seat.colIndex - 1] = 1;
          return prevState;
        });
      }
    });
  };

  const page = Math.floor(lastSeen / PAGE_COUNT) + 1;
  console.log("page", page, lastSeen);
  let limit = page * PAGE_COUNT;
  if (limit > seats.length) {
    limit = seats.length + 1;
  }
  const list = seats.slice(0, limit).map((row: [], rowIndex, rows) => {
    rowIndex++;
    return (
      <ul key={"p" + page + "row" + rowIndex} className={"columnsContainer"}>
        {row.map((col, colIndex, cols) => {
          colIndex++;
          const isLast = rowIndex === rows.length && colIndex === cols.length;
          return (
            <Seat
              selectHandler={selectSeatHandler}
              rowIndex={rowIndex}
              colIndex={colIndex}
              lastSeen={lastSeen}
              setLastSeen={setLastSeen}
              isLast={isLast}
              isReserve={seats[rowIndex - 1][colIndex - 1] != 0}
            />
          );
        })}
      </ul>
    );
  });

  return (
    <section className={"listContainer"}>
      {list.length ? list : <p>please wait for loading map seats</p>}
    </section>
  );
};

export default SeatList;
