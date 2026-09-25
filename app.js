const state = JSON.parse(localStorage.getItem("bellabe-adssa-state") || '{"xp":0,"coins":0,"missions":0,"badges":[]}');
const $ = s => document.querySelector(s);
const screens = ["welcome","home","adventure","mission","work","games","game","profile"];

function save(){localStorage.setItem("bellabe-adssa-state",JSON.stringify(state)); updateStats();}
function show(id){screens.forEach(s=>document.getElementById(s)?.classList.add("hidden")); document.getElementById(id)?.classList.remove("hidden"); updateStats();}
function updateStats(){
  $("#xp").textContent=state.xp; $("#coins").textContent=state.coins;
  const level=Math.floor(state.xp/100)+1;
  const names=["Explorateur","Apprenti","Aventurier","Chercheur","Maître du Savoir"];
  $("#playerLevel").textContent=`Niveau ${level} · ${names[Math.min(names.length-1,Math.floor((level-1)/2))]}`;
  $("#profileStats").textContent=`⭐ ${state.xp} XP · 🪙 ${state.coins} pièces · 🎯 ${state.missions} mission(s) terminée(s)`;
  $("#badges").textContent=state.badges.length?state.badges.join(" · "):"Aucun badge pour le moment. Termine ta première mission !";
}
document.addEventListener("click",e=>{
  const a=e.target.closest("[data-action]")?.dataset.action;if(!a)return;
  if(a==="start")show("home"); if(a==="home")show("home"); if(a==="adventure")show("adventure"); if(a==="mission"){show("mission");startMission()}
  if(a==="work")show("work"); if(a==="games")show("games"); if(a==="profile")show("profile");
  if(a==="saveDraft"){localStorage.setItem("bellabe-adssa-draft",JSON.stringify({title:$("#workTitle").value,text:$("#freeSheet").value})); alert("Brouillon enregistré sur cet appareil.");}
  if(a==="print")window.print();
  if(["numberGame","wordGame","memoryGame","detective"].includes(a)){show("game");startGame(a)}
});
const draft=JSON.parse(localStorage.getItem("bellabe-adssa-draft")||"null"); if(draft){$("#workTitle").value=draft.title||"";$("#freeSheet").value=draft.text||""}

let missionStep=0;
const missionQuestions=[
  ["🏫 Quel lieu sert principalement à apprendre et travailler en classe ?",["L'école","La plage","Le stade"],0],
  ["📚 Où trouve-t-on généralement beaucoup de livres ?",["La bibliothèque","La cuisine","Le garage"],0],
  ["🎨 Quelle activité développe surtout la créativité ?",["Dessiner","Dormir","Attendre"],0],
  ["🧪 Où peut-on faire des expériences scientifiques ?",["Le laboratoire","La cour","Le vestiaire"],0]
];
function startMission(){missionStep=0;renderMission()}
function renderMission(){
  $("#missionProgress").style.width=(missionStep/missionQuestions.length*100)+"%";
  if(missionStep>=missionQuestions.length){
    state.xp+=50;state.coins+=20;state.missions++;
    if(!state.badges.includes("🏅 Premier Pas"))state.badges.push("🏅 Premier Pas");
    save();$("#challenge").innerHTML=`<h2>🏆 Mission réussie !</h2><p>Twesy : « Bravo, aventurier ! La prochaine zone t'attend. »</p><p>⭐ +50 XP · 🪙 +20 pièces</p><button class="primary" data-action="adventure">🗺️ Voir la carte</button>`;$("#missionProgress").style.width="100%";return;
  }
  const [q,answers,correct]=missionQuestions[missionStep];
  $("#challenge").innerHTML=`<h2>${q}</h2><div class="answer-grid">${answers.map((x,i)=>`<button class="answer" data-answer="${i}">${x}</button>`).join("")}</div><p>Défi ${missionStep+1} sur ${missionQuestions.length}</p>`;
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-answer]"); if(!b)return;
  const correct=missionQuestions[missionStep][2];
  if(+b.dataset.answer===correct){missionStep++;renderMission()}else{alert("💡 Twesy : « Presque ! Relis bien la question et essaie encore. »")}
});

function startGame(type){
  const c=$("#gameContent");
  if(type==="numberGame"){ $("#gameTitle").textContent="🔢 Course des Nombres"; const n=Math.floor(Math.random()*20)+10, opts=[n,n+2,n-3,n+5].sort(()=>Math.random()-.5); c.innerHTML=`<h2>🎯 Trouve le nombre ${n}</h2><div class="answer-grid">${opts.map(x=>`<button class="answer" data-game-answer="${x}" data-correct="${n}">${x}</button>`).join("")}</div>`;}
  if(type==="wordGame"){ $("#gameTitle").textContent="🔤 Mot Mystère"; c.innerHTML=`<h2>Remets les lettres dans l'ordre</h2><p style="font-size:30px">É · C · O · L · E</p><input id="wordAnswer" placeholder="Écris le mot"><br><br><button class="primary" data-word-check>Vérifier</button>`;}
  if(type==="memoryGame"){ $("#gameTitle").textContent="🧠 Mémoire"; const vals=["⭐","📚","🔢","✨","⭐","📚","🔢","✨"]; c.innerHTML=`<h2>Retrouve les paires</h2><div class="answer-grid">${vals.sort(()=>Math.random()-.5).map((v,i)=>`<button class="answer mem" data-v="${v}" data-i="${i}">❓</button>`).join("")}</div>`;}
  if(type==="detective"){ $("#gameTitle").textContent="🔎 Mission Détective"; c.innerHTML=`<h2>Qui a pris le livre ?</h2><p>Twesy a trouvé trois indices : la personne était dans la bibliothèque, aime lire et porte des lunettes.</p><div class="answer-grid"><button class="answer" data-detective="0">🏃 Un coureur</button><button class="answer" data-detective="1">🤓 Un lecteur</button><button class="answer" data-detective="2">⚽ Un sportif</button></div>`;}
}
document.addEventListener("click",e=>{
  const g=e.target.closest("[data-game-answer]");if(g){if(g.dataset.gameAnswer===g.dataset.correct){state.xp+=10;state.coins+=5;save();alert("🎉 Bravo ! +10 XP");}else alert("💡 Essaie encore !");}
  if(e.target.matches("[data-word-check]")){if($("#wordAnswer").value.trim().toUpperCase().replaceAll("É","E")==="ECOLE"){state.xp+=10;state.coins+=5;save();alert("🎉 Mot trouvé !")}else alert("💡 Twesy : « Regarde les lettres une par une. »")}
  const d=e.target.closest("[data-detective]");if(d){if(d.dataset.detective==="1"){state.xp+=10;state.coins+=5;save();alert("🕵️ Mystère résolu !")}else alert("🔎 Cherche un personnage qui aime lire et porte des lunettes.")}
});
updateStats();
