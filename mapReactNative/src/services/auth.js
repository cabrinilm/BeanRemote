import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';



const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Additional user setup can be done here
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
};


import { signInWithEmailAndPassword } from 'firebase/auth';
  

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // User is signed in
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };
   
  export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Retrieve Firebase ID Token
      const idToken = await user.getIdToken();
      
      return { user, idToken }; // Return the authenticated user and token
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  };





 

const getIdToken = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      return idToken;
    }
  } catch (error) {
    console.error('Error getting ID token:', error.message);
  }
  return null;
};





const fetchData = async () => {
  const idToken = await getIdToken();
  if (!idToken) {
    console.error('User is not authenticated');
    return;
  }

  try {
    const response = await axios.get('https://be-bean-remote.onrender.com/api/your-endpoint', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    // Handle the response data
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};