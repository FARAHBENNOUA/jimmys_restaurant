import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    const closeMenu = () => {
        setMenuOpen(false);
    };
    
    // Déterminer quel lien de navigation est actif
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };
    
    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="logo">Jimmy's Restaurant</Link>
                
                <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
                        Accueil
                    </Link>
                    <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>
                        À propos
                    </Link>
                    <Link to="/menu" className={`nav-link ${isActive('/menu')}`} onClick={closeMenu}>
                        Menu
                    </Link>
                    <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>
                        Contact
                    </Link>
                    
                    {user ? (
                        <div className="user-menu">
                            <Link to="/profile" className="profile-link" onClick={closeMenu}>
                                {user.imageUrl ? (
                                    <img src={user.imageUrl} alt={user.name} className="profile-image" />
                                ) : (
                                    <div className="profile-initial">{user.name.charAt(0).toUpperCase()}</div>
                                )}
                                <span className="profile-name">{user.name}</span>
                            </Link>
                            <div className="dropdown-menu">
                                <Link to="/profile" onClick={closeMenu}>Profil</Link>
                                {user.role === 'admin' && (
                                    <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                                )}
                                <button onClick={() => { logout(); closeMenu(); }}>
                                    Se déconnecter
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth" className="auth-button" onClick={closeMenu}>
                            Se connecter
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;