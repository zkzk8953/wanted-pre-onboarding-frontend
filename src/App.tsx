/* Libraries */
import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
/* Components */
import Navbar from "./components/Navbar/Navbar";
/* Pages */
import Join from "./pages/Join/Join";
import Login from "./pages/Login/Login";
import Todos from "./pages/Todos/Todos";
/* Styles */

type Token = {
  access_token: string | null;
};

function App() {
  const [token, setToken] = React.useState<Token>({ access_token: null });

  React.useEffect(() => {
    setToken({ access_token: localStorage.getItem("token") });
  }, []);

  return (
    <div className="main-layout">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            token.access_token ? <Navigate replace to="/todos" /> : <Login />
          }
        />
        <Route path="/join" element={<Join />} />
        <Route
          path="/todos"
          element={token.access_token ? <Todos /> : <Navigate replace to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
