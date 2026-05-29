// ─── PROYECTO INVINCIBLE: app.js ───
'use strict';

const APP = {
  version: '2.0.0',
  storageKey: 'pi_progress',

  // Phase definitions
  phases: [
    {
      id: 1,
      name: 'IGNITION PROTOCOL',
      subtitle: 'Activación del Sistema',
      weeks: 6,
      difficulty: 2,
      color: 'cyan',
      focus: ['Adaptación', 'Postura', 'Base'],
      file: 'phases/fase1.html',
      description: 'Despiertas las fibras dormidas. Construyes los cimientos de un cuerpo invencible.',
    },
    {
      id: 2,
      name: 'STRUCTURAL BUILD',
      subtitle: 'Construcción de Base',
      weeks: 6,
      difficulty: 3,
      color: 'gold',
      focus: ['Fuerza', 'Hipertrofia', 'Estabilidad'],
      file: 'phases/fase2.html',
      description: 'Tejido muscular se densifica. La estructura se vuelve resistente al impacto.',
    },
    {
      id: 3,
      name: 'ENDURANCE FORGE',
      subtitle: 'Forja de la Resistencia',
      weeks: 5,
      difficulty: 3,
      color: 'orange',
      focus: ['Resistencia', 'Cardio', 'Densidad'],
      file: 'phases/fase3.html',
      description: 'El motor cardiovascular se expande. Puedes pelear más tiempo del que el enemigo aguanta.',
    },
    {
      id: 4,
      name: 'WARRIOR PROTOCOL',
      subtitle: 'Explosividad y Combate',
      weeks: 5,
      difficulty: 4,
      color: 'red',
      focus: ['Explosividad', 'Potencia', 'Velocidad'],
      file: 'phases/fase4.html',
      description: 'Activas fibras de contracción rápida. Cada movimiento se vuelve arma.',
    },
    {
      id: 5,
      name: 'FLUID DYNAMICS',
      subtitle: 'Movilidad Avanzada',
      weeks: 4,
      difficulty: 2,
      color: 'green',
      focus: ['Movilidad', 'Flexibilidad', 'ROM'],
      file: 'phases/fase5.html',
      description: 'El cuerpo se convierte en agua. Movilidad que los rígidos no pueden igualar.',
    },
    {
      id: 6,
      name: 'ULTRA INSTINCT',
      subtitle: 'Control Total',
      weeks: 6,
      difficulty: 5,
      color: 'purple',
      focus: ['Control corporal', 'Calistenia avanzada', 'Habilidad'],
      file: 'phases/fase6.html',
      description: 'El cuerpo actúa antes que la mente lo ordene. Nivel Viltrumita confirmado.',
    },
  ],

  // Load saved progress
  loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    } catch { return {}; }
  },

  // Save progress
  saveProgress(data) {
    try {
      const current = this.loadProgress();
      localStorage.setItem(this.storageKey, JSON.stringify({ ...current, ...data }));
    } catch (e) { console.warn('Storage unavailable:', e); }
  },

  // Get current active phase (1-indexed)
  getCurrentPhase() {
    const p = this.loadProgress();
    return p.currentPhase || 1;
  },

  // Total weeks
  getTotalWeeks() {
    return this.phases.reduce((acc, p) => acc + p.weeks, 0);
  },

  // Init
  init() {
    this.animateNumbers();
    this.renderDifficultyMeters();
    this.initProgressBars();
  },

  // Animate counter numbers
  animateNumbers() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  },

  // Render difficulty pips
  renderDifficultyMeters() {
    document.querySelectorAll('[data-difficulty]').forEach(el => {
      const diff = parseInt(el.dataset.difficulty, 10);
      const max = 5;
      el.innerHTML = Array.from({ length: max }, (_, i) =>
        `<div class="difficulty-meter__pip ${i < diff ? 'active' : ''}"></div>`
      ).join('');
    });
  },

  // Animate progress bars
  initProgressBars() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width || '0';
          bar.style.width = width + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.progress-bar__fill[data-width]').forEach(el => {
      el.style.width = '0';
      observer.observe(el);
    });
  },
};

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', () => APP.init());
