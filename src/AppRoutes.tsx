import { Route, Routes } from "react-router-dom";
import { PageRoutes } from "./models/GeneralModels";
import SelectMap from "./SelectMap";
import SeatList from "./SeatList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PageRoutes.ROOT} element={<SelectMap />}></Route>
      <Route path={PageRoutes.SEATS} element={<SeatList />}></Route>
    </Routes>
  );
};

export default AppRoutes;
