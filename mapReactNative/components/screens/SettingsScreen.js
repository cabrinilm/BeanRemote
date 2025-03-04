import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/SettingsScreenStyles';



const SettingsScreen = ({ navigation, route }) => {
  const username = route?.params?.username || 'Guest'; 

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    }); 
  };

  const settingsOptions = [
    { label: 'Edit Profile', icon: 'person-outline', onPress: () => navigation.navigate('Profile') }, 
    { label: 'Notifications', icon: 'notifications-outline', onPress: () => alert('Notifications settings not implemented yet') },
    { label: 'Language', icon: 'language-outline', onPress: () => alert('Language settings not implemented yet') },
    { label: 'Privacy', icon: 'lock-closed-outline', onPress: () => alert('Privacy settings not implemented yet') },
    { label: 'Logout', icon: 'log-out-outline', onPress: handleLogout },
  ];

  const renderSettingItem = ({ label, icon, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#333" style={styles.icon} />
      <Text style={styles.settingLabel}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings for {username}</Text>
      </View>

      <View style={styles.settingsList}>
        {settingsOptions.map((option, index) => (
          <View key={index}>
            {renderSettingItem(option)}
            {index < settingsOptions.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


export default SettingsScreen;