import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './styles/FavoritesScreenStyles';
import UserAccount from '../../src/context/UserAccount';
import { getUserFavourites, deleteUserFavourite } from '../../src/services/api';
import { Ionicons } from '@expo/vector-icons';


const FavoritesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { username } = route.params || {};

  const {
    user,
    favorites,
    setFavorites,
    loading,
    setLoading,
    error,
    setError,
  } = useContext(UserAccount);

  const fetchFavorites = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const userFavorites = await getUserFavourites(user.id);
      setFavorites(Array.isArray(userFavorites) ? userFavorites : []);
      setError(null);
    } catch (err) {
      setError('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (cafeId) => {
    console.log('Removing favorite - User ID:', user.id, 'Cafe ID:', cafeId);
    try {
      await deleteUserFavourite(user.id, cafeId);
      setFavorites(favorites.filter((fav) => fav.cafe_id !== cafeId));
    } catch (err) {
      console.error('Error removing favorite:', err.response || err.message || err);
      setError('Failed to remove favorite');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user?.id]);

  const renderFavorite = ({ item }) => (
    <View style={styles.favoriteItemContainer}>
    
      <TouchableOpacity
        style={styles.favoriteItem}
        onPress={() =>
          navigation.navigate('CoffeeProfile', {
            shop: item,
            loggedIn: true,
            username,
            favorites,
          })
        }
      >
        <Text style={styles.favoriteName}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => {
          if (!item.cafe_id) {
            console.error('Cafe ID is undefined for item:', item);
            return;
          }
          removeFavorite(item.cafe_id);
        }}
      >
        <Ionicons name="heart" size={24} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Your Favorites')}</Text>
      {loading ? (
        <Text style={styles.loadingText}>{t('Loading...')}</Text>
      ) : error ? (
        <Text style={styles.errorText}>{t('Error: ')}{error}</Text>
      ) : (
        <FlatList
          data={safeFavorites}
          renderItem={renderFavorite}
          keyExtractor={(item, index) =>
            item?.cafe_id ? item.cafe_id.toString() : index.toString()
          }
          ListEmptyComponent={<Text style={styles.emptyText}>{t('No favorites yet.')}</Text>}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

