import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    setWatchedCoins(subscriptions[0].coins);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in!!!");
        getAllSubscriptions();
        fetchAllCoins();
        // ...
      } else {
        console.log("no user!!!");
        fetchAllCoins();
      }
    });
  }, []);

  return (
    <CryptoContext.Provider value={{ allCoins: allCoins }}>
      <SubscriptionContext.Provider value={{ watchedCoins: watchedCoins }}>
        <RouterProvider router={router} />
      </SubscriptionContext.Provider>
    </CryptoContext.Provider>
  );
}

export default App;
