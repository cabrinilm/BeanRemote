import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import styles from './styles/SettingsScreenStyles';

const SettingsGuestScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setIsLocationEnabled(status === 'granted');
    };
    checkPermission();
  }, []);

  const toggleLocationAccess = async () => {
    if (!isLocationEnabled) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setIsLocationEnabled(true);
      } else {
        Alert.alert(t('Permission Denied'), t('Location access is required for better experience.'));
      }
    } else {
      setIsLocationEnabled(false); 
    }
  };

  const guestOptions = [
    { label: t('Language'), icon: 'language-outline', onPress: () => navigation.navigate('LanguageSelection') },
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
        <Text style={styles.title}>{t('Settings')}</Text>
      </View>

      <View style={styles.settingsList}>
        {guestOptions.map((option, index) => (
          <View key={index}>
            {renderSettingItem(option)}
            <View style={styles.separator} />
          </View>
        ))}

       
        <View style={styles.settingItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.settingLabel}>{t('Allow Location Access')}</Text>
          <Switch
            value={isLocationEnabled}
            onValueChange={toggleLocationAccess}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsGuestScreen;