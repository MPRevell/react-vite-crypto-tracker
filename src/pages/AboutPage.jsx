import React from "react";
import HyperUIComponentExample from "../components/HyperUIComponentExample";
import HyperUIComponentExample2 from "../components/HyperUIComponentExample2";

const About = () => {
  return (
    <div>
      This is the about page. See AboutPage.jsx
      <div style={{ width: "50%", margin: "0 auto", marginTop: "1em" }}>
        HyperUI Component Examples:
        <HyperUIComponentExample />
        <HyperUIComponentExample2 />
      </div>
    </div>
  );
};

export default About;
