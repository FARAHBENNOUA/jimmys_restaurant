import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlatCard from './PlatCard';
import { platAPI } from '../../api/config';
import './PlatList.css';

function PlatList() {
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchPlats = async () => {
      setLoading(true);
      try {
        const response = await platAPI.getAllPlats();
        setPlats(response.data);
        setError('');
      } catch (err) {
        console.error("Erreur lors du chargement des plats:", err);
        setError("Impossible de charger les plats. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlats();
  }, []);

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const filteredPlats = categoryFilter === 'all' 
    ? plats 
    : plats.filter(plat => plat.category === categoryFilter);

  return (
    <div className="plat-list-container">
      <h1>Notre Menu</h1>
      
      <div className="category-filter">
        <button 
          className={`category-button ${categoryFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          Tous
        </button>
        <button 
          className={`category-button ${categoryFilter === 'pizza' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('pizza')}
        >
          Pizzas
        </button>
        <button 
          className={`category-button ${categoryFilter === 'burger' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('burger')}
        >
          Burgers
        </button>
        <button 
          className={`category-button ${categoryFilter === 'pasta' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('pasta')}
        >
          Pâtes
        </button>
        <button 
          className={`category-button ${categoryFilter === 'dessert' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('dessert')}
        >
          Desserts
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Chargement des plats...</div>
      ) : filteredPlats.length === 0 ? (
        <div className="empty-state">
          <p>Aucun plat trouvé dans cette catégorie.</p>
        </div>
      ) : (
        <div className="plats-grid">
          {filteredPlats.map(plat => (
            <Link to={`/menu/${plat.id}`} key={plat.id} className="plat-link">
              <PlatCard plat={plat} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlatList;