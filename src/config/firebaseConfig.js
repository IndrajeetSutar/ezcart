import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAO08X2Od2FXCbeRoK7Y1fiu4ucTQi_L5c",
    authDomain: "ezcart-33495.firebaseapp.com",
    projectId: "ezcart-33495",
    storageBucket: "ezcart-33495.appspot.com",
    messagingSenderId: "982490095617",
    appId: "1:982490095617:web:f15871ec8889f581a66000",
    measurementId: "G-8VJ3XHGXWP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
    var provider =  new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
    });
    auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.\
        console.log("## Token " + token);
    });
};

export const signInWithTwitter = () => {
    var provider = auth.TwitterAuthProvider();
    auth.signInWithPopup(provider);
};

export const signInWithFacebook = () => {
    var provider = auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
};

export const signOut = () => {
    console.log('## signOut');
    auth.signOut().then(function (result) {
        console.log('## signOut result' + result);
    });
};

export const getCurrentUser = () => {
    console.log('## getCurrentUser called ' + auth.currentUser);
    return auth.currentUser;
}

export const isLoggedIn = () => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log('## user =' + auth.currentUser.displayName);
            // User is signed in.
        } else {
            // No user is signed in.
            console.log('##  No user is signed in. =' + auth.currentUser);
        }
        return user;
    });
}


export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();

        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};