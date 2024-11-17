import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import "./Alerts.css";

export default function Alerts({ alerta }) {
  return (
    <>
      <div className="flex ">
        <FiAlertTriangle color="red" size={25} />
        <h2 className="m-1 ">{alerta}</h2>
      </div>
    </>
  );
}
