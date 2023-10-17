// import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinTable from "../components/CoinTable";

const About = () => {
  const { coin } = useParams();

  const [data, setData] = useState(null);

  /* useEffect(() => {
    if (!coin) return;
    console.log(`Prepare to fetch the data for ${coin}`);

    async function requestCoinDetails() {
      const res = await fetch(`https://api.coincap.io/v2/assets`);
      const json = await res.json();
      setData(json.data);
    }
    requestCoinDetails();
  }, [coin]); */

  return (
    <div>
      This is the about page.
      <div style={{ width: "50%", margin: "0 auto", marginTop: "1em" }}>
        HyperUI Component Examples:
      </div>
    </div>
  );
};

export default About;
