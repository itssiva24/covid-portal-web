import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserRole } from "../utils";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = (domain) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        hd: domain,
    });
    return auth.signInWithPopup(provider);
};

export const createUser = async (cred) => {
    const { user } = cred;

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (snapshot.exists) return;

    const { email, displayName, photoURL } = user;
    try {
        await userRef.set({
            displayName,
            email,
            photoURL,
            role: UserRole.Student,
        });
    } catch (error) {
        console.error("Error creating user document", error);
    }
};

export const getUser = async (uid) => {
    if (!uid) return null;
    try {
        const userSnapshot = await firestore.doc(`users/${uid}`).get();
        return userSnapshot.data();
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const signOut = async () => {
    return await auth.signOut();
};

export default firebase;
