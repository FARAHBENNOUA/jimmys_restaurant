import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import './UserEdit.css';

function UserEdit() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { updateUser, updateProfileImage, loading, error } = useUser();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                age: user.age || ''
            });
            
            if (user.imageUrl) {
                setPreviewImage(user.imageUrl);
            }
        } else {
            navigate('/auth');
        }
    }, [user, navigate]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Mettre à jour les informations de l'utilisateur
            await updateUser(user.id, formData);
            
            // Si une nouvelle image a été sélectionnée, mettre à jour l'image de profil
            if (profileImage) {
                await updateProfileImage(user.id, profileImage);
            }
            
            navigate('/profile');
        } catch (err) {
            console.error('Erreur lors de la mise à jour du profil:', err);
        }
    };
    
    if (!user) return null;
    
    return (
        <div className="user-edit-container">
            <h2>Modifier le profil</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="user-edit-form">
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Âge</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label>Photo de profil</label>
                    <div className="profile-image-container">
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Aperçu"
                                className="profile-preview"
                            />
                        )}
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                
                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate('/profile')}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="save-button"
                        disabled={loading}
                    >
                        {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserEdit;