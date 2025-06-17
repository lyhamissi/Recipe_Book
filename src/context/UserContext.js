import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userProfile');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Failed to load user profile', err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = async (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Failed to save user profile', err);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('userProfile');
    } catch (err) {
      console.error('Failed to remove user profile', err);
    }
  };

  const isLoggedIn = !!user;

  // Helper to check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider
      value={{ user, updateUser, logout, isLoggedIn, loading, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
}
