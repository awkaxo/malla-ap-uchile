let currentUserId = null;
let ramosSeleccionados = [];

function guardarRamos() {
  if (currentUserId) {
    db.collection("usuarios").doc(currentUserId).set({
      ramos: ramosSeleccionados
    });
  }
}

function cargarRamos() {
  if (currentUserId) {
    db.collection("usuarios").doc(currentUserId).get().then(doc => {
      if (doc.exists) {
        ramosSeleccionados = doc.data().ramos || [];
        ramosSeleccionados.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.add("approved");
        });
        actualizarMalla(); // actualiza bloqueo y botones
      }
    });
  }
}

function login() {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!email || !pass) {
    alert("Por favor completa email y contraseña.");
    return;
  }

  auth.signInWithEmailAndPassword(email, pass)
    .then(userCredential => {
      currentUserId = userCredential.user.uid;
      alert("Ingresaste correctamente.");
      cargarRamos();
    })
    .catch(error => {
      alert("Error al ingresar: " + error.message);
    });
}

function crearCuenta() {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!email || !pass) {
    alert("Por favor completa email y contraseña.");
    return;
  }

  auth.createUserWithEmailAndPassword(email, pass)
    .then(userCredential => {
      currentUserId = userCredential.user.uid;
      alert("Cuenta creada exitosamente. Ya puedes ingresar.");
      ramosSeleccionados = [];
      guardarRamos();
      crearMalla(); // para crear la malla limpia
    })
    .catch(error => {
      alert("Error al crear cuenta: " + error.message);
    });
}
