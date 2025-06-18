import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHomeScreen from '../screens/AdminHomeScreens';
import AdminDashboard from '../screens/AdminDashboard';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import AddBlogScreen from '../screens/AddBlogScreen';
import RecipeDetailScreen from '../screens/RecipeDetailsScreen';
import BlogScreen from '../screens/BlogScreen';
import BlogDetailScreen from '../screens/BlogDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
    return (
        <Stack.Navigator initialRouteName="AdminHome">
            <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
            <Stack.Screen name="AddBlog" component={AddBlogScreen} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetailScreen} options={{ title: 'Recipe Details' }} />
            <Stack.Screen name="Blog" component={BlogScreen} />
            <Stack.Screen name="BlogDetails" component={BlogDetailScreen} options={{ title: 'Story Details' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Stack.Navigator>
    );
}
