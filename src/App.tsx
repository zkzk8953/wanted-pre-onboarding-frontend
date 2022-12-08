/* Libraries */
import React from "react";
import { Routes, Route } from "react-router-dom";
/* Components */
/* Pages */
import Join from "./pages/Join/Join";
import Login from "./pages/Login/Login";
/* Styles */

function App() {
  return (
    <div className="main-layout">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  );
}

export default App;
