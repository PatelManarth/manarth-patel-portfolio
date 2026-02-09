/* =========================
   Mobile nav
========================= */
const toggleBtn = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('[data-nav-links]');

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Open menu');
      }
    });
  });
}

/* =========================
   Reveal on scroll
========================= */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
reveals.forEach(el => io.observe(el));

/* =========================
   Footer year
========================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================
   Typewriter (SOC terminal)
========================= */
(function terminalTypewriter(){
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = [
    'wazuh-query --agent WS01 --filter "sysmon.process:create"',
    'triage --alert "suspicious-powershell" --severity high',
    'baseline --host DC-HydraSec --window 24h',
    'report --timeline --evidence --recommendations',
    'status --visibility "good" --next "tune-rules"'
  ];

  if (prefersReduced) {
    el.textContent = lines[0];
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 24;      // ms
  const deleteSpeed = 12;    // ms
  const holdTime = 900;      // ms

  function tick(){
    const current = lines[lineIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = current.slice(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        charIndex = 0;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
  tick();
})();

/* =========================
   Cyber network particles
   - lightweight canvas nodes + links
   - respects reduced motion
========================= */
(function networkCanvas(){
  const canvas = document.querySelector('[data-net-canvas]');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let w = 0, h = 0;
  let nodes = [];
  let mouse = { x: null, y: null };

  function resize(){
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // Density tuned for performance
    const count = Math.max(45, Math.min(95, Math.floor((w * h) / 18000)));
    nodes = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.2
    }));
  }

  function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  function onMouseLeave(){
    mouse.x = null; mouse.y = null;
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);

  resize();

  function draw(){
    ctx.clearRect(0,0,w,h);

    // Subtle fade layer for trailing effect
    ctx.fillStyle = 'rgba(7,10,15,0.20)';
    ctx.fillRect(0,0,w,h);

    // Draw links
    for (let i = 0; i < nodes.length; i++){
      const a = nodes[i];

      // move
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;

      for (let j = i+1; j < nodes.length; j++){
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        const maxDist = 140;
        if (dist < maxDist){
          const alpha = (1 - dist / maxDist) * 0.28;
          ctx.strokeStyle = `rgba(110,178,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // mouse attraction (subtle)
      if (mouse.x !== null){
        const dxm = mouse.x - a.x;
        const dym = mouse.y - a.y;
        const dm = Math.sqrt(dxm*dxm + dym*dym);
        if (dm < 180){
          a.vx += (dxm / dm) * 0.0022;
          a.vy += (dym / dm) * 0.0022;
        }
      }

      // Draw node
      ctx.fillStyle = 'rgba(110,178,255,0.85)';
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
