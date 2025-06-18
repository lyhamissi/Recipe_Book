import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

export default function EmailVerificationScreen({ route, navigation }) {
  const { email } = route.params;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 30000); // 30 seconds

    // Cleanup in case the component unmounts early
    return () => clearTimeout(timer);
  }, [navigation]);

  const resendVerification = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://10.36.240.248:4000/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Verification email resent! Please check your inbox.');
      } else {
        setMessage(data.message || 'Failed to resend verification email');
      }
    } catch (error) {
      setMessage('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Thanks for registering! A verification email was sent to:
      </Text>
      <Text style={styles.emailText}>{email}</Text>
      <Text style={styles.infoText}>Please verify your email to activate your account.</Text>

      <TouchableOpacity style={styles.button} onPress={resendVerification} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Resend Verification Email</Text>}
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Text style={styles.linkText}>You’ll be redirected to Login in 30 seconds...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fdf6ee',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#7f5539',
  },
  emailText: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#a0522d',
  },
  button: {
    backgroundColor: '#7f5539',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 12,
  },
  linkText: {
    color: '#a0522d',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
});
