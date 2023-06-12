import "./App.css";
import SeatList from "./SeatList";

function App() {
  return (
    <div className={"mainContainer"}>
      <SeatList
        seats={[
          [0, 0, 1, 0],
          [0, 1, 0, 0],
          [1, 1, 1, 1],
          [1, 1, 1, 1]
        ]}
        handleSelectSeat={() => console.log("selected")}
      />
    </div>
  );
}

export default App;
