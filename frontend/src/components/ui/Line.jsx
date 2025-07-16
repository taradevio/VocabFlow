import { Line } from "react-chartjs-2";
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
  return (
    <Line
      data={{
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Person A",
            data: [20, 63, 93, 99, 46, 54, 51],
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
        }
      }}
    />
  );
};
