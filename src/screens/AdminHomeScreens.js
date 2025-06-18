import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { RecipeContext } from '../context/RecipeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AdminHomeScreen({ navigation }) {
  const { user, isLoggedIn, logout, loading, isAdmin } = useContext(UserContext);
  const { recipes } = useContext(RecipeContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#7f5539" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInText}>
            Please log in or register to view recipes and blogs.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInText}>
            Access denied. You must be an admin to view this page.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('User')}
          >
            <Text style={styles.loginButtonText}>Go to User Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const userRecipes = recipes
    .filter(recipe => recipe.creatorId === user.id)
    .filter(recipe =>
      selectedCategory ? recipe.category === selectedCategory : true
    )
    .filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>
        Cook Like a <Text style={styles.chef}>CHEF!</Text>
      </Text> */}
      <View style={styles.filterRow}>
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInputInline}
          placeholderTextColor="#999"
        />
        <View style={styles.pickerInlineContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.pickerInline}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
            <Picker.Item label="Dessert" value="Dessert" />
            <Picker.Item label="Vegan" value="Vegan" />
            <Picker.Item label="Drinks" value="Drinks" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => navigation.navigate('AdminDashboard')}
      >
        <Text style={styles.adminButtonText}>Go to Dashboard</Text>
      </TouchableOpacity>


      {userRecipes.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50, color: '#7f5539' }}>
          No matching recipes found.
        </Text>
      ) : (

        <FlatList
          data={userRecipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.recipeList}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.recipeImage} />
              ) : null}
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AdminHome')}>
          <Icon name="home-outline" size={35} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AddRecipe')}>
          <Icon name="add-circle-outline" size={35} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.navAvatar} />
          ) : (
            <Icon name="person-circle-outline" size={35} color="#7f5539" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Blog')}>
          <Icon name="newspaper-outline" size={24} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={logout}>
          <Icon name="log-out-outline" size={35} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  notLoggedInText: {
    fontSize: 18,
    color: '#7f5539',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#7f5539',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    borderColor: '#7f5539',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#7f5539',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7f5539',
    textAlign: 'center',
    marginBottom: 10,
  },
  chef: {
    fontSize: 30,
    color: '#FFA500',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  adminButton: {
    backgroundColor: '#7f5539',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    color: '#7f5539',
    marginBottom: 6,
    marginTop: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  searchInputInline: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  pickerInlineContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 4,
    paddingVertical: 0,
  },
  pickerInline: {
    height: 45,
    width: '100%',
  },

  recipeList: {
    padding: 16,
  },
  recipeCard: {
    backgroundColor: '#f8f4f0',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  recipeImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#7f5539',
  },
  viewButton: {
    backgroundColor: '#7f5539',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#f5f5dc',
    fontWeight: '600',
  },
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#f8f4f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
