import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "", //API put here
    authDomain: "chat-react-app-d05f1.firebaseapp.com",
    projectId: "chat-react-app-d05f1",
    storageBucket: "chat-react-app-d05f1.appspot.com",
    messagingSenderId: "709269258676",
    appId: "1:709269258676:web:9a9458be04bd1066f9f2e1",
    measurementId: "G-M2823QJBTY"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export default app;