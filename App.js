import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RecipeProvider } from './src/context/RecipeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import { BlogProvider } from './src/context/BlogContext';

// async function createAdminIfNotExists() {
//   try {
//     const existingAdmin = await AsyncStorage.getItem('adminProfile');
//     if (!existingAdmin) {
//       const admin = {
//         username: 'admin',
//         email: 'admin@gmail.com',
//         password: 'admin123',
//         role: 'admin',
//       };
//       await AsyncStorage.setItem('adminProfile', JSON.stringify(admin));
//       console.log('Admin user created');
//     } else {
//       console.log('Admin user already exists');
//     }
//   } catch (error) {
//     console.error('Failed to create admin:', error);
//   }
// }

export default function App() {
  useEffect(() => {
    // createAdminIfNotExists();
  }, []);

  return (
    <UserProvider>
      <RecipeProvider>
        <BlogProvider>
          <AppNavigator />
        </BlogProvider>
      </RecipeProvider>
    </UserProvider>
  );
}
