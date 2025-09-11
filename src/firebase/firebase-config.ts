import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB05AAXN80F1qf5Zc5a3R4IXsokCJ2O73U",
  authDomain: "moments-bf0c4.firebaseapp.com",
  projectId: "moments-bf0c4",
  storageBucket: "moments-bf0c4.firebasestorage.app",
  messagingSenderId: "599915707418",
  appId: "1:599915707418:web:52261b00428b6ce447a5a3",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const firestore = getFirestore(app);