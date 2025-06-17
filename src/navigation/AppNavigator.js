import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { UserContext } from '../context/UserContext';

// Auth
import LoginScreen from '../screens/LoginScreens';
import RegisterScreen from '../screens/RegisterScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen ';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

// Admin
import AdminHomeScreen from '../screens/AdminHomeScreens';
import AdminDashboard from '../screens/AdminDashboard';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import AddBlogScreen from '../screens/AddBlogScreen';

// User
import UserHomeScreen from '../screens/UserHomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailsScreen';
import BlogScreen from '../screens/BlogScreen';
import BlogDetailScreen from '../screens/BlogDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserRecipeDetailsScreen from '../screens/UserRecipeDetails';
import UserRecipeListScreen from '../screens/UserRecipeListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import UserBlogList from '../screens/UserBlogListScreen';
import UserBlogDetail from '../screens/UserBlogDetailsScreen';
import BlogDetail from '../screens/UserBlogDetailsScreen';

const Stack = createNativeStackNavigator();

// ✅ Deep linking config
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      ResetPassword: {
        path: 'reset-password',
        parse: {
          token: (token) => token,
        },
      },
    },
  },
};

export default function AppNavigator() {
  const { user, isLoggedIn } = useContext(UserContext);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        {/* Auth Routes */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        {/* Admin Routes */}
        {isLoggedIn && user?.role === 'ADMIN' && (
          <>
            <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{ title: 'Add New Recipe' }} />
            <Stack.Screen name="AddBlog" component={AddBlogScreen} options={{ title: 'Add Story' }} />
          </>
        )}

        {/* User Routes */}
        {isLoggedIn && user?.role !== 'ADMIN' && (
          <>
            <Stack.Screen name="Home" component={UserHomeScreen} />
            <Stack.Screen name="RecipeList" component={UserRecipeListScreen} options={{ title: 'Your Recipes' }} />
            <Stack.Screen name="UserRecipeDetails" component={UserRecipeDetailsScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
            <Stack.Screen name="BlogList" component={UserBlogList} options={{ title: 'Behind The Story' }} />
            <Stack.Screen name="UserBlogDetails" component={UserBlogDetail} />
          </>
        )}

        {/* Shared Routes */}
        {isLoggedIn && (
          <>
            <Stack.Screen name="RecipeDetails" component={RecipeDetailScreen} options={{ title: 'Recipe Details' }} />
            <Stack.Screen name="Blog" component={BlogScreen} />
            <Stack.Screen name="BlogDetails" component={BlogDetailScreen} options={{ title: 'Story Details' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
