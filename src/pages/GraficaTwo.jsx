import React from "react";
import BarraMenu from "../components/ui/BarraMenu/BarraMenu";
import GraficaLine from "../components/ui/GraficaLine";

function GraficaTwo() {
  return (
    <>
      <div className="dashboard-container">
        <BarraMenu />
        <div className="main-content">
          <GraficaLine />
        </div>
      </div>
    </>
  );
}

export default GraficaTwo;
