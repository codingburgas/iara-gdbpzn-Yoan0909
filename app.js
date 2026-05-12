/* ══════════════════════════════════════════
   ГДПБЗН Информационна Система – app.js
   Commit 2: clock + view switching
   ══════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────
   DATA
────────────────────────────── */
const INCIDENTS = [
  { id:'#2024-0412', title:'🔥 Горски пожар – Витоша, м. Боряна',          type:'ГОРСКИ ПОЖАР',    priority:'КРИТИЧЕН' },
  { id:'#2024-0411', title:'🏭 Промишлен пожар – Индустриална зона, Люлин', type:'ПРОМИШЛЕН ПОЖАР', priority:'ВИСОК'    },
  { id:'#2024-0410', title:'🚗 ПТП с пострадали – Ботевградско шосе',        type:'ПТП',             priority:'СРЕДЕН'   },
  { id:'#2024-0409', title:'💨 Газова авария – ул. Раковски 45',             type:'ГАЗОВА АВАРИЯ',   priority:'СРЕДЕН'   },
];

/* ──────────────────────────────
   CLOCK
────────────────────────────── */
function updateClock() {
  const el = document.getElementById('clock');
  if (el) {
    el.textContent = new Date().toLocaleTimeString('bg-BG', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
  }
}

/* ──────────────────────────────
   VIEW SWITCHING
────────────────────────────── */
const VIEW_INDEX = { ops:0, incidents:1, personnel:2, vehicles:3, resources:4 };

function switchView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === VIEW_INDEX[id]);
  });
}

/* ──────────────────────────────
   INIT
────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
});
