import { useEffect, useState } from "react";
import CoinTable from "../components/CoinTable";
// import SearchParams from "../components/SearchParams";
import Banner from "../components/Banner";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // This will hold all data
  const [filteredData, setFilteredData] = useState([]); // This will be set with the filtered data from search.

  useEffect(() => {
    // Make the fetch request here!

    async function requestCoins() {
      const res = await fetch(`https://api.coinranking.com/v2/coins`);
      const json = await res.json();
      setData(json.data);
      setFilteredData(json.data);
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
  }, [searchTerm]);

  return (
    <div className="home-container">
      <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="coin-table">
        <CoinTable data={filteredData} />
      </div>
    </div>
  );
};

export default Home;
