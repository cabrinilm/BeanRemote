import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Animated, FlatList } from 'react-native';
import MapBox from '../MapBox';
import FilterModal from '../FilterModal';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from './styles/UserHomeScreen';
import backgroundImg from '../../assets/coffee-beans-background.jpg';
import UserAccount from '../../src/context/UserAccount';
import CafeList from '../CafeList';

export default function UserHomeScreen({ navigation, route }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
    isErrorPopupOpen,
    setIsErrorPopupOpen,
    favorites,
    setFavorites,
    preferences,
    setPreferences,
    reviews,
    setReviews,
    visits,
    setVisits,
  } = useContext(UserAccount);
  const [filterType, setFilterType] = useState('radius');
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
    });
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background} imageStyle={{ opacity: 0.7 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hey, {user?.full_name}!</Text>
        </View>

        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          {showMap ? (
            <View style={styles.mapContainer}>
              <MapBox
                onFilterPress={() => setFilterVisible(true)}
                username={username}
                favorites={favorites}
                filterType={filterType}
                onCoffeeShopsUpdate={handleCoffeeShopsUpdate}
              />
            </View>
          ) : (
            <View style={styles.listContainer}>
              <Text style={styles.sectionTitle}>{t('nearbyCafes')}</Text>
              {nearbyCafes.length > 0 ? (
                <CafeList
                  cafes={nearbyCafes}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  onCafePress={handleCafePress}
                  username={username}
                />
              ) : (
                <Text style={styles.noCafesText}>No nearby cafés found</Text>
              )}
            </View>
          )}
        </Animated.View>

        <Animated.View style={[styles.navBar, { transform: [{ scale: scaleAnim }] }]}>
          {[
            { icon: 'person-outline', label: t('profile'), route: 'Profile' },
            { icon: showMap ? 'list-outline' : 'map-outline', label: showMap ? t('list') : t('map'), action: toggleMap }, // Substituído Favorites por Map
            { icon: 'settings-outline', label: t('settings'), route: 'Settings' },
            { icon: 'log-out-outline', label: t('logout'), action: handleLogout },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPressIn={() => animatePress(0.9)}
              onPressOut={() =>
                animatePress(1, () =>
                  item.action ? item.action() : navigation.navigate(item.route, { username, favorites })
                )
              }
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