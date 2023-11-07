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
import routes from "./routes";
import "./firebase.config";

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

  console.log("auth.currentUser", auth.currentUser);

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
        // ...
      } else {
        console.log("no user!!!");
      }
    });
  }, []);

  return (
    <SubscriptionContext.Provider value={{ watchedCoins: watchedCoins }}>
      <RouterProvider router={router} />
    </SubscriptionContext.Provider>
  );
}

export default App;
