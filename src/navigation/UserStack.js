import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserHomeScreen from '../screens/UserHomeScreen';
import UserRecipeListScreen from '../screens/UserRecipeListScreen';
import UserRecipeDetailsScreen from '../screens/UserRecipeDetails';
import UserProfileScreen from '../screens/UserProfileScreen';
import UserBlogDetail from '../screens/UserBlogDetailsScreen';
import UserBlogList from '../screens/UserBlogListScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
    return (
        <Stack.Navigator initialRouteName="UserHome">
            <Stack.Screen name="UserHome" component={UserHomeScreen} />
            <Stack.Screen name="RecipeList" component={UserRecipeListScreen} />
            <Stack.Screen name="UserRecipeDetails" component={UserRecipeDetailsScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="BlogList" component={UserBlogList} options={{ title: 'Behind The Story' }} />
            <Stack.Screen name="UserBlogDetails" component={UserBlogDetail} />
        </Stack.Navigator>
    );
}
