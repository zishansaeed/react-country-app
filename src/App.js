import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";

import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <div className="containerp">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
