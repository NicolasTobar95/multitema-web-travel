/* ---------- contenido compartido de Cordada (en Astro: Content Collections) ---------- */
const TRIPS=[
 {id:"paine",t:"Torres del Paine · Circuito W",r:"Magallanes",d:5,land:"montana",lvl:"Media",p:1890,img:"trek",next:"18 nov 2026",cup:4,tag:"La más pedida",desc:"La base de las Torres, el Valle del Francés y el Lago Grey. Refugios con comidas."},
 {id:"castillo",t:"Travesía Cerro Castillo",r:"Aysén",d:4,land:"montana",lvl:"Alta",p:1290,img:"snow",next:"5 dic 2026",cup:5,tag:"",desc:"Portezuelos con nieve y una laguna turquesa a los pies de la aguja."},
 {id:"pumalin",t:"Bosques de Pumalín",r:"Los Lagos",d:4,land:"bosque",lvl:"Baja",p:1090,img:"forest",next:"9 ene 2027",cup:7,tag:"Primera vez",desc:"Alerces milenarios y el cráter del volcán Chaitén, con noches en cabañas."},
 {id:"exploradores",t:"Valle Exploradores",r:"Aysén",d:3,land:"glaciar",lvl:"Media",p:690,img:"valley",next:"22 nov 2026",cup:6,tag:"",desc:"Navegación y caminata sobre el hielo del glaciar Exploradores."},
 {id:"puyuhuapi",t:"Fiordos de Puyuhuapi",r:"Aysén",d:4,land:"lagos",lvl:"Baja",p:890,img:"lake",next:"12 dic 2026",cup:8,tag:"",desc:"Termas, bosque y kayak por los fiordos más tranquilos del sur."},
 {id:"esperanza",t:"Última Esperanza",r:"Magallanes",d:2,land:"montana",lvl:"Baja",p:490,img:"sunset",next:"29 nov 2026",cup:9,tag:"",desc:"Fotografía de paisaje con los mejores atardeceres del fin del mundo."},
 {id:"travesia",t:"Gran Travesía",r:"Los Lagos → Magallanes",d:15,land:"todos",lvl:"Media-alta",p:3990,img:"valley",next:"3 ene 2027",cup:3,tag:"Viaje completo",desc:"Las tres rutas en un viaje: de Pumalín a Torres del Paine por la Carretera Austral."}
];
const LANDS=[["todos","Todos"],["montana","Montaña"],["bosque","Bosque"],["glaciar","Glaciar"],["lagos","Lagos y fiordos"]];
const usd=n=>"US$ "+new Intl.NumberFormat("es-CL").format(n);
const ALT={trek:"Dos excursionistas en el sendero de Torres del Paine",snow:"Caminante sobre una cresta nevada frente a una cordillera",forest:"Bosque lluvioso con rayos de luz entre la neblina",valley:"Valle con un río trenzado entre montañas nevadas y bosque",lake:"Lago verde entre pinos con un cerro en la neblina",sunset:"Atardecer entre árboles con un cerro al fondo"};
/* carrusel con filtros: render(card) devuelve el HTML de cada tarjeta */
function setupCarousel({track,chips,render,prev,next}){
  let cur="todos";
  const draw=()=>{const list=TRIPS.filter(t=>cur==="todos"||t.land===cur||t.land==="todos");
    const go=()=>{track.innerHTML=list.map(render).join("");track.scrollTo({left:0});track.querySelectorAll("img[data-k]").forEach(i=>i.src=IMG[i.dataset.k])};
    document.startViewTransition&&!matchMedia("(prefers-reduced-motion:reduce)").matches?document.startViewTransition(go).ready.catch(()=>{}):go()};
  chips.innerHTML=LANDS.map(([k,l])=>`<button type="button" data-k="${k}" aria-pressed="${k===cur}">${l}<span>${TRIPS.filter(t=>k==="todos"||t.land===k||t.land==="todos").length}</span></button>`).join("");
  chips.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cur=b.dataset.k;chips.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));draw()});
  const step=()=>(track.firstElementChild?track.firstElementChild.getBoundingClientRect().width+18:300);
  prev&&prev.addEventListener("click",()=>track.scrollBy({left:-step(),behavior:"smooth"}));
  next&&next.addEventListener("click",()=>track.scrollBy({left:step(),behavior:"smooth"}));
  draw();
}
/* slider simple */
function setupSlider(root){const slides=[...root.querySelectorAll("[data-slide]")],count=root.querySelector("[data-count]");let i=0;
  const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle("on",j===i));if(count)count.textContent=`${i+1} / ${slides.length}`};
  root.querySelector("[data-prev]").addEventListener("click",()=>show(i-1));root.querySelector("[data-next]").addEventListener("click",()=>show(i+1));show(0);
  let t=setInterval(()=>show(i+1),6500);root.addEventListener("pointerenter",()=>clearInterval(t));}
/* chat con respuestas rápidas */
const FAQ={"¿Qué ruta me recomiendan?":"Si es tu primera vez, Bosques de Pumalín (exigencia baja). Si ya caminas seguido, Torres del Paine o Cerro Castillo.","¿Qué incluye el precio?":"Guía local, traslados, refugios o cabañas, todas las comidas, permisos y seguro de viaje.","¿Cómo reservo?":"Eliges la salida, abonas el 30 % y pagas el resto hasta 30 días antes. Te ayudamos por este chat o por correo."};
function setupChat(root){const btn=root.querySelector(".chat-btn"),panel=root.querySelector(".chat-panel"),log=root.querySelector(".chat-log"),qs=root.querySelector(".chat-qs");
  btn.addEventListener("click",()=>{const o=root.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
  qs.innerHTML=Object.keys(FAQ).map(q=>`<button type="button">${q}</button>`).join("");
  qs.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;log.insertAdjacentHTML("beforeend",`<p class="me">${b.textContent}</p>`);
    setTimeout(()=>{log.insertAdjacentHTML("beforeend",`<p class="bot">${FAQ[b.textContent]}</p>`);log.scrollTop=log.scrollHeight},450);log.scrollTop=log.scrollHeight});}
/* reveal */
const _io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");_io.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll(".rv").forEach(el=>_io.observe(el));
