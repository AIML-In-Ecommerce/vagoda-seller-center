import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface LineChartProps {
  data: any;
  title: string;
}

const LineChart = (props: LineChartProps) => {
  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "My First Dataset",
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       fill: false,
  //       backgroundColor: "rgb(75, 192, 192)",
  //       borderColor: "rgba(75, 192, 192, 0.2)",
  //     },
  //     {
  //       label: "My Second Dataset",
  //       data: [12, 56, 33, 22, 30, 54, 28],
  //       fill: false,
  //       backgroundColor: "rgb(75, 192, 192)",
  //       borderColor: "rgba(75, 192, 192, 0.2)",
  //     },
  //   ],
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  return (
    <div className="w-full h-full  flex p-10 justify-center items-center">
      <Line options={options} data={props.data} />
    </div>
  );
};

export default LineChart;
