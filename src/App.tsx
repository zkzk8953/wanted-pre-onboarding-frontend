/* Libraries */
import React from "react";
import { Routes, Route } from "react-router-dom";
/* Components */
import Navbar from "./components/Navbar/Navbar";
/* Pages */
import Join from "./pages/Join/Join";
import Login from "./pages/Login/Login";
/* Styles */
import "./styles/main.scss";

function App() {
  return (
    <div className="main-layout">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  );
}

export default App;
