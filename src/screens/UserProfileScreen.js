import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen({ navigation }) {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || null);

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setAvatar(user?.avatar || null);
  }, [user]);

  const handleSave = async () => {
    const updatedUser = { ...user, name, email, avatar };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      updateUser(updatedUser);
      Alert.alert('Success', 'Profile updated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      console.log(error);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Access to media is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setAvatar(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={{ color: '#fff' }}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.cont}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNavbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home-outline" size={35} color="#7f5539" />
        </TouchableOpacity>
{/* 
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('MyRecipes')}
        >
          <Icon name="book-outline" size={30} color="#7f5539" />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('UserProfile')}
        >
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.navAvatar} />
          ) : (
            <Icon name="person-circle-outline" size={35} color="#7f5539" />
          )}
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('DishDiary')}
        >
          <Icon name="journal-outline" size={24} color="#7f5539" />
        </TouchableOpacity> */}

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
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  cont: {
    backgroundColor: '#f8f4f0',
    padding: 40,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7f5539',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: '#7f5539',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#7f5539',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
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
  navAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
