import React, { useLayoutEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Pane from "../../components/Pane/Pane";
import { useNFTContext } from "../../hooks/useNFTContext";
function Home() {
  const [latestNfts, setLatestNfts] = useState(null);
  const { nfts } = useNFTContext();
  useLayoutEffect(() => {
    if (!nfts) {
      return;
    }
    let newNfts = [];
    //only add three elements
    for (let i = 0; i < 3; i++) {
      newNfts.push(nfts[i]);
    }
    setLatestNfts(newNfts);
  }, [nfts]);
  if (!nfts) {
    return null;
  }
  return (
    <div className="home-container">
      <Hero />
      <Pane
        title={"Browse Latest Collections"}
        navTo={"collections"}
        nfts={latestNfts}
        hasButton={true}
      />
      {/* <Pane title={"Connect With Aspiring Artists"} navTo={"artists"} /> */}
    </div>
  );
}

export default Home;
