const toggleBtn = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('[data-nav-links]');

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

(function themeSwitcher(){
  const html = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme') || html.getAttribute('data-theme') || 'blue';
  html.setAttribute('data-theme', saved === 'green' ? 'green' : 'blue');

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const nameEl = btn.querySelector('[data-theme-name]') || document.querySelector('[data-theme-name]');
    if (nameEl) nameEl.textContent = html.getAttribute('data-theme') === 'green' ? 'Green' : 'Blue';

    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'blue';
      const next = current === 'blue' ? 'green' : 'blue';
      html.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      document.querySelectorAll('[data-theme-name]').forEach(el => {
        el.textContent = next === 'green' ? 'Green' : 'Blue';
      });
    });
  });
})();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

(function terminalTypewriter(){
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = [
    'evidence-console --profile cybersecurity-it --status live',
    'm365-access-review --mfa --identity --document findings',
    'wazuh-lab --events sysmon --triage alerts',
    'nmap-review --approved-scope --report clear',
    'case-files --sanitize evidence --publish safely'
  ];

  if (prefersReduced) {
    el.textContent = lines[0];
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, 950);
        return;
      }
      setTimeout(tick, 24);
    } else {
      el.textContent = current.slice(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        charIndex = 0;
      }
      setTimeout(tick, 12);
    }
  }

  tick();
})();

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

  function getAccentRGB() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'green' ? '27,233,140' : '45,124,255';
  }

  function resize(){
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const count = Math.max(45, Math.min(95, Math.floor((w * h) / 18000)));
    nodes = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.2
    }));
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resize();

  function draw(){
    const accent = getAccentRGB();
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(7,10,15,0.18)';
    ctx.fillRect(0,0,w,h);

    for (let i = 0; i < nodes.length; i++){
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;
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
          ctx.strokeStyle = `rgba(${accent},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null){
        const dxm = mouse.x - a.x;
        const dym = mouse.y - a.y;
        const dm = Math.sqrt(dxm*dxm + dym*dym);
        if (dm > 0 && dm < 180){
          a.vx += (dxm / dm) * 0.0022;
          a.vy += (dym / dm) * 0.0022;
        }
      }

      ctx.fillStyle = `rgba(${accent},0.85)`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();

(function counters(){
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const duration = 900;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }
})();
