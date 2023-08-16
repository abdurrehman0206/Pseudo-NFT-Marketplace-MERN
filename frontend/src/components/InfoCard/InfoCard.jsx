import React from "react";

function InfoCard(props) {
  return (
    <div className="info-card-container">
      <div className={`info-card theme-ac${props.accent}`}>
        <div className="info-card-title">{props.title}</div>
        <div className="info-card-content">{props.content}</div>
      </div>
    </div>
  );
}

export default InfoCard;
