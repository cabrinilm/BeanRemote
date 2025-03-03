import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons

export default function Footer() {
  const socialLinks = {
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    instagram: 'https://www.instagram.com',
    linkedin: 'https://www.linkedin.com',
  };

  const handleSocialPress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2025 Bean. All rights reserved.</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => handleSocialPress(socialLinks.facebook)}>
          <Icon name="facebook" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialPress(socialLinks.twitter)}>
          <Icon name="twitter" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialPress(socialLinks.instagram)}>
          <Icon name="instagram" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialPress(socialLinks.linkedin)}>
          <Icon name="linkedin" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  icon: {
    marginHorizontal: 10,
  },
});