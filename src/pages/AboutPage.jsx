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

  /*
  To change time period => we use ?timePeriod=${timePeriod} // I want to set this to a button, so when users select a different time it re-renders and updates with the relevant info.

  I want 24hr (default) 7d, 30d, 3m, 1y, 3y - implement the logic to change this. Add functionality whereby if latest entry of data is higher than first entry => Green line : red line
  */
  return (
    <div className="sss">
      {data ? (
        <>
          <div className="flex flex-col p-4 h-screen justify-center items-center text-blue-900 dark:text-slate-200 bg-gray-100 dark:bg-gray-800">
            {data.name}: ${parseFloat(data.price).toFixed(2)}
            <h1 className="text-4xl font-bold text-blue-500 dark:text-blue-300 mb-2">
              {data.name}
            </h1>
            <p className="text-left text-lg text-gray-500 dark:text-gray-200 mb-4">
              {data.description}
              check out their website at:{" "}
              <a href={data.websiteUrl} target="blank">
                {" "}
                website
              </a>
            </p>
            <div className="flex justify-center items-centerw-11/12 lg:w-3/4 xl:w-2/3 mb-6 bg-blue-200 dark:bg-gray-900 h-64 rounded-lg p-4">
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
              />
            </div>
            {/* Time Period Buttons */}
            <div className="coin-chart-buttons flex items-center space-x-4 mt-4">
              {" "}
              {/* Added items-center and space-x-4 for spacing and alignment */}
              <span className="text-lg text-gray-600 dark:text-gray-400">
                Time Period:
              </span>{" "}
              {/* Label for the time periods */}
              {["1h", "12h", "24h", "7d", "30d", "1y"].map((timePeriod) => (
                <button
                  key={timePeriod}
                  onClick={() => handleChangeTimePeriodState(timePeriod)}
                  // Equivalent to above
                  // onClick={() => setTimePeriodState(timePeriod)}

                  className={`px-4 py-2 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 ${
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
        </>
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
};

export default About;
