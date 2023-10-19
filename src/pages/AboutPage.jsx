// import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const About = () => {
  const { coin } = useParams();

  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    if (!coin) return;
    console.log(`Prepare to fetch the data for ${coin}`);

    async function requestCoinDetails() {
      const res = await fetch(`https://api.coinranking.com/v2/coin/${coin}`);
      const json = await res.json();
      setData(json.data.coin);
    }
    requestCoinDetails();
  }, [coin]);

  return (
    <div>
      {data ? (
        <>
          This is the about page.
          <div style={{ width: "50%", margin: "0 auto", marginTop: "1em" }}>
            HyperUI Component Examples:
            <div> Lets see if data is passing correctly {data?.name} </div>
          </div>
        </>
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
};

export default About;
