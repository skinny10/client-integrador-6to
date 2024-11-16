import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logotipo.png";
import {
  HiMap,
  HiOutlineChartBar,
  HiOutlineChartSquareBar,
  HiOutlineLogout,
} from "react-icons/hi";

import "./BarraMenu.css";

export default function BarraMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    // Actualiza el estado activo cuando cambia la ubicación
    setActive(location.pathname);
  }, [location.pathname]);

  const handleClick = (path) => {
    setActive(path);
    navigate(path);
  };

  return (
    <aside className="content-main-menu">
      <img className="logotipo" src={logo} alt="Logotipo" />

      <div className="option-menu">
        <div
          className={`menu-item ${active === "/" ? "active" : ""}`}
          onClick={() => handleClick("/")}
        >
          <HiMap size={30} className="icon" />
        </div>

        <div
          className={`menu-item ${active === "/grafica1" ? "active" : ""}`}
          onClick={() => handleClick("/grafica1")}
        >
          <HiOutlineChartBar size={30} className="icon" />
        </div>

        <div
          className={`menu-item ${active === "/grafica2" ? "active" : ""}`}
          onClick={() => handleClick("/grafica2")}
        >
          <HiOutlineChartSquareBar size={30} className="icon" />
        </div>

        <div
          className={`menu-item ${active === "/exit" ? "active" : ""}`}
          onClick={() => handleClick("/exit")}
        >
          <HiOutlineLogout size={30} className="exit" />
        </div>
      </div>
    </aside>
  );
}
