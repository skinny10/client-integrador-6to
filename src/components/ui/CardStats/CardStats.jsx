import React from "react";
import { HiFire } from "react-icons/hi";

import "./CardStats.css";

export default function CardStats({ title, valor }) {
  return (
    <>
      <div className="content-main-card">
        <HiFire size={25} />
        <h4>{title}</h4>
        <h1 className="temp">{valor}</h1>
      </div>
    </>
  );
}
