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
    '"La amistad es como el café: calienta el alma."',
    '"Eres de esas personas que hacen que el mundo sea mejor."',
    '"Gracias por estar siempre, incluso cuando no te lo pido."',
    '"Un bug sin solución... llamarse Rataudiel"',
    '"De la U a la vida, siempre cómplices."',
    '"El introvertido que me adoptó."',
    '"Contigo los frappes saben mejor."',
    '"Buenísimo, creo."'
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

// ========== 100 COSAS ==========
const todasLasCosas = [
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

// Completar hasta 100 con "Por conocer..."
for (let i = todasLasCosas.length + 1; i <= 100; i++) {
    todasLasCosas.push(`Por conocer... (dato ${i})`);
}

let cosasExpandidas = false;

function mostrarCosas() {
    const container = document.getElementById('contenedor100Cosas');
    if (!container) return;
    
    let html = `<div class="row">`;
    
    if (!cosasExpandidas) {
        // Modo contraído: mostrar solo 30 cosas (10 por columna)
        const primeras30 = todasLasCosas.slice(0, 30);
        
        // Dividir en 3 columnas de 10 elementos cada una
        const col1 = primeras30.slice(0, 10);
        const col2 = primeras30.slice(10, 20);
        const col3 = primeras30.slice(20, 30);
        
        // Columna 1 (1-10)
        html += `<div class="col-md-4">`;
        html += `<ul class="list-unstyled">`;
        col1.forEach((item, idx) => {
            html += `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${idx + 1}. ${item}</li>`;
        });
        html += `</ul></div>`;
        
        // Columna 2 (11-20)
        html += `<div class="col-md-4">`;
        html += `<ul class="list-unstyled">`;
        col2.forEach((item, idx) => {
            html += `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${11 + idx}. ${item}</li>`;
        });
        html += `</ul></div>`;
        
        // Columna 3 (21-30)
        html += `<div class="col-md-4">`;
        html += `<ul class="list-unstyled">`;
        col3.forEach((item, idx) => {
            html += `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${21 + idx}. ${item}</li>`;
        });
        html += `</ul></div>`;
        
        html += `</div>`;
        html += `<div class="text-center mt-4"><button id="btnVerMas" class="btn-ver-mas"><i class="bi bi-arrow-down-circle"></i> Ver más (${todasLasCosas.length - 30} restantes)</button></div>`;
        
    } else {
        // Modo expandido: mostrar las 100 cosas en columnas 1-33, 34-66, 67-100
        const col1 = todasLasCosas.slice(0, 33);
        const col2 = todasLasCosas.slice(33, 66);
        const col3 = todasLasCosas.slice(66, 100);
        
        // Columna 1 (1-33)
        html += `<div class="col-md-4">`;
        html += `<ul class="list-unstyled">`;
        col1.forEach((item, idx) => {
            html += `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${idx + 1}. ${item}</li>`;
        });
        html += `</ul></div>`;
        
        // Columna 2 (34-66)
        html += `<div class="col-md-4">`;
        html += `<ul class="list-unstyled">`;
        col2.forEach((item, idx) => {
            html += `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${34 + idx}. ${item}</li>`;
        });
        html += `</ul></div>`;
        
        // Columna 3 (67-100)
        html += `<div class="col-md-4">`;
        html += `<ul class="list-unstyled">`;
        col3.forEach((item, idx) => {
            html += `<li><i class="bi bi-check-circle-fill" style="color: var(--color-detalle);"></i> ${67 + idx}. ${item}</li>`;
        });
        html += `</ul></div>`;
        
        html += `</div>`;
        html += `<div class="text-center mt-4"><button id="btnVerMenos" class="btn-ver-mas"><i class="bi bi-arrow-up-circle"></i> Ver menos</button></div>`;
        html += `<div class="text-center mt-2 fst-italic text-muted">🐹 100 cosas que hacen a Rataudiel único 🐹</div>`;
    }
    
    container.innerHTML = html;
    
    // Evento "Ver más"
    const btnVerMas = document.getElementById('btnVerMas');
    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            cosasExpandidas = true;
            mostrarCosas();
            window.scrollTo({ top: document.getElementById('100cosas').offsetTop - 80, behavior: 'smooth' });
        });
    }
    
    // Evento "Ver menos"
    const btnVerMenos = document.getElementById('btnVerMenos');
    if (btnVerMenos) {
        btnVerMenos.addEventListener('click', () => {
            cosasExpandidas = false;
            mostrarCosas();
            window.scrollTo({ top: document.getElementById('100cosas').offsetTop - 80, behavior: 'smooth' });
        });
    }
}

// ========== INICIALIZACIÓN ==========
window.addEventListener('load', () => {
    mostrarCosas();
    calcularDiasAmistad();
    mostrarDatoRandom();
    
    setInterval(mostrarDatoRandom, 3000);
    
    const modal = new bootstrap.Modal(document.getElementById('modalEntrada'));
    modal.show();
    setTimeout(() => { lanzarConfetiEnModal(); }, 500);
    setTimeout(iniciarBucleInfinito, 300);
});