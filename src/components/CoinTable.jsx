// <!--
//   Heads up! 👋

//   This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
// -->
// import React from "react";
import cryptoData from "../data/cryptoData";
import "../styles/coin-table.css";

const CoinTable = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-black text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Rank
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                24hr Change %
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Market Cap (000s)
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Add to Watchlist
              </th>

              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                <td>
                  <div className="coin">
                    <img src={coin.image} alt={coin.symbol} />
                    <h4>{coin.name}</h4>
                    <small>{coin.symbol}</small>
                  </div>
                </td>
                <td>{coin.current_price}</td>
                <td>{coin.price_change_percentage_24h.toFixed(2)}</td>
                <td>{coin.market_cap}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
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
