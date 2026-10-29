// ---- Autoajuste de la ruta de imágenes ----
// Prueba img/ y, si no carga, ../img/ y ../../img/ (por si la carpeta img está en un nivel superior)
(function(){
  const rutas=['img/','../img/','../../img/'];
  function arreglar(img){
    if(img.dataset.cargando==='1') return;
    const src=img.getAttribute('src')||'';
    if(!/^(\.\.\/)*img\//.test(src)) return;
    const archivo=src.replace(/^(\.\.\/)*img\//,'');
    const i=parseInt(img.dataset.rutaIdx||'0',10)+1;
    if(i>=rutas.length) return;
    img.dataset.rutaIdx=i; img.dataset.cargando='1';
    img.src=rutas[i]+archivo;
  }
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('load',()=>{ img.dataset.cargando='0'; });
    img.addEventListener('error',()=>{ img.dataset.cargando='0'; arreglar(img); });
    if(img.complete && img.naturalWidth===0) arreglar(img);
  });
})();

// ---- Marcos de fotos: mismo tamaño y foto completa sobre fondo difuminado ----
(function(){
  const reglas=[['.car-slide > img','wide'],['.gal-item > img','sq'],['.frase-img > img','tall']];
  reglas.forEach(([sel,cls])=>{
    document.querySelectorAll(sel).forEach(img=>{
      const marco=document.createElement('div'); marco.className='fit '+cls;
      img.parentNode.insertBefore(marco,img); marco.appendChild(img);
      const poner=()=>marco.style.setProperty('--fit-bg','url("'+(img.currentSrc||img.src)+'")');
      img.addEventListener('load',poner); if(img.complete) poner();
    });
  });
})();

// ---- Título con efecto de escritura ----
const textoCompleto = "Feliz cumpleaños, Rataudiel";
const tituloEl = document.getElementById('tituloDinamico');
function escribir(i,cb){
  if(i<=textoCompleto.length){ tituloEl.innerHTML = textoCompleto.slice(0,i)+'<span style="opacity:.6">|</span>'; setTimeout(()=>escribir(i+1,cb),75); }
  else { tituloEl.innerHTML = '<span class="accent">'+textoCompleto+'</span>'; if(cb) setTimeout(cb,2200); }
}
function borrar(i,cb){
  if(i>=0){ tituloEl.innerHTML = textoCompleto.slice(0,i)+'<span style="opacity:.6">|</span>'; setTimeout(()=>borrar(i-1,cb),50); }
  else { if(cb) setTimeout(cb,400); }
}
(function loop(){ escribir(0,()=>borrar(textoCompleto.length,loop)); })();

// ---- Modal entrada + confeti ----
const modalEntrada = document.getElementById('modalEntrada');
window.addEventListener('load', ()=>{
  modalEntrada.classList.add('open');
  let active=true;
  const iv = setInterval(()=>{
    if(!modalEntrada.classList.contains('open')){ clearInterval(iv); active=false; return; }
    confetti({particleCount:60, spread:70, origin:{y:0.7}, startVelocity:15, colors:['#4f8fd6','#7c6ff0','#f0a944','#2c5ea3']});
  },1800);
});
document.getElementById('btnCerrarModal').addEventListener('click',()=>modalEntrada.classList.remove('open'));

// ---- Tema oscuro / claro (por defecto oscuro) ----
const root = document.documentElement;
const modoBtn = document.getElementById('modoBtn');
const SUN_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/></svg>';
const MOON_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.3A8.3 8.3 0 1 1 9.7 4a6.6 6.6 0 0 0 10.3 10.3Z"/></svg>';
function setTheme(t){ root.setAttribute('data-theme',t); document.getElementById('modoIcon').innerHTML = t==='dark' ? SUN_ICON : MOON_ICON; }
setTheme('dark');
modoBtn.addEventListener('click', ()=> setTheme(root.getAttribute('data-theme')==='dark' ? 'light' : 'dark'));

// ---- Nav móvil ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navEl = document.querySelector('.nav');
navToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));
const navAnchors = [...navLinks.querySelectorAll('a')];
navAnchors.forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));

