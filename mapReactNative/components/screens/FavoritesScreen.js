import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from './styles/FavoritesScreenStyles'; 

const FavoritesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { favorites = [], username } = route.params || {};

  const renderFavorite = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() => navigation.navigate('CoffeeProfile', { shop: item, loggedIn: true, username, favorites })}
    >
      <Text style={styles.favoriteName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorites yet.</Text>}
      />
    </View>
  );
};

export default FavoritesScreen;