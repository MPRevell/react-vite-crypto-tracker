import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase.config";
import axios from "axios";
import { where } from "firebase/firestore";

export default function TestPage() {
  const [watchedCoins, setWatchedCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  console.log("auth", auth.currentUser);

  const getAllSubscriptions = async () => {
    const currentUserId = auth.currentUser?.uid;

    // Filter subscriptions based on current user ID
    const subscriptionsRef = collection(db, "subscriptions");
    const q = query(subscriptionsRef, where("userId", "==", currentUserId));
    const querySnapshot = await getDocs(q);

    const subscriptions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All Subscriptions", subscriptions);
    setWatchedCoins(subscriptions);
  };

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
      getAllSubscriptions();
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
                  <h3>User ID: {subscription.userId}</h3>
                  <ul>
                    {filteredCoins.map((coin) => (
                      <li key={coin.uuid}>{coin.name}</li>
                    ))}
                  </ul>
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
