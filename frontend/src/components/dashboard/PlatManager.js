import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { platAPI } from '../../api/config';
import './PlatManager.css';

function PlatManager() {
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchPlats();
  }, []);

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

  const handleDeleteClick = (platId) => {
    setConfirmDelete(platId);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    
    try {
      await platAPI.deletePlat(confirmDelete);
      setPlats(plats.filter(plat => plat.id !== confirmDelete));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression du plat:", err);
      setError("Impossible de supprimer le plat. Veuillez réessayer.");
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="plat-manager-container">
      <div className="manager-header">
        <h1>Gestion des plats</h1>
        <Link to="/dashboard/plats/new" className="add-button">
          <i className="fas fa-plus"></i> Ajouter un plat
        </Link>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Chargement des plats...</div>
      ) : plats.length === 0 ? (
        <div className="empty-state">
          <p>Aucun plat trouvé. Commencez par en ajouter un!</p>
        </div>
      ) : (
        <div className="plats-table-container">
          <table className="plats-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Ingrédients</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plats.map(plat => (
                <tr key={plat.id}>
                  <td className="plat-image-cell">
                    {plat.image_url ? (
                      <img src={plat.image_url} alt={plat.name} className="plat-thumbnail" />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </td>
                  <td>{plat.name}</td>
                  <td>{plat.category}</td>
                  <td>{plat.price} €</td>
                  <td>
                    <div className="ingredients-list">
                      {plat.ingredients?.map(ing => ing.name).join(', ') || 'Aucun ingrédient'}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <Link to={`/dashboard/plats/edit/${plat.id}`} className="edit-button">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteClick(plat.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {confirmDelete && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce plat? Cette action est irréversible.</p>
            <div className="delete-modal-actions">
              <button 
                className="cancel-button"
                onClick={handleDeleteCancel}
              >
                Annuler
              </button>
              <button 
                className="confirm-button"
                onClick={handleDeleteConfirm}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlatManager;