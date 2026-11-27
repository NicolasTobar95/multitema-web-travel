/* ---------- piezas compartidas de Cúmulo ---------- */
const PARKS=["Parque Nacional Torres del Paine","Reserva Nacional Cerro Castillo","Parque Nacional Pumalín","Glaciar Exploradores","Parque Nacional Queulat","Laguna San Rafael","Parque Patagonia","Fiordo de Puyuhuapi"];
const TESTI=[
 {q:"El guía sabía exactamente cuándo apurar el paso y cuándo parar a mirar. Llegamos a la base de las Torres con la primera luz.",n:"Camila R.",c:"Circuito W · Santiago",r:5},
 {q:"Era mi primer trekking de varios días y nunca me sentí sola. Pumalín fue el comienzo perfecto.",n:"Laura M.",c:"Bosques de Pumalín · Bogotá",r:5},
 {q:"Cerro Castillo es exigente de verdad, pero el grupo chico hizo toda la diferencia. Volvería mañana.",n:"Tomás V.",c:"Cerro Castillo · Buenos Aires",r:5},
 {q:"Quince días sin preocuparme de nada más que caminar. Los traslados entre rutas fueron impecables.",n:"Martín G.",c:"Gran Travesía · Lima",r:4}
];
const AV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.8 4.2-5.8 7.5-5.8s6.3 2 7.5 5.8"/></svg>';
const stars=r=>"★★★★★".slice(0,r)+"☆☆☆☆☆".slice(0,5-r);
/* buscador con pestañas */
const SEARCH={
 "Rutas":[["Ruta",["Torres del Paine · 5 días","Cerro Castillo · 4 días","Pumalín · 4 días"]],["Mes",["Noviembre 2026","Diciembre 2026","Enero 2027","Febrero 2027"]],["Viajeros",["1 persona","2 personas","3 a 5","6 o más"]]],
 "Escapadas":[["Escapada",["Valle Exploradores · 3 días","Puyuhuapi · 4 días","Última Esperanza · 2 días"]],["Mes",["Noviembre 2026","Diciembre 2026","Enero 2027"]],["Viajeros",["1 persona","2 personas","3 a 5"]]],
 "Gran Travesía":[["Salida",["3 ene 2027","7 feb 2027","4 mar 2027"]],["Viajeros",["1 persona","2 personas","3 a 5"]],["Alojamiento",["Compartido","Habitación privada"]]],
 "A medida":[["Grupo",["Amigos o familia","Empresa","Fotografía"]],["Personas",["4 a 6","7 a 12","Más de 12"]],["Mes",["Cualquier mes","Noviembre 2026","Enero 2027"]]]
};
function setupSearch(root,icons){
  const tabs=root.querySelector(".s-tabs"),fields=root.querySelector(".s-fields");let cur="Rutas";
  tabs.innerHTML=Object.keys(SEARCH).map((k,i)=>`<button type="button" role="tab" aria-selected="${k===cur}">${icons?icons[i]:""}${k}</button>`).join("");
  const draw=()=>{fields.innerHTML=SEARCH[cur].map(([l,opts],i)=>`<div class="s-field"><label for="sf${i}">${l}</label><select id="sf${i}">${opts.map(o=>`<option>${o}</option>`).join("")}</select></div>`).join("")};
  tabs.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cur=b.textContent.trim();tabs.querySelectorAll("button").forEach(x=>x.setAttribute("aria-selected",x===b));fields.animate?fields.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:300,easing:"ease-out"}):0;draw()});
  root.addEventListener("submit",e=>{e.preventDefault();document.getElementById("destinos").scrollIntoView({behavior:"smooth"})});
  draw();
}
