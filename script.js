const textoCompleto = "FELIZ CUMPLEAÑOS, RATAUDIEL";
const tituloElement = document.getElementById('tituloDinamico');

function escribirTexto(indice, callback) {
    if (indice <= textoCompleto.length) {
        tituloElement.innerHTML = textoCompleto.substring(0, indice) + '<span class="cursor-parpadeante"></span>';
        setTimeout(() => escribirTexto(indice + 1, callback), 80);
    } else {
        tituloElement.innerHTML = textoCompleto + '<span class="cursor-parpadeante"></span>';
        if (callback) setTimeout(callback, 2000);
    }
}

function borrarTexto(indice, callback) {
    if (indice >= 0) {
        tituloElement.innerHTML = textoCompleto.substring(0, indice) + '<span class="cursor-parpadeante"></span>';
        setTimeout(() => borrarTexto(indice - 1, callback), 60);
    } else {
        tituloElement.innerHTML = '<span class="cursor-parpadeante"></span>';
        if (callback) setTimeout(callback, 500);
    }
}

function iniciarBucleInfinito() {
    function ciclo() {
        escribirTexto(0, () => {
            borrarTexto(textoCompleto.length, () => {
                ciclo();
            });
        });
    }
    ciclo();
}

let confetiActivo = false;
let intervaloConfeti = null;

function lanzarConfetiEnModal() {
    if (confetiActivo) return;
    confetiActivo = true;
    
    intervaloConfeti = setInterval(() => {
        const modal = document.getElementById('modalEntrada');
        const modalVisible = modal.classList.contains('show');
        
        if (modalVisible) {
            canvasConfetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.7 },
                startVelocity: 15,
                colors: ['#0A1F5C', '#0D2A6B', '#E8A735', '#D48C54', '#2B5F8A']
            });
        } else {
            clearInterval(intervaloConfeti);
            confetiActivo = false;
        }
    }, 1800);
}

// Modo oscuro
const modoBtn = document.getElementById('modoBtn');
modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        modoBtn.innerHTML = '☀️';
        modoBtn.style.background = '#E8A735';
    } else {
        modoBtn.innerHTML = '🌙';
        modoBtn.style.background = '';
    }
});

// Frases para el botón del footer
const frasesFooter = [
     '"La amistad es el único bug que no quiero arreglar"',
    '"Eres de esas personas que hacen que el mundo sea mejor solo con existir"',
    '"Gracias por estar siempre, incluso cuando no te lo pido"',
    '"A veces no hace falta decir nada, solo saber que estás ahí"',
    '"La vida es más bonita cuando tienes amigos como tú"',
    '"No sabes cuánto valoro cada consejo, cada risa y cada silencio compartido"',
    '"Que tengas razones para sonreír siempre, te lo mereces todo"',
    '"Gracias por ser mi compañero en esta aventura llamada universidad"',
    '"La gente como tú es la que hace que valga la pena seguir adelante"'
];

const btnFraseFooter = document.getElementById('btnFraseFooter');
if (btnFraseFooter) {
    btnFraseFooter.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * frasesFooter.length);
        const fraseElement = document.getElementById('fraseRandomFooter');
        if (fraseElement) fraseElement.innerHTML = frasesFooter[randomIndex];
    });
}

// Easter egg del footer (mensaje secreto)
const easterEggFooter = document.getElementById('easterEggFooter');
if (easterEggFooter) {
    easterEggFooter.addEventListener('click', function() {
        alert('🐹 ¡Hola! Gracias por visitar esta página. Rataudiel es un amigo increíble. Cuídalo mucho. 💙');
        canvasConfetti({ particleCount: 120, spread: 80, origin: { y: 0.8 } });
    });
}

// WhatsApp
const form = document.getElementById('formWhatsApp');
const successDiv = document.getElementById('mensajeExito');
const numeroTelefono = "+50360015036";
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const mensaje = document.getElementById('mensaje').value;
        const url = `https://wa.me/${numeroTelefono}?text=*Mensaje para Rataudiel*%0A%0A*De:* ${nombre}%0A*Mensaje:* ${mensaje}`;
        successDiv.classList.remove('d-none');
        setTimeout(() => { 
            window.open(url, '_blank'); 
            form.reset(); 
            setTimeout(() => successDiv.classList.add('d-none'), 5000); 
        }, 1000);
    });
}

// Imagen sorpresa
const enlace = document.getElementById('enlaceImagen');
const imagenDiv = document.getElementById('imagenOculta');
if (enlace) {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        if (imagenDiv.style.display === 'none' || imagenDiv.style.display === '') {
            imagenDiv.style.display = 'block';
            enlace.textContent = 'Ocultar imagen';
            canvasConfetti({ particleCount: 50, spread: 40, origin: { y: 0.8 } });
        } else {
            imagenDiv.style.display = 'none';
            enlace.textContent = 'Haz click aquí';
        }
    });
}

// Modal de video
const btnVideo = document.getElementById('btnVideoModal');
if (btnVideo) {
    btnVideo.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('modalVideo'));
        modal.show();
    });
}

