const $=s=>document.querySelector(s);
function toggleMenu(){document.querySelector('#nav').classList.toggle('open')}
const questions=[
["ما اسم شعار اليوم الوطني السعودي لعام 2026؟",["عزّنا بطبعنا","همة وطن","وطننا أولاً"],0],
["في أي تاريخ يوافق اليوم الوطني السعودي؟",["21 سبتمبر","23 سبتمبر","1 ديسمبر"],1],
["ما المدينة التي استردها الملك عبدالعزيز عام 1902م؟",["الرياض","جدة","المدينة المنورة"],0],
["ما عاصمة المملكة العربية السعودية؟",["مكة المكرمة","الرياض","الدمام"],1],
["أين يقع المسجد النبوي؟",["مكة المكرمة","المدينة المنورة","الطائف"],1],
["ما البرنامج المرتبط بخدمة ضيوف الرحمن ضمن رؤية 2030؟",["برنامج خدمة ضيوف الرحمن","برنامج المدن الذكية","برنامج جودة الهواء"],0],
["أي من التالي من قيم هوية 2026؟",["الكرم","العزلة","السرية"],0],
["أين يقع المسجد الحرام؟",["مكة المكرمة","الرياض","أبها"],0],
["ما الوثيقة الوطنية التي ترسم مستهدفات بعيدة المدى للتنمية؟",["رؤية السعودية 2030","وثيقة المدرسة","خطة الرحلات"],0],
["أي عبارة تعبّر عن التعلم الوطني الإيجابي؟",["أتعلم وأبدع وأخدم وطني","لا أشارك","أتوقف عن التعلم"],0]
];
let qi=0,score=0;
function renderQuiz(){
 const q=questions[qi];
 $("#quizBox").innerHTML=`<div class="quiz-progress"><span style="width:${qi/questions.length*100}%"></span></div><small>السؤال ${qi+1} من ${questions.length}</small><h3>${q[0]}</h3><div class="quiz-options">${q[1].map((x,i)=>`<button onclick="answerQuiz(${i})">${x}</button>`).join("")}</div>`;
}
function answerQuiz(i){
 if(i===questions[qi][2])score++;
 qi++;
 if(qi<questions.length)renderQuiz(); else {
   const msg=score>=9?"أحسنتِ يا بطلة الوطن 🇸🇦 أداء رائع!":score>=7?"ممتاز! 🌟 لديك معرفة وطنية جميلة.":"محاولة جميلة 💚 أعيدي المسابقة وارفعي نتيجتك!";
   $("#quizBox").innerHTML=`<div style="text-align:center"><div style="font-size:55px">🏆</div><h2>نتيجتك ${score}/10</h2><p>${msg}</p><button class="btn primary" onclick="resetQuiz()">إعادة المسابقة</button></div>`;
 }
}
function resetQuiz(){qi=0;score=0;renderQuiz()}
renderQuiz();

