// import React from "react";
import CoinTable from "../components/CoinTable";
import SearchParams from "../components/SearchParams";

const Home = () => {
  return (
    <div className="home-container">
      <SearchParams />
      <CoinTable />
    </div>
  );
};

export default Home;
