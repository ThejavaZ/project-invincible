// ─── PROYECTO INVINCIBLE: timers.js ───
'use strict';

const TIMER = {
  state: {
    seconds: 0,
    interval: null,
    running: false,
    mode: 'countdown', // 'countdown' | 'stopwatch'
  },

  // Format seconds → MM:SS
  format(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  },

  // Create a timer widget inside a container element
  create(container, options = {}) {
    const {
      startSeconds = 60,
      mode = 'countdown',
      label = 'REST TIMER',
      onComplete = null,
    } = options;

    const id = 'tmr_' + Math.random().toString(36).slice(2, 7);

    container.innerHTML = `
      <div class="timer-widget" id="${id}">
        <div class="timer-widget__label mono">${label}</div>
        <div class="timer-widget__display heading-lg glow-cyan">${this.format(startSeconds)}</div>
        <div class="timer-widget__controls">
          <button class="btn btn--cyan timer-start" data-id="${id}" data-seconds="${startSeconds}" data-mode="${mode}">
            ▶ START
          </button>
          <button class="btn timer-reset" data-id="${id}" data-seconds="${startSeconds}" style="color:var(--text-muted);border-color:var(--border)">
            ↺ RESET
          </button>
        </div>
      </div>
    `;

    // Store callback
    if (onComplete) {
      container.querySelector('.timer-widget')._onComplete = onComplete;
    }

    this._bindWidget(container.querySelector(`#${id}`), startSeconds, mode);
  },

  _bindWidget(widget, startSecs, mode) {
    let seconds = startSecs;
    let interval = null;
    let running = false;
    const display = widget.querySelector('.timer-widget__display');
    const startBtn = widget.querySelector('.timer-start');
    const resetBtn = widget.querySelector('.timer-reset');

    const tick = () => {
      if (mode === 'countdown') {
        seconds--;
        if (seconds <= 0) {
          seconds = 0;
          clearInterval(interval);
          running = false;
          startBtn.textContent = '▶ START';
          display.classList.add('blink');
          if (widget._onComplete) widget._onComplete();
          // Flash notification
          TIMER._notify('¡Tiempo!');
        }
      } else {
        seconds++;
      }
      display.textContent = TIMER.format(seconds);
      if (seconds <= 5 && mode === 'countdown' && seconds > 0) {
        display.style.color = 'var(--red)';
        display.style.textShadow = '0 0 20px rgba(255,60,90,0.6)';
      }
    };

    startBtn.addEventListener('click', () => {
      if (running) {
        clearInterval(interval);
        running = false;
        startBtn.textContent = '▶ START';
      } else {
        display.classList.remove('blink');
        display.style.color = '';
        display.style.textShadow = '';
        interval = setInterval(tick, 1000);
        running = true;
        startBtn.textContent = '⏸ PAUSE';
      }
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(interval);
      running = false;
      seconds = startSecs;
      display.textContent = TIMER.format(seconds);
      display.classList.remove('blink');
      display.style.color = '';
      display.style.textShadow = '';
      startBtn.textContent = '▶ START';
    });
  },

  // Auto-initialize all [data-timer] elements
  initAll() {
    document.querySelectorAll('[data-timer]').forEach(el => {
      const seconds = parseInt(el.dataset.timer, 10) || 60;
      const label = el.dataset.label || 'TIMER';
      const mode = el.dataset.mode || 'countdown';
      this.create(el, { startSeconds: seconds, label, mode });
    });
  },

  _notify(msg) {
    // Simple visual toast
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position:fixed; bottom:30px; right:30px; z-index:9999;
      background:var(--surface2); border:1px solid var(--cyan);
      color:var(--cyan); font-family:var(--font-display);
      font-size:0.9rem; letter-spacing:0.1em;
      padding:12px 24px; border-radius:6px;
      box-shadow:0 0 20px rgba(0,212,255,0.3);
      animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },
};

document.addEventListener('DOMContentLoaded', () => TIMER.initAll());
