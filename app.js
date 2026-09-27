// ===========================================
// Palabra para hoy — lógica de la página
// Textos: Reina-Valera 1909 (dominio público), ortografía actualizada
// ===========================================

const versiculos = {
  ansioso: {
    oracion: "Señor, pongo en tus manos lo que me inquieta. Dame tu paz, que es más grande que lo que puedo entender. Amén.",
    lista: [
      { texto: "Por nada estéis afanosos; sino sean notorias vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias. Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús.", cita: "Filipenses 4:6-7" },
      { texto: "Echando toda vuestra solicitud en él, porque él tiene cuidado de vosotros.", cita: "1 Pedro 5:7" },
      { texto: "Así que, no os congojéis por el día de mañana; que el día de mañana traerá su fatiga: basta al día su afán.", cita: "Mateo 6:34 (palabras de Jesús)" }
    ]
  },
  triste: {
    oracion: "Jesús, tú conoces mi dolor. Acércate a mi corazón, consuélame y recuérdame que no estoy solo. Amén.",
    lista: [
      { texto: "Cercano está Jehová a los quebrantados de corazón; y ha salvado a los contritos de espíritu.", cita: "Salmo 34:18" },
      { texto: "Bienaventurados los que lloran: porque ellos recibirán consolación.", cita: "Mateo 5:4 (palabras de Jesús)" },
      { texto: "El sana a los quebrantados de corazón, y liga sus heridas.", cita: "Salmo 147:3" }
    ]
  },
  cansado: {
    oracion: "Señor, estoy cansado. Vengo a ti como me invitaste: renueva mis fuerzas y dame descanso. Amén.",
    lista: [
      { texto: "Venid a mí todos los que estáis trabajados y cargados, que yo os haré descansar.", cita: "Mateo 11:28 (palabras de Jesús)" },
      { texto: "Mas los que esperan a Jehová tendrán nuevas fuerzas; levantarán las alas como águilas, correrán, y no se cansarán, caminarán, y no se fatigarán.", cita: "Isaías 40:31" },
      { texto: "El da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.", cita: "Isaías 40:29" }
    ]
  },
  miedo: {
    oracion: "Dios mío, cuando tengo miedo, en ti confío. Toma mi mano y camina conmigo. Amén.",
    lista: [
      { texto: "No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo: siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.", cita: "Isaías 41:10" },
      { texto: "La paz os dejo, mi paz os doy: no como el mundo la da, yo os la doy. No se turbe vuestro corazón, ni tenga miedo.", cita: "Juan 14:27 (palabras de Jesús)" },
      { texto: "En el día que temo, yo en ti confío.", cita: "Salmo 56:3" }
    ]
  },
  confundido: {
    oracion: "Señor, no sé qué camino tomar. Ilumina mi mente, dame sabiduría y guía mis pasos. Amén.",
    lista: [
      { texto: "Fíate de Jehová de todo tu corazón, y no estribes en tu prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.", cita: "Proverbios 3:5-6" },
      { texto: "Y si alguno de vosotros tiene falta de sabiduría, demándela a Dios, el cual da a todos abundantemente, y no zahiere; y le será dada.", cita: "Santiago 1:5" },
      { texto: "Yo soy la luz del mundo: el que me sigue, no andará en tinieblas, mas tendrá la lumbre de la vida.", cita: "Juan 8:12 (palabras de Jesús)" }
    ]
  },
  agradecido: {
    oracion: "Gracias, Padre, por tu bondad y por todo lo que me has dado. Que mi vida sea un reflejo de tu amor. Amén.",
    lista: [
      { texto: "Dad gracias en todo; porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.", cita: "1 Tesalonicenses 5:18" },
      { texto: "Alabad a Jehová, porque es bueno; porque para siempre es su misericordia.", cita: "Salmo 107:1" },
      { texto: "Es por la misericordia de Jehová que no somos consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.", cita: "Lamentaciones 3:22-23" }
    ]
  },
  alegre: {
    oracion: "Señor, gracias por la alegría de este día. Que mi gozo esté en ti y pueda compartirlo con los demás. Amén.",
    lista: [
      { texto: "Este es el día que hizo Jehová: nos gozaremos y alegraremos en él.", cita: "Salmo 118:24" },
      { texto: "Gozaos en el Señor siempre: otra vez digo: Que os gocéis.", cita: "Filipenses 4:4" },
      { texto: "Estas cosas os he hablado, para que mi gozo esté en vosotros, y vuestro gozo sea cumplido.", cita: "Juan 15:11 (palabras de Jesús)" }
    ]
  }
};

