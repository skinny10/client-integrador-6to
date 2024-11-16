import React, { useState, useEffect } from "react";

export default function DataCollection() {
  const [quantitativeData, setQuantitativeData] = useState([]);
  const [qualitativeData, setQualitativeData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Recopilar datos cuantitativos
      setQuantitativeData((prevData) => [
        ...prevData,
        { temperature: data.temperatura, humidity: data.humedad },
      ]);

      // Clasificar cualitativamente los datos
      const temperatureLabel =
        data.temperatura > 30
          ? "Alto"
          : data.temperatura > 15
          ? "Medio"
          : "Bajo";
      const humidityLabel =
        data.humedad > 70 ? "Alto" : data.humedad > 40 ? "Medio" : "Bajo";

      setQualitativeData((prevData) => [
        ...prevData,
        { temperature: temperatureLabel, humidity: humidityLabel },
      ]);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Datos Cuantitativos</h2>
      <pre>{JSON.stringify(quantitativeData, null, 2)}</pre>

      <h2>Datos Cualitativos</h2>
      <pre>{JSON.stringify(qualitativeData, null, 2)}</pre>
    </div>
  );
}
