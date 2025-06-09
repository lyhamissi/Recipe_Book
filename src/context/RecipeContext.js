import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);

    // Load recipes on mount
    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const saved = await AsyncStorage.getItem('recipes');
                if (saved) setRecipes(JSON.parse(saved));
            } catch (err) {
                console.error('Failed to load recipes', err);
            }
        };
        loadRecipes();
    }, []);
    const saveRecipes = async (newRecipes) => {
        try {
            await AsyncStorage.setItem('recipes', JSON.stringify(newRecipes));
        } catch (err) {
            console.error('Failed to save recipes', err);
        }
    };

    const addRecipe = async (newRecipe) => {
        const updated = [...recipes, newRecipe];
        setRecipes(updated);
        await saveRecipes(updated);
    };

    const editRecipe = async (updatedRecipe) => {
        const updated = recipes.map((r) =>
            r.id === updatedRecipe.id ? updatedRecipe : r
        );
        setRecipes(updated);
        await saveRecipes(updated);
    };

    const deleteRecipe = async (id) => {
        const updated = recipes.filter((r) => r.id !== id);
        setRecipes(updated);
        await saveRecipes(updated);
    };

    const updateRecipe = (updatedRecipe) => {
        setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
                recipe.id === updatedRecipe.id ? updatedRecipe : recipe
            )
        );
    };
    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe, updateRecipe }}>
            {children}
        </RecipeContext.Provider>

    );
};
