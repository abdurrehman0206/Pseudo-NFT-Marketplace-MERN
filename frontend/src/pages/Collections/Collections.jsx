import React from "react";
import Pane from "../../components/Pane/Pane";
import { useNFTContext } from "../../hooks/useNFTContext";
function Collections() {
  const { nfts } = useNFTContext();
  if (!nfts) {
    return null;
  }
  return (
    <div className="collections-container">
      <div className="collections">
        <div className="collections-header">
          <h1>
            Curated Treasures, <span className="c-ac1">Infinite Stories</span>
          </h1>
        </div>

        <Pane hasButton={false} nfts={nfts} />
      </div>
    </div>
  );
}

export default Collections;
