import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";

Chart.register(...registerables);
Chart.register(CategoryScale);

const CoinTable = ({ data }) => {
  const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="overflow-x-auto">
        <div className="table-container sm:px-4 md:px-16 rounded">
          <table className="w-full text-sm text-left bg-sky-500 text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white-700  bg-gray-50 dark:bg-gray-950 dark:text-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  #
                </th>
                <th scope="col" className="px-1 py-1">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  24hr %
                </th>
                <th scope="col" className="px-6 py-3">
                  Market Cap
                </th>
                <th scope="col" className="px-6 py-3">
                  7d Chart
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Add to Watchlist
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((coin) => (
                <tr
                  onClick={() => {
                    navigate(`/about/${coin.uuid}`);
                  }}
                  key={coin.uuid}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-800"
                >
                  <td className="text-center">{coin.rank}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="coin">
                      {/* <img src={coin.image} alt={coin.symbol} width={20} /> */}
                      <img
                        src={coin.iconUrl}
                        alt="Logo"
                        width="25"
                        height="auto"
                      />
                      <h4>{coin.name}</h4>
                      <small>{coin.symbol}</small>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    ${formatNumbers(parseFloat(coin.price).toFixed(2))}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-xs font-medium ${
                        parseFloat(coin.change) > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {parseFloat(coin.change).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    ${formatNumbers(parseFloat(coin.marketCap).toFixed(2))}
                  </td>
                  <td className="px-6 py-4">
                    <Line
                      className="flex items-center"
                      data={{
                        labels: Array.from(
                          { length: coin.sparkline.length },
                          (_, i) => (i + 1).toString()
                        ),
                        datasets: [
                          {
                            data: coin.sparkline.map((str) =>
                              parseFloat(str).toFixed(2)
                            ),
                            legend: {
                              display: false,
                            },
                            fill: false,
                            pointRadius: 0,
                            lineTension: 0.5,
                            borderColor: "#00FF5F",
                            borderWidth: 3,
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          x: {
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                          display: false,
                        },
                      }}
                      style={{
                        height: 80,
                        width: 120,
                        color: "#FE1040",
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      href="#"
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      // Here I want to add functionality to click Add and is stored on user's watchlist.
                    >
                      Add
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CoinTable;