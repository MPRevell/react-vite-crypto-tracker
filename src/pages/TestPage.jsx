import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db, auth } from "../firebase.config";
import axios from "axios";
import { where } from "firebase/firestore";
import Table from "../components/CoinTable";
import SubscriptionContext from "../contexts/SubscriptionContext";

export default function TestPage() {
  const { watchedCoins } = useContext(SubscriptionContext);
  const [allCoins, setAllCoins] = useState([]);

  const fetchAllCoins = async () => {
    try {
      const response = await axios.get(
        `https://api.coinranking.com/v2/coins?timePeriod=7d`,
        {
          headers: {
            "x-access-token": `${import.meta.env.VITE_COINRANKING_APIKEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const coinsData = response.data.data.coins;
      setAllCoins(coinsData);
      console.log(coinsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchAllCoins();
    }
  }, []);

  return (
    <>
      {auth.currentUser ? (
        <div>
          <div>
            {watchedCoins.map((subscription) => {
              const filteredCoins = allCoins.filter((coin) =>
                subscription.coins.includes(coin.uuid)
              );

              return (
                <div key={subscription.id}>
                  <div className="coin-table">
                    <Table data={filteredCoins} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>Please log in to view your watchlist.</div>
      )}
    </>
  );
}
