import React from "react";
import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero">
        <div className="hero-top">
          <h1>Envision Possibilities, Own Digital Art</h1>
        </div>
        <div className="hero-mid">
          <h4>
            Immerse yourself in a realm of unique digital creations and secure
            your place in the digital art movement through Risidio's NFT
            ecosystem.
          </h4>
        </div>
        <div className="hero-bottom">
          <NavLink to="/" className="btn-box-primary">
            Explore
            <span></span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Hero;
