
// Clock
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('bg-BG', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// View switching
function switchView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-'+id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const map = {ops:0,incidents:1,personnel:2,vehicles:3,resources:4};
  document.querySelectorAll('.nav-btn')[map[id]].classList.add('active');
}

// Send chat
function sendMsg() {
  const input = document.getElementById('chat-in');
  const text = input.value.trim();
  if (!text) return;
  appendMsg(text, true);
  input.value = '';
}
function sendTemplate(text) { appendMsg(text, true); }
function appendMsg(text, mine) {
  const msgs = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'chat-msg' + (mine ? ' mine' : '');
  const now = new Date();
  const t = now.toLocaleTimeString('bg-BG',{hour:'2-digit',minute:'2-digit'});
  div.innerHTML = `${!mine?'<div class="chat-sender">ОЦ · ДИСПЕЧЕР</div>':''}<div class="chat-bubble">${text}</div><div class="chat-time">${t}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

// Incident select
const incidents = [
  { id:'#2024-0412', title:'🔥 Горски пожар – Витоша, м. Боряна', type:'ГОРСКИ ПОЖАР', priority:'КРИТИЧЕН' },
  { id:'#2024-0411', title:'🏭 Промишлен пожар – Индустриална зона, Люлин', type:'ПРОМИШЛЕН ПОЖАР', priority:'ВИСОК' },
  { id:'#2024-0410', title:'🚗 ПТП с пострадали – Ботевградско шосе', type:'ПТП', priority:'СРЕДЕН' },
  { id:'#2024-0409', title:'💨 Газова авария – ул. Раковски 45', type:'ГАЗОВА АВАРИЯ', priority:'СРЕДЕН' },
];
function selectIncident(i) {
  document.querySelectorAll('.incident-card').forEach((c,idx)=>{
    c.classList.toggle('selected', idx===i);
  });
  const inc = incidents[i];
  document.querySelector('.detail-id').textContent = `${inc.id} · ${inc.type} · ПРИОРИТЕТ ${inc.priority}`;
  document.querySelector('.detail-title').textContent = inc.title;
}

function newIncident() {
  const id = '#2024-0' + (413 + Math.floor(Math.random()*10));
  alert(`Ново произшествие ${id} регистрирано!\nМоля попълнете детайлите.`);
}

function closeIncident() {
  if(confirm('Потвърдете приключване на произшествие #2024-0412?')) {
    document.getElementById('active-count').textContent = '3';
    alert('Произшествие приключено. Екипите се връщат в базата.');
  }
}

function sosAlert() {
  document.querySelector('.alert-banner').style.display = 'flex';
  document.querySelector('.alert-banner .alert-text').innerHTML =
    '<strong>🆘 SOS СИГНАЛ:</strong> Пострадал пожарникар на произшествие #2024-0412! Местоположение: 42.6284° N, 23.2847° E';
  alert('🆘 SOS СИГНАЛ ИЗПРАТЕН!\nВсички получиха известие с местоположението.');
}

// Auto-scroll chat
document.getElementById('chat-msgs').scrollTop = 9999;

// Blinking active count
setInterval(()=>{
  const el = document.getElementById('active-count');
  el.style.opacity = el.style.opacity === '0.4' ? '1' : '0.4';
}, 800);
