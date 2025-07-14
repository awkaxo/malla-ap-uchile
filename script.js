// script.js

// Configura tu firebase correctamente antes (en otro archivo o aquí mismo)

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('user-info').innerText = `Sesión iniciada como: ${user.email}`;
    iniciarMalla(user.uid);
  } else {
    window.location.href = "index.html"; // o página login
  }
});

function iniciarMalla(usuarioId) {
  const creditosSpan = document.getElementById("creditos");
  const mensajeDesbloqueo = document.getElementById("mensaje-desbloqueo");

  // Cursos con semestre, prerequisitos y créditos
  const cursos = [
    { nombre: "Matemática para la Gestión I", prerequisitos: [], creditos: 5, semestre: "I" },
    { nombre: "Introducción a la Gestión Pública", prerequisitos: [], creditos: 8, semestre: "I" },
    { nombre: "Historia de las Instituciones Políticas y Administrativas de Chile", prerequisitos: [], creditos: 5, semestre: "I" },
    { nombre: "Tecnologías y Sistemas de Información", prerequisitos: [], creditos: 3, semestre: "I" },
    { nombre: "Bases Jurídicas para la Administración del Estado", prerequisitos: [], creditos: 5, semestre: "I" },
    { nombre: "Inglés I", prerequisitos: [], creditos: 3, semestre: "I" },
    { nombre: "Curso Libre", prerequisitos: [], creditos: 2, semestre: "I" },

    { nombre: "Matemática para la Gestión II", prerequisitos: ["Matemática para la Gestión I"], creditos: 5, semestre: "II" },
    { nombre: "Evolución y Complejidad de la Administración Pública", prerequisitos: ["Introducción a la Gestión Pública"], creditos: 6, semestre: "II" },
    { nombre: "Ideas y Debates Políticos Contemporáneos", prerequisitos: ["Historia de las Instituciones Políticas y Administrativas de Chile"], creditos: 5, semestre: "II" },
    { nombre: "Epistemología de las Ciencias Sociales", prerequisitos: [], creditos: 5, semestre: "II" },
    { nombre: "Marco Normativo para la Acción Administrativa I", prerequisitos: ["Bases Jurídicas para la Administración del Estado"], creditos: 5, semestre: "II" },
    { nombre: "Inglés II", prerequisitos: ["Inglés I"], creditos: 3, semestre: "II" },

    // Puedes agregar los demás cursos de III a X aquí como antes
  ];

  // Obtener los cursos aprobados almacenados, si no hay, un array vacío
  let cursosAprobados = JSON.parse(localStorage.getItem(`aprobados_${usuarioId}`)) || [];

  function guardarProgreso() {
    localStorage.setItem(`aprobados_${usuarioId}`, JSON.stringify(cursosAprobados));
  }

  function calcularCreditos() {
    const total = cursos
      .filter(c => cursosAprobados.includes(c.nombre))
      .reduce((acc, cur) => acc + cur.creditos, 0);
    creditosSpan.innerText = `Créditos aprobados: ${total}`;
  }

  function estaDesbloqueado(curso) {
    // Todos los prerequisitos aprobados?
    return curso.prerequisitos.every(p => cursosAprobados.includes(p));
  }

  function crearTarjetaCurso(curso) {
    const contenedor = document.querySelector(`.semestre[data-semestre="${curso.semestre}"]`);
    if (!contenedor) return;

    const tarjeta = document.createElement("div");
    tarjeta.className = "curso";

    const desbloqueado = estaDesbloqueado(curso);
    const aprobado = cursosAprobados.includes(curso.nombre);

    tarjeta.innerHTML = `
      <h3>${curso.nombre}</h3>
      <p><strong>Créditos:</strong> ${curso.creditos}</p>
      <p><strong>Prerequisitos:</strong> ${curso.prerequisitos.length ? curso.prerequisitos.join(", ") : "—"}</p>
      <button ${!desbloqueado ? "disabled" : ""}>
        ${aprobado ? "Aprobado ✅" : "Marcar como aprobado"}
      </button>
    `;

    tarjeta.querySelector("button").addEventListener("click", () => {
      if (!aprobado) {
        cursosAprobados.push(curso.nombre);
        guardarProgreso();
        mensajeDesbloqueo.style.display = "block";
        setTimeout(() => {
          mensajeDesbloqueo.style.display = "none";
        }, 2500);
        render();
      }
    });

    contenedor.appendChild(tarjeta);
  }

  function render() {
    // Limpiar los semestres para evitar duplicados
    document.querySelectorAll(".semestre").forEach(s => (s.innerHTML = `<h2>Semestre ${s.dataset.semestre} 🌸</h2>`));
    cursos.forEach(curso => crearTarjetaCurso(curso));
    calcularCreditos();
  }

  render();
}
