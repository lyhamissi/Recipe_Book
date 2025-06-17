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
import { BlogContext } from '../context/BlogContext'; // Assuming you have BlogContext
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddBlogScreen({ navigation, route }) {
  const { addBlog, updateBlog } = useContext(BlogContext);
  const blogToEdit = route.params?.blogToEdit;

  const [title, setTitle] = useState(blogToEdit?.title ?? '');
  const [summary, setSummary] = useState(blogToEdit?.summary ?? '');
  const [content, setContent] = useState(blogToEdit?.content ?? '');
  const [image, setImage] = useState(blogToEdit?.image ?? '');

  const showAlert = (title, message) => Alert.alert(title, message);

  const handleSave = () => {
    const blogData = {
      id: blogToEdit ? blogToEdit.id : Date.now().toString(),
      title,
      summary,
      content,
      image,
    };

    if (blogToEdit) {
      updateBlog(blogData);
      showAlert('Success', 'Blog updated!');
    } else {
      addBlog(blogData);
      showAlert('Success', 'Blog added!');
    }

    navigation.goBack();
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cont}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Blog title"
            placeholderTextColor="#a18566"
          />

          <Text style={styles.label}>Summary:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={summary}
            onChangeText={setSummary}
            placeholder="Brief summary"
            multiline
            placeholderTextColor="#a18566"
          />

          <Text style={styles.label}>Content:</Text>
          <TextInput
            style={[styles.input, { height: 140 }]}
            value={content}
            onChangeText={setContent}
            placeholder="Blog content"
            multiline
            placeholderTextColor="#a18566"
          />

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Select Image</Text>
          </TouchableOpacity>

          {image ? <Image source={{ uri: image }} style={styles.previewImage} /> : null}

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#b2a07a' }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              {blogToEdit ? 'Update Blog' : 'Add Blog'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomNavbar}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AdminHome')}>
            <Icon name="home-outline" size={35} color="#7f5539" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AddBlog')}>
            <Icon name="add-circle-outline" size={35} color="#7f5539" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person-circle-outline" size={35} color="#7f5539" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Recipe')}>
            <Icon name="restaurant-outline" size={24} color="#7f5539" />
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
});
