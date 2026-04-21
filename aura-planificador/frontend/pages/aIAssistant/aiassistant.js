/* ═══════════════════════════════════════
   STATE
═══════════════════════════════════════ */
let userName = 'Sarah';
let cycleDay = 12;
let conversationHistory = [];
 
const phases = [
  { name: 'Menstruación',    range: [1,5],    desc: 'Descanso y cuidado 🌹',       color: '#C2185B' },
  { name: 'Fase Folicular',  range: [6,13],   desc: 'Energía en alza ✨',           color: '#E91E8C' },
  { name: 'Ovulación',       range: [14,16],  desc: 'Pico de vitalidad 🌟',         color: '#AD1457' },
  { name: 'Fase Lútea',      range: [17,28],  desc: 'Introsección y calma 🌙',      color: '#880E4F' },
];
 
function getPhase(day) {
  return phases.find(p => day >= p.range[0] && day <= p.range[1]) || phases[3];
}
 
/* ═══════════════════════════════════════
   LOGIN
═══════════════════════════════════════ */
function doLogin() {
  const nameInput = document.getElementById('loginName').value.trim();
  const dayInput  = parseInt(document.getElementById('loginDay').value) || 12;
  if (!nameInput) { document.getElementById('loginName').focus(); return; }
  userName = nameInput;
  cycleDay = Math.min(Math.max(dayInput, 1), 35);
  document.getElementById('loginOverlay').style.display = 'none';
  initApp();
}
 
document.getElementById('loginName').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('loginDay').focus();
});
document.getElementById('loginDay').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});
 
/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
function initApp() {
  const phase = getPhase(cycleDay);
  const first = userName.split(' ')[0];
 
  // topbar
  document.getElementById('topUserName').textContent = first;
  document.getElementById('topAvatar').textContent   = first[0].toUpperCase();
 
  // dashboard
  document.getElementById('dashName').textContent       = first;
  document.getElementById('dashPhase').textContent      = phase.name;
  document.getElementById('dashPhaseName').textContent  = phase.name;
  document.getElementById('dashDay').textContent        = cycleDay;
  document.getElementById('dashDayInline').textContent  = cycleDay;
  document.getElementById('dashPhaseDesc').textContent  = phase.desc;
 
  // cycle arc
  const arc = document.getElementById('cycleArc');
  const circumference = 2 * Math.PI * 26; // ~163.4
  const progress = cycleDay / 28;
  arc.setAttribute('stroke-dashoffset', circumference * (1 - progress));
  arc.setAttribute('stroke', phase.color);
 
  // next period
  const daysLeft = 28 - cycleDay;
  document.getElementById('nextPeriod').textContent = `~${daysLeft}d`;
 
  // charts
  buildBarChart();
  buildSymptomChart();
 
  // welcome message
  const welcomeMsg = `¡Hola ${first}! 💕 Soy Aurora, tu asistente de bienestar de AURA. Hoy es tu día **${cycleDay}** del ciclo — estás en tu **${phase.name}** (${phase.desc}).\n\n¿En qué puedo ayudarte hoy? Puedo darte consejos personalizados sobre nutrición, ejercicio, manejo de síntomas, o simplemente escucharte 🌸`;
  addMessage('ai', welcomeMsg);
}
 
/* ═══════════════════════════════════════
   CHARTS
═══════════════════════════════════════ */
function buildBarChart() {
  const months = ['Nov','Dic','Ene','Feb','Mar','Abr'];
  const days   = [27, 29, 28, 30, 27, cycleDay];
  const max    = Math.max(...days);
  const container = document.getElementById('barChart');
  container.innerHTML = '';
  months.forEach((m,i) => {
    const pct = (days[i] / max) * 100;
    container.innerHTML += `
      <div class="bar-col">
        <div class="bar" style="height:${pct}%;"></div>
        <div class="bar-label">${m}</div>
      </div>`;
  });
}
 
function buildSymptomChart() {
  const items = ['Fatiga','Cólicos','Hinchaz.','Humor','Antojos'];
  const vals  = [8, 5, 6, 7, 4];
  const max   = Math.max(...vals);
  const container = document.getElementById('symptomChart');
  container.innerHTML = '';
  items.forEach((s,i) => {
    const pct = (vals[i] / max) * 100;
    container.innerHTML += `
      <div class="bar-col">
        <div class="bar" style="height:${pct}%; background: linear-gradient(to top, #AD1457, #F48FB1);"></div>
        <div class="bar-label">${s}</div>
      </div>`;
  });
}
 
