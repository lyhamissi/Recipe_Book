import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        setError('');
        setMessage('');
        if (!email) {
            setError('Please enter your email');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('http://192.168.208.248:4000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.toLowerCase() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Something went wrong');
            } else {
                setMessage('If this email exists, a reset link has been sent.');
                setTimeout(() => {
                    navigation.replace('Login'); 
                }, 3000);

            }
        } catch (err) {
            setError('Network error, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Forgot Password</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleForgotPassword}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Text>
                </TouchableOpacity>

                {message ? <Text style={styles.message}>{message}</Text> : null}
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.link}>Back to Login</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf6ee',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: '#fffaf5',
        borderRadius: 20,
        padding: 32,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#7F5539',
        textAlign: 'center',
        marginBottom: 28,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#7F5539',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    message: {
        color: 'green',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    link: {
        color: '#a0522d',
        textAlign: 'center',
        fontSize: 15,
    },
});
