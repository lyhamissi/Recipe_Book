import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipesFromBackend(); // Fetch from API initially
  }, []);

  const fetchRecipesFromBackend = async () => {
    try {
      const response = await axios.get('http://10.36.240.248:4000/api/recipes');
      console.log('API response:', response.data); // Debug log
      // Use .data.data according to your API response structure
      const fetchedRecipes = response.data?.data || [];

      setRecipes(fetchedRecipes);
      await AsyncStorage.setItem('recipes_all', JSON.stringify(fetchedRecipes));
    } catch (error) {
      console.error('Error fetching recipes from backend:', error);
      loadRecipes(); // fallback to local storage
    }
  };

  const loadRecipes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('recipes_all');
      if (jsonValue != null) {
        setRecipes(JSON.parse(jsonValue));
      } else {
        setRecipes([]);
      }
    } catch (e) {
      console.error('Failed to load recipes from storage:', e);
    }
  };

  const saveRecipes = async (recipesToSave) => {
    try {
      const jsonValue = JSON.stringify(recipesToSave);
      await AsyncStorage.setItem('recipes_all', jsonValue);
      setRecipes(recipesToSave);
    } catch (e) {
      console.error('Failed to save recipes', e);
    }
  };

  const addRecipe = async (newRecipe) => {
    try {
      const response = await axios.post(
        'http://10.36.240.248:4000/api/recipes/create',
        newRecipe,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const savedRecipe = response.data;
      const updatedRecipes = [...recipes, savedRecipe];
      await saveRecipes(updatedRecipes);

      return { success: true, message: 'Recipe added successfully!' };
    } catch (error) {
      console.error('Error adding recipe:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add recipe.',
      };
    }
  };

  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    saveRecipes(updatedRecipes);
  };

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((r) => r.id !== id);
    saveRecipes(updatedRecipes);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        loadRecipes,
        fetchRecipesFromBackend, // now exposed
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
