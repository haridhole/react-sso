import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyA70sBt-31mnlSAm4A8isci1svnzEu5Hlo",
    authDomain: "react-sso-74276.firebaseapp.com",
    projectId: "react-sso-74276",
    storageBucket: "react-sso-74276.appspot.com",
    messagingSenderId: "1017941676037",
    appId: "1:1017941676037:web:e387bbec7f512f2a0a0c6c"
})

export const auth = app.auth();
export const firestore = firebase.firestore();

export const createUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = firestore.doc(`users/${user.uid}`);
  
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email } = user;
      const { firstName, lastName } = additionalData;
  
      try {
        await userRef.set({
          firstName,
          lastName,
          email,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log('Error in creating user', error);
      }
    }
  };

  export default app;
