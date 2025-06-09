import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreens';
import TestScreen from '../screens/TestScreens';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreens';
import RecipeDetailScreen from '../screens/RecipeDetailsScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="RecipeDetails" component={RecipeDetailScreen} />
                <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}
