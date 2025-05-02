import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBTb6VpP-EOCRabIvqTWgjKxdQSCdZhEQE",
  authDomain: "ai-devgen.firebaseapp.com",
  projectId: "ai-devgen",
  storageBucket: "ai-devgen.appspot.com",
  messagingSenderId: "864612656467",
  appId: "1:864612656467:web:23cf3112e78679876e6da6",
  measurementId: "G-J0TGS94KRD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, db };
