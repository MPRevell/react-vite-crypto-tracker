import React, { useEffect, useState } from "react";
import CoinTable from "../components/CoinTable";
import SearchParams from "../components/SearchParams";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // THis contains the unfiltered data
  const [filteredData, setFilteredData] = useState([]); // This contains the filtered data, assuming we have a searchTerm

  useEffect(() => {
    // Make the fetch request here!

    async function requestCoins() {
      const res = await fetch(`https://api.coincap.io/v2/assets`);
      const json = await res.json();
      setData(json.data);
      setFilteredData(json.data);
    }

    requestCoins();
  }, []); // The array is called "dependency array"

  useEffect(() => {
    // If searchTerm is undefined or empty, simply stop
    if (!searchTerm) return setFilteredData(data);

    // Otherwise, we start filtering
    const filtered = data.filter((coin) => {
      // name: "Bitcoin" --- searchTerm === "bit"
      // bitcoin.include("bit") // True
      // bitcoin.include("zet") // False
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(filtered);
  }, [searchTerm]);

  return (
    <div className="home-container">
      {/* <SearchParams /> */}

      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // If searchTerm is undefined or empty, simply stop
            if (!searchTerm) return setFilteredData(data);

            // Otherwise, we start filtering
            const filtered = data.filter((coin) => {
              // name: "Bitcoin" --- searchTerm === "bit"
              // bitcoin.include("bit") // True
              // bitcoin.include("zet") // False
              return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
            });

            setFilteredData(filtered);
          }}
        >
          <label htmlFor="coin">
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              id="coin"
              value={searchTerm}
              placeholder="Type to search"
            />
          </label>
          <button>Submit</button>
        </form>
      </div>

      <CoinTable data={filteredData} />
    </div>
  );
};

export default Home;
