import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewNavBar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home-outline" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="search-outline" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="settings-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',  
    bottom: 10,           
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,  
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  navItem: {
    padding: 5,
  },
});
export default NewNavBar;