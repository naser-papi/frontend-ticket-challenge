import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCallApi from "./hooks/useCallApi";

const SelectMap = () => {
  const [maps, setMaps] = useState([]);
  const [callApi, apiStatus] = useCallApi();
  const nav = useNavigate();
  useEffect(() => {
    callApi({
      url: "map",
      method: "GET",
      successHandler: (list: string[]) => {
        setMaps(list);
      }
    });
  }, []);
  const handleSelectMap = (id: string) => {
    if (!id) {
      const index = Math.floor(Math.random() * maps.length);
      id = maps[index];
    }
    nav(`/seats/${id}`);
  };
  return (
    <>
      <section className={"mapsList"}>
        <p data-cy={"pageMessage"}>list of available maps:</p>
        {maps.length ? (
          maps.map((item) => (
            <button data-cy={"mapButton"} onClick={() => handleSelectMap(item)}>
              {item}
            </button>
          ))
        ) : (
          <p>Maps list is empty</p>
        )}
      </section>
      <button
        data-cy={"selectRandomly"}
        onClick={() => handleSelectMap("")}
        disabled={maps.length == 0 || apiStatus === "pending"}
      >
        select randomly
      </button>
    </>
  );
};

export default SelectMap;
