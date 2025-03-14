import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './_signUpForm.css';

function RegisterForm() {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('age', formData.age);

            if (profileImage) {
                formDataToSend.append('profileImage', profileImage);
            }

            await register(formDataToSend);
            navigate('/homepage');
        } catch (err) {
            console.error('Erreur d\'inscription:', err);
        }
    };

    return (
        <div className="signup-container">
            <h2>Inscription</h2>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
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
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Votre photo de profil</label>
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {previewImage && (
                        <div className="image-preview">
                            <p>Aperçu :</p>
                            <img
                                src={previewImage}
                                alt="Aperçu"
                                className="preview_img"
                            />
                        </div>
                    )}
                </div>
                <button 
                    type="submit" 
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    S'inscrire
                </button>
            </form>
            <div className="toggle-auth">
                Déjà un compte? <a href="/login">Se connecter</a>
            </div>
        </div>
    );
}

export default RegisterForm;