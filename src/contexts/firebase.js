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
    //     await firestore.collection("users").doc(cred.user.uid).set({
    //         name: cred.user.displayName,
    //         email: cred.user.email,
    //
    //         profilePic: cred.user.photoURL
    //     })
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

export const getRequests = async (pagesize) => {
    const requestsRef = await firestore
        .collection("requests")
        .where("resolved", "==", false)
        .orderBy("createdAt", "desc")
        .limit(pagesize)
        .get();

    return requestsRef.docs;
};

export const getMoreRequests = async (pagesize, lastDoc) => {
    const requestsRef = await firestore
        .collection("requests")
        .where("resolved", "==", false)
        .orderBy("createdAt", "desc")
        .startAfter(lastDoc)
        .limit(pagesize)
        .get();
    return requestsRef.docs;
};

export const getRequest = async (id) => {
    return await firestore
        .collection("requests")
        .doc(id)
        .get()
        .then((snapshot) => snapshot.data());
};

export const getRequestsAssigned = async (id) => {
    const requestsRef = firestore
        .collection("requests")
        .where("assignedTo", "==", id);

    return await requestsRef.get().then((querySnapshot) => {
        const temp = [];
        querySnapshot.docs.forEach((doc) => temp.push(doc.data()));
        return temp;
    });
};

export const getMyRequests = async (id) => {
    const requestsRef = firestore
        .collection("requests")
        .where("createdById", "==", id);

    return await requestsRef.get().then((querySnapshot) => {
        const temp = [];
        querySnapshot.docs.forEach((doc) => temp.push(doc.data()));
        return temp;
    });
};

export const resolveRequest = async (id) => {
    const requestRef = firestore.doc(`requests/${id}`);

    try {
        await requestRef.update({
            resolved: true,
        });
    } catch (error) {
        console.error(error);
    }
};

export const addVolunteer = async (email) => {
    if (!email) return null;

    try {
        await firestore
            .collection("users")
            .where("email", "==", email)
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    const userRef = firestore.doc(`users/${doc.id}`);
                    await userRef.update({
                        role: UserRole.Volunteer,
                    });
                });
            });
    } catch (error) {
        console.error(error);
    }
};

export const assignVolunteer = async (id, requestId) => {
    if (!id) return null;

    try {
        const userSnapshot = await firestore.doc(`users/${id}`).get();

        if (!userSnapshot.exists) return;

        const requestRef = firestore.doc(`requests/${requestId}`);
        return await requestRef.set(
            {
                assignedTo: id,
            },
            { merge: true }
        );
    } catch (error) {
        console.log(error);
    }
};

export const getVolunteers = async () => {
    const volunteersSnapShot = await firestore
        .collection("users")
        .where("role", "==", UserRole.Volunteer)
        .get();

    return volunteersSnapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
};

// export const getRequests = async () => {
//     const requestsRef = await firestore
//         .collection("requests")
//         .orderBy("createdAt")
//         .limit(10)
//         .get();

//     return requestsRef.docs.map((req) => req.data());
// };
// =======
// let latestReq = null //Contains the last request that was fetched

// export const getRequests = async () => {
//     const requestsRef = await firestore
//         .collection("requests")
//         .orderBy("createdAt")
//         .startAfter(latestReq || 0)
//         .limit(10)
//         .get();

//     latestReq = requestsRef.docs[requestsRef.docs.length -1]

//     return requestsRef.docs.map((req) => req.data());
// };
// >>>>>>> master

export const signOut = async () => {
    return await auth.signOut();
};

export default firebase;
