import React, { useContext } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

export default function NavbarScreen() {
  const navigation = useNavigation();
  const { user = {} } = useContext(UserContext);

  return (
    <SafeAreaView>
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={35} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AddRecipe')}>
          <Icon name="add-circle-outline" size={35} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.navAvatar} />
          ) : (
            <Icon name="person-circle-outline" size={35} color="#7f5539" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Blog')}>
          <Icon name="newspaper-outline" size={24} color="#7f5539" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.replace('Login')}>
          <Icon name="log-out-outline" size={35} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#f5f5dc',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
