import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>À propos de Jimmy's Restaurant</h1>
          <p>Une passion pour la cuisine italienne et américaine depuis 2010</p>
        </div>
      </section>
      
      <section className="about-story">
        <div className="about-content">
          <div className="about-text">
            <h2>Notre histoire</h2>
            <p>
              Jimmy's Restaurant a été fondé en 2010 par le chef Jimmy Mohamed, un passionné de cuisine italienne et américaine. Après avoir travaillé dans plusieurs restaurants renommés en Europe et aux États-Unis, Jimmy a décidé de créer son propre établissement pour partager sa passion culinaire.
            </p>
            <p>
              Notre philosophie est simple : des ingrédients frais, des recettes authentiques et un service chaleureux. Nous sélectionnons avec soin nos fournisseurs locaux pour vous offrir des plats savoureux préparés avec des produits de qualité.
            </p>
          </div>
          <div className="about-image">
            <img src="/assets/images/restaurant-story.jpg" alt="Notre histoire" />
          </div>
        </div>
      </section>
      
      <section className="about-chef">
        <div className="about-content reverse">
          <div className="about-image">
            <img src="/assets/images/chef.jpg" alt="Notre chef" />
          </div>
          <div className="about-text">
            <h2>Notre chef</h2>
            <p>
              Jimmy Mohamed est né d'une mère italienne et d'un père américain, ce qui lui a permis de découvrir différentes cultures culinaires dès son plus jeune âge. Il a étudié l'art culinaire à Rome et à New York avant de travailler dans plusieurs restaurants étoilés.
            </p>
            <p>
              Sa passion pour les saveurs authentiques et les produits frais l'a amené à créer des plats uniques qui mêlent traditions italienne et américaine. Aujourd'hui, il partage son savoir-faire avec son équipe pour vous offrir une expérience gustative exceptionnelle.
            </p>
            <blockquote>
              "La cuisine est un art qui parle à tous les sens. C'est ma façon de partager mon plus bel amour."
              <cite>— Chef Jimmy Mohamed</cite>
            </blockquote>
          </div>
        </div>
      </section>
      
      <section className="about-values">
        <h2>Nos valeurs</h2>
        <div className="values-grid">
          <div className="value-card">
            <i className="fas fa-leaf"></i>
            <h3>Fraîcheur</h3>
            <p>Nous utilisons uniquement des ingrédients frais et de saison pour garantir la qualité de nos plats.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-utensils"></i>
            <h3>Authenticité</h3>
            <p>Nos recettes respectent les traditions culinaires tout en apportant une touche d'innovation.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-heart"></i>
            <h3>Passion</h3>
            <p>Chaque plat est préparé avec amour et attention aux détails pour vous offrir le meilleur.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-users"></i>
            <h3>Convivialité</h3>
            <p>Nous créons une atmosphère chaleureuse où chacun se sent comme chez soi.</p>
          </div>
        </div>
      </section>
      
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Restez informé</h2>
            <p>Inscrivez-vous à notre newsletter pour recevoir nos offres spéciales et événements</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Votre adresse email" required />
            <button type="submit" className="submit-button">S'inscrire</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default About