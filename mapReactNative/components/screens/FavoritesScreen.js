import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/FavoritesScreenStyles';

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


export default FavoritesScreen;