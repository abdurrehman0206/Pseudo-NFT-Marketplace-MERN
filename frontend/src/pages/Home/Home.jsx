import React from "react";
import Hero from "../../components/Hero/Hero";
import Pane from "../../components/Pane/Pane";
import { useNFTContext } from "../../hooks/useNFTContext";
function Home() {
  const { nfts } = useNFTContext();

  if (!nfts) {
    return null;
  }
  return (
    <div className="home-container">
      <Hero />
      <Pane
        title={"Browse Latest Collections"}
        navTo={"collections"}
        nfts={nfts}
      />
      {/* <Pane title={"Connect With Aspiring Artists"} navTo={"artists"} /> */}
    </div>
  );
}

export default Home;
