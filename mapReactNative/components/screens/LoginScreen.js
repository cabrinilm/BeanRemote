import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/LoginScreenStyles';
import { login } from './../../src/services/auth';
import {
  getUserByFirebaseUid,
  getUserFavourites,
  getUserAmenities,
  getUserReviews,
  getVisits,
} from './../../src/services/api';
import UserAccount from '../../src/context/UserAccount';
import LoadingScreen from '../LoadingScreen'; 

export default function LoginScreen({ navigation }) {
  const {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
    favorites,
    setFavorites,
    preferences,
    setPreferences,
    reviews,
    setReviews,
    visits,
    setVisits,
  } = useContext(UserAccount);
  
  const [email, setEmail] = useState('caroladmin@example.com');
  const [password, setPassword] = useState('159753');

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      setError(null);
      try {
        const userFromFirebase = await login(email, password);
        const params = { firebase_uid: userFromFirebase?.user?.uid };
        
        
        const userData = await getUserByFirebaseUid(params);
        setUser(userData);

        const [
          userFavourites,
          userPreferences,
          userReviews,
          userVisits,
        ] = await Promise.all([
          getUserFavourites(userData?.id),
          getUserAmenities(userData?.id),
          getUserReviews(userData?.id),
          getVisits({ user_id: userData?.id }),
        ]);

        setFavorites(userFavourites);
        setPreferences(userPreferences);
        setReviews(userReviews);
        setVisits(userVisits);

        
        navigation.navigate('UserHomeScreen', {
          loggedIn: true,
          username: email,
        });
      } catch (err) {
        console.error('❌ Login Error:', err.message);
        setError('An error occurred while logging in.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Home', { loggedIn: false });
  };

  if (loading) {
    return <LoadingScreen />;  
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBackPress}>
        <Ionicons name='arrow-back-outline' size={28} color='#000' />
      </TouchableOpacity>

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

      <TouchableOpacity style={styles.returnButton} onPress={handleBackPress}>
        <Text style={styles.returnButtonText}>Return to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.signUpButtonText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
