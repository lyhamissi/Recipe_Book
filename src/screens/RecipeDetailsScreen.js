import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icons from 'react-native-vector-icons/Feather';
import { RecipeContext } from '../context/RecipeContext';
import { UserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RecipeDetailsScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { deleteRecipe } = useContext(RecipeContext);
  const { user } = useContext(UserContext);

  const handleDelete = () => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteRecipe(recipe.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('AddRecipe', { recipeToEdit: recipe });
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cont}>
          {recipe.image && (
            <Animatable.Image
              animation="fadeInUp"
              duration={800}
              source={{ uri: recipe.image }}
              style={styles.image}
            />
          )}

          <Animatable.Text animation="fadeInDown" delay={300} style={styles.title}>
            {recipe.title}
          </Animatable.Text>

          <Animatable.Text animation="fadeIn" delay={500} style={styles.description}>
            <Text style={styles.recipe}>Recipe: </Text>
            {recipe.description || 'No description available.'}
          </Animatable.Text>

          {/* Instructions Section */}
          <Animatable.Text animation="fadeIn" delay={600} style={styles.instructionsLabel}>
            Instructions:
          </Animatable.Text>
          <Animatable.Text animation="fadeIn" delay={700} style={styles.instructions}>
            {recipe.instructions || 'No instructions available.'}
          </Animatable.Text>

          <View style={styles.buttonContainer}>
            <Animatable.View animation="bounceInLeft" delay={800}>
              <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                <Icons name="edit-2" size={20} color="#fff" />
                <Text style={styles.iconText}>Edit</Text>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation="bounceInRight" delay={900}>
              <TouchableOpacity style={[styles.iconButton, styles.delete]} onPress={handleDelete}>
                <Icons name="trash-2" size={20} color="#fff" />
                <Text style={styles.iconText}>Delete</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navbar OUTSIDE ScrollView */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('AdminHome')}
        >
          <Icon name="home-outline" size={35} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('AddRecipe')}
        >
          <Icon name="add-circle-outline" size={35} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.navAvatar} />
          ) : (
            <Icon name="person-circle-outline" size={35} color="#7f5539" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Blog')}
        >
          <Icon name="newspaper-outline" size={24} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.replace('Login')}
        >
          <Icon name="log-out-outline" size={35} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 130, // give enough space so content doesn't go behind navbar
  },
  recipe: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cont: {
    backgroundColor: '#f8f4f0',
    padding: 25,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7f5539',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f5555',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  instructionsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f5539',
    marginBottom: 8,
    textAlign: 'left',
  },
  instructions: {
    fontSize: 16,
    color: '#7f5555',
    marginBottom: 30,
    lineHeight: 22,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  delete: {
    backgroundColor: '#DC3545',
  },
  iconText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
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
