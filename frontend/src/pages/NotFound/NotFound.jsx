import React from "react";
import { NavLink } from "react-router-dom";
function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <h1>
          <span className="c-ac1">Lost in the digital wilderness? </span>
          <span>The link you followed seems to have wandered off. </span>
          <span className="c-ac2">
            Don't worry, there's plenty more to explore on the horizon.
          </span>
        </h1>
        <NavLink to="/" className="btn-primary">
          Return Home
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;
