import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import styles from './styles/CoffeeProfileScreenStyle';

const CoffeeProfileScreen = () => {
  const route = useRoute(); 

  
  const { shop } = route.params || {};
  
  if (!shop) {
    return (
      <View style={styles.container}>
        <Text>No coffee shop data available.</Text>
      </View>
    );
  }


  const { name, description, latitude, longitude } = shop;

  return (
    <View style={styles.container}>
      <Text style={styles.coffeeName}>{name}</Text>
      <Text style={styles.coffeeDescription}>{description}</Text>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  );
};


export default CoffeeProfileScreen;
