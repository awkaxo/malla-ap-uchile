const cursos = [
  // Primer año, semestre I
  { id: "mat1", nombre: "Matemática para la Gestión I", creditos: 5, prereqs: [], semestre: "I" },
  { id: "ing1", nombre: "Inglés I", creditos: 3, prereqs: [], semestre: "I" },
  { id: "hist", nombre: "Historia de las Instituciones Políticas y Administrativas de Chile", creditos: 5, prereqs: [], semestre: "I" },
  { id: "tec", nombre: "Tecnologías y Sistemas de Información", creditos: 3, prereqs: [], semestre: "I" },
  { id: "bases", nombre: "Bases Jurídicas para la Administración del Estado", creditos: 5, prereqs: [], semestre: "I" },
  { id: "libre1", nombre: "Curso Libre", creditos: 2, prereqs: [], semestre: "I" },
  // Primer año, semestre II
  { id: "mat2", nombre: "Matemática para la Gestión II", creditos: 5, prereqs: ["mat1"], semestre: "II" },
  { id: "evol", nombre: "Evolución y Complejidad de la Administración Pública", creditos: 6, prereqs: ["ing1"], semestre: "II" }, // en la tabla pusiste "Introducción a la Gestión Pública" pero no aparece, asumí inglés1
  { id: "debates", nombre: "Ideas y Debates Políticos Contemporáneos", creditos: 5, prereqs: ["hist"], semestre: "II" },
  { id: "epist", nombre: "Epistemología de las Ciencias Sociales", creditos: 5, prereqs: [], semestre: "II" },
  { id: "marco1", nombre: "Marco Normativo para la Acción Administrativa I", creditos: 5, prereqs: ["bases"], semestre: "II" },
  { id: "ing2", nombre: "Inglés II", creditos: 3, prereqs: ["ing1"], semestre: "II" },
  // Segundo año, semestre III
  { id: "estad1", nombre: "Estadística para la Gestión I", creditos: 5, prereqs: ["mat2"], semestre: "III" },
  { id: "dinam", nombre: "Dinámicas de la Administración Pública Chilena", creditos: 6, prereqs: ["evol"], semestre: "III" },
  { id: "fenom", nombre: "Estudio de los Fenómenos Políticos", creditos: 5, prereqs: ["debates"], semestre: "III" },
  { id: "metod", nombre: "Metodología de la Investigación en Administración Pública", creditos: 5, prereqs: ["epist"], semestre: "III" },
  { id: "marco2", nombre: "Marco Normativo para la Acción Administrativa II", creditos: 5, prereqs: ["marco1"], semestre: "III" },
  { id: "ing3", nombre: "Inglés III", creditos: 3, prereqs: ["ing2"], semestre: "III" },
  // Segundo año, semestre IV
  { id: "estad2", nombre: "Estadística para la Gestión II", creditos: 5, prereqs: ["estad1"], semestre: "IV" },
  { id: "diseño", nombre: "Diseño Organizacional", creditos: 8, prereqs: ["dinam"], semestre: "IV" },
  { id: "adm_fen", nombre: "La Administración Pública y los Fenómenos Políticos", creditos: 5, prereqs: ["fenom"], semestre: "IV" },
  { id: "metodCual", nombre: "Métodos Cualitativos para la Administración Pública", creditos: 5, prereqs: ["metod"], semestre: "IV" },
  { id: "cfg2", nombre: "CFG", creditos: 2, prereqs: [], semestre: "IV" },
  { id: "ing4", nombre: "Inglés IV", creditos: 3, prereqs: ["ing3"], semestre: "IV" },
  { id: "comport", nombre: "Comportamiento Humano en la Organización", creditos: 4, prereqs: [], semestre: "IV" },
  // Tercer año, semestre V
  { id: "fenMicro", nombre: "Fenómenos Microeconómicos", creditos: 4, prereqs: ["mat2"], semestre: "V" },
  { id: "gestProc", nombre: "Gestión de Procesos en Organizaciones Públicas", creditos: 6, prereqs: ["diseño"], semestre: "V" },
  { id: "analInt", nombre: "Análisis Político Internacional", creditos: 4, prereqs: ["adm_fen"], semestre: "V" },
  { id: "metCuant", nombre: "Métodos Cuantitativos para la Adm. Pública", creditos: 5, prereqs: ["estad2"], semestre: "V" },
  { id: "basesCont", nombre: "Bases Contables para la Gestión Pública", creditos: 4, prereqs: [], semestre: "V" },
  { id: "marcoPol", nombre: "Marco Analítico de las Políticas Públicas", creditos: 4, prereqs: ["metodCual"], semestre: "V" },
  // Tercer año, semestre VI
  { id: "fenMacro", nombre: "Fenómenos Macroeconómicos", creditos: 4, prereqs: ["fenMicro"], semestre: "VI" },
  { id: "planEstr", nombre: "Planificación Estratégica en Organizaciones Públicas", creditos: 6, prereqs: ["gestProc"], semestre: "VI" },
  { id: "negoci", nombre: "Negociación y Toma de Decisiones", creditos: 4, prereqs: ["comport"], semestre: "VI" },
  { id: "gestTerr", nombre: "Gestión Territorial y Descentralización", creditos: 4, prereqs: ["marco2"], semestre: "VI" },
  { id: "gestFin", nombre: "Gestión Financiera del Estado", creditos: 5, prereqs: ["basesCont"], semestre: "VI" },
  { id: "formPol", nombre: "Formulación e Implementación de Políticas Públicas", creditos: 4, prereqs: ["marcoPol"], semestre: "VI" },
  { id: "gestPers", nombre: "Gestión de Personas en Org. Públicas", creditos: 4, prereqs: ["comport"], semestre: "VI" },
  // Cuarto año, semestre VII
  { id: "ecoSec", nombre: "Economía del Sector Público", creditos: 4, prereqs: ["fenMacro", "fenMicro"], semestre: "VII" },
  { id: "controlEval", nombre: "Control y Evaluación en Organizaciones Públicas", creditos: 6, prereqs: ["planEstr"], semestre: "VII" },
  { id: "analProb", nombre: "Análisis Integrado de los Problemas Públicos", creditos: 8, prereqs: ["formPol"], semestre: "VII" },
  { id: "contGov", nombre: "Contabilidad Gubernamental", creditos: 5, prereqs: ["gestFin"], semestre: "VII" },
  { id: "evalPol", nombre: "Evaluación de Políticas Públicas", creditos: 4, prereqs: ["formPol"], semestre: "VII" },
  { id: "libre4", nombre: "Curso Libre", creditos: 2, prereqs: [], semestre: "VII" },
  // Cuarto año, semestre VIII
  { id: "gestProy", nombre: "Gestión de Proyectos Sociales", creditos: 4, prereqs: ["evalPol"], semestre: "VIII" },
  { id: "simAses", nombre: "Simulación de Asesoría", creditos: 7, prereqs: ["controlEval"], semestre: "VIII" },
  { id: "comunEst", nombre: "Comunicación Estratégica y Marketing Político", creditos: 4, prereqs: [], semestre: "VIII" }, // Sin prereqs visible
  { id: "semInvest", nombre: "Seminario de Investigación Aplicada", creditos: 7, prereqs: ["metCuant", "metodCual"], semestre: "VIII" },
  { id: "audGov", nombre: "Auditoría Gubernamental", creditos: 5, prereqs: ["contGov"], semestre: "VIII" },
  { id: "analEmp", nombre: "Análisis Empírico de Política Pública", creditos: 4, prereqs: ["metCuant"], semestre: "VIII" },
  { id: "elect4", nombre: "Electivo IV", creditos: 5, prereqs: [], semestre: "VIII" },
  { id: "cfg8", nombre: "CFG", creditos: 2, prereqs: [], semestre: "VIII" },
  // Quinto año, semestre IX
  { id: "evalProy", nombre: "Evaluación de Proyectos Sociales", creditos: 4, prereqs: ["gestProy"], semestre: "IX" },
  { id: "elect1", nombre: "Electivo I", creditos: 5, prereqs: [], semestre: "IX" },
  { id: "elect2", nombre: "Electivo II", creditos: 5, prereqs: [], semestre: "IX" },
  { id: "elect3", nombre: "Electivo III", creditos: 5, prereqs: [], semestre: "IX" },
  { id: "dirEtica", nombre: "Dirección y Ética Pública", creditos: 4, prereqs: ["analProb"], semestre: "IX" },
  // Quinto año, semestre X
  { id: "pracProf", nombre: "Práctica Profesional", creditos: 30, prereqs: cursos.filter(c => c.semestre !== "X").map(c => c.id), semestre: "X" }, // prereq todos los cursos anteriores
  { id: "examenTit", nombre: "Examen de Título", creditos: 0, prereqs: ["pracProf"], semestre: "X" }
];

