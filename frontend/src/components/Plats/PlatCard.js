import React from 'react';
import './PlatCard.css';

function PlatCard({ plat }) {
  return (
    <div className="plat-card">
      <div className="plat-card-image">
        <img src={plat.image_url || '/assets/images/default-plat.jpg'} alt={plat.name} />
      </div>
      <div className="plat-card-content">
        <h3 className="plat-card-title">{plat.name}</h3>
        <p className="plat-card-description">{plat.description}</p>
        <div className="plat-card-footer">
          <span className="plat-card-price">{plat.price?.toFixed(2)} €</span>
          <button className="view-button">Voir détails</button>
        </div>
      </div>
    </div>
  );
}

export default PlatCard;