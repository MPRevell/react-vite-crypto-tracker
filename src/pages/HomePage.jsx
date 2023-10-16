import React from "react";
import cryptoData from "../data/cryptoData";

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-orange-800 font-bold">TEXT PLACEHOLDER</div>
      <div>
        <h1>Cryptocurrencies</h1>
        <ul>
          {cryptoData.map((crypto) => (
            <li key={crypto.id}>
              <strong>{crypto.name}</strong>: ${crypto.current_price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
