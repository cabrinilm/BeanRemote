import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    listContainer: {
      paddingHorizontal: 15,
    },
    favoriteItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    favoriteDetails: {
      flex: 1,
    },
    favoriteName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    favoriteLocation: {
      fontSize: 14,
      color: '#666',
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginTop: 50,
    },
  });


  export default styles