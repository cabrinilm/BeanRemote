import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Background image style for ImageBackground
  background: {
    flex: 1, 
    width: '100%',
    height: '97%',
  },

  // Container style (SafeAreaView), transparent to show the background image
  container: {
    flex: 1, 
    backgroundColor: 'transparent', 
  },

  // Main content area for MapBox
  mainContent: {
    flex: 1, 
    backgroundColor: 'transparent',
  },

  // Menu container (bottom navigation when logged in)
  menuContainer: {
    position: 'absolute',  // Fixing it to the bottom
    bottom: 10,  // Fixing it to the bottom of the screen
    width: '100%',  // Ensuring the menu spans across the entire width of the screen
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,  // Adding shadow for better visual effect
  },

  // Menu item styling (individual items inside the menu)
  menuItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  // Modal overlay styles (when a modal is visible)
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },

  // Modal content styles
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  // Modal title style
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', 
  },

  // Filter option style for the modal
  filterOption: {
    paddingVertical: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    color: '#000', 
  },

  // Close button style for modals
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF', 
    borderRadius: 5,
    alignItems: 'center',
  },

  // Text inside the close button
  closeButtonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
});






export default styles;
