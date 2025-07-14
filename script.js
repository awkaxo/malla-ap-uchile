// script.js

const firebaseConfig = {
  apiKey: "AIzaSyAxzAJVTV6ioXf0wnyAx2s1-k9-I83xjB0",
  authDomain: "malla-interactiva-ap.firebaseapp.com",
  projectId: "malla-interactiva-ap",
  storageBucket: "malla-interactiva-ap.firebasestorage.app",
  messagingSenderId: "982790383608",
  appId: "1:982790383608:web:510c77b93144b747df580d",
  measurementId: "G-9BE0JCRJME"
  };

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("user-info").innerText = `Sesión iniciada como: ${user.email}`;
    iniciarMalla(user.uid);
  } else {
    window.location.href = "index.html";
  }
});

function iniciarMalla(usuarioId) {
  const creditosSpan = document.getElementById("creditos");
  const mensajeDesbloqueo = document.getElementById("mensaje-desbloqueo");

  const cursos = [
    // Primer año
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

    // Segundo año
    { nombre: "Estadística para la Gestión I", prerequisitos: ["Matemática para la Gestión II"], creditos: 5, semestre: "III" },
    { nombre: "Dinámicas de la Administración Pública Chilena", prerequisitos: ["Evolución y Complejidad de la Administración Pública"], creditos: 6, semestre: "III" },
    { nombre: "Estudio de los Fenómenos Políticos", prerequisitos: ["Ideas y Debates Políticos Contemporáneos"], creditos: 5, semestre: "III" },
    { nombre: "Metodología de la Investigación en Administración Pública", prerequisitos: ["Epistemología de las Ciencias Sociales"], creditos: 5, semestre: "III" },
    { nombre: "Marco Normativo para la Acción Administrativa II", prerequisitos: ["Marco Normativo para la Acción Administrativa I"], creditos: 5, semestre: "III" },
    { nombre: "Inglés III", prerequisitos: ["Inglés II"], creditos: 3, semestre: "III" },

    { nombre: "Estadística para la Gestión II", prerequisitos: ["Estadística para la Gestión I"], creditos: 5, semestre: "IV" },
    { nombre: "Diseño Organizacional", prerequisitos: ["Dinámicas de la Administración Pública Chilena"], creditos: 8, semestre: "IV" },
    { nombre: "La Administración Pública y los Fenómenos Políticos", prerequisitos: ["Estudio de los Fenómenos Políticos"], creditos: 5, semestre: "IV" },
    { nombre: "Métodos Cualitativos para la Administración Pública", prerequisitos: ["Metodología de la Investigación en Administración Pública"], creditos: 5, semestre: "IV" },
    { nombre: "CFG", prerequisitos: [], creditos: 2, semestre: "IV" },
    { nombre: "Inglés IV", prerequisitos: ["Inglés III"], creditos: 3, semestre: "IV" },
    { nombre: "Comportamiento Humano en la Organización", prerequisitos: [], creditos: 4, semestre: "IV" },

    // Tercer año
    { nombre: "Fenómenos Microeconómicos", prerequisitos: ["Matemática para la Gestión II"], creditos: 4, semestre: "V" },
    { nombre: "Gestión de Procesos en Organizaciones Públicas", prerequisitos: ["Diseño Organizacional"], creditos: 6, semestre: "V" },
    { nombre: "Análisis Político Internacional", prerequisitos: ["La Administración Pública y los Fenómenos Políticos"], creditos: 4, semestre: "V" },
    { nombre: "Métodos Cuantitativos para la Administración Pública", prerequisitos: ["Estadística para la Gestión II"], creditos: 5, semestre: "V" },
    { nombre: "Bases Contables para la Gestión Pública", prerequisitos: [], creditos: 4, semestre: "V" },
    { nombre: "Marco Analítico de las Políticas Públicas", prerequisitos: ["Métodos Cualitativos para la Administración Pública"], creditos: 4, semestre: "V" },

    { nombre: "Fenómenos Macroeconómicos", prerequisitos: ["Fenómenos Microeconómicos"], creditos: 4, semestre: "VI" },
    { nombre: "Planificación Estratégica en Organizaciones Públicas", prerequisitos: ["Gestión de Procesos en Organizaciones Públicas"], creditos: 6, semestre: "VI" },
    { nombre: "Negociación y Toma de Decisiones", prerequisitos: ["Comportamiento Humano en la Organización"], creditos: 4, semestre: "VI" },
    { nombre: "Gestión Territorial y Descentralización", prerequisitos: ["Marco Normativo para la Acción Administrativa II"], creditos: 4, semestre: "VI" },
    { nombre: "Gestión Financiera del Estado", prerequisitos: ["Bases Contables para la Gestión Pública"], creditos: 5, semestre: "VI" },
    { nombre: "Formulación e Implementación de Políticas Públicas", prerequisitos: ["Marco Analítico de las Políticas Públicas"], creditos: 4, semestre: "VI" },
    { nombre: "Gestión de Personas en Organizaciones Públicas", prerequisitos: ["Comportamiento Humano en la Organización"], creditos: 4, semestre: "VI" },

    // Cuarto año
    { nombre: "Economía del Sector Público", prerequisitos: ["Fenómenos Macroeconómicos", "Fenómenos Microeconómicos"], creditos: 4, semestre: "VII" },
    { nombre: "Control y Evaluación en Organizaciones Públicas", prerequisitos: ["Planificación Estratégica en Organizaciones Públicas"], creditos: 6, semestre: "VII" },
    { nombre: "Análisis Integrado de los Problemas Públicos", prerequisitos: ["Formulación e Implementación de Políticas Públicas"], creditos: 8, semestre: "VII" },
    { nombre: "Contabilidad Gubernamental", prerequisitos: ["Gestión Financiera del Estado"], creditos: 5, semestre: "VII" },
    { nombre: "Evaluación de Políticas Públicas", prerequisitos: ["Formulación e Implementación de Políticas Públicas"], creditos: 4, semestre: "VII" },
    { nombre: "Curso Libre", prerequisitos: [], creditos: 2, semestre: "VII" },

    { nombre: "Gestión de Proyectos Sociales", prerequisitos: ["Evaluación de Políticas Públicas"], creditos: 4, semestre: "VIII" },
    { nombre: "Simulación de Asesoría", prerequisitos: ["Control y Evaluación en Organizaciones Públicas"], creditos: 7, semestre: "VIII" },
    { nombre: "Comunicación Estratégica y Marketing Político", prerequisitos: [], creditos: 4, semestre: "VIII" },
    { nombre: "Seminario de Investigación Aplicada", prerequisitos: ["Métodos Cualitativos para la Administración Pública", "Métodos Cuantitativos para la Administración Pública"], creditos: 7, semestre: "VIII" },
    { nombre: "Auditoría Gubernamental", prerequisitos: ["Contabilidad Gubernamental"], creditos: 5, semestre: "VIII" },
    { nombre: "Análisis Empírico de Política Pública", prerequisitos: ["Métodos Cuantitativos para la Administración Pública"], creditos: 4, semestre: "VIII" },
    { nombre: "Electivo IV", prerequisitos: [], creditos: 5, semestre: "VIII" },
    { nombre: "CFG", prerequisitos: [], creditos: 2, semestre: "VIII" },

    // Quinto año
    { nombre: "Evaluación de Proyectos Sociales", prerequisitos: ["Gestión de Proyectos Sociales"], creditos: 4, semestre: "IX" },
    { nombre: "Electivo I", prerequisitos: [], creditos: 5, semestre: "IX" },
    { nombre: "Electivo II", prerequisitos: [], creditos: 5, semestre: "IX" },
    { nombre: "Electivo III", prerequisitos: [], creditos: 5, semestre: "IX" },
    { nombre: "Dirección y Ética Pública", prerequisitos: ["Análisis Integrado de los Problemas Públicos"], creditos: 4, semestre: "IX" },

    { nombre: "Práctica Profesional", prerequisitos: cursos.filter(c => c.semestre !== "X").map(c => c.nombre), creditos: 30, semestre: "X" },
    { nombre: "Examen de Título", prerequisitos: ["Práctica Profesional"], creditos: 0, semestre: "X" }
  ];

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
    return curso.prerequisitos.every(p => cursosAprobados.includes(p));
  }

  function crearTarjetaCurso(curso) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "curso";
    const desbloqueado = estaDesbloqueado(curso);

    tarjeta.innerHTML = `
      <h3>${curso.nombre}</h3>
      <p><strong>Créditos:</strong> ${curso.creditos}</p>
      <p><strong>Prerequisitos:</strong> ${curso.prerequisitos.length ? curso.prerequisitos.join(", ") : "—"}</p>
      <button ${!desbloqueado ? "disabled" : ""}>
        ${cursosAprobados.includes(curso.nombre) ? "Aprobado ✅" : "Marcar como aprobado"}
      </button>
    `;

    const boton = tarjeta.querySelector("button");
    boton.addEventListener("click", () => {
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

  function render() {
    document.querySelectorAll(".semestre").forEach(s => {
      // Mantener solo el título del semestre
      const titulo = s.querySelector("h2");
      s.innerHTML = "";
      if (titulo) s.appendChild(titulo);
    });
    cursos.forEach(crearTarjetaCurso);
    calcularCreditos();
  }

  render();
}
