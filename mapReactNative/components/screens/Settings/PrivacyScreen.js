import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next'; 

const PrivacyScreen = ({ navigation }) => {
  const { t } = useTranslation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Privacy')}</Text> 

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.optionText}>{t('Change Password')}</Text> 
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('EditEmail')}>
        <Text style={styles.optionText}>{t('Change Email')}</Text> 
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('LocationAccess')}>
        <Text style={styles.optionText}>{t('Allow Location Access')}</Text> 
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('DeleteAccount')}>
        <Text style={styles.optionText}>{t('Delete Account')}</Text> 
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
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
  },
});

export default PrivacyScreen;
