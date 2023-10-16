// import cryptoData from "../data/cryptoData";
import "../styles/coin-table.css";
import { Link } from "react-router-dom";

const CoinTable = ({ data }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-black text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24hr Change %</th>
              <th>Market Cap</th>
              <th>7d Chart</th>
              <th>Add to Watchlist</th>

              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {data.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                <td>
                  <div className="coin">
                    <img src={coin.image} alt={coin.symbol} width={20} />
                    <h4>{coin.name}</h4>
                    <small>{coin.symbol}</small>
                  </div>
                </td>
                <td>{coin.current_price}</td>
                <td>{coin.price_change_percentage_24h.toFixed(2)}</td>
                <td>{coin.market_cap}</td>
                <td>Coin chart</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700" // Here I want to add functionality to click Add and is stored on user's watchlist.
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
