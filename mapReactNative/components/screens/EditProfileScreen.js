import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/ProfileScreenStyles';
import UserAccount from '../../src/context/UserAccount';
import { patchUserById, patchUserAmenities } from '../../src/services/api';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

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
  const [selectedPreferences, setSelectedPreferences] = useState([
    ...preferences,
  ]);

  // ✅ Pick New Avatar
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  // ✅ Toggle Preference Selection
  const togglePreference = (amenity) => {
    const isSelected = selectedPreferences.some((p) => p.id === amenity.id);
    if (isSelected) {
      setSelectedPreferences((prev) => prev.filter((p) => p.id !== amenity.id));
    } else {
      setSelectedPreferences((prev) => [...prev, amenity]);
    }
  };

  // ✅ Save Changes
  const handleSave = async () => {
    try {
      const updatedUser = await patchUserById(user.id, {
        full_name: fullName,
        avatar,
      });
      const updatedPreferences = await patchUserAmenities(user.id, {
        amenities: selectedPreferences.map((p) => p.id),
      });

      setUser(updatedUser);
      setPreferences(updatedPreferences);

      navigation.goBack();
    } catch (error) {
      console.error('❌ Error updating profile:', error.message);
    }
  };

  const availablePreferences = [
    { name: 'WiFi' },
    { name: 'Power Outlets' },
    { name: 'Outdoor Seating' },
    { name: 'Pet Friendly' },
    { name: 'Wheelchair Accessible' },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          {/* SECTION: Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <Image source={{ uri: avatar }} style={styles.profilePicture} />
            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
              <Text style={styles.editButtonText}>Change Avatar</Text>
            </TouchableOpacity>
          </View>

          {/* SECTION: Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* SECTION: Preferences */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {preferences.length > 0 ? (
              <FlatList
                data={preferences}
                keyExtractor={(item) => item.id.toString()}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.preferenceItem,
                      selectedPreferences.some((p) => p.id === item.id)
                        ? styles.preferenceSelected
                        : null,
                    ]}
                    onPress={() => togglePreference(item)}
                  >
                    <Text style={styles.preferenceText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.noDataText}>No preferences available.</Text>
            )}
          </View>

          {/* SECTION: Save & Cancel */}
          <View style={styles.buttonContainer}>
            <Button title='Save Changes' onPress={handleSave} />
            <Button
              title='Cancel'
              color='red'
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
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

export default EditProfileScreen;
