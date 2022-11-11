import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BarGraph.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarGraph = () => {
  const [chart, setChart] = useState([]);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=true";

  useEffect(() => {
    axios.get(url).then((response) => {
      setChart(response.data);
      console.log(response);
    });
  }, [url]);

  const printDocument = () => {
    const input = document.getElementById("custom-chart");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 5, 5, 190, 140);
      pdf.save("download.pdf");
    });
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  var data = {
    labels: chart?.map((x) => x.name),
    datasets: [
      {
        label: "# of Votes",
        data: chart?.map((x) => x.market_cap),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var options = {
    maintainAspectRation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div className="chart-header">
      <div id="custom-chart" className="bar-header">
        <Bar data={data} options={options} height={600} width={800} />
      </div>
      <div className="bar-button">
        <button className="btn1" onClick={printDocument}>
          PDF Download
        </button>
        <button className="btn1" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default BarGraph;
