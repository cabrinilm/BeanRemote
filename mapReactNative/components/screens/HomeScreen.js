import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import MapBox from '../MapBox'; 
import NavBar from '../NavBar'; 
import SideMenu from '../SideMenu';
import { Ionicons } from '@expo/vector-icons'; 

export default function HomeScreen({ navigation, route }) {
    const [filterVisible, setFilterVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(route.params?.loggedIn || false);
    const [menuVisible, setMenuVisible] = useState(false);
  
    const handleLogout = () => {
       
        setIsLoggedIn(false);
        navigation.navigate('Login'); 
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
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.menuItem}>
              <Ionicons name="person-circle-outline" size={24} color="black" />
              <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.menuItem}>
              <Ionicons name="heart-outline" size={24} color="black" />
              <Text>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.menuItem}>
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
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    mainContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    menuItem: {
      alignItems: 'center',
      padding: 10,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    filterOption: {
      padding: 10,
      width: '100%',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
