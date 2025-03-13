import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { getCafesByCoordinates } from '../src/services/api'; 
import LoadingScreen from './LoadingScreen'; 

const GuestMapBox = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const markerAnims = useRef([]);

  const fetchCoffeeShops = async (region) => {
    try {
      console.log('GuestMapBox - Fetching with region:', region);
      const params = {
        minLat: region.latitude - region.latitudeDelta / 2,
        maxLat: region.latitude + region.latitudeDelta / 2,
        minLon: region.longitude - region.longitudeDelta / 2,
        maxLon: region.longitude + region.longitudeDelta / 2,
      };
      const cafes = await getCafesByCoordinates(params);

      console.log('GuestMapBox - Response data:', cafes);

      if (Array.isArray(cafes)) {
        const formattedCafes = cafes
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

        
        markerAnims.current = formattedCafes.map(() => ({
          opacity: new Animated.Value(0),
          scale: new Animated.Value(0.5),
        }));

       
        formattedCafes.forEach((_, index) => {
          Animated.sequence([
            Animated.delay(index * 200),
            Animated.parallel([
              Animated.timing(markerAnims.current[index].opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.spring(markerAnims.current[index].scale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
              }),
            ]),
          ]).start();
        });
      } else {
        console.warn('GuestMapBox - No cafes found or invalid format:', cafes);
        setCoffeeShops([]);
        setErrorMsg('No coffee shops available nearby');
      }
    } catch (error) {
      console.error('GuestMapBox - Error fetching coffee shops:', error.message);
      setErrorMsg('Failed to load coffee shops');
      setCoffeeShops([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const defaultLocation = {
        latitude: 53.4808, // Manchester, UK
        longitude: -2.2426,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      try {
        console.log('GuestMapBox - Requesting location permission...');
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('GuestMapBox - Permission denied, using fallback location');
          setLocation(defaultLocation);
          await fetchCoffeeShops(defaultLocation);
        } else {
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
          await fetchCoffeeShops(userLocation);
        }
      } catch (error) {
        console.error('GuestMapBox - Error fetching location:', error.message);
        setLocation(defaultLocation);
        await fetchCoffeeShops(defaultLocation);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen /> 
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 53.4808,
            longitude: -2.2426,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={location}
          showsUserLocation={!!location}
        >
          {coffeeShops.map((shop, index) => (
            <AnimatedMarker
              key={shop.id}
              shop={shop}
              anim={markerAnims.current[index] || { opacity: new Animated.Value(1), scale: new Animated.Value(1) }}
              navigation={navigation}
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


const AnimatedMarker = ({ shop, anim, navigation }) => (
  <Marker
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
  >
    <Animated.View style={{
      opacity: anim.opacity,
      transform: [{ scale: anim.scale }],
    }}>
      <View style={styles.markerContainer}>
        <Text style={styles.markerText}>{shop.name[0]}</Text>
      </View>
    </Animated.View>
  </Marker>
);

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
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    padding: 10,
    flex: 1,
  },
  markerContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GuestMapBox;
