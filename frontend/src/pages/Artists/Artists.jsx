import React from "react";
import Pane from "../../components/Pane/Pane";
import { useUsersContext } from "../../hooks/useUsersContext";
function Artists() {
  document.title = "Artists";
  const { users: artists } = useUsersContext();
  if (!artists) {
    return null;
  }
  return (
    <div className="artists-container">
      <div className="artists">
        <div className="artists-header">
          <h1>
            Crafting Dreams, <span className="c-ac2">Pixel by Pixel</span>
          </h1>
        </div>

        <Pane hasButton={false} users={artists} />
      </div>
    </div>
  );
}

export default Artists;
