import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficaBar() {
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
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Color de barras de temperatura
      },
      {
        label: "Humedad (%)",
        data: humidityData,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Color de barras de humedad
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
      <Bar data={data} options={options} />
    </div>
  );
}
