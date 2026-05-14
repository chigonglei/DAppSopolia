import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Voting from "./pages/Voting";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/voting"
          element={<Voting />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;