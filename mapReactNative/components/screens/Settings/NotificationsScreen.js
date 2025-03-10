import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getNotificationSettings, saveNotificationSettings } from '../../../src/services/notificationService';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState({
    reviewResponse: true,
    usefulClick: true,
    newCafeNearby: false,
    friendReview: true,
    cafePromotions: false,
  });


  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await getNotificationSettings();
      if (savedSettings) {
        setNotifications(savedSettings);
      }
    };
    loadSettings();
  }, []);

 
  const toggleNotification = async (key) => {
    const updatedSettings = { ...notifications, [key]: !notifications[key] };
    setNotifications(updatedSettings);
    await saveNotificationSettings(updatedSettings);
  };


  const enableAll = async () => {
    const allEnabled = Object.keys(notifications).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setNotifications(allEnabled);
    await saveNotificationSettings(allEnabled);
  };

  const disableAll = async () => {
    const allDisabled = Object.keys(notifications).reduce((acc, key) => ({ ...acc, [key]: false }), {});
    setNotifications(allDisabled);
    await saveNotificationSettings(allDisabled);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>

      {Object.entries(notifications).map(([key, value]) => (
        <View key={key} style={styles.option}>
          <Text>{formatLabel(key)}</Text>
          <Switch value={value} onValueChange={() => toggleNotification(key)} />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.enableButton]} onPress={enableAll}>
          <Text style={styles.buttonText}>Enable All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.disableButton]} onPress={disableAll}>
          <Text style={styles.buttonText}>Disable All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const formatLabel = (key) => {
  const labels = {
    reviewResponse: 'Review responded',
    usefulClick: '"Useful" clicked on your review',
    newCafeNearby: 'New café added near you',
    friendReview: 'Friend posted a new review',
    cafePromotions: 'Promotions and events in cafés near you',
  };
  return labels[key] || key;
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  buttonContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  enableButton: { backgroundColor: '#4CAF50', marginRight: 10 },
  disableButton: { backgroundColor: '#F44336' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default NotificationsScreen;
