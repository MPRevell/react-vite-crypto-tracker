import { useEffect, useState, useContext } from "react";
import { db, auth } from "../firebase.config";
import Table from "../components/CoinTable";
import SubscriptionContext from "../contexts/SubscriptionContext";
import CryptoContext from "../contexts/CryptoContext";

export default function TestPage() {
  const { watchedCoins } = useContext(SubscriptionContext);
  const { allCoins } = useContext(CryptoContext);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    // This function will create an array of all the coins that are being watched.
    const newFilteredCoins = watchedCoins
      .map((subscription) =>
        allCoins.filter((coin) => subscription.includes(coin.uuid))
      )
      .flat(); // Flatten the array of arrays into a single array

    setFilteredCoins(newFilteredCoins);
  }, [watchedCoins, allCoins]);

  return (
    <>
      {auth.currentUser ? (
        <div>
          <div className="coin-table">
            <Table data={filteredCoins} />
          </div>
        </div>
      ) : (
        <div>Please log in to view your watchlist.</div>
      )}
    </>
  );
}
