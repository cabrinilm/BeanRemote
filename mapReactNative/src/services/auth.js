import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../config/firebase';

// Function to log in a user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Retrieve Firebase authentication token
    const idToken = await user.getIdToken(true); // Force refresh
    // console.log('✅ Retrieved Firebase ID Token:', idToken);

    return { user, idToken };
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    throw error;
  }
};

// Function to get the current user's ID token
export const getIdToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};
