import React, { useEffect, useState } from "react";

export default function SimpleDashboard() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Conectar al WebSocket
    const ws = new WebSocket("ws://localhost:3000"); // Cambia la URL si es necesario

    ws.onopen = () => {
      console.log("Conectado al WebSocket del servidor");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Datos recibidos desde WebSocket:", data);

      // Actualizar los estados de temperatura y humedad
      if (data.temperatura !== undefined) setTemperature(data.temperatura);
      if (data.humedad !== undefined) setHumidity(data.humedad);
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Monitor de Sensor</h1>
      <div>
        <h2>Temperatura: {temperature !== null ? `${temperature} °C` : "N/A"}</h2>
        <h2>Humedad: {humidity !== null ? `${humidity} %` : "N/A"}</h2>
      </div>
    </div>
  );
}
