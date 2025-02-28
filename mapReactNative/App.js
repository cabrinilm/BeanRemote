import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import Navbar from "./components/NavBar";
import MapBox from "./components/MapBox";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
     
      <Navbar onMenuPress={() => console.log("Menu open!")} />

      
      <View style={styles.queryContainer}>
        <View style={styles.queryItem}>
          <Text style={styles.queryLabel}>Sort by</Text>
          <Text style={styles.queryValue}>[Seleção Sort]</Text>
        </View>

        <View style={styles.queryItem}>
          <Text style={styles.queryLabel}>List.map</Text>
          <Text style={styles.queryValue}>[Seleção List]</Text>
        </View>
      </View>

   
      <MapBox />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, 
    backgroundColor: "#f5f5f5", 
  },
  queryContainer: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between", 
    marginTop: 80, 
    paddingHorizontal: 20,
  },
  queryItem: {
    flex: 1,
    alignItems: "center",
  },
  queryLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  queryValue: {
    fontSize: 14,
    color: "#888",
  },
});
