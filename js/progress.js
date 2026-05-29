// ─── PROYECTO INVINCIBLE: progress.js ───
'use strict';

const PROGRESS = {
  key: 'pi_progress',

  defaults: {
    currentPhase: 1,
    currentWeek: 1,
    startDate: null,
    completedDays: {},     // { 'p1_w1_d1': true, ... }
    metrics: {
      pushups_max: 0,
      pullups_max: 0,
      squat_hold_sec: 0,
      plank_sec: 0,
      run_min: 0,
    },
    notes: {},
  },

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? { ...this.defaults, ...JSON.parse(raw) } : { ...this.defaults };
    } catch { return { ...this.defaults }; }
  },

  save(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (e) { console.warn('Storage error:', e); }
  },

  // Mark a day complete
  completeDay(phase, week, day) {
    const data = this.load();
    const key = `p${phase}_w${week}_d${day}`;
    data.completedDays[key] = new Date().toISOString();
    this.save(data);
    this._updateUI();
  },

  // Check if day is done
  isDayDone(phase, week, day) {
    const data = this.load();
    return !!data.completedDays[`p${phase}_w${week}_d${day}`];
  },

  // Update a metric
  updateMetric(key, value) {
    const data = this.load();
    if (!data.metrics) data.metrics = {};
    data.metrics[key] = value;
    this.save(data);
  },

  // Start the program (set start date)
  start() {
    const data = this.load();
    if (!data.startDate) {
      data.startDate = new Date().toISOString();
      this.save(data);
    }
  },

  // Get days elapsed
  getDaysElapsed() {
    const data = this.load();
    if (!data.startDate) return 0;
    const ms = Date.now() - new Date(data.startDate).getTime();
    return Math.floor(ms / 86400000);
  },

  // Get completion % for a phase
  getPhaseCompletion(phase, totalDays) {
    const data = this.load();
    const done = Object.keys(data.completedDays).filter(k => k.startsWith(`p${phase}_`)).length;
    return Math.min(100, Math.round((done / totalDays) * 100));
  },

  // Render completion checkboxes (call in phase pages)
  renderDayCheckboxes(phase, week, totalDays = 5) {
    document.querySelectorAll('[data-day-check]').forEach(el => {
      const day = parseInt(el.dataset.dayCheck, 10);
      const done = this.isDayDone(phase, week, day);
      const id = `day_${phase}_${week}_${day}`;

      el.innerHTML = `
        <label class="day-check ${done ? 'done' : ''}" for="${id}">
          <input type="checkbox" id="${id}" ${done ? 'checked' : ''}
            onchange="PROGRESS.completeDay(${phase}, ${week}, ${day}); this.closest('.day-check').classList.toggle('done', this.checked)">
          <span class="day-check__box">✓</span>
          <span class="day-check__label mono">DÍA ${day} COMPLETADO</span>
        </label>
      `;
    });
  },

  _updateUI() {
    // Dispatch custom event so pages can react
    window.dispatchEvent(new CustomEvent('pi:progress-updated'));
  },

  // Metrics form
  renderMetricsForm(container) {
    const data = this.load();
    const m = data.metrics || {};

    container.innerHTML = `
      <div class="card stagger">
        <div class="section-header mb-4">
          <span class="section-title">MÉTRICAS DE RENDIMIENTO</span>
        </div>
        <div class="grid-2" style="gap:12px">
          ${this._metricInput('pushups_max', 'Max Push-ups', m.pushups_max, 'reps')}
          ${this._metricInput('pullups_max', 'Max Pull-ups', m.pullups_max, 'reps')}
          ${this._metricInput('squat_hold_sec', 'Sentadilla estática', m.squat_hold_sec, 'seg')}
          ${this._metricInput('plank_sec', 'Max Plancha', m.plank_sec, 'seg')}
          ${this._metricInput('run_min', 'Trote continuo', m.run_min, 'min')}
        </div>
        <button class="btn btn--cyan mt-4" onclick="PROGRESS._saveMetricsForm()">
          💾 GUARDAR MÉTRICAS
        </button>
      </div>
    `;
  },

  _metricInput(key, label, value, unit) {
    return `
      <div class="flex-col gap-1">
        <label class="label">${label} (${unit})</label>
        <input type="number" id="metric_${key}" value="${value || 0}" min="0"
          style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);
                 color:var(--text);font-family:var(--font-mono);font-size:1rem;padding:8px 12px;width:100%">
      </div>
    `;
  },

  _saveMetricsForm() {
    const data = this.load();
    ['pushups_max','pullups_max','squat_hold_sec','plank_sec','run_min'].forEach(key => {
      const el = document.getElementById('metric_' + key);
      if (el) data.metrics[key] = parseInt(el.value, 10) || 0;
    });
    this.save(data);
    // Toast
    const t = document.createElement('div');
    t.textContent = '✓ MÉTRICAS GUARDADAS';
    t.style.cssText = 'position:fixed;bottom:30px;right:30px;z-index:9999;background:var(--surface2);border:1px solid var(--green);color:var(--green);font-family:var(--font-display);font-size:0.8rem;letter-spacing:0.1em;padding:10px 20px;border-radius:6px';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  },
};

// Style for day checkboxes
const checkStyle = document.createElement('style');
checkStyle.textContent = `
  .day-check {
    display:flex; align-items:center; gap:10px; cursor:pointer;
    padding:8px 12px; border-radius:var(--r);
    border:1px solid var(--border);
    transition:all 0.2s; user-select:none;
  }
  .day-check input { display:none; }
  .day-check__box {
    width:22px; height:22px; border:1px solid var(--border2);
    border-radius:4px; display:flex; align-items:center; justify-content:center;
    font-size:0.8rem; color:transparent; background:var(--bg2);
    transition:all 0.2s; flex-shrink:0;
  }
  .day-check.done { border-color:rgba(0,255,136,0.3); background:rgba(0,255,136,0.04); }
  .day-check.done .day-check__box { background:var(--green); color:var(--bg); border-color:var(--green); }
  .day-check__label { font-size:0.75rem; color:var(--text-dim); }
  .day-check.done .day-check__label { color:var(--green); }
`;
document.head.appendChild(checkStyle);
