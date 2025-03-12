import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import debounce from 'lodash.debounce';

const GuestMapBox = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const fetchCoffeeShops = useRef(
    debounce(async (region) => {
      try {
        console.log('GuestMapBox - Fetching with region:', region);

        const response = await axios.get('https://be-bean-remote.onrender.com/api/cafes/map/radius', {
          params: {
            lat: region.latitude,
            lon: region.longitude,
            radius: 5000,
          },
        });

        console.log('GuestMapBox - Response status:', response.status);
        console.log('GuestMapBox - Response data:', response.data);

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

          console.log('GuestMapBox - Setting coffee shops:', formattedCafes);
          setCoffeeShops(formattedCafes);
        } else {
          console.warn('GuestMapBox - No cafes found or invalid format:', response.data);
          setCoffeeShops([]);
          setErrorMsg('No coffee shops available nearby');
        }
      } catch (error) {
        console.error('GuestMapBox - Error fetching coffee shops:', error.message);
        console.error('GuestMapBox - Error details:', error.response ? error.response.data : error);
        setErrorMsg('Failed to load coffee shops');
        setCoffeeShops([]);
      }
    }, 300)
  ).current;

  useEffect(() => {
    (async () => {
      console.log('GuestMapBox - Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      let initialRegion = {
        latitude: 53.4808, // Manchester, UK
        longitude: -2.2426,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      if (status !== 'granted') {
        console.log('GuestMapBox - Permission denied, using fallback location');
        setLocation(initialRegion);
        fetchCoffeeShops(initialRegion);
        return;
      }

      try {
        console.log('GuestMapBox - Getting location...');
        let locationData = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 10000,
        });

        const userLocation = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        console.log('GuestMapBox - User location set:', userLocation);
        setLocation(userLocation);
        fetchCoffeeShops(userLocation);
      } catch (error) {
        console.error('GuestMapBox - Error getting location:', error.message);
        setErrorMsg(`Error getting location: ${error.message}`);
        setLocation(initialRegion);
        fetchCoffeeShops(initialRegion);
      }
    })();
  }, []);

  
  useEffect(() => {
    if (mapReady && coffeeShops.length > 0 && mapRef.current) {
      console.log('GuestMapBox - Coffee shops updated and map ready:', coffeeShops);
      const coordinates = coffeeShops.map((shop) => ({
        latitude: shop.latitude,
        longitude: shop.longitude,
      }));
      if (location) {
        coordinates.push({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [coffeeShops, mapReady]);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <MapView
          ref={mapRef}
          key={coffeeShops.length} 
          style={styles.map}
          initialRegion={{
            latitude: 53.4808,
            longitude: -2.2426,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={!!location}
          onMapReady={() => {
            console.log('GuestMapBox - Map is ready');
            setMapReady(true);
          }}
        >
          {console.log('GuestMapBox - Rendering coffeeShops:', coffeeShops)}
          {coffeeShops.length > 0 && coffeeShops.map((shop) => (
            <Marker
              key={shop.id}
              coordinate={{
                latitude: shop.latitude,
                longitude: shop.longitude,
              }}
              title={shop.name}
              description={shop.description}
              onPress={() =>
                navigation.navigate('CoffeeProfile', {
                  shop,
                  loggedIn: false,
                })
              }
            />
          ))}
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
              pinColor="blue"
            />
          )}
        </MapView>
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
});

export default GuestMapBox;