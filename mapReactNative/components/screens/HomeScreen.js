import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import MapBox from '../MapBox';
import NavBar from '../NavBar';
import SideMenu from '../SideMenu';
import Footer from '../Footer';
import FilterModal from '../FilterModal'; 
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from './styles/HomeScreenStyles';
import backgroundImg from '../../assets/coffee-beans-background.jpg';





export default function HomeScreen({ navigation, route }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('visible'); 
  const [isLoggedIn, setIsLoggedIn] = useState(route.params?.loggedIn || false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const username = route.params?.username || 'Guest';

  const { t } = useTranslation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFavorites([]);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const toggleFavorite = (shop) => {
    if (favorites.some(fav => fav.id === shop.id)) {
      setFavorites(favorites.filter(fav => fav.id !== shop.id));
    } else {
      setFavorites([...favorites, shop]);
    }
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setFilterVisible(false);
  };

  
 

  



  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <NavBar
          onMenuPress={() => setMenuVisible(true)}
          onLoginPress={() => navigation.navigate('Login')}
          isLoggedIn={isLoggedIn}
        />

        <View style={styles.mainContent}>
          <MapBox
            onFilterPress={() => setFilterVisible(true)}
            loggedIn={isLoggedIn}
            username={username}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            filterType={filterType}
          />
        </View>

        {isLoggedIn && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile', { username })}
              style={styles.menuItem}
            >
              <Ionicons name="person-circle-outline" size={24} color="black" />
              <Text>{t('profile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Favorites', { username, favorites })}
              style={styles.menuItem}
            >
              <Ionicons name="heart-outline" size={24} color="black" />
              <Text>{t('favorites')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings', { username })}
              style={styles.menuItem}
            >
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text>{t('settings')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Ionicons name="log-out-outline" size={24} color="black" />
              <Text>{t('logout')}</Text>
            </TouchableOpacity>
          </View>
        )}

        <SideMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />

        <FilterModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onFilterSelect={handleFilterSelect}
        />

        {!isLoggedIn && <Footer />}
      </SafeAreaView>
    </ImageBackground>
  );
}