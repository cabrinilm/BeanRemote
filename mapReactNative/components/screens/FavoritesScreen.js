import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 
import styles from './styles/FavoritesScreenStyles'; 

const FavoritesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation(); 
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
      <Text style={styles.title}>{t('Your Favorites')}</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>{t('No favorites yet.')}</Text>} 
      />
    </View>
  );
};

export default FavoritesScreen;
