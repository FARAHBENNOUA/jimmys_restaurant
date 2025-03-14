import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    plats: 0,
    ingredients: 0,
    users: 0,
    orders: 0
  });

  // Simuler le chargement des statistiques - dans un projet réel, vous feriez un appel API
  React.useEffect(() => {
    // Exemple: vous feriez un appel API ici pour obtenir les vraies statistiques
    setStats({
      plats: 12,
      ingredients: 32,
      users: 45,
      orders: 78
    });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Tableau de bord d'administration</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-utensils"></i>
          </div>
          <div className="stat-content">
            <h3>Plats</h3>
            <p className="stat-number">{stats.plats}</p>
          </div>
          <Link to="/dashboard/plats" className="stat-link">Gérer</Link>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-carrot"></i>
          </div>
          <div className="stat-content">
            <h3>Ingrédients</h3>
            <p className="stat-number">{stats.ingredients}</p>
          </div>
          <Link to="/dashboard/ingredients" className="stat-link">Gérer</Link>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Utilisateurs</h3>
            <p className="stat-number">{stats.users}</p>
          </div>
          <Link to="/dashboard/users" className="stat-link">Gérer</Link>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3>Commandes</h3>
            <p className="stat-number">{stats.orders}</p>
          </div>
          <Link to="/dashboard/orders" className="stat-link">Gérer</Link>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/dashboard/plats/new" className="action-button">
          <i className="fas fa-plus"></i> Ajouter un plat
        </Link>
        <Link to="/dashboard/ingredients/new" className="action-button">
          <i className="fas fa-plus"></i> Ajouter un ingrédient
        </Link>
      </div>
      
      <div className="dashboard-panels">
        <div className="panel">
          <h2>Dernières commandes</h2>
          <div className="panel-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1234</td>
                  <td>Jean Dupont</td>
                  <td>42.90 €</td>
                  <td><span className="status-badge delivered">Livré</span></td>
                  <td>15/03/2023</td>
                </tr>
                <tr>
                  <td>#1233</td>
                  <td>Marie Lambert</td>
                  <td>28.50 €</td>
                  <td><span className="status-badge pending">En attente</span></td>
                  <td>15/03/2023</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to="/dashboard/orders" className="view-all">Voir toutes les commandes</Link>
        </div>
        
        <div className="panel">
          <h2>Plats populaires</h2>
          <div className="panel-content">
            <div className="popular-item">
              <div className="popular-item-name">Pizza Margherita</div>
              <div className="popular-item-bar">
                <div className="bar-fill" style={{ width: '85%' }}></div>
              </div>
              <div className="popular-item-percent">85%</div>
            </div>
            <div className="popular-item">
              <div className="popular-item-name">Burger Gourmet</div>
              <div className="popular-item-bar">
                <div className="bar-fill" style={{ width: '72%' }}></div>
              </div>
              <div className="popular-item-percent">72%</div>
            </div>
            <div className="popular-item">
              <div className="popular-item-name">Tiramisu</div>
              <div className="popular-item-bar">
                <div className="bar-fill" style={{ width: '65%' }}></div>
              </div>
              <div className="popular-item-percent">65%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;