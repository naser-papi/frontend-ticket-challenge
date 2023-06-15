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
  const [elements, setElements] = useState([]);
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

  useEffect(() => {
    const page = Math.floor(lastSeen / PAGE_COUNT) + 1;
    console.log("page", page, lastSeen);
    let limit = page * PAGE_COUNT;
    if (limit > seats.length) {
      limit = seats.length + 1;
    }
    const list = seats.slice(elements.length, limit).map((row: [], rowIndex, rows) => {
      rowIndex += (page - 1) * PAGE_COUNT + 1;
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
    setElements([...elements, ...list]);
  }, [lastSeen, seats.length]);
  const selectSeatHandler = (seat: ISeat) => {
    return new Promise<boolean>((resolve) => {
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
          resolve(true);
        },
        failedHandler: () => {
          resolve(false);
        }
      });
    });
  };

  return (
    <section className={"listContainer"}>
      {elements.length ? elements : <p>please wait for loading map seats</p>}
    </section>
  );
};

export default SeatList;
