import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = ({ route }) => {

  const [favorites, setFavorites] = React.useState([
    { id: '1', name: 'Café Espresso', location: 'Liverpool, UK' },
    { id: '2', name: 'CoffeShop', location: 'Amesterdam, Holland' },
    { id: '3', name: 'Belgian Latte', location: 'Manchester, UK' },
  ]);

  const username = route?.params?.username || 'Guest'; 
  
  
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <View style={styles.favoriteDetails}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoriteLocation}>{item.location}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Ionicons name="heart" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites of {username}</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites yet!</Text>
      )}
    </View>
  );
};

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

export default FavoritesScreen;