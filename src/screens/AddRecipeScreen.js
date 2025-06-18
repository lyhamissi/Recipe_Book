import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RecipeContext } from '../context/RecipeContext';
import { UserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

export default function AddRecipeScreen({ navigation, route }) {
  const { addRecipe, updateRecipe } = useContext(RecipeContext);
  const { user } = useContext(UserContext);
  const recipeToEdit = route.params?.recipeToEdit;

  const [category, setCategory] = useState(recipeToEdit?.category ?? '');
  const [title, setTitle] = useState(recipeToEdit?.title ?? '');
  const [description, setDescription] = useState(recipeToEdit?.description ?? '');
  const [instructions, setInstructions] = useState(recipeToEdit?.instructions ?? '');
  const [image, setImage] = useState(recipeToEdit?.image ?? '');

  const showAlert = (title, message) => Alert.alert(title, message);

  const handleSave = async () => {
    if (!title.trim() || !instructions.trim()) {
      showAlert('Error', 'Title and Instructions are required.');
      return;
    }

    const recipeData = {
      title,
      description,
      instructions,
      image,
      category,
      addedById: user?.id || user?._id, // based on your backend
    };

    if (recipeToEdit) {
      updateRecipe({ ...recipeToEdit, ...recipeData });
      showAlert('Success', 'Recipe updated!');
      navigation.goBack();
    } else {
      const { success, message } = await addRecipe(recipeData);
      showAlert(success ? 'Success' : 'Error', message);
      if (success) navigation.goBack();
    }
  };

  const pickImage = () => {
    Alert.alert(
      'Select Image',
      'Choose an image source',
      [
        { text: 'Camera', onPress: pickFromCamera },
        { text: 'Gallery', onPress: pickFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showAlert('Permission required', 'Camera permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cont}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Recipe title"
            placeholderTextColor="#a18566"
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Recipe description"
            multiline
            placeholderTextColor="#a18566"
          />

          <Text style={styles.label}>Instructions:</Text>
          <TextInput
            style={[styles.input, { height: 140 }]}
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Recipe instructions"
            multiline
            placeholderTextColor="#a18566"
          />

          <Text style={styles.label}>Category:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Dessert" value="Dessert" />
              <Picker.Item label="Vegan" value="Vegan" />
              <Picker.Item label="Drinks" value="Drinks" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Select Image</Text>
          </TouchableOpacity>

          {image ? <Image source={{ uri: image }} style={styles.previewImage} /> : null}

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#b2a07a' }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              {recipeToEdit ? 'Update Recipe' : 'Add Recipe'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navbar */}
        <View style={styles.bottomNavbar}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AdminHome')}>
            <Icon name="home-outline" size={35} color="#7f5539" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AddRecipe')}>
            <Icon name="add-circle-outline" size={35} color="#7f5539" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person-circle-outline" size={35} color="#7f5539" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Blog')}>
            <Icon name="newspaper-outline" size={24} color="#7f5539" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.replace('Login')}>
            <Icon name="log-out-outline" size={35} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    color: '#7f5539',
  },
  cont: {
    backgroundColor: '#f8f4f0',
    padding: 40,
    borderRadius: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#7f5539',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    color: '#7f5539',
  },
  imageButton: {
    backgroundColor: '#a67b5b',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#7f5539',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#7f5539',
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#7f5539',
    backgroundColor: '#fffaf4',
  },
});
