// Configuración Firebase (usa tu propia config)
const firebaseConfig = {
  apiKey: "AIzaSyC0y-ES5y6c8uiYMKew-TEv-wz_iMbXaJc",
  authDomain: "malla-interactiva.firebaseapp.com",
  projectId: "malla-interactiva",
  storageBucket: "malla-interactiva.firebasestorage.app",
  messagingSenderId: "1084098910135",
  appId: "1:1084098910135:web:62633e770f70cf534bba32",
  measurementId: "G-SG22ZFKRMD"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginSection = document.getElementById('login-section');
const malla = document.getElementById('malla');
const loginMsg = document.getElementById('login-msg');
const btnLogout = document.getElementById('btn-logout');

document.getElementById('btn-login').onclick = login;
document.getElementById('btn-signup').onclick = signup;
btnLogout.onclick = logout;

auth.onAuthStateChanged(user => {
  if (user) {
    loginSection.style.display = 'none';
    btnLogout.style.display = 'block';
    malla.style.display = 'grid';
    cargarEstado(user.uid);
  } else {
    loginSection.style.display = 'block';
    btnLogout.style.display = 'none';
    malla.style.display = 'none';
    loginMsg.textContent = '';
    limpiarMalla();
  }
});

function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) {
    loginMsg.textContent = 'Por favor, ingresa email y contraseña';
    return;
  }
  loginMsg.textContent = 'Cargando...';
  auth.signInWithEmailAndPassword(email, password)
    .then(() => loginMsg.textContent = '')
    .catch(e => loginMsg.textContent = 'Error: ' + e.message);
}

function signup() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) {
    loginMsg.textContent = 'Por favor, ingresa email y contraseña';
    return;
  }
  loginMsg.textContent = 'Creando cuenta...';
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => loginMsg.textContent = '')
    .catch(e => loginMsg.textContent = 'Error: ' + e.message);
}

function logout() {
  auth.signOut();
}

function limpiarMalla() {
  malla.innerHTML = '';
}

// Estado y ramos vienen de malla.js, pero vamos a controlar acá las interacciones con Firestore