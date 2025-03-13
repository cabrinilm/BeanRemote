import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/typing-coffe.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>Finding the best coffee spots...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  animation: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent', 
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default LoadingScreen;
