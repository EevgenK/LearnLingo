import { initializeApp } from "firebase/app";
const FIREBASE_CONFIG = import.meta.env.VITE_FIREBASE_CONFIG;
const app = initializeApp(FIREBASE_CONFIG);