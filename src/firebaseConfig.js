// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración real de Firebase (ya la tienes bien)
const firebaseConfig = {
  apiKey: "AIzaSyDRksrB-T2KT5QHVyJIIQscQSuPVKBv6YY",
  authDomain: "apppsicologia-9950d.firebaseapp.com",
  projectId: "apppsicologia-9950d",
  storageBucket: "apppsicologia-9950d.appspot.com", // <- corregido aquí
  messagingSenderId: "1018303142411",
  appId: "1:1018303142411:web:a7bf6e0794ea366373850e",
  // measurementId no es necesario si no usas Analytics
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta lo necesario para login y base de datos
export const auth = getAuth(app);
export const db = getFirestore(app);
