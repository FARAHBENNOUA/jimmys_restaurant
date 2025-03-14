import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './LoginForm.css';

function LoginForm() {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/Home');
        } catch (err) {
            console.error('Erreur de connexion:', err);
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
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
                <button 
                    type="submit" 
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    Se connecter
                </button>
            </form>
            <div className="toggle-auth">
                Pas encore de compte? <a href="/signup">S'inscrire</a>
            </div>
        </div>
    );
}

export default LoginForm;