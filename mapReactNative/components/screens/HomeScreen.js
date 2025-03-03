import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import MapBox from '../MapBox'; 
import NavBar from '../NavBar'; 
import Footer from '../Footer';



export default function HomeScreen({ navigation, route }) {
    const [filterVisible, setFilterVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(route.params?.loggedIn || false);
  
  
    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          onMenuPress={() => console.log('Menu opened!')}
          onLoginPress={() => navigation.navigate('Login')}
          isLoggedIn={isLoggedIn} // Pass login state to NavBar
        />
  
        <View style={styles.mainContent}>
          <MapBox onFilterPress={() => setFilterVisible(true)} />
        </View>
  
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
  
        <Footer />
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