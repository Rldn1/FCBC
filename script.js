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

const modoBtn = document.getElementById('modoBtn');
let modoOscuro = false;

modoBtn.addEventListener('click', () => {
    modoOscuro = !modoOscuro;
    if (modoOscuro) {
        document.body.style.background = '#1a1a2e';
        document.body.style.color = '#eee';
        modoBtn.innerHTML = '☀️';
        modoBtn.style.background = '#E8A735';
        document.querySelectorAll('.timeline-card, .glass-card').forEach(c => {
            c.style.background = 'rgba(30, 30, 50, 0.8)';
            c.style.color = '#eee';
        });
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.style.background = '#1a1a2e';
            modal.style.color = '#eee';
        });
    } else {
        document.body.style.background = '';
        document.body.style.color = '';
        modoBtn.innerHTML = '🌙';
        modoBtn.style.background = '';
        document.querySelectorAll('.timeline-card, .glass-card').forEach(c => {
            c.style.background = '';
            c.style.color = '';
        });
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.style.background = '';
            modal.style.color = '';
        });
    }
});

// FRASES BONITAS, RECONFORTANTES Y DE MOTIVACIÓN
const frases = [
    '"La amistad es el único bug que no quiero arreglar"',
    '"Eres de esas personas que hacen que el mundo sea mejor solo con existir"',
    '"Gracias por estar siempre, incluso cuando no te lo pido"',
    '"A veces no hace falta decir nada, solo saber que estás ahí"',
    '"La vida es más bonita cuando tienes amigos como tú"',
    '"No sabes cuánto valoro cada consejo, cada risa y cada silencio compartido"',
    '"Eres luz en días grises"',
    '"Que tengas razones para sonreír siempre, te lo mereces todo"',
    '"Gracias por ser mi compañero en esta aventura llamada universidad"',
    '"La gente como tú es la que hace que valga la pena seguir adelante"'
];

document.getElementById('btnFrase')?.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    document.getElementById('fraseRandom').innerHTML = frases[randomIndex];
});

let visitas = localStorage.getItem('visitasFooter');
visitas = visitas ? parseInt(visitas) + 1 : 1;
localStorage.setItem('visitasFooter', visitas);
document.getElementById('contadorVisitas').innerText = visitas;

document.getElementById('easterEgg')?.addEventListener('click', () => {
    alert('Gracias por visitar esta página. Rataudiel es un gran amigo. 💙');
    canvasConfetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
});

const form = document.getElementById('formWhatsApp');
const successDiv = document.getElementById('mensajeExito');
// 📱 REEMPLAZAR: poner el número de WhatsApp de Rataudiel o el tuyo
const numeroTelefono = "TU_NUMERO_AQUI";
form?.addEventListener('submit', (event) => {
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

const enlace = document.getElementById('enlaceImagen');
const imagenDiv = document.getElementById('imagenOculta');

enlace?.addEventListener('click', (e) => {
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

window.addEventListener('load', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalEntrada'));
    modal.show();
    setTimeout(() => { lanzarConfetiEnModal(); }, 500);
    setTimeout(iniciarBucleInfinito, 300);
});

const btnVideo = document.getElementById('btnVideoModal');
if (btnVideo) {
    btnVideo.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('modalVideo'));
        modal.show();
    });
}

// Mostrar más de las 100 cosas (del 21 al 100)
const btnVerMas = document.getElementById('btnVerMas100');
const restoLista = document.getElementById('resto100');

if (btnVerMas && restoLista) {
    let visible = false;
    btnVerMas.addEventListener('click', () => {
        if (!visible) {
            restoLista.innerHTML = '';
            for (let i = 21; i <= 100; i++) {
                restoLista.innerHTML += `<li><i class="bi bi-plus-circle" style="color: #ccc;"></i> ${i}. Por conocer... (lo agregaré después)</li>`;
            }
            btnVerMas.textContent = 'Ver menos';
            visible = true;
        } else {
            restoLista.innerHTML = '';
            for (let i = 21; i <= 30; i++) {
                restoLista.innerHTML += `<li><i class="bi bi-plus-circle" style="color: #ccc;"></i> ${i}. Por conocer...</li>`;
            }
            btnVerMas.textContent = 'Ver más (21-100)';
            visible = false;
        }
    });
}