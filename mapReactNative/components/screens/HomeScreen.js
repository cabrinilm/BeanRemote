import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/logo.jpg';
import NewNavBar from '../NewNavBar';
import MapBox from '../MapBox'; 

const HomeScreen = ({ route, navigation }) => {
  const [showMap, setShowMap] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [overlayAnim] = useState(new Animated.Value(0));
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isLoggedIn, setIsLoggedIn] = useState(route.params?.loggedIn || false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNearYouPress = () => {
    if (isLoggedIn) {
      
      navigation.navigate('UserHomeScreen', { loggedIn: true, username: route.params?.username });
    } else {
      
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setShowMap(true);
    }
  };

  const handleBackPress = () => {
    Animated.timing(overlayAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowMap(false));
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={logo} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        {showMap && !isLoggedIn ? (
          <>
            <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} />
            <View style={styles.mapContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Ionicons name="close-outline" size={28} color="#fff" />
              </TouchableOpacity>
              <MapBox onFilterPress={() => console.log('Filter pressed')} />
            </View>
          </>
        ) : (
          <Animated.View style={[styles.initialContent, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Find Your Perfect</Text>
            <Text style={styles.subtitle}>Coffee for Work</Text>
            <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleNearYouPress}>
              <Animated.View style={[styles.nearYouButton, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.nearYouText}>Near You</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            {!isLoggedIn && (
              <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        )}
      </View>

      <View style={styles.navbarContainer}>
        <NewNavBar />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  initialContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  nearYouButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nearYouText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    zIndex: 10,
    paddingVertical: 10,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;