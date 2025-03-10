import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSelectionScreen = ({ navigation }) => {
  const { t,i18n } = useTranslation(); 
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); 
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{t('Select Language')}</Text>

    <TouchableOpacity onPress={() => changeLanguage('en')}>
      <Text style={styles.button}>English</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => changeLanguage('pt')}>
      <Text style={styles.button}>Português</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => changeLanguage('it')}>
      <Text style={styles.button}>Italiano</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => changeLanguage('es')}>
      <Text style={styles.button}>Español</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => changeLanguage('de')}>
      <Text style={styles.button}>Deutsch</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => changeLanguage('fr')}>
      <Text style={styles.button}>Français</Text>
    </TouchableOpacity>

   
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    color: '#007bff',
    marginVertical: 10,
  },
});

export default LanguageSelectionScreen;
