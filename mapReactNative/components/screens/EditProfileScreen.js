import * as FileSystem from 'expo-file-system';
import React, { useContext, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/EditProfileScreenStyles';
import UserAccount from '../../src/context/UserAccount';
import { patchUserById, patchUserAmenities } from '../../src/services/api';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from './../../src/config/firebase';

const EditProfileScreen = ({ navigation }) => {
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

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [selectedPreferences, setSelectedPreferences] = useState(
    preferences.map((p) => ({ id: p.id, name: p.name }))
  );

  const uploadImageToFirebase = async (uri) => {
    const user = auth.currentUser; // Get the current user directly
    if (!user) {
      console.error('User not authenticated');
      return null;
    }

    try {
      console.log(uri);
      const response = await fetch(uri);
      console.log('fetch uri success');
      const blob = await response.blob();
      console.log('blob success');

      const userId = user.uid; // Use user.uid instead of firebase_uid
      console.log('userId:', userId);
      const storageRef = ref(storage, `avatars/${userId}/profile.jpg`);
      console.log('storageRef:', storageRef.fullPath);
      await uploadBytes(storageRef, blob);
      console.log('uploadBytes success');
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('downloadUrl:', downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      console.log('Error code:', error.code);
      console.log('Error message:', error.message);
      console.log('Server response:', error.serverResponse);
      throw error;
    }
  };

  // Available preferences list
  const availablePreferences = [
    { id: 1, name: 'WiFi' },
    { id: 2, name: 'Power Outlets' },
    { id: 3, name: 'Outdoor Seating' },
    { id: 4, name: 'Pet Friendly' },
    { id: 5, name: 'Wheelchair Accessible' },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      try {
        // const uploadedUrl = await uploadImageToFirebase(result.assets[0].uri);
        // if (uploadedUrl) {
        //   setAvatar(uploadedUrl); // Update UI
        //   console.log('✅ Image uploaded successfully:', uploadedUrl);
        // }
        setAvatar(result.assets[0].uri);
      } catch (error) {
        console.error('❌ Image upload failed:', error);
      }
    }
  };

  const togglePreference = (amenity) => {
    const isSelected = selectedPreferences.some((p) => p.id === amenity.id);
    if (isSelected) {
      setSelectedPreferences((prev) => prev.filter((p) => p.id !== amenity.id));
    } else {
      setSelectedPreferences((prev) => [...prev, amenity]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const userData = {
        full_name: fullName.trim(),
        avatar: avatar.trim(),
      };
      const updatedUser = await patchUserById(user.id, userData);
      // const updatedPreferences = await patchUserAmenities(user.id, {
      //   amenities: selectedPreferences.map((p) => p.id),
      // });

      setUser(updatedUser);
      // setPreferences(updatedPreferences);
      setPreferences(selectedPreferences);

      navigation.goBack();
    } catch (error) {
      console.error('❌ Error updating profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* ✅ Profile Info Section */}
        <View style={styles.userInfoContainer}>
          <View style={styles.header}>
            <View style={styles.profilePictureContainer}>
              <Image
                source={{
                  uri:
                    avatar ||
                    'https://avatars.githubusercontent.com/u/17879520?v=4',
                }}
                style={styles.profilePicture}
              />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.username}>{fullName}</Text>
            </View>
          </View>

          {/* Badge Display */}
          <View style={styles.bioContainer}>
            <MaterialCommunityIcons name='security' size={24} color='black' />
            <Text style={styles.badgeText}>
              {user?.badges?.length > 0 ? user.badges.join(', ') : 'Newbie'}
            </Text>
          </View>

          {/* Change Avatar Button */}
          <TouchableOpacity style={styles.editButton} onPress={pickImage}>
            <Text style={styles.editButtonText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Full Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder='Full name'
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize='words'
          />
        </View>

        {/* ✅ Preferences Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <FlatList
            data={availablePreferences}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isSelected = selectedPreferences.some(
                (p) => p.id === item.id
              );
              return (
                <TouchableOpacity
                  style={[
                    styles.preferenceItem,
                    isSelected ? styles.preferenceSelected : null,
                  ]}
                  onPress={() => togglePreference(item)}
                >
                  <Text style={styles.preferenceText}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* ✅ Save & Cancel Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default EditProfileScreen;
