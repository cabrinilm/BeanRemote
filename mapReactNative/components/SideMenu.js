import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export default function SideMenu({ isVisible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose} 
    >
      
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Text>Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text>logout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start', 
  },
  menuContainer: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
