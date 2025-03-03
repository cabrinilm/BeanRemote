import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import MapBox from '../MapBox'; 
import NavBar from '../NavBar'; 
import Footer from '../Footer';

export default function HomeScreen({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          onMenuPress={() => console.log('Menu opened!')}
          onLoginPress={() => navigation.navigate('Login')} // Navigate to LoginScreen
        />
  
        {/* Main content takes all available space */}
        <View style={styles.mainContent}>
          <MapBox />
        </View>
  
        <Footer />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    mainContent: {
      flex: 1, // Ensures MapBox takes available space, pushing Footer down
    },
  });