// Función para cargar progreso guardado
function cargarProgreso() {
  const json = localStorage.getItem("progreso_malla");
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
}

// Guardar progreso
function guardarProgreso(progreso) {
  localStorage.setItem("progreso_malla", JSON.stringify(progreso));
}

// Verificar si se cumplen prerrequisitos
function sePuedeMarcar(curso, progreso) {
  return curso.prereqs.every(pr => progreso[pr] === true);
}

// Renderizar cursos
function renderizarCursos() {
  const contenedor = document.getElementById("contenedor-cursos");
  contenedor.innerHTML = "";

  const progreso = cargarProgreso();

  // Agrupar cursos por semestre
  const semestres = {};
  cursos.forEach(c => {
    if (!semestres[c.semestre]) semestres[c.semestre] = [];
    semestres[c.semestre].push(c);
  });

  // Contador créditos
  let creditosAprobados = 0;

  for (const semestre of Object.keys(semestres).sort()) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const h3 = document.createElement("h3");
    h3.textContent = `Semestre ${semestre}`;
    divSemestre.appendChild(h3);

    for (const curso of semestres[semestre]) {
      const divCurso = document.createElement("div");
      divCurso.className = "curso";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = curso.id;
      checkbox.disabled = !sePuedeMarcar(curso, progreso);
      checkbox.checked = progreso[curso.id] || false;

      checkbox.addEventListener("change", () => {
        progreso[curso.id] = checkbox.checked;
        guardarProgreso(progreso);
        renderizarCursos();
        mostrarMensajeDesbloqueo(curso.nombre);
      });

      const label = document.createElement("label");
      label.htmlFor = curso.id;
      label.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

      divCurso.appendChild(checkbox);
      divCurso.appendChild(label);
      divSemestre.appendChild(divCurso);

      if (checkbox.checked) creditosAprobados += curso.creditos;
    }

    contenedor.appendChild(divSemestre);
  }

  // Actualizar contador
  document.getElementById("creditos").textContent = `Créditos aprobados: ${creditosAprobados}`;
}

// Mensaje temporal de curso desbloqueado
function mostrarMensajeDesbloqueo(nombreCurso) {
  const mensaje = document.getElementById("mensaje-desbloqueo");
  mensaje.textContent = `¡Curso desbloqueado! 🎉 - ${nombreCurso}`;
  mensaje.style.display = "block";
  mensaje.style.opacity = "1";

  setTimeout(() => {
    mensaje.style.opacity = "0";
    setTimeout(() => (mensaje.style.display = "none"), 500);
  }, 2000);
}

// Inicializar
document.addEventListener("DOMContentLoaded", renderizarCursos);
