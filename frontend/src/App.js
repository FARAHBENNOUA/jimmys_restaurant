import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Menu from './components/pages/Menu';
import Contact from './components/pages/Contact';
import Auth from './components/auth/Auth';
//import NotFound from './components/pages/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Barre de navigation */}
        <header className="header">
          <div className="logo">Jimmy's Restaurant</div>
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
              <button onClick={handleLogout} className="auth-button">Déconnexion</button>
            ) : (
              <Link to="/auth" className="auth-button" onClick={() => setMenuOpen(false)}>Connexion</Link>
            )}
          </nav>
        </header>

        {/* Contenu principal */}
        <main className="main-content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/about" element={<About />} />
           <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          
          </Routes>
        </main>

        {/* Pied de page */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">Jimmy's Restaurant</div>
            <div className="footer-links">
              <Link to="/">Accueil</Link>
              <Link to="/about">À propos</Link>
              <Link to="/menu">Menu</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-contact">
              <p>213 Rue de la Liberte</p>
              <p>16001 Alger, ALGERIE</p>
              <p>Tél: 01 26 75 98 34</p>
              <p>Email: info@jimmysrestaurant.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Jimmy's Restaurant. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;