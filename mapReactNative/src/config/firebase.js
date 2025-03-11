import { initializeApp } from '@firebase/app';
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC7IIlAadk58SR9-BGGcutn3IJ6kYYIQew',
  authDomain: 'bean-remote.firebaseapp.com',
  projectId: 'bean-remote',
  storageBucket: 'bean-remote.appspot.com',
  messagingSenderId: '651977461639',
  appId: '1:651977461639:web:de86459dc2a4e8412d8d22',
  measurementId: 'G-DQS5EWXS78',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
