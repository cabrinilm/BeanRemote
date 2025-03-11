import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles/LoginScreenStyles';
import { login } from './../../src/services/auth';
import { getUsers, getCafes } from './../../src/services/api';

export default function LoginScreen({ navigation }) {
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  const [email, setEmail] = useState('caroladmin@example.com');
  const [password, setPassword] = useState('159753');
  const [userData, setUserData] = useState(null);
  const [cafesData, setCafesData] = useState(null);
  const [error, setError] = useState(null);

  // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  const handleLogin = async () => {
    if (email && password) {
      setError(null);
      const { user, idToken } = await login(email, password);
      setUserData({ uid: user.uid, email: user.email });

      // Fetch cafes (no authentication needed)
      const cafes = await getCafes();
      setCafesData(cafes);

      // Fetch users (requires authentication)
      const users = await getUsers(idToken);
      console.log('Users:', users);
      Alert.alert('Success', 'Login successful!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home', { loggedIn: true, username: email });
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize='none'
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home', { loggedIn: false })}
      >
        <Text style={styles.backButtonText}>Back without login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.signUpButtonText}>Create an account</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {userData && (
        <View style={styles.result}>
          <Text>User ID: {userData.uid}</Text>
          <Text>Email: {userData.email}</Text>
        </View>
      )}

      {cafesData && (
        <View style={styles.result}>
          <Text>Cafes:</Text>
          {cafesData.map((cafe) => (
            <Text key={cafe.id}>
              {cafe.name} - {cafe.address}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
