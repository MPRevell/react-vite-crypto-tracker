import { useState } from "react";

const SearchParams = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Here I am getting the search query.
  const [coins, setCoins] = useState([]); // then we store the results from API

  async function requestCoins() {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
    );
    const json = await res.json();
    console.log(json);
    setCoins(json.coins);
  }

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestCoins();
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

      {coins.map((coin) => (
        <div key={coin.id}>
          {coin.name}: ${coin.price}
        </div>
      ))}
    </div>
  );
};

export default SearchParams;
