import { useState } from 'react';
import { ingredientAPI } from '../../api/config';

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Récupération de tous les ingrédients
    const fetchIngredients = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await ingredientAPI.getAllIngredients();
            setIngredients(response.data || []);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de la récupération des ingrédients';
            setError(errorMessage);
            console.error(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Création d'un ingrédient
    const createIngredient = async (ingredientData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ingredientAPI.createIngredient(ingredientData);
            setIngredients([...ingredients, response.data]);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erreur lors de la création de l\'ingrédient';
            setError(errorMessage);
            console.error(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        ingredients,
        loading,
        error,
        fetchIngredients,
        createIngredient
    };
};