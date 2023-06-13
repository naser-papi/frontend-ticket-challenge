import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <main className={"mainContainer"}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </main>
  );
}

export default App;
