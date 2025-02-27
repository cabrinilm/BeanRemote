import { View, Platform, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import WebMapView from "react-native-web-maps"; 

const MapBox = () => {
    const MapComponent = Platform.OS === "web" ? WebMapView : MapView;
  
    return (
      <View style={styles.container}>
        <MapComponent
          style={styles.map}
          initialRegion={{
            latitude: 51.5074, 
            longitude: -0.1278, 
            latitudeDelta: 1, 
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    width: "90%", 
    height: 300, 
    alignSelf: "center", 
    borderRadius: 10,
    overflow: "hidden", 
    borderWidth: 1,
    borderColor: "#ccc",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapBox;
