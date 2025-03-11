import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={logo}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      
        <View style={styles.mainContent}>
    

          {showMap ? (
        
            <View style={styles.mapContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Ionicons name="close-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <MapBox
                onFilterPress={() => console.log('Filter pressed')} 
                loggedIn={loggedIn}
                username={username}
              />
            </View>
          ) : (
          
            <View style={styles.initialContent}>
              <View style={styles.logoContainer} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Find Your Perfect</Text>
                <Text style={styles.subtitle}>Coffee for Work</Text>
              </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between', 
    paddingBottom: 50, 
  },
  initialContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center', 
  },
  logoContainer: {
    height: 120,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  nearYouButton: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
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
    top: 10,
    left: 10,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    zIndex: 20, 
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    zIndex: 10,
    paddingVertical: 10, 
  },
});

export default Home2Screen;