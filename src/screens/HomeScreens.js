import React, { useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([
    { id: '1', title: 'Spaghetti Bolognese' },
    { id: '2', title: 'Chicken Curry' },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.title}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
          />
        )}
      />
      <Button title="Add New Recipe" onPress={() => alert('Add recipe screen coming soon!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});