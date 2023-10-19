import { useNavigate } from "react-router-dom";

const CoinTable = ({ data }) => {
  const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left bg-sky-500 text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white-700  bg-gray-50 dark:bg-gray-950 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                #
              </th>
              <th scope="col" className="px-6 py-3">
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
              <th scope="col" className="px-6 py-3 text-center">
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
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 overflow-x-auto"
              >
                <td className="text-center">{coin.rank}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="coin">
                    {/* <img src={coin.image} alt={coin.symbol} width={20} /> */}
                    <h4>{coin.name}</h4>
                    <small>{coin.symbol}</small>
                    <img src={coin.iconURL} alt="Logo" />
                  </div>
                </th>
                <td className="px-6 py-4">
                  {formatNumbers(parseFloat(coin.price).toFixed(2))}
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
                  {formatNumbers(parseFloat(coin.marketCap).toFixed(2))}
                </td>
                <td className="px-6 py-4">Coin chart</td>
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
    </>
  );
};

export default CoinTable;