// ---- Navbar compacta al hacer scroll ----
window.addEventListener('scroll', ()=>{
  navEl.classList.toggle('scrolled', window.scrollY > 30);
}, {passive:true});

// ---- Indicador deslizante de sección activa ----
const navPill = document.getElementById('navPill');
function movePill(link){
  if(!link) return;
  navPill.style.opacity = 1;
  navPill.style.left = link.offsetLeft + 'px';
  navPill.style.width = link.offsetWidth + 'px';
  navAnchors.forEach(a=>a.classList.remove('active'));
  link.classList.add('active');
}
const sectionIds = ['inicio','galeria','frases','mundo','perfil','100cosas','comentarios'];
const sectionEls = sectionIds.map(id=>document.getElementById(id)).filter(Boolean);
const linkById = id => navAnchors.find(a=>a.getAttribute('href')==='#'+id);
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ movePill(linkById(en.target.id)); }
  });
}, {rootMargin:'-45% 0px -50% 0px', threshold:0});
sectionEls.forEach(s=>io.observe(s));
window.addEventListener('resize', ()=>{
  const active = navLinks.querySelector('a.active');
  if(active) movePill(active);
});
setTimeout(()=>movePill(linkById('inicio')), 200);

// ---- Carrusel ----
const track = document.getElementById('carTrack');
const slides = track.children;
const dotsWrap = document.getElementById('carDots');
let curr = 0;
for(let i=0;i<slides.length;i++){
  const d = document.createElement('div'); d.className='car-dot'+(i===0?' active':'');
  d.addEventListener('click', ()=>goTo(i));
  dotsWrap.appendChild(d);
}
function goTo(i){
  curr = (i+slides.length)%slides.length;
  track.style.transform = `translateX(-${curr*100}%)`;
  [...dotsWrap.children].forEach((d,idx)=>d.classList.toggle('active',idx===curr));
}
document.getElementById('carPrev').addEventListener('click', ()=>goTo(curr-1));
document.getElementById('carNext').addEventListener('click', ()=>goTo(curr+1));
setInterval(()=>goTo(curr+1), 6000);

// ---- Frases footer ----
const frases = [
  '"La amistad es como el café: calienta el alma."',
  '"Eres de esas personas que hacen que el mundo sea mejor."',
  '"Gracias por estar siempre, incluso sin hablar por días."',
  '"Una rata, un amigo, un hermano."',
  '"Con usted estudiar es mejor."'
];
document.getElementById('btnFraseFooter').addEventListener('click', ()=>{
  const el = document.getElementById('fraseRandomFooter');
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = frases[Math.floor(Math.random()*frases.length)]; el.style.opacity = 1; }, 350);
});

// ---- Easter egg ----
const modalSecreto = document.getElementById('modalSecreto');
document.getElementById('easterEggFooter').addEventListener('click', ()=>{
  modalSecreto.classList.add('open');
  confetti({particleCount:120, spread:80, origin:{y:0.8}});
});
document.getElementById('closeSecretoModal').addEventListener('click', ()=>modalSecreto.classList.remove('open'));
modalSecreto.addEventListener('click', e=>{ if(e.target===modalSecreto) modalSecreto.classList.remove('open'); });

// ---- WhatsApp ----
const form = document.getElementById('formWhatsApp');
const successDiv = document.getElementById('mensajeExito');
const numeroTelefono = "+50360015036";
form.addEventListener('submit', e=>{
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;
  const url = `https://wa.me/${numeroTelefono}?text=*Mensaje para Rataudiel*%0A%0A*De:* ${nombre}%0A*Mensaje:* ${mensaje}`;
  successDiv.style.display='block';
  setTimeout(()=>{ window.open(url,'_blank'); form.reset(); setTimeout(()=>successDiv.style.display='none',5000); },1000);
});

