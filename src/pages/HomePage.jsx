import { useEffect, useState } from "react";
import CoinTable from "../components/CoinTable";
// import SearchParams from "../components/SearchParams";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // This will hold all data
  const [filteredData, setFilteredData] = useState([]); // This will be set with the filtered data from search.

  useEffect(() => {
    // Make the fetch request here!

    async function requestCoins() {
      const res = await fetch(`https://api.coincap.io/v2/assets`);
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
      {/* <SearchParams /> */}
      <label htmlFor="coin" className="px-4">
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          id="coin"
          value={searchTerm}
          placeholder="Type to search"
        />
      </label>
      <CoinTable data={filteredData} />
    </div>
  );
};

export default Home;
