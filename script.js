// script.js

// Configura aquí tu Firebase con tus credenciales reales:
const firebaseConfig = {
  apiKey: "AIzaSyAxzAJVTV6ioXf0wnyAx2s1-k9-I83xjB0",
  authDomain: "malla-interactiva-ap.firebaseapp.com",
  projectId: "malla-interactiva-ap",
  storageBucket: "malla-interactiva-ap.firebasestorage.app",
  messagingSenderId: "982790383608",
  appId: "1:982790383608:web:510c77b93144b747df580d",
  measurementId: "G-9BE0JCRJME"
  };

// Inicializa Firebase con compatibilidad
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("user-info").innerText = `Sesión iniciada como: ${user.email}`;
    iniciarMalla(user.uid);
  } else {
    window.location.href = "index.html"; // Redirige si no está logueado
  }
});

function iniciarMalla(usuarioId) {
  const creditosSpan = document.getElementById("creditos");
  const mensajeDesbloqueo = document.getElementById("mensaje-desbloqueo");

  // Lista de cursos ejemplo — agrega todos los que quieras
  const cursos = [
    { nombre: "Matemática para la Gestión I", prerequisitos: [], creditos: 5, semestre: "I" },
    { nombre: "Introducción a la Gestión Pública", prerequisitos: [], creditos: 8, semestre: "I" },
    { nombre: "Historia de las Instituciones Políticas y Administrativas de Chile", prerequisitos: [], creditos: 5, semestre: "I" },
    // Continúa con todos tus cursos aquí ...
  ];

  // Carga aprobados desde localStorage
  let cursosAprobados = JSON.parse(localStorage.getItem(`aprobados_${usuarioId}`)) || [];

  function guardarProgreso() {
    localStorage.setItem(`aprobados_${usuarioId}`, JSON.stringify(cursosAprobados));
  }

  function estaDesbloqueado(curso) {
    return curso.prerequisitos.every(p => cursosAprobados.includes(p));
  }

  function crearTarjetaCurso(curso) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "curso";
    const desbloqueado = estaDesbloqueado(curso);

    tarjeta.innerHTML = `
      <h3>${curso.nombre}</h3>
      <p><strong>Créditos:</strong> ${curso.creditos}</p>
      <p><strong>Prerequisitos:</strong> ${curso.prerequisitos.length > 0 ? curso.prerequisitos.join(", ") : "—"}</p>
      <button ${!desbloqueado ? "disabled" : ""}>
        ${cursosAprobados.includes(curso.nombre) ? "Aprobado ✅" : "Marcar como aprobado"}
      </button>
    `;

    tarjeta.querySelector("button").addEventListener("click", () => {
      if (!cursosAprobados.includes(curso.nombre)) {
        cursosAprobados.push(curso.nombre);
        guardarProgreso();
        mensajeDesbloqueo.style.display = "block";
        setTimeout(() => (mensajeDesbloqueo.style.display = "none"), 2500);
        render();
      }
    });

    const contenedor = document.querySelector(`.semestre[data-semestre="${curso.semestre}"]`);
    if (contenedor) contenedor.appendChild(tarjeta);
  }

  function calcularCreditos() {
    const total = cursos
      .filter(c => cursosAprobados.includes(c.nombre))
      .reduce((acc, cur) => acc + cur.creditos, 0);
    creditosSpan.innerText = `Créditos aprobados: ${total}`;
  }

  function render() {
    // Limpia cada semestre, pero deja el título h2 intacto
    document.querySelectorAll(".semestre").forEach(s => {
      const titulo = s.querySelector("h2");
      s.innerHTML = "";
      if (titulo) s.appendChild(titulo);
    });
    cursos.forEach(crearTarjetaCurso);
    calcularCreditos();
  }

  render();
}
