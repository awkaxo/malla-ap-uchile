// Inicializa Firebase (usa tus datos reales aquí)
const firebaseConfig = {
  apiKey: "AIzaSyAxzAJVTV6ioXf0wnyAx2s1-k9-I83xjB0",
  authDomain: "malla-interactiva-ap.firebaseapp.com",
  projectId: "malla-interactiva-ap",
  storageBucket: "malla-interactiva-ap.appspot.com",
  messagingSenderId: "982790383608",
  appId: "1:982790383608:web:0c0100d098ba1713df580d",
  measurementId: "G-D8F2168ZB3"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const cursos = [
  { nombre: "Matemática para la Gestión I", prerrequisitos: [], creditos: 8 },
  { nombre: "Introducción a la Gestión Pública", prerrequisitos: [], creditos: 8 },
  { nombre: "Historia de las Instituciones Políticas", prerrequisitos: [], creditos: 8 },
  { nombre: "Tecnologías y Sistemas de Información", prerrequisitos: [], creditos: 8 },
  { nombre: "Bases Jurídicas para la Administración", prerrequisitos: [], creditos: 8 },
  { nombre: "Inglés I", prerrequisitos: [], creditos: 6 },
  { nombre: "Curso Libre I", prerrequisitos: [], creditos: 8 },
  { nombre: "Matemática para la Gestión II", prerrequisitos: ["Matemática para la Gestión I"], creditos: 8 },
  { nombre: "Evolución y Complejidad de la Administración", prerrequisitos: ["Introducción a la Gestión Pública"], creditos: 8 },
  { nombre: "Ideas y Debates Políticos Contemporáneos", prerrequisitos: [], creditos: 8 },
  { nombre: "Epistemología de las Ciencias Sociales", prerrequisitos: [], creditos: 8 },
  { nombre: "Marco Normativo I", prerrequisitos: ["Bases Jurídicas para la Administración"], creditos: 8 },
  { nombre: "Inglés II", prerrequisitos: ["Inglés I"], creditos: 6 },
  { nombre: "Curso Libre II", prerrequisitos: ["Curso Libre I"], creditos: 8 },
  { nombre: "Estadística para la Gestión I", prerrequisitos: ["Matemática para la Gestión II"], creditos: 8 },
  { nombre: "Comportamiento Humano en la Organización", prerrequisitos: ["Evolución y Complejidad de la Administración"], creditos: 8 },
  { nombre: "Fenómenos Políticos", prerrequisitos: ["Ideas y Debates Políticos Contemporáneos"], creditos: 8 },
  { nombre: "Microeconomía para la Gestión Pública", prerrequisitos: ["Matemática para la Gestión II"], creditos: 8 },
  { nombre: "Marco Normativo II", prerrequisitos: ["Marco Normativo I"], creditos: 8 },
  { nombre: "Métodos Cualitativos", prerrequisitos: ["Epistemología de las Ciencias Sociales"], creditos: 8 },
  { nombre: "Política Internacional", prerrequisitos: ["Fenómenos Políticos"], creditos: 8 },
  { nombre: "Diseño Organizacional", prerrequisitos: ["Comportamiento Humano en la Organización"], creditos: 8 },
  { nombre: "Métodos Cuantitativos", prerrequisitos: ["Estadística para la Gestión I"], creditos: 8 },
  { nombre: "Planeamiento Estratégico", prerrequisitos: ["Diseño Organizacional"], creditos: 8 },
  { nombre: "Gestión Financiera Pública", prerrequisitos: ["Microeconomía para la Gestión Pública"], creditos: 8 },
  { nombre: "Negociación y Resolución de Conflictos", prerrequisitos: ["Comportamiento Humano en la Organización"], creditos: 8 },
  { nombre: "Ciclo y Evaluación de Políticas Públicas", prerrequisitos: ["Planeamiento Estratégico"], creditos: 8 },
  { nombre: "Contabilidad Gubernamental", prerrequisitos: ["Gestión Financiera Pública"], creditos: 8 },
  { nombre: "Gestión de Personas", prerrequisitos: ["Diseño Organizacional"], creditos: 8 },
  { nombre: "Gestión de Proyectos", prerrequisitos: ["Planeamiento Estratégico"], creditos: 8 },
  { nombre: "Electivo I", prerrequisitos: [], creditos: 8 },
  { nombre: "Análisis Empírico de Políticas", prerrequisitos: ["Métodos Cuantitativos", "Métodos Cualitativos"], creditos: 8 },
  { nombre: "Electivo II", prerrequisitos: ["Electivo I"], creditos: 8 },
  { nombre: "Electivo III", prerrequisitos: ["Electivo II"], creditos: 8 },
  { nombre: "Curso de Formación General", prerrequisitos: [], creditos: 8 },
  { nombre: "Simulación de Asesoría Política", prerrequisitos: ["Gestión de Proyectos"], creditos: 8 },
  { nombre: "Práctica Profesional", prerrequisitos: ["Ciclo y Evaluación de Políticas Públicas"], creditos: 12 },
  { nombre: "Examen de Título", prerrequisitos: ["Análisis Empírico de Políticas"], creditos: 12 }
];

let creditos = 0;

function mostrarMensajeDesbloqueo() {
  const mensaje = document.getElementById("mensaje-desbloqueo");
  mensaje.style.display = "block";
  mensaje.style.opacity = "1";
  setTimeout(() => {
    mensaje.style.opacity = "0";
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 500);
  }, 2000);
}

function actualizarCursos() {
  const container = document.getElementById("cursos-container");
  container.innerHTML = "";

  cursos.forEach(curso => {
    const tieneTodosLosPrerrequisitos = curso.prerrequisitos.every(pr => cursos.find(c => c.nombre === pr)?.aprobado);
    const estado = curso.aprobado ? 'aprobado' : (tieneTodosLosPrerrequisitos ? '' : 'bloqueado');

    const div = document.createElement("div");
    div.className = `curso ${estado}`;
    div.textContent = curso.nombre;

    if (estado === '') {
      div.addEventListener("click", () => {
        curso.aprobado = true;
        creditos += curso.creditos;
        document.getElementById("creditos").textContent = `Créditos Aprobados: ${creditos}`;
        mostrarMensajeDesbloqueo();
        actualizarCursos();
      });
    }

    container.appendChild(div);
  });
}

auth.onAuthStateChanged(user => {
  if (!user) window.location.href = "index.html";
  else {
    creditos = 0; // reinicia cada vez que entra la sesión
    cursos.forEach(c => c.aprobado = false); // reinicia aprobados para demo
    actualizarCursos();
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut();
});
