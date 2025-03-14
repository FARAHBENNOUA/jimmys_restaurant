import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Formulaire soumis:', formData);
    alert('Message envoyé avec succès!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contactez-nous</h1>
          <p>Nous sommes à votre disposition pour toute question ou réservation</p>
        </div>
      </section>
      
      <section className="contact-info-section">
        <div className="contact-cards">
          <div className="contact-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Adresse</h3>
            <p>213 Rue de la Liberté</p>
            <p>16001 Alger, ALGERIE</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-phone"></i>
            <h3>Téléphone</h3>
            <p>01 26 75 98 34</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>info@jimmysrestaurant.com</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-clock"></i>
            <h3>Horaires</h3>
            <p>Lun - Ven: 11h00 - 23h00</p>
            <p>Sam - Dim: 10h00 - 00h00</p>
          </div>
        </div>
      </section>
      
      <section className="contact-form-section">
        <h2>Envoyez-nous un message</h2>
        <div className="form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Envoyer</button>
          </form>
          
          <div className="contact-image">
            <img src="./asset/Ellipse 1 (1).png" alt="Notre restaurant" />
          </div>
        </div>
      </section>
      
      <section className="reservation-section">
        <h2>Réservez une table</h2>
        <form className="reservation-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="res-name">Nom complet</label>
              <input type="text" id="res-name" name="res-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="res-email">Email</label>
              <input type="email" id="res-email" name="res-email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="res-phone">Téléphone</label>
              <input type="tel" id="res-phone" name="res-phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="res-guests">Nombre de personnes</label>
              <select id="res-guests" name="res-guests" required>
                <option value="">Sélectionnez</option>
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
                <option value="3">3 personnes</option>
                <option value="4">4 personnes</option>
                <option value="5">5 personnes</option>
                <option value="6+">6+ personnes</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="res-date">Date</label>
              <input type="date" id="res-date" name="res-date" required />
            </div>
            <div className="form-group">
              <label htmlFor="res-time">Heure</label>
              <input type="time" id="res-time" name="res-time" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="res-notes">Notes spéciales</label>
            <textarea id="res-notes" name="res-notes" rows="3"></textarea>
          </div>
          <button type="submit" className="submit-button">Réserver maintenant</button>
        </form>
      </section>
    </div>
  );
}

export default Contact;