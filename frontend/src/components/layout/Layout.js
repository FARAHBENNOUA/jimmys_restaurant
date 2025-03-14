import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../.././asset/logo.png';
import './Layout.css';

function Layout({ isLoggedIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="layout">
      {/* Navbar */}
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src= '../../asset/image4(1).png' alt="Jimmy's Restaurant Logo" className="logo" />
          </Link>
        </div>
        <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`navigation ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>À propos</Link>
          <Link to="/menu" className="nav-link" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          
          {isLoggedIn ? (
            <button onClick={onLogout} className="auth-button">Déconnexion</button>
          ) : (
            <Link to="/auth" className="auth-button" onClick={() => setMenuOpen(false)}>Connexion</Link>
          )}
        </nav>
      </header>

      {/* Content area */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo-container">
            <img src={logo} alt="Jimmy's Restaurant Logo" className="footer-logo" />
          </div>
          <div className="footer-links">
            <Link to="/">Accueil</Link>
            <Link to="/about">À propos</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-contact">
            <p>213 Rue de la Liberté</p>
            <p>16001 Alger, ALGERIE</p>
            <p>Tél: 01 26 75 98 34</p>
            <p>Email: info@jimmysrestaurant.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jimmy's Restaurant. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout