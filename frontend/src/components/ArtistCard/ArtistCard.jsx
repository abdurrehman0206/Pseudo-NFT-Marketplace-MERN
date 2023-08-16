import React from "react";
import { BsFillCollectionFill } from "react-icons/bs";
function ArtistCard(props) {
  const { user: artist } = props;
  return (
    <div className="artist-card-container">
      <div className="artist-card">
        <div className="artist-card-header">
          <img src={artist.image} alt={artist.name} />
          <h1 className="artist-name">{artist.fullname}</h1>
          <small className="c-ac2">@{artist.username}</small>
        </div>
        <div className="artist-card-body">
          <div className="artist-art c-ac2">
            <BsFillCollectionFill  />
            {artist.userCollection.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
