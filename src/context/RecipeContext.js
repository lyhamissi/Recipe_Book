import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  // Load all recipes from shared key
  const loadRecipes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('recipes_all');
      if (jsonValue != null) {
        setRecipes(JSON.parse(jsonValue));
      } else {
        setRecipes([]);
      }
    } catch (e) {
      console.error('Failed to load recipes', e);
    }
  };

  // Save all recipes to shared key
  const saveRecipes = async (recipesToSave) => {
    try {
      const jsonValue = JSON.stringify(recipesToSave);
      await AsyncStorage.setItem('recipes_all', jsonValue);
      setRecipes(recipesToSave);
    } catch (e) {
      console.error('Failed to save recipes', e);
    }
  };

  // Add a recipe (append to shared list)
  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    saveRecipes(updatedRecipes);
  };

  // Update a recipe by id
  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    saveRecipes(updatedRecipes);
  };

  // Delete a recipe by id
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
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
