import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserRole } from "../utils";

const config = {
    apiKey: "AIzaSyDv_S89GRCA5D3d304dZVEBTJPm8Ssj8h0",
    authDomain: "covid-portal-b0e50.firebaseapp.com",
    projectId: "covid-portal-b0e50",
    storageBucket: "covid-portal-b0e50.appspot.com",
    messagingSenderId: "877577916438",
    appId: "1:877577916438:web:f2b4320ad3e87f16ba2537",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        hd: "smail.iitm.ac.in",
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
