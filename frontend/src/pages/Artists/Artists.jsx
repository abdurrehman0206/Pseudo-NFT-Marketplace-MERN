import React from "react";
import Pane from "../../components/Pane/Pane";
import { useUsersContext } from "../../hooks/useUsersContext";
import Loader from "../../components/Loader/Loader";
function Artists() {
  document.title = "Artists";
  const { users: artists, loading: usersLoading } = useUsersContext();
  if (!artists) {
    return null;
  }
  if (usersLoading) {
    return <Loader />;
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
