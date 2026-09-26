(function(){
"use strict";
const KEY="bellabeV7Challenges";
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"null")||{profile:null,classRoom:null,students:[],challenges:[]}}catch(e){return {profile:null,classRoom:null,students:[],challenges:[]}}}
function save(s){localStorage.setItem(KEY,JSON.stringify(s))}
window.BellabeChallenges={
createProfile:function(name,pseudo){var s=load();s.profile={name:name||"Élève",pseudo:pseudo||"Explorateur",createdAt:Date.now()};save(s);return s.profile},
joinClass:function(code){var s=load();s.classRoom={code:(code||"IMDS2026").toUpperCase(),name:"Ma classe"};save(s);return s.classRoom},
addStudent:function(pseudo,score){var s=load(),p=(pseudo||"Élève").trim(),i=s.students.findIndex(function(x){return x.pseudo.toLowerCase()===p.toLowerCase()});if(i>=0)s.students[i].score=Number(score)||0;else s.students.push({pseudo:p,score:Number(score)||0});s.students.sort(function(a,b){return b.score-a.score});save(s);return s.students},
createChallenge:function(category){var s=load(),c={id:"D"+Date.now().toString(36),category:category||"Mixte",count:10,status:"en attente",createdAt:Date.now()};s.challenges.unshift(c);save(s);return c},
leaderboard:function(){return load().students.sort(function(a,b){return b.score-a.score})}
};
})();