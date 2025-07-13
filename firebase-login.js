let currentUserId = null;
let ramosSeleccionados = [];

// Guarda los ramos en Firestore
function guardarRamos() {
  if (currentUserId) {
    db.collection("usuarios").doc(currentUserId).set({
      ramos: ramosSeleccionados
    });
  }
}

// Carga los ramos desde Firestore
function cargarRamos() {
  if (currentUserId) {
    db.collection("usuarios").doc(currentUserId).get().then(doc => {
      if (doc.exists) {
        ramosSeleccionados = doc.data().ramos || [];
        ramosSeleccionados.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.add("tomado"); // adapta esta clase a tu estilo
        });
      }
    });
  }
}

// Iniciar sesión o registrar usuario
function login(email, pass) {
  auth.signInWithEmailAndPassword(email, pass)
    .then(userCredential => {
      currentUserId = userCredential.user.uid;
      cargarRamos();
    })
    .catch(() => {
      auth.createUserWithEmailAndPassword(email, pass)
        .then(userCredential => {
          currentUserId = userCredential.user.uid;
          guardarRamos();
        });
    });
}

// Lógica para marcar y desmarcar ramos
function marcarRamo(id) {
  const index = ramosSeleccionados.indexOf(id);
  const el = document.getElementById(id);

  if (index > -1) {
    ramosSeleccionados.splice(index, 1);
    el.classList.remove("tomado");
  } else {
    ramosSeleccionados.push(id);
    el.classList.add("tomado");
  }

  guardarRamos();
}
