
(function(){
"use strict";
const KEY="bellabeV71LocalChallenges";
const BANK=[
 {q:"Combien font 7 × 8 ?",a:["54","56","64","48"],c:1},
 {q:"Quelle est la capitale d'Haïti ?",a:["Cap-Haïtien","Port-au-Prince","Jacmel","Gonaïves"],c:1},
 {q:"En quelle année l'indépendance d'Haïti a-t-elle été proclamée ?",a:["1492","1791","1803","1804"],c:3},
 {q:"Quel mot est correctement écrit ?",a:["aparament","apparemment","apparament","aparement"],c:1},
 {q:"Combien y a-t-il de minutes dans 2 heures ?",a:["60","100","120","180"],c:2},
 {q:"Quelle unité mesure principalement la masse ?",a:["litre","kilogramme","mètre","seconde"],c:1},
 {q:"Quel est le périmètre d'un carré de côté 5 cm ?",a:["10 cm","15 cm","20 cm","25 cm"],c:2},
 {q:"Quelle planète est surnommée la planète rouge ?",a:["Vénus","Mars","Jupiter","Mercure"],c:1},
 {q:"Quel est le contraire de 'rapide' ?",a:["vite","lent","fort","grand"],c:1},
 {q:"Combien font 25% de 100 ?",a:["10","20","25","50"],c:2}
];
function get(){try{return JSON.parse(localStorage.getItem(KEY)||"null")||{p1:"Élève A",p2:"Élève B",category:"Mixte",questions:[],score1:0,score2:0}}catch(e){return {p1:"Élève A",p2:"Élève B",category:"Mixte",questions:[],score1:0,score2:0}}}
function put(s){localStorage.setItem(KEY,JSON.stringify(s))}
function pick(n){let x=BANK.slice().sort(()=>Math.random()-.5);return x.slice(0,Math.min(n,BANK.length))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
window.BellabeLocalChallenge={
start:function(p1,p2,n){let s=get();s.p1=p1||"Élève A";s.p2=p2||"Élève B";s.questions=pick(Number(n)||10);s.score1=0;s.score2=0;s.turn=1;s.i=0;s.finished=false;put(s);return s},
state:get,
answer:function(player,index){let s=get(),q=s.questions[s.i];if(!q||s.finished)return s; if(Number(index)===q.c){if(player===1)s.score1++;else s.score2++} if(player===2)s.i++; s.turn=player===1?2:1; if(s.i>=s.questions.length){s.finished=true} put(s);return s},
reset:function(){localStorage.removeItem(KEY)}
};
window.BellabeLocalBank=BANK;

function render(){
 const root=document.getElementById("v71-local");
 if(!root)return;
 let s=BellabeLocalChallenge.state();
 if(!s.questions.length){
  root.innerHTML='<h3>⚔️ Défi local à deux</h3><p>Deux élèves peuvent jouer sur le même téléphone, chacun à son tour.</p>'+
  '<input id="v71p1" placeholder="Nom / pseudo élève 1">'+
  '<input id="v71p2" placeholder="Nom / pseudo élève 2">'+
  '<select id="v71n"><option value="5">5 questions</option><option value="10">10 questions</option></select>'+
  '<button id="v71start">🚀 Commencer</button>';
  document.getElementById("v71start").onclick=function(){BellabeLocalChallenge.start(document.getElementById("v71p1").value,document.getElementById("v71p2").value,document.getElementById("v71n").value);render()};
  return;
 }
 if(s.finished){
  root.innerHTML='<h3>🏆 Défi terminé !</h3><p><b>'+esc(s.p1)+'</b> : '+s.score1+' point(s)</p><p><b>'+esc(s.p2)+'</b> : '+s.score2+' point(s)</p><p>Les résultats sont enregistrés sur cet appareil.</p><button id="v71again">🔄 Nouveau défi</button>';
  document.getElementById("v71again").onclick=function(){BellabeLocalChallenge.reset();render()}; return;
 }
 let q=s.questions[s.i], player=s.turn, name=player===1?s.p1:s.p2;
 root.innerHTML='<h3>❓ Question '+(s.i+1)+' / '+s.questions.length+'</h3><p><b>Tour de '+esc(name)+'</b></p><p style="font-size:1.15em">'+esc(q.q)+'</p>'+
 q.a.map((a,i)=>'<button class="v71ans" data-i="'+i+'">'+esc(a)+'</button>').join('');
 root.querySelectorAll(".v71ans").forEach(b=>b.onclick=function(){BellabeLocalChallenge.answer(player,Number(b.dataset.i));render()});
}
window.addEventListener("DOMContentLoaded",render);
})();
