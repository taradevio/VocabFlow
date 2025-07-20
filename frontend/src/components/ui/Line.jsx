import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title
);

export const LineChart = () => {
  const [practice, setPractice] = useState([]);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("user") || "[]");
    const practiceResult = getData.filter((word) => word.is_practiced).length;
    const today = new Date().getDay();
    console.log(today)
    const dayArr = Array(7).fill(0);
    dayArr[today] = practiceResult;
    setPractice(dayArr);
  }, []);

  return (
    <Line
      data={{
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Person A",
            data: practice,
            tension: 0.4,
            borderWidth: 1,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.4)",
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        interaction: {
          intersect: false,
        },
      }}
    />
  );
};
