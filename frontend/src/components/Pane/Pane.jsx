import React from "react";
import { NavLink } from "react-router-dom";
import NftCard from "../NftCard/NftCard";
import ArtistCard from "../ArtistCard/ArtistCard";
function Pane(props) {
  const { title, navTo, nfts, users, hasButton } = props;

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
          {users?.map((user) => (
            <ArtistCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pane;
