import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import styles from './styles/CoffeeProfileScreenStyles';

const CoffeeProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const { shop, loggedIn = false, username } = route.params || {};
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  if (!shop) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No coffee shop data available.</Text>
      </View>
    );
  }

  const { name, description } = shop;

  
  const city = "London"; 
  const openingHours = "Mon-Fri: 7:00 AM - 6:00 PM\nSat-Sun: 8:00 AM - 4:00 PM"; 
  const amenities = ["Free Wi-Fi", "Outdoor Seating", "Pet Friendly"]; 
  const images = [
    'https://via.placeholder.com/150.png?text=Coffee+Shop+1',
    'https://via.placeholder.com/150.png?text=Coffee+Shop+2',
    'https://via.placeholder.com/150.png?text=Coffee+Shop+3',
  ]; 

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, {
        id: Date.now().toString(),
        text: newComment,
        timestamp: new Date().toISOString(),
        username: username || 'Anonymous',
      }]);
      setNewComment('');
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUsername}>{item.username}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentTimestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.galleryImage} />
  );

  return (
    <ScrollView style={styles.container}>
   
      <View style={styles.header}>
        <View style={styles.profileCircle} />
        <Text style={styles.coffeeName}>{name}</Text>
      </View>

     
      <View style={styles.infoSection}>
        <Text style={styles.coffeeDescription}>{description}</Text>
        <Text style={styles.cityText}>{city}</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Opening Hours</Text>
          <Text style={styles.detailText}>{openingHours}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Amenities</Text>
          {amenities.map((amenity, index) => (
            <Text key={index} style={styles.amenityText}>• {amenity}</Text>
          ))}
        </View>
      </View>

    
      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Photos</Text>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.galleryList}
        />
      </View>

     
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments</Text>
        
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={item => item.id}
          style={styles.commentList}
          ListEmptyComponent={<Text style={styles.emptyText}>No comments yet.</Text>}
        />

        {loggedIn ? (
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
              multiline
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={[styles.postButton, !newComment.trim() && styles.postButtonDisabled]}
              onPress={handleCommentSubmit}
              disabled={!newComment.trim()}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginPromptContainer}
          >
            <Text style={styles.loginPrompt}>Please log in to add comments</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default CoffeeProfileScreen;