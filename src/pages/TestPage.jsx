import { useEffect, useState, useContext } from "react";
import { auth } from "../firebase.config";
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
          <section className="dark:bg-gray-900 bg-white text-white">
            <div className="mx-auto w-full h-60px px-4 py-16">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="bg-gradient-to-r from-sky-300 via-blue-300 to-blue-900  dark:from-green-300 dark:via-blue-500 dark:to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                  <span className="sm:block">Welcome to your watchlist...</span>
                </h1>
                <div className="mt-8 flex flex-wrap justify-center gap-4"></div>
              </div>
            </div>
          </section>
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
