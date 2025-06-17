import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Want to cook like a{' '}
        <Text style={styles.chef}>CHEF?</Text>
      </Text>
      <Text style={styles.subtitle}>
        Discover delicious recipes and inspiring blogs made just for you!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RecipeList')}
      >
        <Text style={styles.buttonText}>View Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.blogButton]}
        onPress={() => navigation.navigate('BlogList')}
      >
        <Text style={styles.buttonText}>View Blogs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7f5539',
    textAlign: 'center',
    marginBottom: 10,
  },
  chef: {
    color: '#FFA500', // Orange color
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 18,
    color: '#a67c52',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#7f5539',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 7,
  },
  blogButton: {
    backgroundColor: '#7f5555', // orange button for blog
  },
  buttonText: {
    color: '#fff8dc',
    fontSize: 18,
    fontWeight: '600',
  },
});
