import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';

const coffeeShops = [
  {
    id: 1,
    name: "Central Coffee",
    description: "Great artisan coffee!",
    latitude: 51.5145,
    longitude: -0.1420,
  },
  {
    id: 2,
    name: "Corner Café",
    description: "Specialty coffee beans available.",
    latitude: 51.5079,
    longitude: -0.1283,
  },
  {
    id: 3,
    name: "Bistro Coffee",
    description: "Cozy atmosphere with free Wi-Fi.",
    latitude: 51.5100,
    longitude: -0.1345,
  },
];

const MapBox = ({ onFilterPress, loggedIn, username, favorites, toggleFavorite }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      console.log('Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied:', status);
        setLocation({
          latitude: 51.5074,
          longitude: -0.1278,
        });
        return;
      }

      try {
        console.log('Getting location...');
        let locationData = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 10000,
        });
        console.log('Location obtained:', locationData.coords);
        setLocation(locationData.coords);

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }, 1000);
        }
      } catch (error) {
        setErrorMsg(`Error getting location: ${error.message}`);
        console.log('Error:', error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 51.5074,
              longitude: -0.1278,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={location !== null}
            onRegionChangeComplete={(region) => console.log('Region changed:', region)}
          >
            {coffeeShops.map((shop) => (
              <Marker
                key={shop.id}
                coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
                title={shop.name}
                description={shop.description}
                onPress={() => navigation.navigate('CoffeeProfile', { 
                  shop,
                  loggedIn,
                  username,
                  favorites,
                  toggleFavorite,

                })}
              />
            ))}
            {location && (
              <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="Your Location"
                pinColor="blue"
              />
            )}
          </MapView>

          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Icon name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    padding: 10,
    flex: 1,
  },
  filterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MapBox;