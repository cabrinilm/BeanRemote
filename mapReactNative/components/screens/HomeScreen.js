import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal, ImageBackground } from 'react-native';
import MapBox from '../MapBox';
import NavBar from '../NavBar';
import SideMenu from '../SideMenu';
import Footer from '../Footer';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';  
import styles from './styles/HomeScreenStyles';
import backgroundImg from '../../assets/coffee-beans-background.jpg';

export default function HomeScreen({ navigation, route }) {
  const [filterVisible, setFilterVisible] = useState(false);
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
            <TouchableOpacity onPress={() => navigation.navigate('Favorites', { username, favorites })} style={styles.menuItem}>
              <Ionicons name="heart-outline" size={24} color="black" />
              <Text>{t('favorites')}</Text>  
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings', { username })} style={styles.menuItem}>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={filterVisible}
          onRequestClose={() => setFilterVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('filterOptions')}</Text>  
              <TouchableOpacity style={styles.filterOption}>
                <Text>{t('distanceNearMe')}</Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text>{t('typeEspresso')}</Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text>{t('rating4Stars')}</Text>  
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFilterVisible(false)}
              >
                <Text style={styles.closeButtonText}>{t('close')}</Text>  
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {!isLoggedIn && <Footer />}
      </SafeAreaView>
    </ImageBackground>
  );
}
