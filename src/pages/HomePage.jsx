import { useEffect, useState, useContext } from "react";
import Table from "../components/CoinTable";

6;
import Banner from "../components/Banner";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Hold the data here
  const [filteredData, setFilteredData] = useState([]); // Filtering the data from the search input
  // const [currency, setCurrency] = useState([]);

  useEffect(() => {
    // ?referenceCurrencyUuid=${currency} USE this when building currency change button (this is the query required).

    async function requestCoins() {
      const res = await fetch(
        `https://api.coinranking.com/v2/coins?timePeriod=7d`,
        {
          headers: {
            "x-access-token": `${import.meta.env.VITE_COINRANKING_APIKEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      setData(json.data.coins);
      setFilteredData(json.data.coins);
    }
    requestCoins();
  }, []);

  useEffect(() => {
    // If searchTerm is undefined or empty, simply stop
    if (!searchTerm) return setFilteredData(data);

    // Begin filtering
    const filtered = data.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div className="home-container">
      <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="coin-table">
        <Table data={filteredData} />
      </div>
    </div>
  );
};

export default Home;
