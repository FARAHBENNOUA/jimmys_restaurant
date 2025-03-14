import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './UserDisplay.css';

function UserDisplay() {
    const { user, logout } = useAuth();
    
    if (!user) {
        return (
            <div className="user-display-container not-logged-in">
                <h2>Non connecté</h2>
                <p>Vous devez vous connecter pour voir votre profil.</p>
                <Link to="/auth" className="auth-button">Se connecter</Link>
            </div>
        );
    }
    
    return (
        <div className="user-display-container">
            <div className="user-header">
                <div className="user-avatar">
                    {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.name} />
                    ) : (
                        <div className="avatar-placeholder">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="user-info">
                    <h2>{user.name}</h2>
                    <p className="user-email">{user.email}</p>
                    <p className="user-role">{user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</p>
                </div>
            </div>
            
            <div className="user-details">
                <div className="detail-card">
                    <h3>Informations personnelles</h3>
                    <div className="detail-row">
                        <span className="detail-label">Nom:</span>
                        <span className="detail-value">{user.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{user.email}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Âge:</span>
                        <span className="detail-value">{user.age || 'Non spécifié'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Membre depuis:</span>
                        <span className="detail-value">
                            {user.created_at 
                                ? new Date(user.created_at).toLocaleDateString() 
                                : 'Non disponible'}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="user-actions">
                <Link to="/profile/edit" className="edit-profile-button">Modifier le profil</Link>
                <button onClick={logout} className="logout-button">Se déconnecter</button>
                {user.role === 'admin' && (
                    <Link to="/dashboard" className="dashboard-button">Tableau de bord</Link>
                )}
            </div>
        </div>
    );
}

export default UserDisplay;