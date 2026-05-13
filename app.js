/* ══════════════════════════════════════════
   ГДПБЗН Информационна Система – app.js
   ══════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────
   DATA
────────────────────────────── */
const INCIDENTS = [
  { id: '#2024-0412', title: '🔥 Горски пожар – Витоша, м. Боряна',          type: 'ГОРСКИ ПОЖАР',    priority: 'КРИТИЧЕН' },
  { id: '#2024-0411', title: '🏭 Промишлен пожар – Индустриална зона, Люлин', type: 'ПРОМИШЛЕН ПОЖАР', priority: 'ВИСОК'    },
  { id: '#2024-0410', title: '🚗 ПТП с пострадали – Ботевградско шосе',        type: 'ПТП',             priority: 'СРЕДЕН'   },
  { id: '#2024-0409', title: '💨 Газова авария – ул. Раковски 45',             type: 'ГАЗОВА АВАРИЯ',   priority: 'СРЕДЕН'   },
];

/* ──────────────────────────────
   CLOCK
────────────────────────────── */
function updateClock() {
  const el = document.getElementById('clock');
  if (el) {
    el.textContent = new Date().toLocaleTimeString('bg-BG', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
}

/* ──────────────────────────────
   VIEW SWITCHING
────────────────────────────── */
const VIEW_INDEX = { ops: 0, incidents: 1, personnel: 2, vehicles: 3, resources: 4 };

function switchView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === VIEW_INDEX[id]);
  });
}

/* ──────────────────────────────
   CHAT
────────────────────────────── */
function sendMsg() {
  const input = document.getElementById('chat-in');
  const text  = input.value.trim();
  if (!text) return;
  appendMsg(text, true);
  input.value = '';
}

function sendTemplate(text) {
  appendMsg(text, true);
}

function appendMsg(text, isMine) {
  const msgs = document.getElementById('chat-msgs');
  const div  = document.createElement('div');
  div.className = 'chat-msg' + (isMine ? ' mine' : '');

  const now = new Date();
  const t   = now.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' });

  div.innerHTML =
    (!isMine ? '<div class="chat-sender">ОЦ · ДИСПЕЧЕР</div>' : '') +
    `<div class="chat-bubble">${escapeHtml(text)}</div>` +
    `<div class="chat-time">${t}</div>`;

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ──────────────────────────────
   INCIDENT SELECTION
────────────────────────────── */
function selectIncident(index) {
  document.querySelectorAll('.incident-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  const inc = INCIDENTS[index];
  if (!inc) return;

  const idEl    = document.querySelector('.detail-id');
  const titleEl = document.querySelector('.detail-title');

  if (idEl)    idEl.textContent    = `${inc.id} · ${inc.type} · ПРИОРИТЕТ ${inc.priority}`;
  if (titleEl) titleEl.textContent = inc.title;
}

/* ──────────────────────────────
   NEW INCIDENT
────────────────────────────── */
function newIncident() {
  const num = 413 + Math.floor(Math.random() * 10);
  alert(`Ново произшествие #2024-0${num} регистрирано!\nМоля попълнете детайлите.`);
}

/* ──────────────────────────────
   CLOSE INCIDENT
────────────────────────────── */
function closeIncident() {
  if (!confirm('Потвърдете приключване на произшествие #2024-0412?')) return;

  const counter = document.getElementById('active-count');
  if (counter) counter.textContent = String(Math.max(0, parseInt(counter.textContent, 10) - 1));

  alert('Произшествие приключено. Екипите се връщат в базата.');
}

/* ──────────────────────────────
   SOS ALERT
────────────────────────────── */
function sosAlert() {
  const banner = document.querySelector('.alert-banner');
  const text   = document.querySelector('.alert-banner .alert-text');

  if (banner) banner.style.display = 'flex';
  if (text)   text.innerHTML =
    '<strong>🆘 SOS СИГНАЛ:</strong> Пострадал пожарникар на произшествие #2024-0412! ' +
    'Местоположение: 42.6284° N, 23.2847° E';

  alert('🆘 SOS СИГНАЛ ИЗПРАТЕН!\nВсички получиха известие с местоположението.');
}

/* ──────────────────────────────
   ACTIVE-COUNT BLINK
────────────────────────────── */
function startCounterBlink() {
  setInterval(() => {
    const el = document.getElementById('active-count');
    if (el) el.style.opacity = el.style.opacity === '0.4' ? '1' : '0.4';
  }, 800);
}

/* ──────────────────────────────
   INIT
────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Scroll chat to bottom
  const chatMsgs = document.getElementById('chat-msgs');
  if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;

  // Enter key in chat input
  const chatInput = document.getElementById('chat-in');
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMsg();
    });
  }

  // Blinking counter
  startCounterBlink();
});
