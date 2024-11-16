import React, { useEffect, useState } from "react";
import Header from "../ui/Header/Header";
import BarraMenu from "../ui/BarraMenu/BarraMenu";
import CardStats from "../ui/CardStats/CardStats";
import GaugeChart from "../ui/TemperatureGaugeChart/GaugeChart";
import "./Dashboard.css";

export default function Dashboard() {
  // Estados para la temperatura y la humedad
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Conectar al WebSocket del backend
    const ws = new WebSocket("ws://localhost:3000"); // Cambia la URL al puerto correcto si es necesario

    ws.onopen = () => {
      console.log("Conectado al WebSocket del servidor");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos desde WebSocket:", data);

        // Actualizar estados de temperatura y humedad
        if (data.temperatura !== undefined) setTemperature(data.temperatura);
        if (data.humedad !== undefined) setHumidity(data.humedad);
      } catch (error) {
        console.error("Error al analizar los datos del WebSocket:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket cerrado");
    };

    // Cerrar conexión al desmontar el componente
    return () => ws.close();
  }, []);

  return (
    <div className="dashboard-container">
      <BarraMenu />
      <div className="main-content">
        <Header
          title="Welcome back"
          paragraph="Extracción, desintoxicación y cambio de aire"
        />

        <div className="content-temp">
          <CardStats
            title="Temperatura interna"
            valor={`${temperature ?? "N/A"}°`}
          />
          <CardStats title="Humedad interna" valor={`${humidity ?? "N/A"}%`} />
        </div>

        <div className="gauge-content">
          <div>
            <h1 className="titulo">Temperatura Interna</h1>
            <GaugeChart value={temperature} />
          </div>
          <div>
            <h1 className="titulo">Humedad Interna</h1>
            <GaugeChart value={humidity} />
          </div>
        </div>
      </div>
    </div>
  );
}
