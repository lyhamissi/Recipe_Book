import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params;

  // For now, static content — you can replace with actual data fetching later
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Details for ID: {recipeId}</Text>
      <Text>More recipe info here...</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});