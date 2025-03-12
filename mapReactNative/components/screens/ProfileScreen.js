import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/ProfileScreenStyles';
import UserAccount from '../../src/context/UserAccount';

const ProfileScreen = ({ route }) => {
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

  const [bioText, setBioText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    addPost();
    setModalVisible(false);
  };

  const addPost = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPosts((prevPosts) => [...prevPosts, result.assets[0].uri]);
    }
  };

  console.log('Favorites : ', favorites);
  console.log('Reviews : ', reviews);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
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
              <Text style={styles.username}>{user?.full_name || 'Guest'}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{reviews.length}</Text>
                  <Text style={styles.statLabel}>Reviews</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{favorites.length}</Text>
                  <Text style={styles.statLabel}>Favorites</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{preferences.length}</Text>
                  <Text style={styles.statLabel}>Preferences</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{visits.length}</Text>
                  <Text style={styles.statLabel}>Visits</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.badgeText}>
            {user?.badges?.length > 0 ? user.badges.join(', ') : 'Newbie'}
          </Text>
        </View>

        {/* SECTION: Favorite Cafés */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Favorite Cafés</Text>
          {favorites.length > 0 ? (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.cafe_id.toString()}
              nestedScrollEnabled={true}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.listItemTitle}>{item.name}</Text>
                  <Text style={styles.listItemSubtitle}>{item.address}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noDataText}>No favorite cafés yet.</Text>
          )}
        </View>

        {/* SECTION: Last Reviews */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {reviews.length > 0 ? (
            <FlatList
              data={reviews.slice(0, 3)}
              keyExtractor={(item) => item.review_id.toString()}
              nestedScrollEnabled={true}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.listItemTitle}>{item.cafe_name}</Text>
                  <Text style={styles.listItemSubtitle}>
                    {item.review_text}
                  </Text>
                  <Text style={styles.listItemRating}>⭐ {item.rating}/5</Text>
                </View>
              )}
            />
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

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.postsContainer}>
          <View style={styles.postsGrid}>
            {posts.map((post, index) => (
              <Image
                key={index}
                source={{ uri: post }}
                style={styles.postImage}
              />
            ))}
          </View>
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyles.modalContainer}>
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalTitle}>Edit Profile</Text>

              <Text style={modalStyles.label}>Change Profile Picture:</Text>
              <Button
                title='Pick an Image'
                onPress={() => pickImage(setProfilePicture)}
              />

              <Text style={modalStyles.label}>Edit Bio:</Text>
              <TextInput
                style={modalStyles.input}
                value={bioText}
                onChangeText={(text) => setBioText(text)}
              />

              <Text style={modalStyles.label}>Add Post:</Text>
              <Button title='Pick an Image for Post' onPress={addPost} />

              <View style={modalStyles.buttonContainer}>
                <Button title='Save' onPress={handleSave} />
                <Button
                  title='Cancel'
                  color='red'
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  postImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
