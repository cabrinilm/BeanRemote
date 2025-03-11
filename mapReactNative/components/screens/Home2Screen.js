import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/logo.jpg';
import NewNavBar from '../NewNavBar';
import MapBox from '../MapBox'; 

const Home2Screen = () => {
  const [showMap, setShowMap] = useState(false); 
  const [loggedIn] = useState(false); 
  const [username] = useState(''); 

  const handleNearYouPress = () => {
    setShowMap(true); 
  };

  const handleBackPress = () => {
    setShowMap(false); 
  };

  return (
    <ImageBackground source={logo} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        {showMap ? (

          <View style={styles.mapContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Ionicons name="close-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <MapBox onFilterPress={() => console.log('Filter pressed')} loggedIn={loggedIn} username={username} />
          </View>
        ) : (
   
          <View style={styles.initialContent}>
            <Text style={styles.title}>Find Your Perfect</Text>
            <Text style={styles.subtitle}>Coffee for Work</Text>
            <TouchableOpacity style={styles.nearYouButton} onPress={handleNearYouPress}>
              <Text style={styles.nearYouText}>Near You</Text>
            </TouchableOpacity>
          </View>
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
});

export default Home2Screen;
