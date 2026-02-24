import React from "react";
import Hero from "../components/hero";
import Featured from "../components/featured";

const Home = () => {
  return (
    <>
      <div className="main">
        <div id="home">
          <div id="hero">
            <Hero />
          </div>
          <Featured />
        </div>
      </div>
    </>
  );
};

export default Home;