// ---- Imagen sorpresa ----
const enlace = document.getElementById('enlaceImagen');
const imagenDiv = document.getElementById('imagenOculta');
enlace.addEventListener('click', e=>{
  e.preventDefault();
  const hidden = imagenDiv.style.display==='none' || !imagenDiv.style.display;
  imagenDiv.style.display = hidden ? 'block':'none';
  enlace.textContent = hidden ? 'Ocultar imagen':'Haz clic aquí';
  if(hidden) confetti({particleCount:50, spread:40, origin:{y:0.8}});
});

// ---- Videos locales ----
// Autoajuste de ruta: prueba video/, ../video/ y ../../video/
(function(){
  const rutas=['video/','../video/','../../video/'];
  document.querySelectorAll('video').forEach(v=>{
    const fuente=v.querySelector('source'); if(!fuente) return;
    const archivo=fuente.getAttribute('src').replace(/^(\.\.\/)*video\//,'');
    let i=0;
    fuente.addEventListener('error',()=>{
      i++;
      if(i<rutas.length){ fuente.setAttribute('src',rutas[i]+archivo); v.load(); }
    });
  });
})();

const videoCancion = document.getElementById('videoCancion');
const videoCumple  = document.getElementById('videoCumple');
const modalVideo   = document.getElementById('modalVideo');
function cerrarVideo(){
  modalVideo.classList.remove('open');
  videoCumple.pause();
}
document.getElementById('btnVideoModal').addEventListener('click', ()=>{
  modalVideo.classList.add('open');
  if(videoCancion) videoCancion.pause();
  videoCumple.play().catch(()=>{});
});
document.getElementById('closeVideoModal').addEventListener('click', cerrarVideo);
modalVideo.addEventListener('click', e=>{ if(e.target===modalVideo) cerrarVideo(); });
if(videoCancion) videoCancion.addEventListener('play', ()=>videoCumple.pause());

// ---- Contador de días ----
function calcularDias(){
  const inicio = new Date(2022,0,1); const hoy = new Date();
  const dias = Math.ceil(Math.abs(hoy-inicio)/(1000*60*60*24));
  document.getElementById('contadorDias').textContent = dias;
}
calcularDias();

// ---- Dato random ----
const datos = [
  "Le encantan los frappés, casi todos los días se hace uno","Es fan de Avatar y de Black Clover",
  "Juega Minecraft en su tiempo libre","Su color favorito es el azul","Dice “Buenísimo, creo” para todo",
  "Todavía no puede instalar Laravel","Usa Illustrator como todo un profesional","Escucha Spotify 24/7",
  "Nunca falta a un voluntariado","Le dicen “la rata” con mucho cariño","Come pupusas con salsa negra y medio repollo",
  "Es alérgico","Es el traductor de inglés del grupo","Amigos desde 2022"
];
function mostrarDato(){
  const el = document.getElementById('datoRandomHamster');
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = datos[Math.floor(Math.random()*datos.length)]; el.style.opacity = 1; }, 350);
}
mostrarDato(); setInterval(mostrarDato, 5000);

