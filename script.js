// ---- Título con efecto de escritura ----
const textoCompleto = "Feliz cumpleaños, Hamster";
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
function setTheme(t){ root.setAttribute('data-theme',t); modoBtn.textContent = t==='dark' ? '☀️' : '🌙'; }
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
  '"Un 🐹, un amigo, un hermano."',
  '"El extrovertido que me adoptó."',
  '"Contigo el té sabe mejor."'
];
document.getElementById('btnFraseFooter').addEventListener('click', ()=>{
  const el = document.getElementById('fraseRandomFooter');
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = frases[Math.floor(Math.random()*frases.length)]; el.style.opacity = 1; }, 350);
});

// ---- Easter egg ----
document.getElementById('easterEggFooter').addEventListener('click', ()=>{
  alert('🐹 Hamster es un amigo increíble. Por favor, permanece más tiempo como mi amigo. 💙');
  confetti({particleCount:120, spread:80, origin:{y:0.8}});
});

// ---- WhatsApp ----
const form = document.getElementById('formWhatsApp');
const successDiv = document.getElementById('mensajeExito');
const numeroTelefono = "+50360015036";
form.addEventListener('submit', e=>{
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;
  const url = `https://wa.me/${numeroTelefono}?text=*Mensaje para Hamster*%0A%0A*De:* ${nombre}%0A*Mensaje:* ${mensaje}`;
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
  enlace.textContent = hidden ? 'Ocultar imagen':'Haz click aquí';
  if(hidden) confetti({particleCount:50, spread:40, origin:{y:0.8}});
});

// ---- Modal video ----
const modalVideo = document.getElementById('modalVideo');
document.getElementById('btnVideoModal').addEventListener('click', ()=>modalVideo.classList.add('open'));
document.getElementById('closeVideoModal').addEventListener('click', ()=>modalVideo.classList.remove('open'));
modalVideo.addEventListener('click', e=>{ if(e.target===modalVideo) modalVideo.classList.remove('open'); });

// ---- Contador de días ----
function calcularDias(){
  const inicio = new Date(2021,0,1); const hoy = new Date();
  const dias = Math.ceil(Math.abs(hoy-inicio)/(1000*60*60*24));
  document.getElementById('contadorDias').textContent = dias;
}
calcularDias();

// ---- Dato random ----
const datos = [
  "Le gustan los guineos con cáscara","Hace café casi a diario","Su pasión es andar en moto",
  "Escucha música todo el tiempo","Su comida favorita son las pastas","Le encantan los juegos de mesa",
  "Envía audios larguísimos","No duerme mucho, pero siempre rinde","Le gusta Peaky Blinders y Dragon Ball",
  "Le digo 'baka' pero con cariño","Fue mi compañero en educación media","Es extrovertido y me anima siempre",
  "Recuerdo: el día en Dollar City","Salida pendiente","Té en el INGO con él","Su frase: 'Juela, mi niña'",
  "¿Rey de los juegos de mesa?","Prefiere audios antes que textos"
];
function mostrarDato(){
  const el = document.getElementById('datoRandomHamster');
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = datos[Math.floor(Math.random()*datos.length)]; el.style.opacity = 1; }, 350);
}
mostrarDato(); setInterval(mostrarDato, 5000);

