import { useState,} from 'react';
import { platAPI } from '../../api/config';

export const usePlats = () => {
    const [plats, setPlats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Récupération de tous les plats
    const fetchPlats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await platAPI.getAllPlats();
            setPlats(response.data || []);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de la récupération des plats';
            setError(errorMessage);
            console.error(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Récupération d'un plat par son ID
    const getPlat = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await platAPI.getPlat(id);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de la récupération du plat';
            setError(errorMessage);
            console.error(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Création d'un plat
    const createPlat = async (platData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await platAPI.createPlat(platData);
            setPlats([...plats, response.data]);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de la création du plat';
            setError(errorMessage);
            console.error(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Mise à jour d'un plat
    const updatePlat = async (id, platData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await platAPI.updatePlat(id, platData);
            setPlats(plats.map(plat => plat.id === id ? response.data : plat));
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de la mise à jour du plat';
            setError(errorMessage);
            console.error(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Suppression d'un plat
    const deletePlat = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await platAPI.deletePlat(id);
            setPlats(plats.filter(plat => plat.id !== id));
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de la suppression du plat';
            setError(errorMessage);
            console.error(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Ajout d'images à un plat
    const addPlatImages = async (platId, images) => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
            
            const response = await platAPI.addPlatImages(platId, formData);
            
            // Mise à jour du plat local avec les nouvelles images
            setPlats(plats.map(plat => {
                if (plat.id === platId) {
                    return { ...plat, images: [...(plat.images || []), ...response.data.images] };
                }
                return plat;
            }));
            
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de l\'ajout des images';
            setError(errorMessage);
            console.error(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        plats,
        loading,
        error,
        fetchPlats,
        getPlat,
        createPlat,
        updatePlat,
        deletePlat,
        addPlatImages
    };
};