const frasesArea = {
  familia: "en tu familia",
  estudios: "en tus estudios",
  trabajo: "en tu trabajo",
  salud: "en tu salud",
  amistades: "en tus amistades",
  fe: "en tu relación con Dios",
  general: "en este día"
};

// ----- Referencias al DOM -----
const $ = (id) => document.getElementById(id);
const form = $("formAnimo");
const radiosAnimo = document.querySelectorAll('input[name="animo"]');
const chkCorreo = $("recibirCorreo");
const correo = $("correo");
const oracion = $("oracion");

let actual = { animo: null, indice: 0 };
const guardados = [];

// ----- El color de la página cambia al elegir un ánimo -----
radiosAnimo.forEach((radio) => {
  radio.addEventListener("change", () => {
    document.body.dataset.animo = radio.value;
  });
});

// ----- El correo solo es obligatorio si activan esa opción -----
chkCorreo.addEventListener("change", () => {
  $("bloqueCorreo").classList.toggle("d-none", !chkCorreo.checked);
  correo.required = chkCorreo.checked;
  if (!chkCorreo.checked) correo.value = "";
});

// ----- Contador de caracteres -----
oracion.addEventListener("input", () => {
  $("contador").textContent = oracion.value.length;
});

// ----- Envío con validación visual de Bootstrap -----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.add("was-validated");
  if (!form.checkValidity()) return;

  const animo = form.animo.value;
  const lista = versiculos[animo].lista;
  actual = { animo, indice: Math.floor(Math.random() * lista.length) };
  mostrarVersiculo();

  if ($("guardar").checked) guardarActual();

  // En celular, bajar hasta el resultado
  $("resultado").scrollIntoView({ behavior: "smooth", block: "start" });
});

form.addEventListener("reset", () => {
  form.classList.remove("was-validated");
  delete document.body.dataset.animo;
  $("bloqueCorreo").classList.add("d-none");
  correo.required = false;
  $("contador").textContent = "0";
  $("vacio").classList.remove("d-none");
  $("contenido").classList.add("d-none");
});

// ----- Mostrar el versículo -----
function mostrarVersiculo() {
  const nombre = form.nombre.value.trim().split(" ")[0];
  const area = frasesArea[form.area.value];
  const datos = versiculos[actual.animo];
  const v = datos.lista[actual.indice];

  $("saludo").textContent = `${nombre}, esta es una palabra para ti ${area}:`;
  $("textoVersiculo").textContent = `«${v.texto}»`;
  $("citaVersiculo").textContent = v.cita;

  // Oración sugerida (checkbox)
  $("bloqueOracion").classList.toggle("d-none", !$("verOracion").checked);
  $("textoOracion").textContent = datos.oracion;

  // Oración escrita por la persona (textarea)
  const escrita = oracion.value.trim();
  $("bloqueTuOracion").classList.toggle("d-none", escrita === "");
  $("textoTuOracion").textContent = escrita;

  // Confirmación del correo
  const aviso = $("avisoCorreo");
  aviso.classList.toggle("d-none", !chkCorreo.checked);
  aviso.textContent = `Te enviaremos un versículo cada mañana a ${correo.value}.`;

  $("vacio").classList.add("d-none");
  const contenido = $("contenido");
  contenido.classList.remove("d-none", "aparecer");
  void contenido.offsetWidth; // reinicia la animación
  contenido.classList.add("aparecer");
}

// ----- Botón "Otro versículo" -----
$("otro").addEventListener("click", () => {
  const total = versiculos[actual.animo].lista.length;
  actual.indice = (actual.indice + 1) % total;
  mostrarVersiculo();
  if ($("guardar").checked) guardarActual();
});

// ----- Botón "Copiar" -----
$("copiar").addEventListener("click", async () => {
  const v = versiculos[actual.animo].lista[actual.indice];
  const boton = $("copiar");
  try {
    await navigator.clipboard.writeText(`«${v.texto}» ${v.cita}`);
    boton.textContent = "Copiado";
  } catch {
    boton.textContent = "No se pudo copiar";
  }
  setTimeout(() => (boton.textContent = "Copiar"), 1800);
});

// ----- Lista de versículos guardados -----
function guardarActual() {
  const v = versiculos[actual.animo].lista[actual.indice];
  if (guardados.some((g) => g.cita === v.cita)) return; // evita repetidos
  guardados.unshift(v);

  $("sinGuardados").classList.add("d-none");
  const li = document.createElement("li");
  const cita = document.createElement("span");
  cita.className = "cita-mini";
  cita.textContent = v.cita;
  li.append(cita, `«${v.texto}»`);
  $("listaGuardados").prepend(li);
}
