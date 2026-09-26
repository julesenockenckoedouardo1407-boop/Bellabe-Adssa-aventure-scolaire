(()=>{
'use strict';
const $=id=>document.getElementById(id), KEY='bellabeV5';
const DEFAULT={xp:0,coins:30,level:1,avatar:'🧑🏿‍🎓',badges:[],unlocked:['campus','mots'],completed:[],games:0,name:'Explorateur',draft:'',decor:['🛏️'],pet:'🐶',adventureWins:{},lives:3,combo:0,trophies:[],dailyDay:'',dailyDone:false};
let S=load();
function load(){let out={...DEFAULT};for(const k of ['bellabeV5','bellabeV4_4','bellabeV4_3','bellabeV4_2','bellabeV4_1','bellabeV4','bellabeV3']){try{const x=JSON.parse(localStorage.getItem(k)||'null');if(x)out={...out,...x}}catch(e){}}out.unlocked=[...new Set([...(out.unlocked||[]),'campus','mots'])];out.completed=out.completed||[];out.badges=out.badges||[];out.adventureWins=out.adventureWins||{};out.lives=Number.isFinite(out.lives)?out.lives:3;out.combo=out.combo||0;out.trophies=out.trophies||[];out.dailyDay=out.dailyDay||'';out.dailyDone=!!out.dailyDone;return out}
function save(){S.level=1+Math.floor(S.xp/200);localStorage.setItem(KEY,JSON.stringify(S));stats()}
function stats(){if($('xp'))$('xp').textContent=S.xp;if($('coins'))$('coins').textContent=S.coins}
let toastTimer;function toast(t){const e=$('toast');if(!e)return;e.textContent=t;e.style.opacity=1;clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.style.opacity=0,1900)}
function gain(x,c=0,b=''){S.xp=Math.max(0,S.xp+x);S.coins=Math.max(0,S.coins+c);if(b&&!S.badges.includes(b))S.badges.push(b);save();toast(`${x>=0?'⭐ +':'⭐ '}${x} XP${c?` · 🪙 ${c>0?'+':''}${c}`:''}${b?` · 🏅 ${b}`:''}`)}
function wrong(){const before=S.xp;S.xp=Math.max(0,S.xp-5);S.lives=Math.max(0,S.lives-1);S.combo=0;save();toast(`❌ Mauvaise réponse : -5 XP · ❤️ -1${before===0?' (XP déjà à 0)':''}`)}
function refillLife(){if(S.coins>=8&&S.lives<3){S.coins-=8;S.lives++;save();toast('❤️ Une vie récupérée ! -8 🪙')}else toast(S.lives>=3?'❤️ Tes vies sont déjà au maximum.':'🪙 Il faut 8 pièces.')}
function go(page){window.scrollTo(0,0);({home,map,work,games,profile,mission,house,settings}[page]||home)()}
function shell(title,html){$('screen').innerHTML=`<button class="back" data-route="home">← Accueil</button><h2>${title}</h2>${html}`;stats()}
const Z=[['campus','🏫','Grand Campus','Accueil'],['mots','📖','Forêt des Mots','Français'],['nombres','🔢','Vallée des Nombres','Mathématiques'],['science','🧪','Île des Découvertes','Sciences'],['savoir','🌍','Continent du Savoir','Histoire & géographie'],['creative','🎨','Île Créative','Création'],['enigmes','🗝️','Tour des Énigmes','Logique'],['castle','🏰','Château de Bellabe Adssa','Défi final']];
const ADV={
 campus:{title:'Le Grand Campus',badge:'Premier Pas',questions:[['Où emprunte-t-on des livres ?','Bibliothèque',['Bibliothèque','Laboratoire','Stade']],['Où fait-on des expériences ?','Laboratoire',['Bibliothèque','Laboratoire','Cantine']],['Quel objet sert à écrire au tableau ?','Craie',['Craie','Ballon','Cuillère']],['Où peut-on faire du sport ?','Gymnase',['Gymnase','Bibliothèque','Laboratoire']],['Que met-on dans un sac scolaire ?','Cahiers',['Cahiers','Oreillers','Assiettes']],['Quel lieu permet de lire en silence ?','Bibliothèque',['Bibliothèque','Terrain','Cantine']],['Qui enseigne une matière ?','Professeur',['Professeur','Pilote','Boulanger']],['Quel objet mesure le temps ?','Horloge',['Horloge','Règle','Loupe']]]},
 mots:{title:'La Forêt des Mots',badge:'Ami des Mots',questions:[['Quel est le contraire de « grand » ?','Petit',['Petit','Rapide','Lourd']],['Quel mot est un animal ?','Chien',['Chien','Table','Maison']],['Quel mot désigne une couleur ?','Bleu',['Bleu','Courir','Livre']],['Quel est le pluriel de « cheval » ?','Chevaux',['Chevals','Chevaux','Cheval']],['Quel mot est un verbe ?','Manger',['Manger','Maison','Joli']],['Quel est le féminin de « heureux » ?','Heureuse',['Heureuse','Heureuxse','Heureux']],['Quel mot rime avec « maison » ?','Poisson',['Poisson','Table','Chat']],['Dans « le petit chat », quel mot est un nom ?','chat',['le','petit','chat']],['Quel est le contraire de « chaud » ?','Froid',['Froid','Doux','Clair']],['Quel mot contient le son « ch » ?','Chapeau',['Chapeau','Banane','Livre']]]},
 nombres:{title:'La Vallée des Nombres',badge:'Maître des Nombres',questions:[['8 + 7 = ?','15',['13','15','17']],['12 - 5 = ?','7',['5','7','9']],['4 × 6 = ?','24',['20','24','26']],['20 ÷ 4 = ?','5',['4','5','6']],['Quel nombre est le plus grand ?','19',['9','15','19']],['10 + 12 = ?','22',['20','21','22']],['30 - 14 = ?','16',['14','16','18']],['3 × 7 = ?','21',['18','21','24']],['45 ÷ 5 = ?','9',['7','8','9']],['Quel nombre vient après 29 ?','30',['28','30','31']]]},
 science:{title:'L’Île des Découvertes',badge:'Petit Scientifique',questions:[['À quelle température l’eau gèle-t-elle ?','0 °C',['0 °C','50 °C','100 °C']],['Quel organe sert principalement à respirer ?','Poumons',['Poumons','Cœur','Estomac']],['Quelle étoile éclaire la Terre ?','Soleil',['Lune','Soleil','Mars']],['Quel état de l’eau est la glace ?','Solide',['Liquide','Solide','Gaz']],['De quoi les plantes ont-elles besoin pour la photosynthèse ?','Lumière',['Lumière','Sable seulement','Métal']],['Quel animal pond des œufs ?','Poule',['Poule','Chien','Chat']],['Quel sens utilise-t-on avec les oreilles ?','Ouïe',['Vue','Ouïe','Goût']],['Quel astre tourne autour de la Terre ?','Lune',['Lune','Soleil','Jupiter']],['Quel gaz respirons-nous principalement ?','Oxygène',['Oxygène','Or','Fer']],['Quel organe pompe le sang ?','Cœur',['Cœur','Poumon','Cerveau']]]},
 savoir:{title:'Le Continent du Savoir',badge:'Grand Détective',questions:[['Quelle est la capitale de la France ?','Paris',['Paris','Rome','Madrid']],['Sur quel continent se trouve l’Égypte ?','Afrique',['Afrique','Europe','Asie']],['Quelle est la planète la plus proche du Soleil ?','Mercure',['Mars','Mercure','Jupiter']],['Dans quel pays se trouve le mont Everest ?','Népal',['Népal','Brésil','Canada']],['Quel océan borde l’ouest de l’Afrique ?','Atlantique',['Pacifique','Atlantique','Indien']],['Quel fleuve traverse l’Égypte ?','Nil',['Nil','Amazone','Danube']],['Combien y a-t-il de continents généralement enseignés ?','7',['5','6','7']],['Quelle ville est la capitale d’Haïti ?','Port-au-Prince',['Port-au-Prince','Cap-Haïtien','Jacmel']],['Quel pays a la forme d’une botte ?','Italie',['Italie','Espagne','Grèce']],['Quel est le plus grand océan ?','Pacifique',['Atlantique','Pacifique','Arctique']]]},
 creative:{title:'L’Île Créative',badge:'Artiste du Savoir',questions:[['Complète : ⭐ 🌙 ⭐ 🌙 ?','⭐',['⭐','🔥','🌈']],['Complète : 🔴 🔵 🔴 🔵 ?','🔴',['🟢','🔴','🟡']],['Quel motif continue ? ▲ ■ ▲ ■ ?','▲',['▲','●','■']],['Quel motif continue ? 🍎 🍌 🍎 🍌 ?','🍎',['🍎','🍇','🍌']],['Quelle forme a 3 côtés ?','Triangle',['Carré','Triangle','Cercle']],['Quelle forme est ronde ?','Cercle',['Cercle','Triangle','Rectangle']],['Complète : A B A B ?','A',['A','C','D']],['Quel nombre complète : 2,4,2,4, ?','2',['2','3','5']],['Quel symbole manque : ☀️ 🌧️ ☀️ 🌧️ ?','☀️',['☀️','❄️','🌙']],['Quel objet est utilisé pour dessiner ?','Crayon',['Crayon','Fourchette','Chaussure']]]},
 enigmes:{title:'La Tour des Énigmes',badge:'Maître des Énigmes',questions:[['Je suis plein de pages et je raconte une histoire. Qui suis-je ?','Livre',['Livre','Chaise','Fenêtre']],['J’ai des aiguilles mais je ne pique pas. Qui suis-je ?','Horloge',['Horloge','Chat','Stylo']],['Plus je sèche, plus je deviens mouillé. Qui suis-je ?','Serviette',['Serviette','Pierre','Livre']],['Je monte et je descends sans bouger. Qui suis-je ?','Escalier',['Escalier','Ballon','Nuage']],['Je suis toujours devant toi mais tu ne peux pas me voir. Qui suis-je ?','Futur',['Passé','Futur','Sol']],['Je peux être cassé sans être touché. Qui suis-je ?','Promesse',['Promesse','Table','Règle']],['J’ai des villes sans maisons et des rivières sans eau. Qui suis-je ?','Carte',['Carte','Livre','Miroir']],['Plus tu en prends, plus tu en laisses derrière toi. Que sont-elles ?','Pas',['Pas','Étoiles','Livres']],['Je parle sans bouche et j’entends sans oreilles. Qui suis-je ?','Écho',['Écho','Arbre','Lumière']],['Qu’est-ce qui a un visage et deux mains sans bras ?','Horloge',['Horloge','Maison','Poisson']]]},
 castle:{title:'Le Château de Bellabe Adssa',badge:'Héros du Savoir',questions:[['7 × 8 = ?','56',['48','56','64']],['Quel est le contraire de « ancien » ?','Moderne',['Moderne','Lent','Petit']],['Quelle planète est surnommée la planète rouge ?','Mars',['Mars','Vénus','Saturne']],['Quelle est la capitale d’Haïti ?','Port-au-Prince',['Port-au-Prince','Gonaïves','Jacmel']],['Quel organe pompe le sang ?','Cœur',['Cœur','Poumon','Estomac']],['Quel est le résultat de 100 ÷ 10 ?','10',['5','10','20']],['Quel est le pluriel de « animal » ?','Animaux',['Animals','Animaux','Animal']],['Quel océan est le plus vaste ?','Pacifique',['Atlantique','Pacifique','Indien']],['Quelle forme possède 4 côtés égaux ?','Carré',['Triangle','Carré','Cercle']],['Quel mot désigne l’endroit où l’on conserve des livres ?','Bibliothèque',['Bibliothèque','Stade','Cuisine']]]}
};
function home(){
 const today=new Date().toISOString().slice(0,10);
 if(S.dailyDay!==today){S.dailyDay=today;S.dailyDone=false;save()}
 $('screen').innerHTML=`<section class="hero"><div class="twesy"><div class="face">🤖✨</div><div><h1>Bienvenue dans l'Aventure Scolaire de Bellabe Adssa Twesy !!!</h1><p>Explore, apprends, relève des défis et construis ton propre monde.</p></div></div><div class="notice">❤️ <b>${S.lives}/3</b> vies · 🔥 Série : <b>${S.combo}</b> · Niveau <b>${S.level}</b></div><button class="btn primary" data-action="mission">🚀 Continuer l'aventure</button></section><div class="grid"><button class="tile" data-route="map"><span class="emoji">🗺️</span><b>Explorer</b><p>Des histoires et défis</p></button><button class="tile" data-route="games"><span class="emoji">🎮</span><b>Mini-jeux</b><p>Défis et combos</p></button><button class="tile" data-route="house"><span class="emoji">🏠</span><b>Ma maison</b><p>Décore ton espace</p></button><button class="tile" data-route="profile"><span class="emoji">🏆</span><b>Collections</b><p>Badges et trophées</p></button><button class="tile" data-route="settings"><span class="emoji">⚙️</span><b>Paramètres</b><p>À propos et informations</p></button><button class="tile" data-action="daily"><span class="emoji">⚡</span><b>Défi du jour</b><p>${S.dailyDone?'Déjà réussi aujourd’hui':'Récompense spéciale'}</p></button><button class="tile" data-action="life"><span class="emoji">❤️</span><b>Récupérer une vie</b><p>8 pièces · max 3</p></button></div><section class="card" style="padding:17px;margin-top:14px"><h3>🤖 Twesy</h3><p>« Ici, chaque erreur est une occasion de comprendre. Mais attention : elle coûte 5 XP et une vie ! »</p></section>`;stats()}
function map(){shell('🗺️ Carte de l’Aventure',`<p>Chaque aventure est une petite histoire de <b>8 défis</b>. Bonne réponse : <b>+10 XP</b>. Erreur : <b>-5 XP + 1 ❤️</b>.</p><div class="notice">❤️ ${S.lives}/3 vies · 🔥 série ${S.combo}</div><div class="map">${Z.map(z=>{const open=S.unlocked.includes(z[0])||z[0]==='campus';const wins=S.adventureWins[z[0]]||0;return `<div class="zone ${open?'':'locked'}"><div class="zemoji">${z[1]}</div><div><b>${z[2]}</b><br><small>${z[3]} · ${wins} aventure(s) terminée(s)</small><br>${open?`<button class="btn secondary" data-zone="${z[0]}">Explorer</button>`:'🔒 Verrouillée'}</div></div>`}).join('')}</div>`)}
function shuffled(a){return [...a].sort(()=>Math.random()-.5)}
function startAdventure(id){const d=ADV[id];if(!d)return;if(S.lives<=0){toast('❤️ Plus de vies. Récupère-en une avant de repartir.');return}const qs=shuffled(d.questions).slice(0,Math.min(8,d.questions.length));const m={id,qs,i:0,score:0,correct:0,livesAtStart:S.lives,storyStep:0};drawAdventure(m)}
function drawAdventure(m){const d=ADV[m.id],q=m.qs[m.i];const intros=['Twesy ouvre le chemin…','Un premier indice apparaît !','La piste devient plus claire…','Bravo, continue ton exploration !','Un nouveau défi se présente…','Tu approches du cœur de la mission !','Derniers indices…','Le défi final est devant toi !'];$('screen').innerHTML=`<button class="back" data-route="map">← Carte</button><h2>🗺️ ${d.title}</h2><section class="card"><div class="notice">🤖 Twesy : « ${intros[m.i]||intros[0]} »</div><p><b>Étape ${m.i+1}/${m.qs.length}</b> · ⭐ +10 XP · ❌ -5 XP · ❤️ ${S.lives}/3</p><div class="question">${q[0]}</div><div class="answers">${shuffled(q[2]).map(a=>`<button class="answer" data-adv-answer="${encodeURIComponent(a)}">${a}</button>`).join('')}</div><p id="gameMsg"></p></section>`;$('screen')._adv=m}
function finishAdventure(m){const d=ADV[m.id];if(S.lives<=0){toast('💪 Mission interrompue : récupère une vie et réessaie.');setTimeout(map,1200);return}S.adventureWins[m.id]=(S.adventureWins[m.id]||0)+1;if(!S.completed.includes('adv_'+m.id))S.completed.push('adv_'+m.id);const idx=Z.findIndex(z=>z[0]===m.id),next=Z[idx+1]?.[0];if(next&&!S.unlocked.includes(next))S.unlocked.push(next);S.combo++;if(S.combo>=3&&!S.trophies.includes('Série de 3 aventures'))S.trophies.push('Série de 3 aventures');gain(30,10,d.badge);setTimeout(map,1100)}
function zone(id){if(!ADV[id])return;startAdventure(id)}
function daily(){if(S.dailyDone){toast('⚡ Défi du jour déjà terminé ! Reviens demain.');return}const qs=[['Combien font 9 + 6 ?','15',['14','15','16']],['Quel est le contraire de « rapide » ?','Lent',['Lent','Grand','Fort']],['Quelle planète est appelée la planète rouge ?','Mars',['Mars','Vénus','Jupiter']],['Quel est le plus grand océan ?','Pacifique',['Atlantique','Pacifique','Indien']],['Quel nombre est pair ?','18',['17','18','19']]];const q=qs[Math.floor(Math.random()*qs.length)];$('screen').innerHTML=`<button class="back" data-route="home">← Accueil</button><h2>⚡ Défi du jour</h2><section class="card"><div class="notice">Réussis ce défi pour gagner <b>+40 XP +15 🪙</b>.</div><div class="question">${q[0]}</div><div class="answers">${q[2].map(a=>`<button class="answer" data-daily-answer="${encodeURIComponent(a)}" data-daily-correct="${encodeURIComponent(q[1])}">${a}</button>`).join('')}</div></section>`}
function mission(){startAdventure('campus')}
function games(){shell('🎮 Mini-jeux',`<p>Chaque partie contient <b>5 défis</b>. Bonne réponse : <b>+10 XP</b>. Mauvaise réponse : <b>-5 XP</b>.</p><div class="grid"><button class="tile" data-game="numbers"><span class="emoji">🔢</span><b>Course des Nombres</b><p>5 calculs</p></button><button class="tile" data-game="words"><span class="emoji">🔤</span><b>Mot Mystère</b><p>5 mots</p></button><button class="tile" data-game="detective"><span class="emoji">🕵️</span><b>Mission Détective</b><p>5 indices</p></button><button class="tile" data-game="memory"><span class="emoji">🧠</span><b>Tour de la Mémoire</b><p>4 paires</p></button><button class="tile" data-game="science"><span class="emoji">🧪</span><b>Laboratoire</b><p>5 questions</p></button><button class="tile" data-game="creative"><span class="emoji">🎨</span><b>Atelier Créatif</b><p>5 suites</p></button></div>`)}
function roundGame(title,questions,kind){const qs=shuffled(questions).slice(0,5);const st={qs,i:0,correct:0,kind};function draw(){const q=st.qs[st.i];let html='';if(kind==='words')html=`<div class="big">${q[0]}</div><p>Quel mot représente cette image ?</p><input id="answerInput" class="input" autocomplete="off"> <button class="btn primary" data-round-text="${encodeURIComponent(q[1])}">Valider</button>`;else html=`<div class="question">${q[0]}</div><div class="answers">${shuffled(q[2]).map(a=>`<button class="answer" data-round-answer="${encodeURIComponent(a)}" data-round-correct="${encodeURIComponent(q[1])}">${a}</button>`).join('')}</div>`;shell(title,`<section class="card"><p><b>Défi ${st.i+1}/5</b> · +10 XP / -5 XP</p>${html}<p id="gameMsg"></p></section>`);$('screen')._round=st}draw()}
function numbers(){const qs=[];for(let i=0;i<10;i++){const a=2+Math.floor(Math.random()*14),b=2+Math.floor(Math.random()*12),type=Math.random();if(type<.34)qs.push([`${a} + ${b} = ?`,String(a+b),[String(a+b),String(a+b+2),String(Math.max(0,a+b-3))]]);else if(type<.67)qs.push([`${a+b} - ${b} = ?`,String(a),[String(a),String(a+2),String(Math.max(0,a-2))]]);else{const x=2+Math.floor(Math.random()*8),y=2+Math.floor(Math.random()*8);qs.push([`${x} × ${y} = ?`,String(x*y),[String(x*y),String(x*y+2),String(Math.max(0,x*y-3))]])}}roundGame('🔢 Course des Nombres',qs,'mc')}
function words(){roundGame('🔤 Mot Mystère',WORDS,'words')}
function detective(){roundGame('🕵️ Mission Détective',DET,'mc')}
function science(){roundGame('🧪 Laboratoire',SCI,'mc')}
function creative(){roundGame('🎨 Atelier Créatif',CRE,'mc')}
function nextRound(st){st.i++;if(st.i>=st.qs.length){gain(20,5);toast(`🏆 Partie terminée : ${st.correct}/5 bonnes réponses`);setTimeout(games,1000)}else{if(st.kind==='words'||st.kind==='mc'){setTimeout(()=>{if(st.kind==='words')drawWordRound(st);else drawMcRound(st)},550)}}}
function drawWordRound(st){const q=st.qs[st.i];shell('🔤 Mot Mystère',`<section class="card"><p><b>Défi ${st.i+1}/5</b> · +10 XP / -5 XP</p><div class="big">${q[0]}</div><p>Quel mot représente cette image ?</p><input id="answerInput" class="input" autocomplete="off"><button class="btn primary" data-round-text="${encodeURIComponent(q[1])}">Valider</button><p id="gameMsg"></p></section>`);$('screen')._round=st}
function drawMcRound(st){const q=st.qs[st.i];shell(st.kind==='mc'?'🎯 Défi':'🎮 Défi',`<section class="card"><p><b>Défi ${st.i+1}/5</b> · +10 XP / -5 XP</p><div class="question">${q[0]}</div><div class="answers">${shuffled(q[2]).map(a=>`<button class="answer" data-round-answer="${encodeURIComponent(a)}" data-round-correct="${encodeURIComponent(q[1])}">${a}</button>`).join('')}</div><p id="gameMsg"></p></section>`);$('screen')._round=st}
function memory(){const vals=shuffled(['🍎','⭐','🐶','🌈','🍎','⭐','🐶','🌈']);shell('🧠 Tour de la Mémoire',`<section class="card"><p>Retrouve les 4 paires. Une erreur de paire fait perdre 5 XP.</p><div class="memory">${vals.map((_,i)=>`<button class="mem" data-mem="${i}">?</button>`).join('')}</div><p id="gameMsg"></p></section>`);$('screen')._memory={vals,first:-1,lock:false,pairs:0}}
function house(){shell('🏠 Ma maison',`<section class="card"><div class="big">🏠</div><h3>Ma chambre</h3><p>Décorations : ${S.decor.join(' ')} · Compagnon : ${S.pet}</p><h3>Décoration — 10 🪙</h3><div class="shop">${['📚','🪴','🖼️','🎮','🔬'].map(x=>`<button class="item" data-buy="${x}">${x}<br><small>10 🪙</small></button>`).join('')}</div><h3>🐾 Compagnon</h3><div class="shop">${['🐶','🐱','🐰','🐢','🐦'].map(x=>`<button class="item" data-pet="${x}">${x}</button>`).join('')}</div></section>`)}
function work(){shell('📝 Mon Travail',`<section class="card"><p>Ton brouillon reste sur cet appareil.</p><div id="draft" class="work" contenteditable="true"></div><button class="btn success" data-work="save">💾 Enregistrer</button><button class="btn secondary" data-work="download">⬇️ Télécharger</button><button class="btn secondary" data-work="print">🖨️ Imprimer / PDF</button></section>`);$('draft').innerText=S.draft||''}
function questionLibrary(){
  const counts=Object.entries(QUESTION_BANK).map(([k,v])=>`<div class="library-row"><span>${escapeHtml(k)}</span><b>${v.length}</b></div>`).join("");
  shell("📚 Banque de questions",`<section class="card"><h2>📚 Grande banque pédagogique</h2><p>Des centaines de défis différents pour éviter la répétition.</p>${counts}<div class="notice">🔄 Les questions utilisées sont mémorisées pendant la partie et le jeu renouvelle automatiquement la sélection.</div></section>`);
}
function profile(){shell('👤 Mon Profil',`<section class="card"><div class="avatar">${S.avatar}</div><h3>Niveau ${S.level}</h3><p>⭐ ${S.xp} XP · 🪙 ${S.coins} · 🎮 ${S.games} parties · ❤️ ${S.lives}/3</p><div class="progress"><i style="width:${(S.xp%200)/2}%"></i></div><h3>Choisis ton avatar</h3><div class="avatars">${['🧑🏿‍🎓','👩🏾‍🔬','🧑🏽‍🚀','👨🏿‍🎨','🧑🏻‍🏫','👩🏽‍🚀'].map(x=>`<button class="av ${x===S.avatar?'sel':''}" data-avatar="${x}">${x}</button>`).join('')}</div><h3>🏆 Trophées</h3>${S.trophies.map(x=>`<span class="badge">🏆 ${x}</span>`).join('')||'<p>Aucun trophée pour le moment.</p>'}<h3>🏅 Badges</h3>${S.badges.map(x=>`<span class="badge">🏅 ${x}</span>`).join('')||'<p>Aucun badge pour le moment.</p>'}</section>`)}
function settings(){shell('⚙️ Paramètres',`<section class="card"><h3>ℹ️ À propos</h3><p><b>Bellabe Adssa — L’Aventure Scolaire</b></p><p>Une aventure éducative où l’on apprend en explorant, en jouant et en relevant des défis.</p><hr><p><b>Créé par maître Jules Enock</b></p><p>Contact : <a href="tel:+50940409680">+509 40409680</a></p></section><section class="card"><h3>💾 Données</h3><p>Ta progression est enregistrée sur cet appareil.</p></section>`)}
function chase(){
  shell('🏃🏿‍♂️💨 Poursuis Louibenson',`
    <section class="card chase-card temple-run-card">
      <div class="notice"><b>Rattrape Louibenson !</b><br>La course avance automatiquement. ⬅️➡️ change de voie · ⬆️ maintiens pour accélérer · glisse sur la piste.</div>
      <div class="chase-stats">
        <b>⏱️ <span id="chaseTime">45</span>s</b>
        <b>📏 <span id="chaseDist">120</span>m</b>
        <b>🪙 <span id="chaseCoins">0</span></b>
        <b>⚡ <span id="chaseEnergy">100</span>%</b>
      </div>
      <div class="runner-stage" id="chaseField">
        <div class="sky"></div>
        <div class="mountain m1"></div><div class="mountain m2"></div>
        <div class="road">
          <div class="lane-line l1"></div><div class="lane-line l2"></div>
          <div id="chaseTarget" class="runner target">🏃🏿‍♂️</div>
          <div id="chasePlayer" class="runner player">🧑🏿‍🎓</div>
          <div id="chaseObstacle1" class="runner-object">🪨</div>
          <div id="chaseObstacle2" class="runner-object">🌳</div>
          <div id="chaseCoin1" class="runner-coin">🪙</div>
          <div id="chaseCoin2" class="runner-coin">⭐</div>
          <div class="speed-lines" id="speedLines"></div>
        </div>
        <div class="runner-hud">🔥 <span id="chaseCombo">0</span> · 🏃 <span id="chaseSpeed">1.0</span>x</div>
      </div>
      <div class="chase-controls">
        <button class="btn secondary" data-chase="left" aria-label="Aller à gauche">⬅️</button>
        <button class="btn primary chase-boost" data-chase="boost" aria-label="Accélérer">⬆️ Accélérer</button>
        <button class="btn secondary" data-chase="right" aria-label="Aller à droite">➡️</button>
      </div>
      <button class="btn primary chase-start" data-chase="start">▶️ Démarrer la course</button>
      <p id="chaseMsg">Prépare-toi à courir !</p>
    </section>`);

  const box=$('screen');
  const st={
    running:false,lane:1,targetLane:1,distance:120,time:45,energy:100,combo:0,
    speed:1,boost:false,raf:null,last:0,spawn:0,coinSpawn:0,targetMove:0,
    obstacles:[{lane:0,z:-0.15,active:false,el:$('chaseObstacle1')},{lane:2,z:-0.55,active:false,el:$('chaseObstacle2')}],
    coins:[{lane:1,z:-0.35,active:false,el:$('chaseCoin1')},{lane:0,z:-0.8,active:false,el:$('chaseCoin2')}],
    target:$('chaseTarget'),player:$('chasePlayer'),field:$('chaseField'),won:false
  };
  box._chase=st;

  const lanePct=[25,50,75];
  function setLane(el,lane){el.style.left=lanePct[lane]+'%'}
  function resetObject(o,coin=false){
    o.active=true;o.lane=Math.floor(Math.random()*3);o.z=-0.05-Math.random()*0.25;
    o.el.style.display='block';setLane(o.el,o.lane);
    o.el.textContent=coin?(Math.random()<.65?'🪙':'⭐'):(Math.random()<.5?'🪨':'🌳');
  }
  function project(o){
    const z=Math.max(0,Math.min(1,o.z));
    const y=18+z*68;
    const scale=.55+z*.75;
    o.el.style.bottom=y+'%';
    o.el.style.transform=`translateX(-50%) scale(${scale})`;
    o.el.style.zIndex=20+Math.floor(z*50);
  }
  function render(){
    setLane(st.player,st.lane);
    st.target.style.left=(lanePct[st.targetLane]+(st.lane-st.targetLane)*2)+'%';
    st.target.style.bottom='73%';
    st.player.style.bottom='8%';
    $('chaseDist').textContent=Math.max(0,Math.ceil(st.distance));
    $('chaseTime').textContent=Math.max(0,Math.ceil(st.time));
    $('chaseEnergy').textContent=Math.round(st.energy);
    $('chaseCombo').textContent=Math.floor(st.combo);
    $('chaseSpeed').textContent=st.speed.toFixed(1);
    $('chaseCoins').textContent=st._coins||0;
    st.obstacles.forEach(o=>{if(o.active)project(o);else o.el.style.display='none'});
    st.coins.forEach(o=>{if(o.active)project(o);else o.el.style.display='none'});
    st.field.classList.toggle('is-boosting',st.boost);
    st.field.style.setProperty('--road-speed',Math.round(st.speed*100)+'ms');
  }
  function finish(win){
    if(!st.running)return;
    st.running=false;cancelAnimationFrame(st.raf);S.games++;
    const boost=document.querySelector('.chase-boost');if(boost)boost.classList.remove('boosting');
    if(win){
      gain(40,15);$('chaseMsg').textContent='🏆 RATTRAPÉ ! Louibenson est enfin rattrapé ! +40 XP · +15 🪙';
    }else{
      S.xp=Math.max(0,S.xp-5);S.combo=0;save();
      $('chaseMsg').textContent='💨 Louibenson s’est échappé ! -10 XP. Accélère mieux la prochaine fois !';
    }
    const startBtn=document.querySelector('.chase-start');if(startBtn)startBtn.textContent='🔄 Recommencer';
    stats();
  }
  function hitObstacle(o){
    if(!o.active)return;
    if(o.z>.78 && o.z<1.03 && o.lane===st.lane){
      o.active=false;o.el.style.display='none';st.energy=Math.max(0,st.energy-30);
      st.distance=Math.min(120,st.distance+7);st.combo=0;
      toast('💥 Obstacle ! -30 ⚡ · Louibenson reprend 7 m');
    }
  }
  function collectCoin(o){
    if(!o.active)return;
    if(o.z>.76 && o.z<1.04 && o.lane===st.lane){
      o.active=false;o.el.style.display='none';st._coins=(st._coins||0)+1;
      st.combo=Math.min(12,st.combo+1);st.distance=Math.max(0,st.distance-2);
      toast('✨ Bonus récupéré ! -2 m · Combo +1');
    }
  }
  function start(){
    if(st.running)return;
    st.running=true;st.distance=120;st.time=45;st.energy=100;st.combo=0;st.speed=1;
    st.boost=false;st.lane=1;st.targetLane=1;st.spawn=0;st.coinSpawn=0;st.targetMove=0;st._coins=0;
    st.obstacles.forEach(o=>o.active=false);st.coins.forEach(o=>o.active=false);
    st.last=performance.now();
    $('chaseMsg').textContent='🔥 C’est parti ! Maintiens ⬆️ pour accélérer.';
    const btn=document.querySelector('.chase-start');if(btn)btn.textContent='🏃 Course en cours…';
    function loop(now){
      if(!st.running)return;
      const dt=Math.min(.04,(now-st.last)/1000);st.last=now;
      st.time-=dt;st.spawn+=dt;st.coinSpawn+=dt;st.targetMove+=dt;

      if(st.targetMove>.75){
        st.targetMove=0;
        st.targetLane=Math.floor(Math.random()*3);
      }
      if(st.spawn>1.15){
        st.spawn=0;
        const free=st.obstacles.find(o=>!o.active);
        if(free)resetObject(free,false);
      }
      if(st.coinSpawn>1.45){
        st.coinSpawn=0;
        const free=st.coins.find(o=>!o.active);
        if(free)resetObject(free,true);
      }

      const accelerating=st.boost&&st.energy>0;
      if(accelerating){
        st.energy=Math.max(0,st.energy-dt*28);
        st.speed=Math.min(2.4,st.speed+dt*.9);
      }else{
        st.energy=Math.min(100,st.energy+dt*16);
        st.speed=Math.max(1,st.speed-dt*.55);
      }
      if(st.energy<=0)st.boost=false;

      const same=st.lane===st.targetLane;
      const closing=(accelerating?2.2:1.05)+(same?.55:0)+st.combo*.025;
      st.distance-=closing*dt;
      if(accelerating&&same)st.combo=Math.min(12,st.combo+dt*2.2);
      else if(!same)st.combo=Math.max(0,st.combo-dt*1.5);

      [...st.obstacles,...st.coins].forEach(o=>{
        if(o.active){
          o.z+=dt*(.62+.18*st.speed);
          if(o.z>1.15){o.active=false;o.el.style.display='none'}
        }
      });
      st.obstacles.forEach(hitObstacle);st.coins.forEach(collectCoin);
      render();

      if(st.distance<=0){st.distance=0;render();finish(true);return}
      if(st.time<=0){finish(false);return}
      st.raf=requestAnimationFrame(loop);
    }
    st.raf=requestAnimationFrame(loop);
  }
  function move(d){if(!st.running)return;st.lane=Math.max(0,Math.min(2,st.lane+d));}
  function boost(on){
    if(!st.running)return;
    st.boost=!!on&&st.energy>0;
    const b=document.querySelector('.chase-boost');if(b)b.classList.toggle('boosting',st.boost);
  }
  box._chaseStart=start;box._chaseMove=move;box._chaseBoost=boost;
  let touchX=null,touchY=null;
  st.field.addEventListener('touchstart',e=>{const t=e.touches[0];touchX=t.clientX;touchY=t.clientY},{passive:true});
  st.field.addEventListener('touchend',e=>{
    if(touchX===null)return;
    const t=e.changedTouches[0],dx=t.clientX-touchX,dy=t.clientY-touchY;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1);
    else if(dy<-35)boost(true);
    touchX=touchY=null;
  },{passive:true});
  render();
}
function handle(e){const b=e.target.closest('button');if(!b)return;if(b.dataset.route){go(b.dataset.route);return}if(b.dataset.action==='mission'){mission();return}if(b.dataset.action==='life'){refillLife();home();return}if(b.dataset.action==='daily'){daily();return}if(b.dataset.zone){zone(b.dataset.zone);return}if(b.dataset.game){const f={numbers,words,detective,memory,science,creative}[b.dataset.game];if(f)f();return}
if(b.dataset.chase){const box=$('screen');if(b.dataset.chase==='start')box._chaseStart&&box._chaseStart();else if(b.dataset.chase==='left')box._chaseMove&&box._chaseMove(-1);else if(b.dataset.chase==='right')box._chaseMove&&box._chaseMove(1);else if(b.dataset.chase==='boost'){return}return}
if(b.dataset.dailyAnswer){const a=decodeURIComponent(b.dataset.dailyAnswer),c=decodeURIComponent(b.dataset.dailyCorrect);if(a===c){S.dailyDone=true;S.trophies.push('Défi du jour');gain(40,15,'Défi du Jour');setTimeout(home,900)}else{wrong();toast('❌ Pas cette fois : -5 XP · -1 ❤️')}return}
if(b.dataset.advAnswer){const box=$('screen'),m=box._adv,q=m.qs[m.i],a=decodeURIComponent(b.dataset.advAnswer);if(a===q[1]){m.correct++;S.combo++;gain(10);b.disabled=true;toast('✅ Bonne réponse ! +10 XP')}else{wrong();b.disabled=true;toast(S.lives>0?'❌ Mauvaise réponse : -5 XP · -1 ❤️':'💥 Mauvaise réponse : -5 XP · plus de vies')}m.i++;if(S.lives<=0){setTimeout(()=>finishAdventure(m),700)}else if(m.i<m.qs.length)setTimeout(()=>drawAdventure(m),600);else setTimeout(()=>finishAdventure(m),650);return}
if(b.dataset.roundText){const st=$('screen')._round,q=st.qs[st.i],a=$('answerInput').value.trim().toUpperCase();if(a===q[1].toUpperCase()){st.correct++;gain(10);toast('✅ Bonne réponse ! +10 XP')}else{wrong();toast(`❌ Réponse attendue : ${q[1]} · -5 XP`)}nextRound(st);return}
if(b.dataset.roundAnswer){const st=$('screen')._round,a=decodeURIComponent(b.dataset.roundAnswer),c=decodeURIComponent(b.dataset.roundCorrect);if(a===c){st.correct++;gain(10);toast('✅ Bonne réponse ! +10 XP')}else{wrong();toast('❌ Mauvaise réponse : -5 XP')}nextRound(st);return}
if(b.dataset.mem!==undefined){const box=$('screen'),m=box._memory;if(!m||m.lock)return;const i=Number(b.dataset.mem);if(b.classList.contains('open'))return;b.textContent=m.vals[i];b.classList.add('open');if(m.first<0){m.first=i}else{const first=m.first;m.first=-1;if(m.vals[first]===m.vals[i]){m.pairs++;toast('✨ Paire trouvée !');if(m.pairs===4){S.games++;gain(20,5);toast('🏆 Mémoire réussie ! +20 XP');setTimeout(games,1000)}}else{wrong();m.lock=true;toast('❌ Pas une paire : -5 XP');setTimeout(()=>{[first,i].forEach(k=>{const q=$(`[data-mem="${k}"]`);if(q){q.textContent='?';q.classList.remove('open')}});m.lock=false},650)}}return}
if(b.dataset.buy){if(S.coins>=10&&!S.decor.includes(b.dataset.buy)){S.coins-=10;S.decor.push(b.dataset.buy);save();house();toast('🏠 Objet ajouté !')}else toast('🪙 Il faut 10 pièces ou tu possèdes déjà cet objet.');return}
if(b.dataset.pet){S.pet=b.dataset.pet;save();house();toast('🐾 Compagnon choisi !');return}
if(b.dataset.avatar){S.avatar=b.dataset.avatar;save();profile();return}
if(b.dataset.work){if(b.dataset.work==='save'){S.draft=$('draft').innerText;save();toast('💾 Brouillon enregistré !')}else if(b.dataset.work==='download'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([$('draft').innerText],{type:'text/plain'}));a.download='mon-travail.txt';a.click();toast('⬇️ Fichier préparé !')}else window.print();return}}
document.addEventListener('pointerdown',e=>{const b=e.target.closest('button[data-chase="boost"]');const box=$('screen');if(b&&box&&box._chase&&box._chaseBoost){e.preventDefault();box._chaseBoost(true)}});
document.addEventListener('pointerup',()=>{const box=$('screen');if(box&&box._chase&&box._chaseBoost)box._chaseBoost(false)});
document.addEventListener('touchend',()=>{const box=$('screen');if(box&&box._chase&&box._chaseBoost)box._chaseBoost(false)},{passive:true});
document.addEventListener('keydown',e=>{const box=$('screen');if(!box||!box._chase||!box._chase.running)return;if(e.key==='ArrowLeft'){e.preventDefault();box._chaseMove(-1)}if(e.key==='ArrowRight'){e.preventDefault();box._chaseMove(1)}if(e.key==='ArrowUp'||e.key===' '){e.preventDefault();box._chaseBoost(true)}});
document.addEventListener('keyup',e=>{const box=$('screen');if(!box||!box._chase||!box._chase.running)return;if(e.key==='ArrowUp'||e.key===' ')box._chaseBoost(false)});document.addEventListener('click',handle);stats();home();
if(!localStorage.getItem('bellabeStarted')){localStorage.setItem('bellabeStarted','1');toast('🤖 Twesy : bienvenue !')}
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js?v=53',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});
})();
