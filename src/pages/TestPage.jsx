import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase.config";

export default function TestPage() {
  const [watchedCoins, setWatchedCoins] = useState([]);

  console.log("auth", auth.currentUser);
  const getAllSubscriptions = async () => {
    const querySnapshot = await getDocs(collection(db, "subscriptions"));

    const subscriptions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All Subscriptions", subscriptions);
    setWatchedCoins(subscriptions);
  };

  useEffect(() => {
    getAllSubscriptions();
  }, []);

  auth.currentUser;

  return (
    <>
      <div>
        <div>
          {watchedCoins.map((subscription) => (
            <div key={subscription.id}>
              <h3>User ID: {subscription.userId}</h3>
              <ul>
                {subscription.coins.map((coinId, index) => (
                  <li key={index}>{coinId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        You can only see this text if you are logged in (feel free to check by
        clicking avatar in the top right to sign-out)
      </div>
    </>
  );
}
