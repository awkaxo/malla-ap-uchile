// malla-script.js
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

let creditos = 0;
let cursosPorAnio = {
  1: {
    I: [
      { nombre: "Matemática para la Gestión I", prerrequisitos: [], creditos: 5 },
      { nombre: "Introducción a la Gestión Pública", prerrequisitos: [], creditos: 8 },
      { nombre: "Historia de las Instituciones Políticas y Administrativas de Chile", prerrequisitos: [], creditos: 5 },
      { nombre: "Tecnologías y Sistemas de Información", prerrequisitos: [], creditos: 3 },
      { nombre: "Bases Jurídicas para la Administración del Estado", prerrequisitos: [], creditos: 5 },
      { nombre: "Inglés I", prerrequisitos: [], creditos: 3 },
      { nombre: "Curso Libre", prerrequisitos: [], creditos: 2 }
    ],
    II: [
      { nombre: "Matemática para la Gestión II", prerrequisitos: ["Matemática para la Gestión I"], creditos: 5 },
      { nombre: "Evolución y Complejidad de la Administración Pública", prerrequisitos: ["Introducción a la Gestión Pública"], creditos: 6 },
      { nombre: "Ideas y Debates Políticos Contemporáneos", prerrequisitos: ["Historia de las Instituciones Políticas y Administrativas de Chile"], creditos: 5 },
      { nombre: "Epistemología de las Ciencias Sociales", prerrequisitos: [], creditos: 5 },
      { nombre: "Marco Normativo para la Acción Administrativa I", prerrequisitos: ["Bases Jurídicas para la Administración del Estado"], creditos: 5 },
      { nombre: "Inglés II", prerrequisitos: ["Inglés I"], creditos: 3 }
    ]
  },
  2: {
    III: [
      { nombre: "Estadística para la Gestión I", prerrequisitos: ["Matemática para la Gestión II"], creditos: 5 },
      { nombre: "Dinámicas de la Administración Pública Chilena", prerrequisitos: ["Evolución y Complejidad de la Administración Pública"], creditos: 6 },
      { nombre: "Estudio de los Fenómenos Políticos", prerrequisitos: ["Ideas y Debates Políticos Contemporáneos"], creditos: 5 },
      { nombre: "Metodología de la Investigación en Administración Pública", prerrequisitos: ["Epistemología de las Ciencias Sociales"], creditos: 5 },
      { nombre: "Marco Normativo para la Acción Administrativa II", prerrequisitos: ["Marco Normativo para la Acción Administrativa I"], creditos: 5 },
      { nombre: "Inglés III", prerrequisitos: ["Inglés II"], creditos: 3 }
    ],
    IV: [
      { nombre: "Estadística para la Gestión II", prerrequisitos: ["Estadística para la Gestión I"], creditos: 5 },
      { nombre: "Diseño Organizacional", prerrequisitos: ["Dinámicas de la Administración Pública Chilena"], creditos: 8 },
      { nombre: "La Administración Pública y los Fenómenos Políticos", prerrequisitos: ["Estudio de los Fenómenos Políticos"], creditos: 5 },
      { nombre: "Métodos Cualitativos para la Administración Pública", prerrequisitos: ["Metodología de la Investigación en Administración Pública"], creditos: 5 },
      { nombre: "CFG", prerrequisitos: [], creditos: 2 },
      { nombre: "Inglés IV", prerrequisitos: ["Inglés III"], creditos: 3 },
      { nombre: "Comportamiento Humano en la Organización", prerrequisitos: [], creditos: 4 }
    ]
  },
  3: {
    V: [
      { nombre: "Fenómenos Microeconómicos", prerrequisitos: ["Matemática para la Gestión II"], creditos: 4 },
      { nombre: "Gestión de Procesos en Organizaciones Públicas", prerrequisitos: ["Diseño Organizacional"], creditos: 6 },
      { nombre: "Análisis Político Internacional", prerrequisitos: ["La Administración Pública y los Fenómenos Políticos"], creditos: 4 },
      { nombre: "Métodos Cuantitativos para la Administración Pública", prerrequisitos: ["Estadística para la Gestión II"], creditos: 5 },
      { nombre: "Bases Contables para la Gestión Pública", prerrequisitos: [], creditos: 4 },
      { nombre: "Marco Analítico de las Políticas Públicas", prerrequisitos: ["Métodos Cualitativos para la Administración Pública"], creditos: 4 }
    ],
    VI: [
      { nombre: "Fenómenos Macroeconómicos", prerrequisitos: ["Fenómenos Microeconómicos"], creditos: 4 },
      { nombre: "Planificación Estratégica en Organizaciones Públicas", prerrequisitos: ["Gestión de Procesos en Organizaciones Públicas"], creditos: 6 },
      { nombre: "Negociación y Toma de Decisiones", prerrequisitos: ["Comportamiento Humano en la Organización"], creditos: 4 },
      { nombre: "Gestión Territorial y Descentralización", prerrequisitos: ["Marco Normativo para la Acción Administrativa II"], creditos: 4 },
      { nombre: "Gestión Financiera del Estado", prerrequisitos: ["Bases Contables para la Gestión Pública"], creditos: 5 },
      { nombre: "Formulación e Implementación de Políticas Públicas", prerrequisitos: ["Marco Analítico de las Políticas Públicas"], creditos: 4 },
      { nombre: "Gestión de Personas en Organizaciones Públicas", prerrequisitos: ["Comportamiento Humano en la Organización"], creditos: 4 }
    ]
  },
  4: {
    VII: [
      { nombre: "Economía del Sector Público", prerrequisitos: ["Fenómenos Macroeconómicos", "Fenómenos Microeconómicos"], creditos: 4 },
      { nombre: "Control y Evaluación en Organizaciones Públicas", prerrequisitos: ["Planificación Estratégica en Organizaciones Públicas"], creditos: 6 },
      { nombre: "Análisis Integrado de los Problemas Públicos", prerrequisitos: ["Formulación e Implementación de Políticas Públicas"], creditos: 8 },
      { nombre: "Contabilidad Gubernamental", prerrequisitos: ["Gestión Financiera del Estado"], creditos: 5 },
      { nombre: "Evaluación de Políticas Públicas", prerrequisitos: ["Formulación e Implementación de Políticas Públicas"], creditos: 4 },
      { nombre: "Curso Libre", prerrequisitos: [], creditos: 2 }
    ],
    VIII: [
      { nombre: "Gestión de Proyectos Sociales", prerrequisitos: ["Evaluación de Políticas Públicas"], creditos: 4 },
      { nombre: "Simulación de Asesoría", prerrequisitos: ["Control y Evaluación en Organizaciones Públicas"], creditos: 7 },
      { nombre: "Comunicación Estratégica y Marketing Político", prerrequisitos: [], creditos: 4 },
      { nombre: "Seminario de Investigación Aplicada", prerrequisitos: ["Métodos Cualitativos para la Administración Pública", "Métodos Cuantitativos para la Administración Pública"], creditos: 7 },
      { nombre: "Auditoría Gubernamental", prerrequisitos: ["Contabilidad Gubernamental"], creditos: 5 },
      { nombre: "Análisis Empírico de Política Pública", prerrequisitos: ["Métodos Cuantitativos para la Administración Pública"], creditos: 4 },
      { nombre: "Electivo IV", prerrequisitos: [], creditos: 5 },
      { nombre: "CFG", prerrequisitos: [], creditos: 2 }
    ]
  },
  5: {
    IX: [
      { nombre: "Evaluación de Proyectos Sociales", prerrequisitos: ["Gestión de Proyectos Sociales"], creditos: 4 },
      { nombre: "Electivo I", prerrequisitos: [], creditos: 5 },
      { nombre: "Electivo II", prerrequisitos: [], creditos: 5 },
      { nombre: "Electivo III", prerrequisitos: [], creditos: 5 },
      { nombre: "Dirección y Ética Pública", prerrequisitos: ["Análisis Integrado de los Problemas Públicos"], creditos: 4 }
    ],
    X: [
      { nombre: "Práctica Profesional", prerrequisitos: [], creditos: 30 },
      { nombre: "Examen de Título", prerrequisitos: ["Práctica Profesional"], creditos: 0 }
    ]
  }
};
