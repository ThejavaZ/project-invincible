// ─── PROYECTO INVINCIBLE: navigation.js ───
'use strict';

const NAV = {
  phases: [
    { id: 1, name: 'IGNITION',   file: 'fase1.html' },
    { id: 2, name: 'STRUCTURAL', file: 'fase2.html' },
    { id: 3, name: 'ENDURANCE',  file: 'fase3.html' },
    { id: 4, name: 'WARRIOR',    file: 'fase4.html' },
    { id: 5, name: 'FLUID',      file: 'fase5.html' },
    { id: 6, name: 'ULTRA',      file: 'fase6.html' },
  ],

  // Current phase (read from page meta tag or URL)
  currentPhase() {
    const meta = document.querySelector('meta[name="phase"]');
    return meta ? parseInt(meta.content, 10) : 0;
  },

  // Render the sticky nav (call once)
  renderNav(container) {
    const current = this.currentPhase();
    const links = this.phases.map(p => `
      <a href="${p.file}" class="nav-link ${p.id === current ? 'active' : ''}">${p.name}</a>
    `).join('');

    container.innerHTML = `
      <div class="phase-nav-inner">
        <a href="../index.html" class="nav-brand">⬡ PROYECTO INVINCIBLE</a>
        <nav class="nav-links">${links}</nav>
      </div>
    `;
  },

  // Prev / Next links
  renderFooterNav(container) {
    const current = this.currentPhase();
    const prev = this.phases.find(p => p.id === current - 1);
    const next = this.phases.find(p => p.id === current + 1);

    container.innerHTML = `
      <div class="phase-footer-nav">
        ${prev
          ? `<a href="${prev.file}" class="btn btn--cyan">← FASE ${prev.id}: ${prev.name}</a>`
          : `<span></span>`
        }
        <a href="../index.html" class="btn" style="color:var(--text-dim);border-color:var(--border)">◈ DASHBOARD</a>
        ${next
          ? `<a href="${next.file}" class="btn btn--gold">FASE ${next.id}: ${next.name} →</a>`
          : `<span class="badge badge--green">✓ SISTEMA COMPLETO</span>`
        }
      </div>
    `;
  },

  init() {
    const navEl = document.getElementById('phase-nav');
    if (navEl) this.renderNav(navEl);

    const footerEl = document.getElementById('footer-nav');
    if (footerEl) this.renderFooterNav(footerEl);
  },
};

document.addEventListener('DOMContentLoaded', () => NAV.init());