// ---- 100 cosas ----
const todasLasCosas = [
"No creía que le hablaría (excepto para trabajos)","Se veía 'sabiondo' en informática","Es una buena persona","Gracioso",
"Mentiroso (pero sin malicia)","Generoso","Buen amigo","Algo baka (tonto)","Alguien con quien hablar con profundidad",
"Alguien que apoya","Trata de entender a los demás","Sabe que la vida es difícil y por eso es empático",
"El extrovertido que me hizo saltarme clases","Quien me ayudó cuando pasaba malos momentos",
"Alguien que puede escuchar lo mismo una y otra vez","El 🐹 que me agrada bastante","El enamorado del salón",
"Si no fuera tan enamorado, sería un buen partido","Anduvo con alguien que no me caía ni bien ni mal",
"El que le dicen 'no hagas esto' y es lo primero que hace","Quien está haciendo que en vez de estudiar, yo escriba esto",
"El que se la pasa en el trabajo todo el día","Quien se preocupa por los demás","Alguien que le gusta la equidad e igualdad",
"Quien estuvo a punto de grandes errores pero no los cometió","Esa persona que fue al centro social esa vez",
"El que llegaba tarde","Quien se quejaba del profe","El vago del salón (pero inteligente)","Al que le gusta el café",
"El come galletas","El come guineos con cáscara","El que tiene dientitos","Quien a veces duda","El indeciso",
"El que no se calla","Quien le daba mil vueltas al instituto","Alguien que andaba como cien cosas en la mochila",
"El que me dijo 'usted' casi un año","El primero que hizo que comiera del mismo desayuno con alguien especial",
"El necio","El del teléfono Lenovo","El inventor","La primera persona en hacer que escriba 100 cosas",
"El de los juegos de mesa","El baka que jugó bien feo solo por la novia","El que tenía como 100 mil fotos de la ex",
"El que dicen que es bien baka","El que no ve anime","No ve K-dramas","El pelisplus","El que se enreda con lo que escribe",
"El de los audios","El de los fondos con colores bonitos","El que dice 'eso no es así'","El que dice 'querés'",
"El que iba de primero en la lista","Quien lava los pantalones una vez a la semana","El adventista",
"El que le dice 'tito' a los demás","El que andaba poniendo fondos animados en las laptops","El exagerado",
"Quien escribe la 'a' como si fuera 'q'","El que pasó el examen de la UES aún siendo flojo",
"El que responde al año pero es porque trabaja","El que casi no iba a clases","El de las palomitas medias cocidas o quemadas",
"El de los chocolates","El que escribe abreviado por mensaje","El que envía reels por Instagram","El que no duerme",
"El que sabe de programación","El novio de Emerson (chiste interno)","El amigo de Ángel","El que le decía mentiras al profe",
"El que me hizo pensar bastante para escribir 100 cosas","Quien no sé si leerá todo esto",
"El que me pidió una opinión general y no la di","Alguien a quien puedo llamar 'mejor amigo'","Quien no juzga",
"Quien molesta tanto","El que todo quiere saber","El metido pues","El que tiene como 100 novias (exageración)",
"El que me copió en una respuesta del examen y le salió mala","Quien me ayudó con varias cosas en el instituto",
"Al que no le gusta el fútbol","Quien no creía que escribiría 100 cosas","El que puede decirme 'su majestad'",
"Al que los papás no lo quieren (broma)","Al que nada lo ofende","Alguien que vale la pena llamar 'amigo'",
"Quien siempre ve mis estados","El que sale con cosas random","Alguien que sabe que puede mejorar para ser mejor persona",
"Un pervertido (mente sucia)","El chef","El de 'vamos al punto'","El dramático",
"El amigo que me dejó la educación media y, aunque no hablemos mucho, es bueno seguir en contacto y saber que está ahí para mí y viceversa."
];
function mostrarCosas(limit){
  const cont = document.getElementById('contenedor100Cosas');
  const cosas = todasLasCosas.slice(0,limit);
  const cols = [[],[],[]];
  cosas.forEach((c,i)=>cols[i%3].push({n:i+1,t:c}));
  let html = '<div class="things-cols">';
  cols.forEach(col=>{
    html += '<ul>';
    col.forEach(it=> html += `<li><span class="n">${it.n}.</span> ${it.t}</li>`);
    html += '</ul>';
  });
  html += '</div>';
  if(limit===30){ html += `<button class="btn-more" id="btnVerMas">Ver más (70 restantes)</button>`; }
  else { html += `<button class="btn-more" id="btnVerMenos">Ver menos (volver a 30)</button>`; }
  cont.innerHTML = html;
  const bm = document.getElementById('btnVerMas'); if(bm) bm.addEventListener('click', ()=>mostrarCosas(100));
  const bl = document.getElementById('btnVerMenos'); if(bl) bl.addEventListener('click', ()=>mostrarCosas(30));
}
mostrarCosas(30);