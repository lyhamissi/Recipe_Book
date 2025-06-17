import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreens';
import RegisterScreen from '../screens/RegisterScreen';

// Admin screens (existing)
import AdminHomeScreen from '../screens/AdminHomeScreens';
import AdminDashboard from '../screens/AdminDashboard';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import AddBlogScreen from '../screens/AddBlogScreen';

// User screens (new, you will create these)
import UserHomeScreen from '../screens/UserHomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailsScreen'; 
import BlogScreen from '../screens/BlogScreen'; 
import BlogDetailScreen from '../screens/BlogDetailsScreen'; 
import ProfileScreen from '../screens/ProfileScreen';
import UserRecipeDetailsScreen from '../screens/UserRecipeDetails';
import { UserContext } from '../context/UserContext';
import UserRecipeListScreen from '../screens/UserRecipeListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import UserBlogList from '../screens/UserBlogListScreen';
import BlogDetail from '../screens/UserBlogDetailsScreen';
import UserBlogDetail from '../screens/UserBlogDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { user, isLoggedIn } = useContext(UserContext);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                {isLoggedIn && user?.role === 'admin' && (
                    <>
                        <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
                        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Dashboard' }} />
                        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{ title: 'Add New Recipe' }} />
                        <Stack.Screen name="AddBlog" component={AddBlogScreen} options={{ title: 'Add Story' }} />
                    </>
                )}
                {isLoggedIn && user?.role !== 'admin' && (
                    <>
                        <Stack.Screen name="Home" component={UserHomeScreen} />
                        <Stack.Screen name='RecipeList' component={UserRecipeListScreen} options={{title:'Your Recipes'}}/>
                        <Stack.Screen name='UserRecipeDetails' component={UserRecipeDetailsScreen}/>
                        <Stack.Screen name='UserProfile' component={UserProfileScreen} options={{title:'Profile'}}/>
                        <Stack.Screen name='BlogList' component={UserBlogList} options={{title:'Behind The Story'}}/>
                        <Stack.Screen name='UserBlogDetails' component={UserBlogDetail}/>
                    </>
                )}
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
