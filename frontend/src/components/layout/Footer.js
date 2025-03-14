import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-logo">Jimmy's Restaurant</h3>
                    <p className="footer-description">
                        Une expérience culinaire exceptionnelle avec des ingrédients frais et de qualité.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
                
                <div className="footer-section">
                    <h3>Liens utiles</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/about">À propos</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Nous contacter</h3>
                    <ul className="contact-info">
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>123 Rue de la Gastronomie, 75001 Paris</span>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <span>01 23 45 67 89</span>
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i>
                            <span>info@jimmysrestaurant.com</span>
                        </li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Heures d'ouverture</h3>
                    <ul className="opening-hours">
                        <li>
                            <span>Lundi - Vendredi</span>
                            <span>11h00 - 23h00</span>
                        </li>
                        <li>
                            <span>Samedi - Dimanche</span>
                            <span>10h00 - 00h00</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {currentYear} Jimmy's Restaurant. Tous droits réservés.</p>
            </div>
        </footer>
    );
}

export default Footer