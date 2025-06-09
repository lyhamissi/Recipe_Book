import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

export default function AddRecipeScreen({ navigation, route }) {
  const { addRecipe, updateRecipe } = useContext(RecipeContext);
  
  // Check if we have a recipe to edit
  const recipeToEdit = route.params?.recipeToEdit;

  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : '');
  const [description, setDescription] = useState(recipeToEdit ? recipeToEdit.description : '');
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : '');

  // Handle Save (add or update)
  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const recipeData = {
      id: recipeToEdit ? recipeToEdit.id : Date.now().toString(),
      title,
      description,
      image,
    };

    if (recipeToEdit) {
      updateRecipe(recipeData);
      alert('Recipe updated!');
    } else {
      addRecipe(recipeData);
      alert('Recipe added!');
    }
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Recipe title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Recipe description"
        multiline
      />

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Paste image URL here"
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.previewImage} />
      ) : null}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
          {recipeToEdit ? 'Update Recipe' : 'Add Recipe'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    color: '#007BFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
