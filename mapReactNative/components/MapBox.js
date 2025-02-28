import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

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
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.5074,
          longitude: -0.1278,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {coffeeShops.map((shop) => (
          <Marker
            key={shop.id}
            coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
            title={shop.name}
            description={shop.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 200,
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
});

export default MapBox;
