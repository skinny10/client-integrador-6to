import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./GaugeChart.css";
const GaugeChart = ({ value = 20, max = 100 }) => {
  // Añadimos 'max' como prop
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      series: [
        {
          type: "gauge",
          center: ["50%", "60%"],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: max, // Usamos el valor de 'max' para controlar el rango
          splitNumber: 10,
          itemStyle: {
            color: "#0038FF",
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 10,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: "#CB3CFF",
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: "#CB3CFF",
            },
          },
          detail: {
            valueAnimation: true,
            width: "60%",
            lineHeight: 60,
            borderRadius: 8,
            offsetCenter: [0, "-15%"],
            fontSize: 15,
            fontWeight: "bolder",
            formatter: "{value}", // Muestra solo el valor sin unidades para versatilidad
            color: "inherit",
          },
          data: [{ value }],
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [value, max]); // Vuelve a ejecutar el efecto cada vez que cambien 'value' o 'max'

  return <div ref={chartRef} className="gauge-chart" />;
};

export default GaugeChart;
