import React from 'react';
import { View, Text,Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles/ProfileScreenStyles';

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


export default ProfileScreen;