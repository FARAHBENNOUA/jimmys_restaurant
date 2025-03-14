import React, { useState, useEffect } from 'react';
import { userAPI } from '../../api/config';
import './UserManager.css';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [userFormVisible, setUserFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs:", err);
      setError("Impossible de charger les utilisateurs. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId) => {
    setConfirmDelete(userId);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    
    try {
      await userAPI.deleteUser(confirmDelete);
      setUsers(users.filter(user => user.id !== confirmDelete));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err);
      setError("Impossible de supprimer l'utilisateur. Veuillez réessayer.");
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'client'
    });
    setEditingUser(null);
    setUserFormVisible(true);
  };

  const handleEditClick = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role || 'client'
    });
    setEditingUser(user);
    setUserFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        // Si le mot de passe est vide, ne pas l'envoyer
        const userData = formData.password 
          ? formData 
          : { ...formData, password: undefined };
        
        await userAPI.updateUser(editingUser.id, userData);
      } else {
        await userAPI.createUser(formData);
      }
      
      // Rafraîchir la liste des utilisateurs
      fetchUsers();
      
      // Fermer le formulaire
      setUserFormVisible(false);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur:", err);
      setError("Impossible d'enregistrer l'utilisateur. Veuillez réessayer.");
    }
  };

  return (
    <div className="user-manager-container">
      <div className="manager-header">
        <h1>Gestion des utilisateurs</h1>
        <button onClick={handleAddClick} className="add-button">
          <i className="fas fa-plus"></i> Ajouter un utilisateur
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Chargement des utilisateurs...</div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          <p>Aucun utilisateur trouvé. Commencez par en ajouter un!</p>
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role || 'client'}`}>
                      {user.role || 'Client'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button 
                      className="edit-button"
                      onClick={() => handleEditClick(user)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteClick(user.id)}
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
      
      {userFormVisible && (
        <div className="user-form-modal">
          <div className="user-form-content">
            <h2>{editingUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  {editingUser ? 'Mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe'}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  {...(editingUser ? {} : { required: true })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Rôle</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  required
                >
                  <option value="client">Client</option>
                  <option value="staff">Personnel</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setUserFormVisible(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="save-button">
                  {editingUser ? 'Mettre à jour' : 'Ajouter'}
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
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur? Cette action est irréversible.</p>
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

export default UserManager;