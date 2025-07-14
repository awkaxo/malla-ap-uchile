// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔥 Reemplaza estos datos con los de tu proyecto en Firebase
const firebaseConfig = {
 const firebaseConfig = {
  apiKey: "AIzaSyAxzAJVTV6ioXf0wnyAx2s1-k9-I83xjB0",
  authDomain: "malla-interactiva-ap.firebaseapp.com",
  projectId: "malla-interactiva-ap",
  storageBucket: "malla-interactiva-ap.firebasestorage.app",
  messagingSenderId: "982790383608",
  appId: "1:982790383608:web:5c851cc78a9169c7df580d",
  measurementId: "G-PDS3Z2T8JE"
};
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const appDiv = document.getElementById("app");

function renderLogin() {
  appDiv.innerHTML = `
    <div class="card">
      <h2>✨ Malla Interactiva</h2>
      <input type="email" id="email" placeholder="Correo electrónico" />
      <input type="password" id="password" placeholder="Contraseña" />
      <button id="login">Entrar</button>
      <button id="register">Crear cuenta</button>
    </div>
  `;

  document.getElementById("login").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => renderApp())
      .catch((err) => alert("Error al iniciar sesión: " + err.message));
  };

  document.getElementById("register").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => renderApp())
      .catch((err) => alert("Error al registrar: " + err.message));
  };
}

function renderApp() {
  const user = auth.currentUser;
  appDiv.innerHTML = `
    <div class="card">
      <h2>Hola, ${user.email} 👋</h2>
      <p>Aquí pronto estará tu malla interactiva 🌸</p>
      <button id="logout">Cerrar sesión</button>
    </div>
    <footer>
      Hecho con 💖 por Awka – 2025
    </footer>
  `;

  document.getElementById("logout").onclick = () => {
    signOut(auth).then(() => renderLogin());
  };
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    renderApp();
  } else {
    renderLogin();
  }
});
