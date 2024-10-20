// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0PKaOuRbFQlwbwSOAgkM1VuAsSWC5tSU",
  authDomain: "realtor-clone-react-6f41e.firebaseapp.com",
  projectId: "realtor-clone-react-6f41e",
  storageBucket: "realtor-clone-react-6f41e.appspot.com",
  messagingSenderId: "469974554961",
  appId: "1:469974554961:web:4d05eb75fe537c2a415b70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;


