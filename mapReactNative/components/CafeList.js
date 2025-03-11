import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import debounce from 'lodash.debounce';

const CafeList = ({ cafes }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cafes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 8 },
  name: { fontWeight: "bold", fontSize: 16 },
});

export default CafeList;
