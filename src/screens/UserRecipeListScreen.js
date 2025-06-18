import React, { useContext, useState, useCallback } from 'react';
import { UserContext } from '../context/UserContext';
import { RecipeContext } from '../context/RecipeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

export default function UserRecipeListScreen({ navigation }) {
    const { user, isLoggedIn, logout, loading } = useContext(UserContext);
    const { recipes, fetchRecipesFromBackend } = useContext(RecipeContext);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useFocusEffect(
        useCallback(() => {
            if (isLoggedIn) {
                fetchRecipesFromBackend(); 
            }
        }, [isLoggedIn])
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#FFA500" style={{ marginTop: 50 }} />
            </SafeAreaView>
        );
    }

    if (!isLoggedIn) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.notLoggedInContainer}>
                    <Text style={styles.notLoggedInText}>
                        Please log in or register to view recipes.
                    </Text>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
                    >
                        <Text style={styles.loginButtonText}>Go to Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
                    >
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

const userRecipes = recipes
    .filter(recipe => (selectedCategory ? recipe.category === selectedCategory : true))
    .filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleLogout = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Discover Delicious Recipes</Text>
            <View style={styles.filterRow}>
                <TextInput
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchInputInline}
                    placeholderTextColor="#999"
                />
                <View style={styles.pickerInlineContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={value => setSelectedCategory(value)}
                        style={styles.pickerInline}
                    >
                        <Picker.Item label="All" value="" />
                        <Picker.Item label="Breakfast" value="Breakfast" />
                        <Picker.Item label="Lunch" value="Lunch" />
                        <Picker.Item label="Dinner" value="Dinner" />
                        <Picker.Item label="Dessert" value="Dessert" />
                        <Picker.Item label="Vegan" value="Vegan" />
                        <Picker.Item label="Drinks" value="Drinks" />
                    </Picker>
                </View>
            </View>

            {userRecipes.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 50, color: '#FFA500' }}>
                    No recipes found. Please check back later!
                </Text>
            ) : (
                <FlatList
                    data={userRecipes}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.recipeList}
                    renderItem={({ item }) => (
                        <View style={styles.recipeCard}>
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                            ) : null}
                            <Text style={styles.recipeTitle}>{item.title}</Text>
                            <TouchableOpacity
                                style={styles.viewButton}
                                onPress={() => navigation.navigate('UserRecipeDetails', { recipe: item })}
                            >
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <View style={styles.bottomNavbar}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('UserHome')}>
                    <Icon name="home-outline" size={30} color="#7f5539" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('UserProfile')}>
                    {user?.avatar ? (
                        <Image source={{ uri: user.avatar }} style={styles.navAvatar} />
                    ) : (
                        <Icon name="person-circle-outline" size={30} color="#7f5539" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
                    <Icon name="log-out-outline" size={30} color="#dc3545" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f8f4f0',
        paddingBottom: 80,
    },
    notLoggedInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    notLoggedInText: {
        fontSize: 18,
        color: '#7f5539',
        marginBottom: 30,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#7f5539',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    registerButton: {
        borderColor: '#7f5539',
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    registerButtonText: {
        color: '#7f5539',
        fontSize: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#7f5539',
        textAlign: 'center',
        marginBottom: 20,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    searchInputInline: {
        flex: 1.2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: '#333',
    },
    pickerInlineContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        paddingHorizontal: 4,
        paddingVertical: -1,
    },
    pickerInline: {
        height: 45,
        width: '100%',
    },
    recipeList: {
        padding: 16,
    },
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    recipeImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 8,
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: '#7f5539',
    },
    viewButton: {
        backgroundColor: '#7f5539',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    viewButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    bottomNavbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#f8f4f0',
        borderTopWidth: 1,
        borderTopColor: '#e0d6ce',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 8,
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
});
