import { useState } from "react";
import cryptoData from "../data/cryptoData";

const SearchParams = () => {
  const [coin, setCoin] = useState("");
  return (
    <div className="search-params">
      <form>
        <label htmlFor="coin">
          <input
            onChange={(event) => setCoin(event.target.value)}
            id="coin"
            value={coin}
            placeholder="Search"
          />
        </label>
        <button>Submit </button>
      </form>
    </div>
  );
};

export default SearchParams;