/* ═══════════════════════════════════════
   UI INTERACTIONS
═══════════════════════════════════════ */
function setMood(el, emoji) {
  document.querySelectorAll('.mood-dot').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
}
function toggleTag(el) { el.classList.toggle('active'); }
function setFlow(el) {
  document.querySelectorAll('.flow-dot').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
}
 
/* ═══════════════════════════════════════
   CHAT HELPERS
═══════════════════════════════════════ */
function now() {
  return new Date().toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit' });
}
 
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}
 
function addMessage(role, text) {
  const wrap = document.getElementById('chatMessages');
  const row  = document.createElement('div');
  row.className = `msg-row ${role}`;
 
  if (role === 'ai') {
    row.innerHTML = `
      <div class="ai-label">Aurora 🌸</div>
      <div class="msg-bubble">${formatMarkdown(text)}</div>
      <div class="msg-time">${now()}</div>`;
  } else {
    row.innerHTML = `
      <div class="msg-bubble">${formatMarkdown(text)}</div>
      <div class="msg-time">${now()} ✓✓</div>`;
  }
  wrap.appendChild(row);
  wrap.scrollTop = wrap.scrollHeight;
}
 
function setTyping(show) {
  document.getElementById('typingIndicator').classList.toggle('visible', show);
  const wrap = document.getElementById('chatMessages');
  wrap.scrollTop = wrap.scrollHeight;
}
 
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}
 
function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}
 
/* ═══════════════════════════════════════
   SEND MESSAGE → ANTHROPIC API
═══════════════════════════════════════ */
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;
 
  input.value = '';
  input.style.height = 'auto';
  addMessage('user', text);
 
  conversationHistory.push({ role: 'user', content: text });
  setTyping(true);
 
  const phase = getPhase(cycleDay);
  const activeMood = document.querySelector('.mood-dot.active')?.title || 'desconocido';
  const activeSymptoms = [...document.querySelectorAll('#symptomTags .tag.active')].map(t => t.textContent).join(', ') || 'ninguno';
  const activeFlow = document.querySelector('.flow-dot.active')?.closest('.flow-item')?.querySelector('.flow-label')?.textContent || 'desconocida';
 
  const systemPrompt = `Eres Aurora, la asistente de bienestar femenino de la app AURA. Eres cálida, empática, experta en salud menstrual y bienestar femenino.
 
DATOS ACTUALES DE LA USUARIA:
- Nombre: ${userName}
- Día del ciclo: ${cycleDay}
- Fase actual: ${phase.name} — ${phase.desc}
- Estado emocional hoy: ${activeMood}
- Síntomas registrados: ${activeSymptoms}
- Intensidad del flujo: ${activeFlow}
 
INSTRUCCIONES:
- Siempre personaliza tus respuestas mencionando la fase del ciclo cuando sea relevante.
- Da consejos prácticos, tips de nutrición, ejercicio, autocuidado y manejo emocional adaptados a la fase.
- Usa un tono amigable, cercano, usa emojis con moderación.
- Responde en español colombiano.
- Máximo 200 palabras por respuesta, sé concisa y útil.
- Si la usuaria menciona síntomas graves, recomienda consultar a un médico.`;
 
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'TU_API_KEY_AQUI',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
  },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: conversationHistory
      })
    });
 
    const data = await response.json();
    setTyping(false);
 
    if (data.content && data.content[0]) {
      const reply = data.content[0].text;
      conversationHistory.push({ role: 'assistant', content: reply });
      addMessage('ai', reply);
    } else {
      addMessage('ai', 'Lo siento, no pude procesar tu mensaje. ¿Intentamos de nuevo? 💕');
    }
  } catch (err) {
    setTyping(false);
    addMessage('ai', 'Tuve un problema de conexión. Por favor intenta de nuevo 🌸');
  }
}
 
function sendSuggestion(text) {
  document.getElementById('chatInput').value = text;
  sendMessage();
}
