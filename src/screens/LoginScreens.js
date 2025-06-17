import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/UserContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      // ✅ Admin login
      const adminEmail = 'admin@example.com';
      const adminPassword = 'admin123';

      if (email.toLowerCase() === adminEmail && password === adminPassword) {
        const admin = {
          email: adminEmail,
          name: 'Admin',
          role: 'admin',
        };
        await updateUser(admin);
        Alert.alert('Welcome Admin!');
        navigation.replace('AdminHome');
        return;
      }

      // 🔎 Check registered users
      const storedUsers = await AsyncStorage.getItem('users');
      if (!storedUsers) {
        Alert.alert('No users found', 'Please register first');
        return;
      }

      const users = JSON.parse(storedUsers);
      const user = users.find(
        u => u.email === email.toLowerCase() && u.password === password
      );

      if (user) {
        await updateUser(user);
        Alert.alert('Welcome User!');
        navigation.replace('Home');
      } else {
        Alert.alert('Invalid credentials', 'Email or password is incorrect');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Recipe Book Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6ee',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fffaf5',
    borderRadius: 20,
    padding: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#7F5539',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#7F5539',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#a0522d',
    textAlign: 'center',
    fontSize: 15,
  },
});