// ========== CONTADOR DE DÍAS DESDE 2022 ==========
function calcularDiasAmistad() {
    const fechaInicio = new Date(2022, 0, 1);
    const hoy = new Date();
    fechaInicio.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);
    const diffTime = hoy - fechaInicio;
    const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const contadorDias = document.getElementById('contadorDias');
    if (contadorDias) contadorDias.innerText = diffDias;
}

// ========== DATO RANDOM ==========
const datosRandom = [
    "🐹 Le encanta el azul profundo",
    "☕ Hace frappes casi todos los días",
    "🎮 Su juego favorito es Minecraft",
    "🎧 Escucha música a diario",
    "🍜 Su comida favorita es la comida china",
    "🎬 Su actor favorito es Keanu Reeves",
    "👤 Su personaje masculino fav: Yami (Black Clover)",
    "👩 Su personaje femenino fav: Katara (Avatar)",
    "📚 Estudia Ing. en Sistemas",
    "🙏 Es católico y muy dedicado a su fe",
    "💪 Es muy inteligente y destacado académicamente",
    "🤝 Es solidario y servicial",
    "💙 No tiene envidia, quiere que todos tengan lo mismo",
    "🎓 Compartimos el mismo programa de becas",
    "🏫 Estamos en el mismo voluntariado",
    "🚌 Salida pendiente en bus",
    "🍪 Recuerdo: la primera ayuda sin pedirla",
    "💬 Su frase: 'Buenísimo, creo'"
];

function mostrarDatoRandom() {
    const randomIndex = Math.floor(Math.random() * datosRandom.length);
    const datoElement = document.getElementById('datoRandomRataudiel');
    if (datoElement) datoElement.innerHTML = datosRandom[randomIndex];
}

// ========== 100 COSAS (primeras 20 reales, luego "Por conocer") ==========
const cosasReales = [
    "Su color favorito es el azul profundo",
    "Escucha música a diario",
    "Su película favorita es Avatar (los Navi)",
    "Juega Minecraft",
    "Le encanta la comida china",
    "Hace frappes casi todos los días",
    "Su personaje masculino favorito: Yami (Black Clover)",
    "Su personaje femenino favorito: Katara (Avatar)",
    "Su frase típica: 'Buenísimo, creo'",
    "Me ayudó con un examen sin que se lo pidiera",
    "Es católico y muy dedicado a su fe",
    "Estudiamos juntos Ing. en Sistemas",
    "Estamos en el mismo voluntariado",
    "Compartimos el mismo programa de becas",
    "Es muy inteligente y destacado académicamente",
    "Es solidario y servicial",
    "No tiene envidia, quiere que todos tengan lo mismo",
    "Sabe escuchar y dar consejos",
    "Cuando algo no le gusta, lo habla en privado",
    "Siempre hace espacio para sus amigos aunque esté ocupado"
];

// Generar del 21 al 100 como "Por conocer..."
for (let i = 21; i <= 100; i++) {
    cosasReales.push(`Por conocer... (dato ${i})`);
}

function mostrarCosas(limit) {
    const container = document.getElementById('contenedor100Cosas');
    if (!container) return;
    
    const cosasMostrar = cosasReales.slice(0, limit);
    
    const col1 = cosasMostrar.filter((_, idx) => idx % 3 === 0);
    const col2 = cosasMostrar.filter((_, idx) => idx % 3 === 1);
    const col3 = cosasMostrar.filter((_, idx) => idx % 3 === 2);
    
    let html = `<div class="row">`;
    html += `<div class="col-md-4"><ul class="list-unstyled">${col1.map((item, i) => `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${i*3+1}. ${item}</li>`).join('')}</ul></div>`;
    html += `<div class="col-md-4"><ul class="list-unstyled">${col2.map((item, i) => `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${i*3+2}. ${item}</li>`).join('')}</ul></div>`;
    html += `<div class="col-md-4"><ul class="list-unstyled">${col3.map((item, i) => `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${i*3+3}. ${item}</li>`).join('')}</ul></div>`;
    html += `</div>`;
    
    if (limit < cosasReales.length) {
        html += `<div class="text-center mt-4"><button id="btnLeerMas" class="btn-ver-mas"><i class="bi bi-arrow-down-circle"></i> Leer más (${cosasReales.length - limit} restantes)</button></div>`;
    } else {
        html += `<div class="text-center mt-3 fst-italic text-muted">🐹 100 cosas que hacen a Rataudiel único 🐹</div>`;
    }
    
    container.innerHTML = html;
    
    const btnLeerMas = document.getElementById('btnLeerMas');
    if (btnLeerMas) {
        btnLeerMas.addEventListener('click', () => {
            mostrarCosas(cosasReales.length);
            window.scrollTo({ top: document.getElementById('100cosas').offsetTop - 80, behavior: 'smooth' });
        });
    }
}

// ========== INICIALIZACIÓN ==========
window.addEventListener('load', () => {
    mostrarCosas(30);
    calcularDiasAmistad();
    mostrarDatoRandom();
    
    // Cambiar dato random cada 30 segundos
    setInterval(mostrarDatoRandom, 30000);
    
    const modal = new bootstrap.Modal(document.getElementById('modalEntrada'));
    modal.show();
    setTimeout(() => { lanzarConfetiEnModal(); }, 500);
    setTimeout(iniciarBucleInfinito, 300);
});