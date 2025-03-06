import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';  
import i18n from './src/services/i18n';  
import AsyncStorage from '@react-native-async-storage/async-storage';

// SCREEN IMPORTS
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import FavoritesScreen from './components/screens/FavoritesScreen';
import SettingsScreen from './components/screens/Settings/SettingsScreen';
import CoffeeProfileScreen from './components/screens/CoffeeProfileScreen';
import NotificationsScreen from './components/screens/Settings/NotificationsScreen';
import LanguageSelectionScreen from './components/screens/Settings/LanguageSelectionScreen';
import PrivacyScreen from './components/screens/Settings/PrivacyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
   
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          <Stack.Screen name="CoffeeProfile" component={CoffeeProfileScreen} options={{ title: 'Coffee Profile' }}/>
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={{title: 'Notifications'}} />
          <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} options={{ title: 'Select Language' }} />
          <Stack.Screen name="PrivacyScreen" component={PrivacyScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}
