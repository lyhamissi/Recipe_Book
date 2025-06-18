import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function LoadingScreen({ navigation }) {
  const { isLoggedIn, user } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.role === 'ADMIN') {
        navigation.replace('Admin');
      } else {
        navigation.replace('User');
      }
    } else {
      navigation.replace('Auth');
    }
  }, [isLoggedIn, user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
