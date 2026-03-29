import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const ChartCard = ({ title, type = "bar", data, options = {} }) => {
  const chartProps = {
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: !!title, text: title },
      },
      ...options,
    },
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        {type === "pie" && <Pie {...chartProps} />}
        {type === "bar" && <Bar {...chartProps} />}
        {type === "line" && <Line {...chartProps} />}
      </div>
    </div>
  );
};

export default ChartCard;