import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles/LoginScreenStyles';
import { login } from './../../src/services/auth';
import { getUsers, getCafes } from './../../src/services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('caroladmin@example.com');
  const [password, setPassword] = useState('159753');
  const [userData, setUserData] = useState(null);
  const [cafesData, setCafesData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (email && password) {
      setError(null);
      const { user, idToken } = await login(email, password);
      setUserData({ uid: user.uid, email: user.email });

      const cafes = await getCafes();
      setCafesData(cafes);

      const users = await getUsers(idToken);
      console.log('Users:', users);

      Alert.alert('Success', 'Login successful!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('UserHomeScreen', { loggedIn: true, username: email });
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Home', { loggedIn: false });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBackPress}>
        <Ionicons name="arrow-back-outline" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.returnButton} onPress={handleBackPress}>
        <Text style={styles.returnButtonText}>Return to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.signUpButtonText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
