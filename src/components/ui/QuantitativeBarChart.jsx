import React from "react";
import { Bar } from "react-chartjs-2";

export default function QuantitativeBarChart({ quantitativeData }) {
  const data = {
    labels: quantitativeData.map((_, i) => `Lectura ${i + 1}`),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: quantitativeData.map((d) => d.temperature),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Humedad (%)",
        data: quantitativeData.map((d) => d.humidity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
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
        text: "Temperatura y Humedad Cuantitativa",
      },
    },
  };

  return <Bar data={data} options={options} />;
}
