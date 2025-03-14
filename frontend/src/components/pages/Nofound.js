import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page non trouvée</h2>
        <p>Oups! La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;