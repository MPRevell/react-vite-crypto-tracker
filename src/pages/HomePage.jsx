import React, { useEffect, useState } from "react";
import CoinTable from "../components/CoinTable";
import cryptoData from "../data/cryptoData";
console.log("cryptoData:", cryptoData);
import SearchParams from "../components/SearchParams";

const Home = () => {
  const [data, setData] = useState([]);
  console.log("HELLO!!!");

  useEffect(() => {
    // Make the fetch request here!

    async function requestCoins() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
        );
        const json = await res.json();
        if (json.error_code) return setData(cryptoData);
        setData(json);
      } catch (err) {
        console.log("API call refused. Getting data from cryptoData");
        setData(cryptoData);
      }
    }

    requestCoins();
  }, []);

  return (
    <div className="home-container">
      <SearchParams />
      <CoinTable data={data} />
    </div>
  );
};

export default Home;
