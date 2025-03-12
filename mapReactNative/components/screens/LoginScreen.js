import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/LoginScreenStyles';
import { login } from './../../src/services/auth';
import {
  getUsers,
  getUserByFirebaseUid,
  getCafes,
  getUserFavourites,
  getUserAmenities,
  getUserReviews,
  getVisits,
} from './../../src/services/api';
import UserAccount from '../../src/context/UserAccount';
import AnimatedLoader from 'react-native-animated-loader';

export default function LoginScreen({ navigation }) {
  const {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
    isErrorPopupOpen,
    setIsErrorPopupOpen,
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
      const userFromFirebase = await login(email, password);
      const params = { firebase_uid: userFromFirebase?.user?.uid };
      console.log('UID: ', params.firebase_uid);
      console.log('Token: ', userFromFirebase?.idToken);
      getUserByFirebaseUid(params)
        .then((userData) => {
          console.log(userData);
          setUser(userData);
          console.log('User: ', user);
          return Promise.all([
            getUserFavourites(userData?.id),
            getUserAmenities(userData?.id),
            getUserReviews(userData?.id),
            getVisits({ user_id: userData?.id }),
          ]);
        })
        .then(([userFavourites, userPreferences, userReviews, userVisits]) => {
          setFavorites(userFavourites);
          setPreferences(userPreferences);
          setReviews(userReviews);
          setVisits(userVisits);
          setLoading(false);
          Alert.alert('Success', 'Login successful!', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('UserHomeScreen', {
                  loggedIn: true,
                  username: email,
                });
              },
            },
          ]);
        })
        .catch((err) => {
          console.error('❌ Login Error:', error.message);
          setError(
            `${
              'Status: ' +
              err.response.status +
              ' Message: "' +
              err.response.data.msg
            }` || 'An unexpected error occurred in getting the user data'
          );
        })
        .finally(() => setLoading(false));
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Home', { loggedIn: false });
  };

  if (loading) {
    return (
      <AnimatedLoader
        visible={loading}
        overlayColor='rgba(255,255,255,0.75)'
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text>Doing something...</Text>
      </AnimatedLoader>
    );
  }

  if (error) {
    Alert.alert('❌ Error', error, [
      {
        text: 'OK',
        onPress: () => {
          setError(null);
          setFavorites('');
          setPreferences('');
          setReviews('');
          setVisits('');
          setLoading(false);
          setUser(null);
          navigation.navigate('HomeScreen');
        },
      },
    ]);
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
