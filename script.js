const ramos = [
    { id: "mat1", nombre: "🎓 Matemática para la Gestión I", color: "#ffe0eb", prereq: [] },
    { id: "intro", nombre: "🎓 Introducción a la Gestión Pública", color: "#ffe0eb", prereq: [] },
    { id: "histinst", nombre: "🎓 Historia de las Instituciones Políticas de Chile", color: "#ffe0eb", prereq: [] },
    { id: "sistemasinfo", nombre: "🎓 Tecnologías y Sistemas de Información", color: "#ffe0eb", prereq: [] },
    { id: "basesjur", nombre: "🎓 Bases Jurídicas para la Administración del Estado", color: "#ffe0eb", prereq: [] },
    { id: "ingles1", nombre: "🎓 Inglés I", color: "#ffe0eb", prereq: [] },
    { id: "curso1", nombre: "🎓 Curso Libre I", color: "#ffe0eb", prereq: [] },
    { id: "mat2", nombre: "📘 Matemática para la Gestión II", color: "#fce1ff", prereq: ["mat1"] },
    { id: "evo", nombre: "📘 Evolución y Complejidad de la Administración Pública", color: "#fce1ff", prereq: ["intro"] },
    { id: "ideas", nombre: "📘 Ideas y Debates Políticos Contemporáneos", color: "#fce1ff", prereq: [] },
    { id: "epistem", nombre: "📘 Epistemología de las Ciencias Sociales", color: "#fce1ff", prereq: [] },
    { id: "marconorm1", nombre: "📘 Marco Normativo I", color: "#fce1ff", prereq: ["basesjur"] },
    { id: "ingles2", nombre: "📘 Inglés II", color: "#fce1ff", prereq: ["ingles1"] },
    { id: "curso2", nombre: "📘 Curso Libre II", color: "#fce1ff", prereq: ["curso1"] },
    { id: "estad1", nombre: "📊 Estadística para la Gestión I", color: "#d1f5f0", prereq: ["mat2"] },
    { id: "admin", nombre: "📊 Comportamiento Humano en la Organización", color: "#d1f5f0", prereq: ["evo"] },
    { id: "fenomenos", nombre: "📊 Fenómenos Políticos", color: "#d1f5f0", prereq: ["ideas"] },
    { id: "micro", nombre: "📊 Microeconomía para la Gestión Pública", color: "#d1f5f0", prereq: ["mat2"] },
    { id: "marconorm2", nombre: "📊 Marco Normativo II", color: "#d1f5f0", prereq: ["marconorm1"] },
    { id: "metodocuali", nombre: "📊 Métodos Cualitativos", color: "#d1f5f0", prereq: ["epistem"] },
    { id: "polintl", nombre: "🌍 Política Internacional", color: "#fef5d6", prereq: ["fenomenos"] },
    { id: "diseñoorg", nombre: "🌍 Diseño Organizacional", color: "#fef5d6", prereq: ["admin"] },
    { id: "metodocuanti", nombre: "🌍 Métodos Cuantitativos", color: "#fef5d6", prereq: ["estad1"] },
    { id: "planeamiento", nombre: "🌍 Planeamiento Estratégico", color: "#fef5d6", prereq: ["diseñoorg"] },
    { id: "gestionfin", nombre: "🌍 Gestión Financiera Pública", color: "#fef5d6", prereq: ["micro"] },
    { id: "negociacion", nombre: "🧠 Negociación y Resolución de Conflictos", color: "#e3f0ff", prereq: ["admin"] },
    { id: "polpublica", nombre: "🧠 Ciclo y Evaluación de Políticas Públicas", color: "#e3f0ff", prereq: ["planeamiento"] },
    { id: "contabilidad", nombre: "🧠 Contabilidad Gubernamental", color: "#e3f0ff", prereq: ["gestionfin"] },
    { id: "gestionpersonas", nombre: "🧠 Gestión de Personas", color: "#e3f0ff", prereq: ["diseñoorg"] },
    { id: "gestionproy", nombre: "🧠 Gestión de Proyectos", color: "#e3f0ff", prereq: ["planeamiento"] },
    { id: "electivo1", nombre: "📈 Electivo I", color: "#fdebd0", prereq: [] },
    { id: "analisisempirico", nombre: "📈 Análisis Empírico de Políticas", color: "#fdebd0", prereq: ["metodocuanti", "metodocuali"] },
    { id: "electivo2", nombre: "📈 Electivo II", color: "#fdebd0", prereq: ["electivo1"] },
    { id: "electivo3", nombre: "📈 Electivo III", color: "#fdebd0", prereq: ["electivo2"] },
    { id: "cfg", nombre: "📈 Curso de Formación General", color: "#fdebd0", prereq: [] },
    { id: "asesoria", nombre: "💼 Simulación de Asesoría Política", color: "#dcd6f7", prereq: ["gestionproy"] },
    { id: "practica", nombre: "🎓 Práctica Profesional", color: "#fff0f0", prereq: ["polpublica"] },
    { id: "examen", nombre: "🎓 Examen de Título", color: "#fff0f0", prereq: ["analisisempirico"] },
];

function crearMalla() {
    const container = document.getElementById("malla");
    ramos.forEach(ramo => {
        const div = document.createElement("div");
        div.className = "ramo locked";
        div.id = ramo.id;
        div.style.backgroundColor = ramo.color;
        div.innerHTML = `
            <strong>${ramo.nombre}</strong><br>
            <button onclick="marcarAprobado('${ramo.id}')">Aprobar</button>
        `;
        container.appendChild(div);
    });
    actualizarMalla();
}

function marcarAprobado(id) {
    document.getElementById(id).classList.add("approved");
    actualizarMalla();
}

function actualizarMalla() {
    ramos.forEach(ramo => {
        const div = document.getElementById(ramo.id);
        const aprobado = div.classList.contains("approved");
        if (aprobado) {
            div.classList.remove("locked");
        } else {
            const requisitos = ramo.prereq.map(p => document.getElementById(p).classList.contains("approved"));
            if (requisitos.every(Boolean)) {
                div.classList.remove("locked");
            } else {
                div.classList.add("locked");
            }
        }
    });
}

window.onload = crearMalla;
