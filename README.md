# PROYECTO INVINCIBLE v2.0

Sistema de entrenamiento físico progresivo de 32 semanas.  
Calistenia · Movilidad · Fuerza · Control corporal · Acondicionamiento funcional.

---

## ESTRUCTURA DEL PROYECTO

```
project-invincible/
├── index.html              ← Dashboard principal
├── README.md
│
├── phases/
│   ├── fase1.html          ← IGNITION PROTOCOL (sem 1–6)
│   ├── fase2.html          ← STRUCTURAL BUILD (sem 7–12)
│   ├── fase3.html          ← ENDURANCE FORGE (sem 13–17)
│   ├── fase4.html          ← WARRIOR PROTOCOL (sem 18–22)
│   ├── fase5.html          ← FLUID DYNAMICS (sem 23–26)
│   └── fase6.html          ← ULTRA INSTINCT (sem 27–32)
│
├── css/
│   ├── global.css          ← Variables, reset, componentes base
│   ├── animations.css      ← Keyframes y clases de animación
│   ├── phase.css           ← Layouts específicos de fases
│   └── dashboard.css       ← Layout del dashboard
│
└── js/
    ├── app.js              ← Init, números animados, dificultad
    ├── progress.js         ← Tracking, métricas, localStorage
    ├── timers.js           ← Timers de descanso interactivos
    └── navigation.js       ← Navegación entre fases
```

---

## FASES DEL SISTEMA

| Fase | Nombre | Semanas | Dificultad | Enfoque |
|------|--------|---------|-----------|---------|
| 1 | IGNITION PROTOCOL | 6 | ★★☆☆☆ | Adaptación base, anti-office |
| 2 | STRUCTURAL BUILD | 6 | ★★★☆☆ | Fuerza PPL, hipertrofia |
| 3 | ENDURANCE FORGE | 5 | ★★★☆☆ | Resistencia, circuitos, AMRAP |
| 4 | WARRIOR PROTOCOL | 5 | ★★★★☆ | Explosividad, boxing, potencia |
| 5 | FLUID DYNAMICS | 4 | ★★☆☆☆ | Movilidad avanzada, ROM |
| 6 | ULTRA INSTINCT | 6 | ★★★★★ | Calistenia de habilidad |

**Total: 32 semanas / ~8 meses**

---

## PRINCIPIOS DEL SISTEMA

- **Periodización real**: semana de deload en cada fase (−40% volumen)
- **Progresión inteligente**: no "x fallo" — cargas medibles y progresivas
- **Balance push/pull**: ratio 1:1 protege los hombros
- **Anti-office integrado**: movilidad de cuello, hombros, cadena posterior en cada sesión
- **Test de fase**: al terminar cada fase, métricas concretas definen si avanzar

---

## CORRECCIONES vs v1.0

| Problema v1.0 | Solución v2.0 |
|---------------|---------------|
| "4×Fallo" en principiantes | Series medibles con reps fijas |
| Pseudo planche en semana 2 | Progresión a partir de semana 27 |
| Murph sin progresión | AMRAP progresivo semanas 13–17 |
| Sin semanas de deload | Deload en cada fase |
| Movilidad aislada (Fase 5) | Movilidad integrada diariamente |
| Sin calentamiento | Protocolo 8 min en cada sesión |
| Sin anti-office | Integrado en todas las fases |

---

## CÓMO USAR

1. Abre `index.html` en el navegador
2. Lee el dashboard para entender la estructura del año
3. Comienza por `phases/fase1.html`
4. Usa los tabs de semana dentro de cada fase
5. Los timers son interactivos — úsalos para descanso
6. El progreso se guarda en `localStorage` del navegador

---

## STACK TÉCNICO

- HTML5 semántico
- CSS3 con variables (sin frameworks)
- Vanilla JavaScript (sin dependencias)
- Google Fonts: Orbitron + Share Tech Mono + Inter
- localStorage para persistencia de progreso

---

*"La adaptación es el primer paso hacia el nivel Viltrumita."*  
*Hermosillo, Sonora. Ready for deployment.*
