import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import debounce from 'lodash.debounce';

const MapBox = ({ 
  onFilterPress, 
  username, 
  favorites, 
  toggleFavorite, 
  filterType = 'visible', 
  onCoffeeShopsUpdate 
}) => {
  const [location, setLocation] = useState(null); 
  const [errorMsg, setErrorMsg] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  const fetchCoffeeShops = useRef(
    debounce(async (region) => {
      try {
        let response;
        const currentLat = region.latitude;
        const currentLon = region.longitude;
        console.log('Fetching with region:', region);

        if (filterType === 'radius') {
          response = await axios.get('https://be-bean-remote.onrender.com/api/cafes/map/radius', {
            params: {
              lat: currentLat,
              lon: currentLon,
              radius: 5000,
            },
          });
        } else {
          const minLat = region.latitude - region.latitudeDelta / 2;
          const maxLat = region.latitude + region.latitudeDelta / 2;
          const minLon = region.longitude - region.longitudeDelta / 2;
          const maxLon = region.longitude + region.longitudeDelta / 2;

          response = await axios.get('https://be-bean-remote.onrender.com/api/cafes/map/visible', {
            params: { minLat, maxLat, minLon, maxLon },
          });
        }

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        if (response.data && Array.isArray(response.data.cafes)) {
          const formattedCafes = response.data.cafes
            .filter((cafe) => typeof cafe.latitude === 'number' && typeof cafe.longitude === 'number')
            .map((cafe) => {
              const distance = calculateDistance(currentLat, currentLon, cafe.latitude, cafe.longitude) + ' km';
              console.log(`Distance for ${cafe.name}: ${distance}`);
              return {
                id: cafe.id,
                name: cafe.name,
                description: cafe.description,
                latitude: cafe.latitude,
                longitude: cafe.longitude,
                distance,
              };
            });
          setCoffeeShops(formattedCafes);
          onCoffeeShopsUpdate(formattedCafes);
        } else {
          console.warn('API did not return an array of cafes:', response.data);
          setCoffeeShops([]);
          onCoffeeShopsUpdate([]);
          setErrorMsg('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching coffee shops:', error.message);
        setErrorMsg('Failed to load coffee shops');
        setCoffeeShops([]);
        onCoffeeShopsUpdate([]);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const fetchInitialCoffeeShops = async () => {
      const defaultLocation = {
        latitude: 51.5074, 
        longitude: -0.1278, 
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };

      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('Permission denied, using fallback location');
          setLocation(defaultLocation);
        } else {
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

          console.log('User location set:', userLocation);
          setLocation(userLocation);
        }
      } catch (error) {
        console.error('Error fetching location:', error.message);
        setLocation(defaultLocation);
      }
    };

    fetchInitialCoffeeShops();
  }, [fetchCoffeeShops]); 

  useEffect(() => {
    if (location) {
      fetchCoffeeShops(location);
    }
  }, [location]); 

  const handleRegionChange = (region) => {
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
              latitude: 51.5074,  
              longitude: -0.1278,
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
