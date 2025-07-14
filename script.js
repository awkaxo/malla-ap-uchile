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
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
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
