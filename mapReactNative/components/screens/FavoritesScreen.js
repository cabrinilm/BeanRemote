import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './styles/FavoritesScreenStyles';
import UserAccount from '../../src/context/UserAccount';
import { getUserFavourites } from '../../src/services/api';


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

  useEffect(() => {
    fetchFavorites();
  }, [user?.id]);

  const renderFavorite = ({ item }) => (
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
            item?.id ? item.id.toString() : index.toString()
          }
          ListEmptyComponent={<Text style={styles.emptyText}>{t('No favorites yet.')}</Text>}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;