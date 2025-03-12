import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 
  background: {
    flex: 1, 
    width: '100%',
    height: '100%',
  },

 
  container: {
    flex: 1, 
    backgroundColor: 'transparent', 
  },


  mainContent: {
    flex: 1, 
    backgroundColor: 'transparent',
  },

 
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5, 
  },

 
  menuItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
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
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

 
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', 
  },


  filterOption: {
    paddingVertical: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    color: '#000', 
  },

  
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF', 
    borderRadius: 5,
    alignItems: 'center',
  },

  
  closeButtonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
});

export default styles;