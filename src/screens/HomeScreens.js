import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

export default function HomeScreen({ navigation }) {
  const { recipes } = useContext(RecipeContext);

  return (
    <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={{ color: '#007BFF', textAlign: 'center', marginTop: 20 }}>Profile</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Welcome to Recipe Book</Text>
      <Text style={styles.subtitle}>Your saved recipes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
            )}
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Text style={styles.addButtonText}>+ Add New Recipe</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  recipeList: {
    paddingBottom: 20,
  },
  recipeCard: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },

});
