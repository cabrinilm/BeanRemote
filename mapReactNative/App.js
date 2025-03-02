import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View, Text, Platform } from 'react-native';
import LoginScreen from './components/screens/LoginScreen'; 
import NavBar from './components/NavBar';
import MapBox from './components/MapBox';


const Stack = createStackNavigator();


function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar onMenuPress={() => console.log('Menu open!')} />

      <View style={styles.queryContainer}>
        <View style={styles.queryItem}>
          <Text style={styles.queryLabel}>Sort by</Text>
          <Text style={styles.queryValue}>[Sort]</Text>
        </View>

        <View style={styles.queryItem}>
          <Text style={styles.queryLabel}>List.map</Text>
          <Text style={styles.queryValue}>[List]</Text>
        </View>
      </View>

      <MapBox />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  queryContainer: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
    paddingHorizontal: 20,
  },
  queryItem: {
    flex: 1,
    alignItems: 'center',
  },
  queryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  queryValue: {
    fontSize: 14,
    color: '#888',
  },
});