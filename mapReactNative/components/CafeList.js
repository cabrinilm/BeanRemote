import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserAccount from '../src/context/UserAccount'
import styles from './screens/styles/CafeListStyles';
import { postUserFavourite, deleteUserFavourite } from '../src/services/api'; 




const CafeList = ({ cafes, favorites, setFavorites, onCafePress, username }) => {
  const { user } = useContext(UserAccount);

  const toggleFavorite = async (shop) => {
    const isFavorite = favorites.some((fav) => fav.id === shop.id);
    try {
      if (isFavorite) {
        await deleteUserFavourite(user.id, shop.id);
        setFavorites(favorites.filter((fav) => fav.id !== shop.id));
      } else {
        const newFavorite = await postUserFavourite(user.id, { cafe_id: shop.id });
        setFavorites([...favorites, newFavorite]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const renderCafeItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <TouchableOpacity style={styles.cafeItem} onPress={() => onCafePress(item)}>
        <View style={styles.cafeInfo}>
          <Text style={styles.cafeName}>{item.name}</Text>
          <Text style={styles.cafeDetails}>
            {item.distance} • {item.rating} ★
          </Text>
        </View>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(item);
          }}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#FF4444' : '#fff'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={cafes}
      renderItem={renderCafeItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.cafeList}
    />
  );
};

export default CafeList;