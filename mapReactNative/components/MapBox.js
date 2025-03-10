import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import debounce from 'lodash.debounce';

const MapBox = ({ onFilterPress, loggedIn, username, favorites, toggleFavorite, filterType = 'visible' }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const fetchCoffeeShops = useRef(
    debounce(async (region) => {
      try {
        let response;
        if (filterType === 'radius' && location) {
          response = await axios.get('http://localhost:3001/api/cafes/map/radius', {
            params: {
              lat: location.latitude,
              lon: location.longitude,
              radius: 1000, 
            },
          });
        } else {
          const minLat = region.latitude - region.latitudeDelta / 2;
          const maxLat = region.latitude + region.latitudeDelta / 2;
          const minLon = region.longitude - region.longitudeDelta / 2;
          const maxLon = region.longitude + region.longitudeDelta / 2;

          response = await axios.get('http://localhost:3001/api/cafes/map/visible', {
            params: { minLat, maxLat, minLon, maxLon },
          });
        }

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        if (response.data && Array.isArray(response.data.cafes)) {
          const formattedCafes = response.data.cafes
            .filter((cafe) => typeof cafe.latitude === 'number' && typeof cafe.longitude === 'number') 
            .map((cafe) => ({
              id: cafe.id,
              name: cafe.name,
              description: cafe.description,
              latitude: cafe.latitude,
              longitude: cafe.longitude,
            }));
          setCoffeeShops(formattedCafes);
        } else {
          console.warn('API did not return an array of cafes:', response.data);
          setCoffeeShops([]);
          setErrorMsg('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching coffee shops:', error.message);
        setErrorMsg('Failed to load coffee shops');
        setCoffeeShops([]);
      }
    }, 300)
  ).current;

  useEffect(() => {
    (async () => {
      console.log('Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      let initialRegion = {
        latitude: 53.4808, // Manchester, UK
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
    console.log('Region changed:', region, 'FilterType:', filterType);
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
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
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