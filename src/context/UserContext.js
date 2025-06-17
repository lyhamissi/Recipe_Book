import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Failed to load user', err);
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
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Failed to save user', err);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (err) {
      console.error('Failed to remove user/token', err);
    }
  };

  const isLoggedIn = !!user;
  const userRole = user?.userRole;
  
const isAdmin = userRole === 'ADMIN';
const isSuperAdmin = userRole === 'SUPERADMIN';
const isNormalUser = userRole === 'USER';


  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        logout,
        isLoggedIn,
        loading,
        isAdmin,
        isSuperAdmin,
        isNormalUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
