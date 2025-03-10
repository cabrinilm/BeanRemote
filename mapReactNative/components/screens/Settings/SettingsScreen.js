import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; 
import styles from '../styles/SettingsScreenStyles';

const SettingsScreen = ({ navigation, route }) => {
  const { t } = useTranslation(); 
  const username = route?.params?.username || 'Guest';

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const settingsOptions = [
    { label: t('Edit Profile'), icon: 'person-outline', onPress: () => navigation.navigate('Profile') },
    { label: t('Notifications'), icon: 'notifications-outline', onPress: () => navigation.navigate('Notifications') },
    { label: t('Language'), icon: 'language-outline', onPress: () => navigation.navigate('LanguageSelection') },
    { label: t('Privacy'), icon: 'lock-closed-outline', onPress: () => navigation.navigate('PrivacyScreen') },
    { label: t('Logout'), icon: 'log-out-outline', onPress: handleLogout },
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
