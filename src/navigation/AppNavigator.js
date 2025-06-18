import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import UserStack from './UserStack';
import LoadingScreen from './LoadingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn, user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Admin" component={AdminStack} />
        <Stack.Screen name="User" component={UserStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
