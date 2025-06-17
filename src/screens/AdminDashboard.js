import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlogContext } from '../context/BlogContext';
import { RecipeContext } from '../context/RecipeContext';

export default function AdminDashboard() {
  const { blogs } = useContext(BlogContext);
  const { recipes } = useContext(RecipeContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.label}>Total Blogs</Text>
          <Text style={styles.count}>{blogs.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.label}>Total Recipes</Text>
          <Text style={styles.count}>{recipes.length}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Blogs</Text>
      {blogs.map((blog, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{blog.title}</Text>
          <Text style={styles.cardSubtitle}></Text>
        </View>
      ))}

      {/* <Text style={styles.sectionTitle}>Recent Recipes</Text>
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{recipe.name}</Text>
          <Text style={styles.cardSubtitle}>Category: {recipe.category || 'N/A'}</Text>
        </View>
      ))} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5e3023',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f4f0',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#7f5539',
  },
  count: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a0522d',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#7f5539',
    marginBottom: 12,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3e2c23',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7f5539',
    marginTop: 4,
  },
});
