import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0y-ES5y6c8uiYMKew-TEv-wz_iMbXaJc",
  authDomain: "malla-interactiva.firebaseapp.com",
  projectId: "malla-interactiva",
  storageBucket: "malla-interactiva.appspot.com",
  messagingSenderId: "1084098910135",
  appId: "1:1084098910135:web:62633e770f70cf534bba32",
  measurementId: "G-SG22ZFKRMD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Código para manejar la lógica de la malla y la autenticación
// ...Aquí iría el resto del código de ramos y funciones de UI...
console.log("Firebase cargado correctamente");
