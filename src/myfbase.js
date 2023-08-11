import { initializeApp }  from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, addDoc, collection, getDocs, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
  };// 깃허브에 키값이 그대로 넘어가는걸 막기위해 .env 사용
  
const app = initializeApp(firebaseConfig);
export const firebaseInstance = firebaseConfig;
export const authService = getAuth(app);
export const dbService = getFirestore();
export const storageService = getStorage();
export const dbAddDoc = addDoc;
export const dbCollection = collection;
export const gdoc = getDocs;
export const qr = query;