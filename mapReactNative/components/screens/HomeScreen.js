import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import MapBox from '../MapBox';
import NavBar from '../NavBar';
import SideMenu from '../SideMenu';
import Footer from '../Footer';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/HomeScreenStyles';

export default function HomeScreen({ navigation, route }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(route.params?.loggedIn || false);
  const [menuVisible, setMenuVisible] = useState(false);
  const username = route.params?.username || 'Guest'; 

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        onMenuPress={() => setMenuVisible(true)}
        onLoginPress={() => navigation.navigate('Login')}
        isLoggedIn={isLoggedIn}
      />

      <View style={styles.mainContent}>
        <MapBox onFilterPress={() => setFilterVisible(true)} />
      </View>

      {isLoggedIn && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { username })} 
            style={styles.menuItem}
          >
            <Ionicons name="person-circle-outline" size={24} color="black" />
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites', {username})} style={styles.menuItem}>
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings', {username})} style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <SideMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TouchableOpacity style={styles.filterOption}>
              <Text>Distance: Near Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterOption}>
              <Text>Type: Espresso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterOption}>
              <Text>Rating: 4+ Stars</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {!isLoggedIn && <Footer />}
    </SafeAreaView>
  );
}

