// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdCaTI45CCo29UuOBOaJmFOcUglc3TBtM",
    authDomain: "pacmap-fe260.firebaseapp.com",
    projectId: "pacmap-fe260",
    storageBucket: "pacmap-fe260.firebasestorage.app",
    messagingSenderId: "1086716534557",
    appId: "1:1086716534557:web:62ed8c315d31dc2ba34bf4",
    measurementId: "G-5HS9MJBZ1H"
};

export const app = initializeApp(firebaseConfig);

export function initializeGA() {
    getAnalytics(app);
}
