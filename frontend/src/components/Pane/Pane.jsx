import React from "react";
import { NavLink } from "react-router-dom";
import NftCard from "../NftCard/NftCard";
function Pane(props) {
  const { title, navTo, nfts, hasButton } = props;

  return (
    <div className="pane-container">
      <div className="pane">
        <div className="pane-header">
          <div className="pane-header-title">
            <h1>{title}</h1>
          </div>
          {hasButton && (
            <div className="pane-header-actions">
              <NavLink to={`/${navTo}`} className="btn-primary"></NavLink>
            </div>
          )}
        </div>
        <div className="pane-body">
          {nfts?.map((nft) => (
            <NftCard key={nft._id} nft={nft} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pane;
