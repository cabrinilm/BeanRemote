import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NewNavBar from '../NewNavBar'; 

const InfoScreen = () => {
  return (
    <View style={styles.container}>
   
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.subtitle}>Find Remote Work Locations with Coffee</Text>
        <Text style={styles.paragraph}>
          This app is designed for remote workers who are looking for comfortable spots to work that serve coffee. 
          It helps you find the perfect place to focus and be productive, no matter where you are.
        </Text>

        <Text style={styles.subtitle}>Our Story</Text>
        <Text style={styles.paragraph}>
          The idea behind this app came from a group of software developers who realised the need for a tool 
          that helps remote workers find cafes to work from. With the rise of remote work, it became apparent 
          that finding the right environment is essential for productivity, and that's how this app was born.
        </Text>

        <Text style={styles.subtitle}>Features</Text>
        <Text style={styles.paragraph}>
          - As a user, you can find cafes near you that offer a perfect environment for working remotely.
        </Text>
        <Text style={styles.paragraph}>
          - As a business, you can list your cafe on the app, making it easier for remote workers to find your spot.
        </Text>
      </ScrollView>


      <NewNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  contentContainer: {
    padding: 20,
    flexGrow: 1,
    paddingTop: 40, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#bbb',
    marginTop: 25,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 28,
    color: '#ddd',
    marginBottom: 15,
  },
});

export default InfoScreen;