// ---- 101 cosas ----
const todasLasCosas = [
"La rata","El chico que era introvertido","El talentoso","El de muchas capacidades y habilidades","El bondadoso",
"Servicial","Solidario","Medio perfeccionista","El de los tres leches","El alérgico",
"La Rata Colocha","Mi dúo en estudio","Mi amigo favorito","El decidido","Fan de Avatar",
"Al que le gusta la comida china","El de los frappés","El que nunca duerme","El alto","Termómetro",
"Mi compañero de la universidad","Mi compañero del programa","El de los voluntariados","El que tiene como mil conocidos","El que busca oportunidades académicas",
"Al que le gusta el color azul","El que le gusta el diseño","El que juega Minecraft","El comprometido con la Iglesia","El de los retiros",
"El creativo","El amigo que apoya en todo","El que comparte comida","El confiable","El que sabe hacer de todo",
"El traductor de inglés","El empático","Alguien con quien no creí que seríamos amigos","Con quien se puede hablar de cualquier tema","Alguien a quien le puedo hablar de lo mismo una y otra vez",
"Quien se preocupa por los demás","Quien a veces duda","El del botiquín","Quien anda mil cosas en la mochila","El insistente",
"El que está haciendo que piense bastante para escribir 100 cosas","Al que vale la pena confiar en él ciegamente","El dramático","El chef (según él)","Mi querido amigo",
"El \"vamos a comprar\"","Quien ve mis estados","Al que no le gusta el fútbol","El aparentemente tranquilo","El que todo quiere saber",
"La mascota del grupo","El que envía Reels","El de los apodos con \"rata\"","Al que no le gustan los k-dramas","El que me sigue llamando \"usted\"",
"Mi compañero para todo lo académico","La \"rata\" que me agrada tanto","Quien me ha ayudado tanto","El de las golosinas","El que le gusta ayudar a los demás",
"La rata blanca","El de las fotos","El que come en clases","El que se enferma a cada rato","El que responde un día después",
"Alguien increíble","El resiliente","El de las tostadas","El de los buenos gestos (acciones)","El responsable",
"Al que tengo su chat fijado","El de las actividades extracurriculares","El que vive en medio de la nada","El que espera bus durante 3 horas","El de Illustrator",
"El que trata de entender a los demás","Mi ratiamigo (rata + amigo)","Al que no le gusta decir su fecha de cumpleaños","El que quiere ir a todos lados","El de los stickers",
"El de los videos con IA","El inventor","El ocupado","El que no puede instalar Laravel","El que incluye a todos en las cosas",
"El que usa Spotify 24/7","Al que no hacen administrador en los grupos","El mejor compañero que he tenido","El bromista del grupo","El que come pupusas con salsa negra y medio recipiente de repollo",
"El de los \"jssjskdjsjsjsjdjs\"","Al que le encanta el arroz cantonés","Quien no se da por vencido","La rata del salón",
"Mi querido, estimado, irremplazable, extraordinario, fantástico, genial, generoso, servicial e increíble compañero y amigo",
"El Rataudiel"
];
function mostrarCosas(limit){
  const cont = document.getElementById('contenedor100Cosas');
  const total = todasLasCosas.length;
  const verTodo = limit >= total;
  // al ver todo: la penúltima (cierre) y la última (extra) van a todo el ancho; el resto en 3 columnas iguales
  const nCols = verTodo ? total-2 : limit;
  const lista = todasLasCosas.slice(0,nCols);
  const base = Math.floor(nCols/3), resto = nCols%3;
  const tam = [base, base+(resto===2?1:0), base+(resto>=1?1:0)];
  const filas = Math.max(...tam);
  let html = '<ol class="things-cols">';
  lista.forEach((t,i)=>{
    let col, fila;
    if(i<tam[0]){ col=1; fila=i+1; }
    else if(i<tam[0]+tam[1]){ col=2; fila=i-tam[0]+1; }
    else { col=3; fila=i-tam[0]-tam[1]+1; }
    html += `<li style="--c:${col};--r:${fila}"><span class="n">${i+1}.</span> <span>${t}</span></li>`;
  });
  if(verTodo){
    html += `<li class="cierre" style="--c:1 / -1;--r:${filas+1}"><span class="n">${total-1}.</span> <span>${todasLasCosas[total-2]}</span></li>`;
    html += `<li class="extra" style="--c:1 / -1;--r:${filas+2}"><span class="n">${total}.</span> <span>${todasLasCosas[total-1]}</span> <span class="tag-extra">extra</span></li>`;
  }
  html += '</ol>';
  if(!verTodo){ html += `<button class="btn-more" id="btnVerMas">Ver más (${total-limit} restantes)</button>`; }
  else { html += `<button class="btn-more" id="btnVerMenos">Ver menos (volver a 30)</button>`; }
  cont.innerHTML = html;
  const bm = document.getElementById('btnVerMas'); if(bm) bm.addEventListener('click', ()=>mostrarCosas(total));
  const bl = document.getElementById('btnVerMenos'); if(bl) bl.addEventListener('click', ()=>mostrarCosas(30));
}
mostrarCosas(30);