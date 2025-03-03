import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

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

const MapBox = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log('Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log('Permission denied:', status);
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
        
        // Move the map to the new location immediately
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }, 1000); // Animation duration in milliseconds (1 second)
        }
      } catch (error) {
        setErrorMsg(`Error getting location: ${error.message}`);
        console.log('Error:', error);
      }
    })();
  }, []);

  let content = (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 51.5074, // Default London coordinates
            longitude: -0.1278,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          onRegionChangeComplete={(region) => console.log('Region changed:', region)}
        >
          {coffeeShops.map((shop) => (
            <Marker
              key={shop.id}
              coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
              title={shop.name}
              description={shop.description}
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
      )}
    </View>
  );

  return content;
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "50%",
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    padding: 10,
  },
});

export default MapBox;