import chartData from "../data/chartData";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const sparklineData = chartData.coin.sparkline;
export default function TestPage() {
  return <div><Line data={sparklineData}

  ></div>;
}
