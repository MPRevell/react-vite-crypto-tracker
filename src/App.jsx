import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase.config";
import Navbar from "./components/shared/Navbar";
import AuthChecker from "./components/AuthChecker";
import SubscriptionContext from "./contexts/SubscriptionContext";
import CryptoContext from "./contexts/CryptoContext";
import routes from "./routes";
import "./firebase.config";
import axios from "axios";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.protected ? (
              <AuthChecker>
                <route.component />
              </AuthChecker>
            ) : (
              <route.component />
            )
          }
        />
      ))}
    </Route>
  )
);

function App() {
  const [watchedCoins, setWatchedCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  console.log("auth.currentUser", auth.currentUser);

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

  const [value, loading, error] = useDocument(
    doc(db, "subscriptions", auth.currentUser?.uid || "null")
  );
  //   console.log("value:", value?.data());

  useEffect(() => {
    if ((!loading && !error) || value) {
      setWatchedCoins(value?.data().coins);
    }
  }, [value, loading, error]);

  console.log("watchedCoins", watchedCoins);

  /*   const getAllSubscriptions = async () => {
    const currentUserId = auth.currentUser?.uid;

    // Directly query the subscription document using the current user ID
    const userRef = doc(db, "subscriptions", currentUserId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      setWatchedCoins(userDoc.data().coins);
    } else {
      // Create a new watchlist document.
      await setDoc(userRef, {
        coins: [],
        updatedTime: serverTimestamp(),
        createdTime: serverTimestamp(),
        userId: auth.currentUser?.uid,
      });
    }
  }; */

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in!!!");
        // getAllSubscriptions();
        fetchAllCoins();
        // ...
      } else {
        console.log("no user!!!");
        fetchAllCoins();
      }
    });
  }, []);

  // Adding or Remove Coin to watchlist dependent on user.
  const handleAddToWatchlist = async (coinId, watchedCoins) => {
    const userRef = doc(db, "subscriptions", auth.currentUser?.uid);

    if (watchedCoins.includes(coinId)) {
      // Remove the coin from the watchlist
      await updateDoc(userRef, {
        coins: arrayRemove(coinId),
      });
    } else {
      // Add the coin to the watchlist
      await updateDoc(userRef, {
        coins: arrayUnion(coinId),
      });
    }
  };

  return (
    <CryptoContext.Provider value={{ allCoins: allCoins }}>
      <SubscriptionContext.Provider
        value={{
          watchedCoins: watchedCoins,
          handleAddToWatchlist: handleAddToWatchlist,
        }}
      >
        <RouterProvider router={router} />
      </SubscriptionContext.Provider>
    </CryptoContext.Provider>
  );
}

export default App;
