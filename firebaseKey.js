//Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyATBEjlwsNELXKTp_RoN9fM7pyrNtSPh68",
    authDomain: "sonet-a0e40.firebaseapp.com",
    databaseURL: "https://sonet-a0e40.firebaseio.com",
    projectId: "sonet-a0e40",
    storageBucket: "sonet-a0e40.appspot.com",
    messagingSenderId: "118392395787",
    appId: "1:118392395787:web:5ecf82e2a2e331542a8f0e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const auth = firebase.auth();