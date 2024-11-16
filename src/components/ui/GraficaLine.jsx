import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraficaLine() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000"); // Cambia la URL si es necesario

    ws.onopen = () => {
      console.log("Conectado al WebSocket del servidor");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos desde WebSocket:", data);

        // Actualizar los datos de la gráfica
        if (data.temperatura !== undefined && data.humedad !== undefined) {
          setTemperatureData((prevData) => [...prevData.slice(-9), data.temperatura]);
          setHumidityData((prevData) => [...prevData.slice(-9), data.humedad]);
          setLabels((prevLabels) => [...prevLabels.slice(-9), new Date().toLocaleTimeString()]);
        }
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

    return () => ws.close();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temperatureData,
        borderColor: "rgba(255, 99, 132, 1)", // Color de línea de temperatura
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Color de fondo bajo la línea
        fill: true,
      },
      {
        label: "Humedad (%)",
        data: humidityData,
        borderColor: "rgba(54, 162, 235, 1)", // Color de línea de humedad
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Color de fondo bajo la línea
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperatura y Humedad en Tiempo Real",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
