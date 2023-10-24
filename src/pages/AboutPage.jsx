// import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";

Chart.register(...registerables);
Chart.register(CategoryScale);

const About = () => {
  const { coin } = useParams();

  const [data, setData] = useState(null);
  const [timePeriodState, setTimePeriodState] = useState("24h");

  useEffect(() => {
    if (!coin) return;
    console.log(`Prepare to fetch the data for ${coin}`);

    async function requestCoinDetails() {
      const res = await fetch(
        `https://api.coinranking.com/v2/coin/${coin}?timePeriod=${timePeriodState}`
      );
      const json = await res.json();
      console.log("json", json);
      setData(json.data.coin);
    }
    requestCoinDetails();
  }, [coin, timePeriodState]);

  const handleChangeTimePeriodState = (timePeriodState) => {
    setTimePeriodState(timePeriodState);
  };

  const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  /*
  To change time period => we use ?timePeriod=${timePeriod} // I want to set this to a button, so when users select a different time it re-renders and updates with the relevant info.

  I want 24hr (default) 7d, 30d, 3m, 1y, 3y - implement the logic to change this. Add functionality whereby if latest entry of data is higher than first entry => Green line : red line
  */
  return (
    <div className="coin-details-page">
      {data ? (
        <div className="coin-details">
          <div className="coin-hero-wrapper mx-auto max-w-7xl py-6 px-2 sm:px-6 lg:px-8">
            <div className="coin-hero flex items-start items-center">
              <div className="logo-name-spacing space-x-2 flex items-start items-center">
                {" "}
                <img
                  src={data.iconUrl}
                  alt="Logo"
                  width="40"
                  height="auto"
                />{" "}
                <p>
                  {" "}
                  <span className="text-xl font-bold">{data.name} </span>
                  <span className="font-light text-xs">{data.symbol} </span>
                </p>
              </div>
              <div className="price-change space-x-2 flex items-start items-baseline">
                <p className="ml-20 font-bold text-xl">
                  {" "}
                  ${formatNumbers(parseFloat(data.price).toFixed(2))}
                </p>
                <span
                  className={`text-xs font-medium ${
                    parseFloat(data.change) > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(data.change).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <div className="coin-desc text-left flex-start mx-auto max-w-7xl py-6 px-2 sm:px-6 lg:px-8 text-sm/[17px]">
            <p>
              <span className="font-bold">Summary</span> by AI:{" "}
              {data.description} For more information check the official{" "}
              <a href={data.websiteUrl} target="blank">
                {" "}
                website.
              </a>
            </p>
          </div>
          <div className="coin-chart-container flex flex-col items-center px-2 py-6">
            <div className="w-full mb-6 p-4 bg-blue-200 dark:bg-gray-950 rounded-lg">
              <Line
                data={{
                  labels: Array.from(
                    { length: data.sparkline.length },
                    (_, i) => (i + 1).toString()
                  ),
                  datasets: [
                    {
                      label: "Price ($)",
                      data: data.sparkline.map((str) =>
                        parseFloat(str).toFixed(2)
                      ),
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
            {/* Time Period Buttons */}
            <div className="coin-chart-buttons flex items-center mt-4 space-x-2 p-2 border-2 rounded-md border-slate-900">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Time Period:
              </span>
              {["1h", "12h", "24h", "7d", "30d", "1y"].map((timePeriod) => (
                <button
                  key={timePeriod}
                  onClick={() => handleChangeTimePeriodState(timePeriod)}
                  className={`px-2 py-1 text-sm text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 ${
                    timePeriod === timePeriodState
                      ? "bg-blue-500 dark:bg-blue-700"
                      : ""
                  }`}
                >
                  {timePeriod}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
};

export default About;
