import React from "react";
import Header from "../components/layout/Header";
import Title from "../components/shared/Title";
import Applayout from "../components/layout/Applayout";

const Home = () => {
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
}

export default Applayout()(Home);
