import React, { useState } from "react";
import logo from "../../../assets/logotipo.png";
import {
  HiMap,
  HiOutlineChartBar,
  HiOutlineChartSquareBar,
  HiOutlineLogout,
} from "react-icons/hi";

import "./BarraMenu.css";

export default function BarraMenu() {
  const [active, setActive] = useState("home");

  const handleClick = (item) => {
    setActive(item);
  };

  return (
    <aside className="content-main-menu">
      <img className="logotipo" src={logo} alt="Logotipo" />

      <div className="option-menu">
        <div
          className={`menu-item ${active === "home" ? "active" : ""}`}
          onClick={() => handleClick("home")}
        >
          <HiMap size={30} className="icon" />
        </div>

        <div
          className={`menu-item ${active === "grafica1" ? "active" : ""}`}
          onClick={() => handleClick("grafica1")}
        >
          <HiOutlineChartBar size={30} className="icon" />
        </div>

        <div
          className={`menu-item ${active === "grafica2" ? "active" : ""}`}
          onClick={() => handleClick("grafica2")}
        >
          <HiOutlineChartSquareBar size={30} className="icon" />
        </div>

        <div
          className={`menu-item ${active === "exit" ? "active" : ""}`}
          onClick={() => handleClick("exit")}
        >
          <HiOutlineLogout size={30} className="exit" />
        </div>
      </div>
    </aside>
  );
}
