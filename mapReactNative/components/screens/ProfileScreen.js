import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';


const ProfileScreen = ({ route }) => {
  const username = route?.params?.username || 'Guest';

  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.header}>
       
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.profilePicture}
          />
        </View>

        
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>245</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>180</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
      </View>

    
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>Coffe and Code. ☕</Text>
      </View>

     
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

   
      <View style={styles.postsContainer}>
        <View style={styles.postRow}>
          <View style={styles.postPlaceholder} />
          <View style={styles.postPlaceholder} />
          <View style={styles.postPlaceholder} />
        </View>
        <View style={styles.postRow}>
          <View style={styles.postPlaceholder} />
          <View style={styles.postPlaceholder} />
          <View style={styles.postPlaceholder} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  profilePictureContainer: {
    marginRight: 20,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  bioContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  bioText: {
    fontSize: 14,
    color: '#333',
  },
  editButton: {
    marginHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  postsContainer: {
    paddingHorizontal: 5,
  },
  postRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  postPlaceholder: {
    width: '32%', 
    height: 120,
    backgroundColor: '#f0f0f0', 
    borderRadius: 5,
  },
});

export default ProfileScreen;