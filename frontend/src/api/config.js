import axios from "axios";

const API_URL = process.env.REACT_APP_API_BACK_URL || 'http://localhost:8888';

export const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Ajout de l'intercepteur de réponse pour gérer les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    // Gestion centralisée des erreurs
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      authAPI.logout();
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export const userAPI = {
    getAllUsers: () => api.get('/users'),

    getUser: (id) => api.get(`/user/${id}`),

    createUser: (userData) => api.post('/user', userData),

    updateUser: (id, userData) => api.put(`/user/${id}`, userData),

    deleteUser: (id) => api.delete(`/user/${id}`),
    
    updateProfileImage: (id, imageFile) => {
        const formData = new FormData();
        formData.append('profileImage', imageFile);
        return api.put(`/user/profileImage/${id}`, formData);
    }
};

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),

    login: (credentials) => api.post('/auth/login', credentials),

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const platAPI = {
    getAllPlats: () => api.get('/plats'),
    
    getPlat: (id) => api.get(`/plat/${id}`),
    
    createPlat: (platData) => api.post('/plat', platData),
    
    updatePlat: (id, platData) => api.put(`/plat/${id}`, platData),
    
    deletePlat: (id) => api.delete(`/plat/${id}`),
    
    addPlatImages: (platId, formData) => api.post(`/plat/${platId}/images`, formData),
    
    setPlatPrimaryImage: (platId, imageId) => api.put(`/plat/${platId}/images/${imageId}/primary`),
    
    deletePlatImage: (platId, imageId) => api.delete(`/plat/${platId}/images/${imageId}`)
};

export const ingredientAPI = {
    getAllIngredients: () => api.get('/ingredients'),
    createIngredient: (ingredientData) => api.post('/ingredient', ingredientData)
};