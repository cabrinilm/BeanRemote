import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Animated, FlatList } from 'react-native';
import MapBox from '../MapBox';
import FilterModal from '../FilterModal';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from './styles/UserHomeScreen';
import backgroundImg from '../../assets/coffee-beans-background.jpg';

export default function UserHomeScreen({ navigation, route }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('radius');
  const [favorites, setFavorites] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [nearbyCafes, setNearbyCafes] = useState([]);
  const username = route.params?.username || 'Guest';
  const { t } = useTranslation();
  const scaleAnim = useState(new Animated.Value(1))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = () => {
    setFavorites([]);
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  const toggleFavorite = (shop) => {
    setFavorites(favorites.some(fav => fav.id === shop.id)
      ? favorites.filter(fav => fav.id !== shop.id)
      : [...favorites, shop]);
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setFilterVisible(false);
  };

  const toggleMap = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowMap(!showMap);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const animatePress = (toValue, callback) => {
    Animated.spring(scaleAnim, { toValue, useNativeDriver: true }).start(callback);
  };

  const handleCoffeeShopsUpdate = (cafes) => {
    setNearbyCafes(cafes);
  };

  const handleCafePress = (shop) => {
    navigation.navigate('CoffeeProfile', {
      shop,
      loggedIn: true,
      username,
      favorites,
      toggleFavorite,
    });
  };

  const renderCafeItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cafeItem} 
      onPress={() => handleCafePress(item)} 
    >
      <View style={styles.cafeInfo}>
        <Text style={styles.cafeName}>{item.name}</Text>
        <Text style={styles.cafeDetails}>{item.distance} • {item.rating} ★</Text>
      </View>
      <TouchableOpacity 
        onPress={(e) => {
          e.stopPropagation(); 
          toggleFavorite(item);
        }} 
        style={styles.favoriteButton}
      >
        <Ionicons
          name={favorites.some(fav => fav.id === item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={favorites.some(fav => fav.id === item.id) ? '#FF4444' : '#fff'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={backgroundImg} style={styles.background} imageStyle={{ opacity: 0.7 }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Olá, {username}!</Text>
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <Ionicons name="filter" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

    
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          {showMap ? (
            <View style={styles.mapContainer}>
              <MapBox
                onFilterPress={() => setFilterVisible(true)}
                loggedIn={true}
                username={username}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                filterType={filterType}
                onCoffeeShopsUpdate={handleCoffeeShopsUpdate}
              />
              <TouchableOpacity style={styles.backButton} onPress={toggleMap}>
                <Ionicons name="list-outline" size={28} color="#fff" />
                <Text style={styles.backButtonText}>{t('backToList')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.listContainer}>
              <Text style={styles.sectionTitle}>{t('nearbyCafes')}</Text>
              {nearbyCafes.length > 0 ? (
                <FlatList
                  data={nearbyCafes}
                  renderItem={renderCafeItem}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.cafeList}
                />
              ) : (
                <Text style={styles.noCafesText}>No nearby cafés found</Text>
              )}
              <TouchableOpacity onPress={toggleMap} style={styles.mapButton}>
                <Ionicons name="map-outline" size={24} color="#fff" />
                <Text style={styles.mapButtonText}>{t('viewOnMap')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>


        <Animated.View style={[styles.navBar, { transform: [{ scale: scaleAnim }] }]}>
          {[
            { icon: 'person-outline', label: t('profile'), route: 'Profile' },
            { icon: 'heart-outline', label: t('favorites'), route: 'Favorites' },
            { icon: 'settings-outline', label: t('settings'), route: 'Settings' },
            { icon: 'log-out-outline', label: t('logout'), action: handleLogout },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPressIn={() => animatePress(0.9)}
              onPressOut={() => animatePress(1, () => item.action ? item.action() : navigation.navigate(item.route, { username, favorites }))}
              style={styles.navItem}
            >
              <Ionicons name={item.icon} size={28} color="#fff" />
              <Text style={styles.navText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <FilterModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onFilterSelect={handleFilterSelect}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}