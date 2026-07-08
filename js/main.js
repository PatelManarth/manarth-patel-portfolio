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

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

(function terminalTypewriter(){
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = [
    'review-auth-logs --scope troubleshooting --document findings',
    'm365-access-check --mfa --groups --permissions',
    'wazuh-lab --events sysmon --write detection-notes',
    'nmap-scan --test-system --report sanitized',
    'portfolio-proof --separate production-work from lab-work'
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
        setTimeout(tick, 900);
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
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();

  function draw(){
    const accent = getAccentRGB();
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(7,10,15,0.20)';
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
        if (dm < 180){
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

(function themeSwitcher(){
  const html = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');
  const nameEl = document.querySelector('[data-theme-name]');
  if (!btn || !nameEl) return;

  const saved = localStorage.getItem('portfolio-theme') || 'blue';
  html.setAttribute('data-theme', saved);
  nameEl.textContent = saved === 'green' ? 'Green' : 'Blue';

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'blue';
    const next = current === 'blue' ? 'green' : 'blue';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    nameEl.textContent = next === 'green' ? 'Green' : 'Blue';
  });
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
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => counterObserver.observe(counter));
})();

(function rotatingAlerts(){
  const feed = document.querySelector('[data-alert-feed]');
  if (!feed) return;

  const alerts = [
    { sev: 'IAM', cls: 'high', title: 'Microsoft 365 access support', meta: 'Account support • MFA assistance • permission checks' },
    { sev: 'LOG', cls: 'medium', title: 'Authentication log review', meta: 'Troubleshooting context • findings documented' },
    { sev: 'LAB', cls: 'low', title: 'Wazuh and Sysmon detection notes', meta: 'Capstone evidence • Windows telemetry' },
    { sev: 'NET', cls: 'medium', title: 'Nmap and OpenVAS review workflow', meta: 'Test systems • sanitized reporting' },
    { sev: 'DOC', cls: 'high', title: 'Incident and resolution documentation', meta: 'Repeatable support • clear handoff notes' }
  ];

  let index = 0;

  setInterval(() => {
    index = (index + 1) % alerts.length;
    const a = alerts[index];
    const div = document.createElement('div');
    div.className = `alert alert--${a.cls}`;
    div.innerHTML = `
      <span class="alert__sev">${a.sev}</span>
      <div class="alert__body">
        <strong>${a.title}</strong>
        <span>${a.meta}</span>
      </div>
    `;
    feed.prepend(div);

    while (feed.children.length > 4) {
      feed.removeChild(feed.lastElementChild);
    }
  }, 3600);
})();

(function modalViewer(){
  const modal = document.querySelector('[data-project-modal]');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  if (!modal || !openButtons.length) return;

  const titleEl = modal.querySelector('[data-modal-title]');
  const descEl = modal.querySelector('[data-modal-desc]');
  const metaEl = modal.querySelector('[data-modal-meta]');
  const bodyEl = modal.querySelector('[data-modal-body]');
  const tagEl = modal.querySelector('[data-modal-tag]');

  const projectData = {
    hydra: {
      tag: 'Featured Case Study',
      title: 'Operation Hydra — Corporate APT Simulation',
      desc: 'A Durham College capstone simulating attack progression, detection, documentation, and hardening validation in a controlled lab.',
      meta: ['Durham College capstone', 'Wazuh', 'Sysmon', 'Windows Event Logs', 'Active Directory', 'Hardening validation'],
      body: `
        <h4>Overview</h4>
        <p>Operation Hydra was built as an end-to-end attack-and-defense lab, not as a claim of production SOC ownership. The goal was to practice how an analyst documents attack behavior, maps evidence, and validates defensive improvements.</p>
        <h4>Objective</h4>
        <ul>
          <li>Simulate credential access, privilege escalation, and lateral movement in a controlled environment.</li>
          <li>Review Windows Event Logs, Sysmon telemetry, and Wazuh alerts to identify suspicious activity.</li>
          <li>Document findings, evidence, and recommended defensive actions.</li>
          <li>Validate that hardening steps reduced the success of repeated attack attempts.</li>
        </ul>
        <h4>Tools and environment</h4>
        <ul>
          <li>Wazuh, Sysmon, Windows Event Logs, Active Directory, pfSense segmentation, Windows endpoints, and attacker lab tooling.</li>
        </ul>
        <h4>Outcome</h4>
        <ul>
          <li>Created a repeatable attack-detection-hardening workflow.</li>
          <li>Improved documentation discipline around evidence, likely cause, and remediation.</li>
          <li>Built interview-ready proof of security operations thinking while keeping the scope clearly project-based.</li>
        </ul>
      `
    },
    honeypot: {
      tag: 'Case Study',
      title: 'Honeypot Deployment & Early Threat Monitoring',
      desc: 'A capstone project focused on honeypot deployment, brute-force monitoring, attacker behavior review, and defensive reporting.',
      meta: ['Cowrie', 'Linux', 'ELK', 'Threat observation', 'Reporting'],
      body: `
        <h4>Overview</h4>
        <p>This project focused on early threat monitoring through honeypot deployment and analysis of captured interaction attempts.</p>
        <h4>Objective</h4>
        <ul>
          <li>Deploy a honeypot to capture brute-force and unauthorized access attempts.</li>
          <li>Review repeated attacker behavior and summarize useful patterns.</li>
          <li>Translate technical observations into concise defensive recommendations.</li>
        </ul>
        <h4>Evidence and reporting</h4>
        <ul>
          <li>Dashboard-style views, attacker pattern notes, and sanitized findings summaries.</li>
          <li>Redaction priority: remove real IPs, usernames, hostnames, and unnecessary metadata before publishing screenshots.</li>
        </ul>
        <h4>Outcome</h4>
        <ul>
          <li>Improved practical understanding of brute-force behavior, repeated probing, and the value of clear monitoring reports.</li>
        </ul>
      `
    },
    riskscanner: {
      tag: 'Case Study',
      title: 'Personal Cyber Risk Scanner',
      desc: 'A Python-, Nmap-, and Streamlit-based security project for open-port checks, weak-configuration review, and repeatable reporting.',
      meta: ['Python', 'Nmap', 'Streamlit', 'Security review', 'Automated reporting'],
      body: `
        <h4>Overview</h4>
        <p>The Personal Cyber Risk Scanner was built to connect simple vulnerability review with usable reporting. It was designed for test systems and small controlled environments.</p>
        <h4>Objective</h4>
        <ul>
          <li>Run Nmap-based checks through a Python workflow.</li>
          <li>Present results through a Streamlit interface.</li>
          <li>Generate repeatable security review notes that are easier to understand than raw scan output.</li>
        </ul>
        <h4>Tools and method</h4>
        <ul>
          <li>Python for orchestration, Nmap for scanning, Streamlit for the interface, and structured output for reporting.</li>
        </ul>
        <h4>Outcome</h4>
        <ul>
          <li>Demonstrates practical scripting, basic vulnerability assessment, and the ability to convert technical output into readable findings.</li>
        </ul>
      `
    }
  };

  function openModal(key) {
    const data = projectData[key];
    if (!data) return;

    tagEl.textContent = data.tag;
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    metaEl.innerHTML = data.meta.map(item => `<span>${item}</span>`).join('');
    bodyEl.innerHTML = data.body;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
