import React, { useContext, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles/ProfileScreenStyles';
import UserAccount from '../../src/context/UserAccount';

const ProfileScreen = ({ navigation }) => {
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

  console.log('Favorites : ', favorites);
  console.log('Reviews : ', reviews);
  console.log('Visits : ', visits);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          {/* SECTION: User Info */}
          <View style={styles.userInfoContainer}>
            <View style={styles.header}>
              <View style={styles.profilePictureContainer}>
                <Image
                  source={{
                    uri:
                      user?.avatar ||
                      'https://avatars.githubusercontent.com/u/17879520?v=4',
                  }}
                  style={styles.profilePicture}
                />
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.username}>
                  {user?.full_name || 'Guest'}
                </Text>
                <View style={styles.statsContainer}>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>{reviews.length}</Text>
                    <MaterialCommunityIcons
                      name='message-reply-outline'
                      size={24}
                      color='black'
                    />
                    {/* <Text style={styles.statLabel}>Reviews</Text> */}
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>{favorites.length}</Text>
                    <MaterialCommunityIcons
                      name='cards-heart-outline'
                      size={24}
                      color='black'
                    />
                    {/* <Text style={styles.statLabel}>Favorites</Text> */}
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>{preferences.length}</Text>
                    <Ionicons name='options-outline' size={24} color='black' />
                    {/* <Text style={styles.statLabel}>Preferences</Text> */}
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>{visits.length}</Text>
                    <MaterialCommunityIcons
                      name='coffee-outline'
                      size={24}
                      color='black'
                    />
                    {/* <Text style={styles.statLabel}>Visits</Text> */}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bioContainer}>
              <MaterialCommunityIcons name='security' size={24} color='black' />
              <Text style={styles.badgeText}>
                {user?.badges?.length > 0 ? user.badges.join(', ') : 'Newbie'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* SECTION: Favorite Cafés */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Favorite Cafés</Text>
            {favorites.length > 0 ? (
              favorites.map((item) => (
                <View key={item.cafe_id} style={styles.listItem}>
                  <Text style={styles.listItemTitle}>{item.name}</Text>
                  <Text style={styles.listItemSubtitle}>{item.address}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No favorite cafés yet.</Text>
            )}
          </View>

          {/* SECTION: Recent Reviews */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            {reviews.length > 0 ? (
              reviews.slice(0, 3).map((item) => (
                <View key={item.review_id} style={styles.listItem}>
                  <Text style={styles.listItemTitle}>{item.cafe_name}</Text>
                  <Text style={styles.listItemSubtitle}>
                    {item.review_text}
                  </Text>
                  <Text style={styles.listItemRating}>⭐ {item.rating}/5</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No reviews yet.</Text>
            )}
          </View>

          {/* SECTION: User Preferences */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {preferences.length > 0 ? (
              preferences.map((preference, index) => (
                <View key={index} style={styles.preferenceItem}>
                  <Text style={styles.preferenceText}>{preference.name}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No preferences selected.</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;
