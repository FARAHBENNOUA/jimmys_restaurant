import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { platAPI, ingredientAPI } from '../../api/config';
import PlatList from '../Plats/PlatList';
import './Menu.css';

function Menu() {
  const [activeTab, setActiveTab] = useState('plats');
  const [plats, setPlats] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // États pour le formulaire plat
  const [platForm, setPlatForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pizza',
    ingredients: []
  });
  
  // États pour le formulaire ingrédient
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    stock: '',
    unit: 'g',
    allergen: false
  });
  
  // États pour afficher/masquer les formulaires
  const [showPlatForm, setShowPlatForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  
  // États pour l'upload d'image
  const [platImage, setPlatImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchPlats();
    fetchIngredients();
  }, []);

  const fetchPlats = async () => {
    try {
      const response = await platAPI.getAllPlats();
      setPlats(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des plats:', err);
      setError('Impossible de charger les plats. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await ingredientAPI.getAllIngredients();
      setIngredients(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des ingrédients:', err);
    }
  };
  
  // Gestion des changements pour le formulaire plat
  const handlePlatChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'price' && value && isNaN(value)) {
      return;
    }
    
    if (type === 'checkbox') {
      setPlatForm({
        ...platForm,
        [name]: checked
      });
    } else {
      setPlatForm({
        ...platForm,
        [name]: value
      });
    }
  };
  
  // Gestion des changements pour le formulaire ingrédient
  const handleIngredientChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'stock' && value && isNaN(value)) {
      return;
    }
    
    if (type === 'checkbox') {
      setIngredientForm({
        ...ingredientForm,
        [name]: checked
      });
    } else {
      setIngredientForm({
        ...ingredientForm,
        [name]: value
      });
    }
  };// Gestion de l'upload d'image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPlatImage(e.target.files[0]);
      
      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  // Gestion des ingrédients sélectionnés
  const handleIngredientToggle = (ingredientId) => {
    const updatedIngredients = [...platForm.ingredients];
    
    if (updatedIngredients.includes(ingredientId)) {
      const index = updatedIngredients.indexOf(ingredientId);
      updatedIngredients.splice(index, 1);
    } else {
      updatedIngredients.push(ingredientId);
    }
    
    setPlatForm({
      ...platForm,
      ingredients: updatedIngredients
    });
  };
  
  // Soumission du formulaire plat
  const handlePlatSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Création du plat
      const response = await platAPI.createPlat(platForm);
      const newPlat = response.data;
      
      // Upload de l'image si présente
      if (platImage) {
        const formData = new FormData();
        formData.append('image', platImage);
        
        await platAPI.addPlatImages(newPlat.id, formData);
      }
      
      // Réinitialisation du formulaire
      setPlatForm({
        name: '',
        description: '',
        price: '',
        category: 'pizza',
        ingredients: []
      });
      setPlatImage(null);
      setImagePreview('');
      setShowPlatForm(false);
      
      // Actualisation de la liste
      fetchPlats();
      
      alert('Plat ajouté avec succès!');
    } catch (err) {
      console.error('Erreur lors de la création du plat:', err);
      alert('Erreur lors de la création du plat. Veuillez réessayer.');
    }
  };// Soumission du formulaire ingrédient
  const handleIngredientSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await ingredientAPI.createIngredient(ingredientForm);
      
      // Réinitialisation du formulaire
      setIngredientForm({
        name: '',
        stock: '',
        unit: 'g',
        allergen: false
      });
      setShowIngredientForm(false);
      
      // Actualisation de la liste
      fetchIngredients();
      
      alert('Ingrédient ajouté avec succès!');
    } catch (err) {
      console.error('Erreur lors de la création de l\'ingrédient:', err);
      alert('Erreur lors de la création de l\'ingrédient. Veuillez réessayer.');
    }
  };

  return (
    <div className="menu-container">
      <h1>Notre Menu</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="menu-tabs">
        <button 
          className={`menu-tab ${activeTab === 'plats' ? 'active' : ''}`}
          onClick={() => setActiveTab('plats')}
        >
          Voir les plats
        </button>
        <button 
          className={`menu-tab ${activeTab === 'gestion' ? 'active' : ''}`}
          onClick={() => setActiveTab('gestion')}
        >
          Gestion Menu
        </button>
      </div>
      
      {activeTab === 'plats' ? (
        <PlatList plats={plats} loading={loading} />
      ) : (
        <div className="menu-gestion">
          <div className="gestion-sections">
            <div className="gestion-section">
              <h2>Gestion des plats</h2>
              <button 
                className="add-button"
                onClick={() => setShowPlatForm(!showPlatForm)}
              >
                {showPlatForm ? 'Annuler' : 'Ajouter un plat'}
              </button>
              
              {showPlatForm && (
                <form className="plat-form" onSubmit={handlePlatSubmit}>
                  <div className="form-group">
                    <label htmlFor="platName">Nom du plat</label>
                    <input
                      type="text"
                      id="platName"
                      name="name"
                      value={platForm.name}
                      onChange={handlePlatChange}
                      required
                    />
                  </div>  <div className="form-group">
                    <label htmlFor="platDescription">Description</label>
                    <textarea
                      id="platDescription"
                      name="description"
                      value={platForm.description}
                      onChange={handlePlatChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="platPrice">Prix (€)</label>
                      <input
                        type="text"
                        id="platPrice"
                        name="price"
                        value={platForm.price}
                        onChange={handlePlatChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="platCategory">Catégorie</label>
                      <select
                        id="platCategory"
                        name="category"
                        value={platForm.category}
                        onChange={handlePlatChange}
                      >
                        <option value="pizza">Pizza</option>
                        <option value="burger">Burger</option>
                        <option value="pasta">Pâtes</option>
                        <option value="dessert">Dessert</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="platImage">Image</label>
                    <input
                      type="file"
                      id="platImage"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Prévisualisation" />
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>Ingrédients</label>
                    <div className="ingredients-list">
                      {ingredients.map(ingredient => (
                        <div key={ingredient.id} className="ingredient-item">
                          <input
                            type="checkbox"
                            id={`ingredient-${ingredient.id}`}
                            checked={platForm.ingredients.includes(ingredient.id)}
                            onChange={() => handleIngredientToggle(ingredient.id)}
                          />
                          <label htmlFor={`ingredient-${ingredient.id}`}>
                            {ingredient.name}
                            {ingredient.allergen && <span className="allergen-badge">Allergène</span>}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="submit-button">Ajouter le plat</button>
                  </div>
                </form>
              )}
              
              <div className="plats-list">
                <h3>Plats existants</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4">Chargement...</td>
                      </tr>
                    ) : plats.length === 0 ? (
                      <tr>
                        <td colSpan="4">Aucun plat trouvé</td>
                      </tr>
                    ) : (
                      plats.map(plat => (
                        <tr key={plat.id}>
                          <td>{plat.name}</td>
                          <td>{plat.category}</td>
                          <td>{plat.price} €</td>
                          <td className="actions">
                            <Link to={`/dashboard/plats/edit/${plat.id}`} className="edit-button">
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button className="delete-button">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="gestion-section">
              <h2>Gestion des ingrédients</h2>
              <button 
                className="add-button"
                onClick={() => setShowIngredientForm(!showIngredientForm)}
              >
                {showIngredientForm ? 'Annuler' : 'Ajouter un ingrédient'}
              </button>
              
              {showIngredientForm && (
                <form className="ingredient-form" onSubmit={handleIngredientSubmit}>
                  <div className="form-group">
                    <label htmlFor="ingredientName">Nom de l'ingrédient</label>
                    <input
                      type="text"
                      id="ingredientName"
                      name="name"
                      value={ingredientForm.name}
                      onChange={handleIngredientChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="ingredientStock">Quantité en stock</label>
                      <input
                        type="text"
                        id="ingredientStock"
                        name="stock"
                        value={ingredientForm.stock}
                        onChange={handleIngredientChange}
                        required
                      />
                    </div>      <div className="form-group">
                      <label htmlFor="ingredientUnit">Unité</label>
                      <select
                        id="ingredientUnit"
                        name="unit"
                        value={ingredientForm.unit}
                        onChange={handleIngredientChange}
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
                      id="ingredientAllergen"
                      name="allergen"
                      checked={ingredientForm.allergen}
                      onChange={handleIngredientChange}
                    />
                    <label htmlFor="ingredientAllergen">Cet ingrédient est un allergène</label>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="submit-button">Ajouter l'ingrédient</button>
                  </div>
                </form>
              )}
              
              <div className="ingredients-list-table">
                <h3>Ingrédients existants</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Stock</th>
                      <th>Unité</th>
                      <th>Allergène</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.length === 0 ? (
                      <tr>
                        <td colSpan="5">Aucun ingrédient trouvé</td>
                      </tr>
                    ) : (
                      ingredients.map(ingredient => (
                        <tr key={ingredient.id}>
                          <td>{ingredient.name}</td>
                          <td>{ingredient.stock}</td>
                          <td>{ingredient.unit}</td>
                          <td>{ingredient.allergen ? 'Oui' : 'Non'}</td>
                          <td className="actions">
                            <button className="edit-button">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="delete-button">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;