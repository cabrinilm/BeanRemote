import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const EditEmailScreen = () => {
  const { t } = useTranslation();
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleSubmit = () => {
    if (newEmail !== confirmEmail) {
      Alert.alert(t('Email do not match'));
      return;
    }

   

    Alert.alert(t('Email changed successfully'));
    
    setCurrentEmail('');
    setNewEmail('');
    setConfirmEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Change Email')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('Current Email')}
        value={currentEmail}
        onChangeText={setCurrentEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={t('New Email')}
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={t('Confirm New Email')}
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t('Submit')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditEmailScreen;
