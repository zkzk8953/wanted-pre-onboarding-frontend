import React from "react";
import { Menu } from "@material-ui/icons";

export default function Navbar() {
  return (
    <div className="navbar-wrap">
      <h1>온보딩</h1>
      <button type="button" name="toggle">
        <Menu />
      </button>
    </div>
  );
}
