
import React, { useState, useEffect } from 'react';
import { ingredientAPI } from '../../api/config';
import './IngredientManager.css';

function IngredientManager() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [ingredientFormVisible, setIngredientFormVisible] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    unit: 'g',
    allergen: false
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const response = await ingredientAPI.getAllIngredients();
      setIngredients(response.data);
      setError('');
    } catch (err) {
      console.error("Erreur lors du chargement des ingrédients:", err);
      setError("Impossible de charger les ingrédients. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (ingredientId) => {
    setConfirmDelete(ingredientId);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    
    try {
      await ingredientAPI.deleteIngredient(confirmDelete);
      setIngredients(ingredients.filter(ing => ing.id !== confirmDelete));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression de l'ingrédient:", err);
      setError("Impossible de supprimer l'ingrédient. Veuillez réessayer.");
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      stock: '',
      unit: 'g',
      allergen: false
    });
    setEditingIngredient(null);
    setIngredientFormVisible(true);
  };

  const handleEditClick = (ingredient) => {
    setFormData({
      name: ingredient.name,
      stock: ingredient.stock,
      unit: ingredient.unit || 'g',
      allergen: ingredient.allergen || false
    });
    setEditingIngredient(ingredient);
    setIngredientFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingIngredient) {
        await ingredientAPI.updateIngredient(editingIngredient.id, formData);
      } else {
        await ingredientAPI.createIngredient(formData);
      }
      
      // Rafraîchir la liste des ingrédients
      fetchIngredients();
      
      // Fermer le formulaire
      setIngredientFormVisible(false);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de l'ingrédient:", err);
      setError("Impossible d'enregistrer l'ingrédient. Veuillez réessayer.");
    }
  };

  return (
    <div className="ingredient-manager-container">
      <div className="manager-header">
        <h1>Gestion des ingrédients</h1>
        <button onClick={handleAddClick} className="add-button">
          <i className="fas fa-plus"></i> Ajouter un ingrédient
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Chargement des ingrédients...</div>
      ) : ingredients.length === 0 ? (
        <div className="empty-state">
          <p>Aucun ingrédient trouvé. Commencez par en ajouter un!</p>
        </div>
      ) : (
        <div className="ingredients-table-container">
          <table className="ingredients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Stock</th>
                <th>Unité</th>
                <th>Allergène</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map(ingredient => (
                <tr key={ingredient.id}>
                  <td>{ingredient.id}</td>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.stock}</td>
                  <td>{ingredient.unit || 'g'}</td>
                  <td>
                    {ingredient.allergen ? (
                      <span className="allergen-badge">Oui</span>
                    ) : (
                      <span>Non</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="edit-button"
                      onClick={() => handleEditClick(ingredient)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteClick(ingredient.id)}
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
      
      {ingredientFormVisible && (
        <div className="ingredient-form-modal">
          <div className="ingredient-form-content">
            <h2>{editingIngredient ? 'Modifier un ingrédient' : 'Ajouter un ingrédient'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom de l'ingrédient</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="stock">Quantité en stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleFormChange}
                    min="0"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="unit">Unité</label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="g">Grammes (g)</option>
                    <option value="kg">Kilogrammes (kg)</option>
                    <option value="l">Litres (l)</option>
                    <option value="ml">Millilitres (ml)</option>
                    <option value="unité">Unité(s)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="allergen"
                  name="allergen"
                  checked={formData.allergen}
                  onChange={handleFormChange}
                />
                <label htmlFor="allergen">Cet ingrédient est un allergène</label>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIngredientFormVisible(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="save-button">
                  {editingIngredient ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {confirmDelete && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cet ingrédient? Cette action est irréversible.</p>
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

export default IngredientManager;