const games={
 truefalse:[["اليوم الوطني السعودي يوافق 23 سبتمبر.","صح",true],["عاصمة المملكة هي جدة.","خطأ",false],["يقع المسجد النبوي في المدينة المنورة.","صح",true],["استرد الملك عبدالعزيز الرياض عام 1902م.","صح",true],["شعار 2026 هو «همة وطن».","خطأ",false]],
 missing:[["عزّنا بـ_____","بطبعنا",["بطبعنا","سرعتنا","صمتنا"]],["رؤية السعودية ____","2030",["2030","2020","2040"]],["يقع المسجد الحرام في ____","مكة المكرمة",["مكة المكرمة","الرياض","الدمام"]]],
 place:[["أين يقع المسجد النبوي؟","المدينة المنورة",["المدينة المنورة","الرياض","أبها"]],["أين يقع المسجد الحرام؟","مكة المكرمة",["مكة المكرمة","جدة","حائل"]],["ما المدينة التي استردها الملك عبدالعزيز عام 1902م؟","الرياض",["الرياض","الطائف","الدمام"]]]
};
let gameScore=0,gameIndex=0,gameType="";
function startGame(type){if(type==="memory"){memoryGame();return}if(type==="speed"){speedGame();return}if(type==="wheel"){wheelGame();return}gameType=type;gameScore=0;gameIndex=0;renderGame()}
function renderGame(){
 const data=games[gameType],q=data[gameIndex];let opts=gameType==="truefalse"?["صح","خطأ"]:q[2];
 $("#gameArea").classList.remove("hidden");
 $("#gameArea").innerHTML=`<div><small>السؤال ${gameIndex+1} من ${data.length}</small><div class="game-question">${q[0]}</div><div class="answers">${opts.map((o,i)=>`<button onclick="answerGame(${i})">${o}</button>`).join("")}</div></div>`;
}
function answerGame(i){
 const q=games[gameType][gameIndex],opts=gameType==="truefalse"?["صح","خطأ"]:q[2];const correct=gameType==="truefalse"?q[2]:opts.indexOf(q[1]);if(i===correct)gameScore++;gameIndex++;
 if(gameIndex<games[gameType].length)renderGame();else showGameResult(gameScore,games[gameType].length)
}
function showGameResult(s,total){$("#gameArea").innerHTML=`<div style="text-align:center"><div style="font-size:48px">🎉</div><h3>أحسنتِ يا بطلة الوطن 🇸🇦</h3><p>حصلتِ على <b>${s}/${total}</b></p><button class="btn primary" onclick="startGame('${gameType}')">إعادة اللعب</button></div>`}
function memoryGame(){
 $("#gameArea").classList.remove("hidden");const vals=["🇸🇦","🕌","🕋","🌴","🇸🇦","🕌","🕋","🌴"],open=[],done=[];
 $("#gameArea").innerHTML=`<h3>💚 ذاكرة وطنية</h3><p>اضغطي على بطاقتين متشابهتين.</p><div class="memory-grid">${vals.map((v,i)=>`<button class="memory" id="m${i}" onclick="flip(${i})">?</button>`).join("")}</div>`;
 window.memVals=vals;window.memOpen=open;window.memDone=done;
}
function flip(i){if(memDone.includes(i)||memOpen.includes(i))return;$("#m"+i).textContent=memVals[i];memOpen.push(i);if(memOpen.length===2){const [a,b]=memOpen;if(memVals[a]===memVals[b]){memDone.push(a,b);memOpen=[]}else setTimeout(()=>{document.querySelectorAll(".memory").forEach((x,j)=>{if(!memDone.includes(j))x.textContent="?";});memOpen=[]},600)}}
function speedGame(){
 $("#gameArea").classList.remove("hidden");let n=0,t=10;
 $("#gameArea").innerHTML=`<h3>⏱️ تحدي السرعة</h3><p>اضغطي أكبر عدد من المرات خلال 10 ثوانٍ.</p><button class="btn primary" id="speedBtn">🇸🇦 اضغطي!</button><h2 id="speedCount">0</h2><p id="speedTime">الوقت: 10</p>`;
 const btn=$("#speedBtn"),count=$("#speedCount"),time=$("#speedTime");btn.onclick=()=>{if(t>0){n++;count.textContent=n}};
 const timer=setInterval(()=>{t--;time.textContent="الوقت: "+t;if(t<=0){clearInterval(timer);btn.disabled=true;time.textContent=`انتهى الوقت! نتيجتك ${n} ضغطة 🎉`}},1000);
}
function wheelGame(){const qs=["اذكري قيمة وطنية تحبينها.","ما معلم سعودي تتمنين زيارته؟","ما مهارة تتمنين تعلمها لخدمة وطنك؟","ما أجمل كلمة تصفين بها الوطن؟"],q=qs[Math.floor(Math.random()*qs.length)];$("#gameArea").classList.remove("hidden");$("#gameArea").innerHTML=`<h3>🎯 عجلة الحظ الوطنية</h3><div class="game-question">${q}</div><p>فكري في إجابتك ثم شاركيها مع معلمتك أو أسرتك 💚</p><button class="btn primary" onclick="wheelGame()">دور جديد</button>`}
const seed=[{n:"طالبة محبة لوطنها",t:"أفتخر بوطننا وأتمنى أن أكون نافعة بعلمي وعطائي. 🇸🇦"},{n:"ولي أمر",t:"دام وطننا عزيزًا مزدهرًا، وحفظ الله أبناءه وبناته."}];
function renderMessages(){const saved=JSON.parse(localStorage.getItem("nationalMessages")||"null")||seed;$("#messageWall").innerHTML=saved.map(m=>`<article class="message"><strong>${escapeHtml(m.n||"زائرة")}</strong><p>${escapeHtml(m.t)}</p></article>`).join("")}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
$("#messageForm").addEventListener("submit",e=>{e.preventDefault();const n=$("#msgName").value.trim()||"محبة للوطن",t=$("#msgText").value.trim();if(!t)return;const arr=JSON.parse(localStorage.getItem("nationalMessages")||"null")||seed;arr.unshift({n,t});localStorage.setItem("nationalMessages",JSON.stringify(arr.slice(0,30)));e.target.reset();renderMessages()});
renderMessages();