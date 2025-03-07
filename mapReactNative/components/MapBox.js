import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import debounce from 'lodash.debounce';

// simulate the backend
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; 
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
};

const MapBox = ({ onFilterPress, loggedIn, username, favorites, toggleFavorite, filterType = 'visible' }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const fetchCoffeeShops = useRef(
    debounce(async (region) => {
      try {
       
        const response = await axios.get('http://localhost:3001/cafes');
        const allCafes = response.data;

        let filteredCafes;
        if (filterType === 'radius' && location) {
      
          const radius = 1000;
          filteredCafes = allCafes.filter((shop) => {
            const distance = getDistance(
              location.latitude,
              location.longitude,
              shop.latitude,
              shop.longitude
            );
            return distance <= radius;
          });
        } else {
         
          const minLat = region.latitude - region.latitudeDelta / 2;
          const maxLat = region.latitude + region.latitudeDelta / 2;
          const minLon = region.longitude - region.longitudeDelta / 2;
          const maxLon = region.longitude + region.longitudeDelta / 2;

          filteredCafes = allCafes.filter(
            (shop) =>
              shop.latitude >= minLat &&
              shop.latitude <= maxLat &&
              shop.longitude >= minLon &&
              shop.longitude <= maxLon
          );
        }

        setCoffeeShops(filteredCafes);
      } catch (error) {
        console.error('Error fetching coffee shops:', error);
        setErrorMsg('Error loading coffee shops');
      }
    }, 500)
  ).current;

  useEffect(() => {
    (async () => {
      console.log('Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      let initialRegion = {
        latitude: 53.4808, // Manchester
        longitude: -2.2426,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };

      if (status !== 'granted') {
        console.log('Permission denied:', status);
        setLocation(initialRegion);
        fetchCoffeeShops(initialRegion);
        return;
      }

      try {
        console.log('Getting location...');
        let locationData = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 10000,
        });

        const userLocation = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        };

        setLocation(locationData.coords);

        if (mapRef.current) {
          mapRef.current.animateToRegion(userLocation, 1000);
        }

        fetchCoffeeShops(userLocation);
      } catch (error) {
        setErrorMsg(`Error getting location: ${error.message}`);
        console.log('Error:', error);
        fetchCoffeeShops(initialRegion);
      }
    })();
  }, [filterType]);

  const handleRegionChange = (region) => {
    console.log('Region changed:', region);
    if (filterType !== 'radius') {
      fetchCoffeeShops(region);
    }
  };

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
              latitude: 53.4808,
              longitude: -2.2426,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={location !== null}
            onRegionChangeComplete={handleRegionChange}
          >
            {coffeeShops.map((shop) => (
              <Marker
                key={shop.id}
                coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
                title={shop.name}
                description={shop.description}
                onPress={() =>
                  navigation.navigate('CoffeeProfile', {
                    shop,
                    loggedIn,
                    username,
                    favorites,
                    toggleFavorite,
                  })
                }
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