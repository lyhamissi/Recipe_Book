import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RecipeCard({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
  },
});