import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import pizza from '../../asset/PIZZA.png';
import hamburger from '../../asset/Hamburger.png';
import hotdog from '../../asset/image4(1).png';
import pasta from '../../asset/pastabolognese..png';
import tiramisu from '../../asset/TIRAMISU.png';

function Home() {
  return (
    <div className="home-container">
      {/* Hero section */}
      <section className="hero-section" style={{ backgroundImage: `url(${pizza})` }}>
        <div className="hero-content">
          <h1>Jimmy's Restaurant</h1>
          <p>Des saveurs italiennes et américaines authentiques</p>
          <div className="cta-buttons">
            <Link to="/menu" className="cta-button">Voir notre menu</Link>
            <Link to="/contact" className="cta-button secondary">Réserver</Link>
          </div>
        </div>
      </section>
      
      {/* Featured plat central */}
      <section className="featured-main-section">
        <h2 className="section-title">Notre spécialité</h2>
        <div className="main-plat-container">
          <div className="main-plat-card">
            <div className="main-plat-image">
              <img src={pizza} alt="Pizza spéciale" />
            </div>
            <div className="main-plat-info">
              <h3>Pizza Spéciale Jimmy's</h3>
              <p>Notre pizza signature avec une base de tomate, mozzarella, peperonnis, et notre sauce spéciale.</p>
              <div className="plat-footer">
                <span className="price">15.90 €</span>
                <button className="add-to-cart">Commander</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4 plats en pyramide */}
      <section className="secondary-plats-section">
        <div className="section-header">
          <div className="section-title-container">
            <h2>Nos autres spécialités</h2>
            <p>Découvrez nos autres plats emblématiques</p>
          </div>
          <Link to="/menu" className="view-all-link">Voir tout le menu</Link>
        </div>
        
        <div className="plats-pyramid">
          <div className="pyramid-top">
            <div className="plat-card small-card">
              <div className="plat-image-container">
                <img src={hamburger} alt="Hamburger" className="plat-image" />
              </div>
              <div className="plat-info">
                <h3>Hamburger Gourmet</h3>
                <p>Bœuf, cheddar, bacon, oignons caramélisés</p>
                <div className="plat-footer">
                  <span className="price">14.50 €</span>
                </div>
              </div>
            </div>
            <div className="plat-card small-card">
              <div className="plat-image-container">
                <img src={hotdog} alt="Hot Dog" className="plat-image" />
              </div>
              <div className="plat-info">
                <h3>Hot Dog New-Yorkais</h3>
                <p>Saucisse de bœuf, oignons frits, moutarde</p>
                <div className="plat-footer">
                  <span className="price">10.90 €</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pyramid-bottom">
            <div className="plat-card small-card">
              <div className="plat-image-container">
                <img src={pasta} alt="Pâtes Bolognaise" className="plat-image" />
              </div>
              <div className="plat-info">
                <h3>Pâtes Bolognaise</h3>
                <p>Pâtes fraîches, sauce bolognaise maison</p>
                <div className="plat-footer">
                  <span className="price">13.90 €</span>
                </div>
              </div>
            </div>
            <div className="plat-card small-card">
              <div className="plat-image-container">
                <img src={tiramisu} alt="Tiramisu" className="plat-image" />
              </div>
              <div className="plat-info">
                <h3>Tiramisu</h3>
                <p>Dessert italien traditionnel au mascarpone et café</p>
                <div className="plat-footer">
                  <span className="price">7.90 €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact section */}
      <section className="contact-preview-section">
        <h2>Contactez-nous</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-detail">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Adresse</h3>
                <p>213 Rue de la Liberté, 16001 Alger</p>
              </div>
            </div>
            <div className="contact-detail">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Téléphone</h3>
                <p>01 26 75 98 34</p>
              </div>
            </div>
            <div className="contact-detail">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>info@jimmysrestaurant.com</p>
              </div>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Votre nom" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Votre email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Votre message" rows="4" required></textarea>
            </div>
            <button type="submit" className="submit-button">Envoyer</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;