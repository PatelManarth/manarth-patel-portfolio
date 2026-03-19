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
    'wazuh-query --agent WS01 --filter "sysmon.process:create"',
    'triage --alert "suspicious-powershell" --severity high',
    'baseline --host DC01 --window 24h',
    'splunk-search --index security --keyword "failed logon"',
    'report --timeline --evidence --recommendations'
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
    const duration = 1200;
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
    { sev: 'HIGH', cls: 'high', title: 'Suspicious PowerShell execution', meta: 'WS01 • Sysmon Event ID 1 • Review initiated' },
    { sev: 'MED', cls: 'medium', title: 'Service creation detected', meta: 'DC01 • Validation recommended' },
    { sev: 'LOW', cls: 'low', title: 'Multiple failed logons', meta: 'FS01 • Source correlation pending' },
    { sev: 'MED', cls: 'medium', title: 'Unusual scheduled task activity', meta: 'WS02 • Investigation queued' },
    { sev: 'HIGH', cls: 'high', title: 'Encoded command observed', meta: 'Endpoint visibility escalated' }
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
  }, 3200);
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
      desc: 'A realistic enterprise-style red/blue team simulation demonstrating attack progression, detection, incident handling, isolation, and hardening.',
      meta: ['MITRE ATT&CK aligned', 'Wazuh + Sysmon', 'pfSense segmentation', 'Active Directory', 'Incident Response'],
      body: `
        <h4>Overview</h4>
        <p>Operation Hydra was designed to simulate a real-world corporate breach lifecycle from initial compromise through detection, investigation, containment, and security hardening.</p>
        <h4>Attack and defence flow</h4>
        <ul>
          <li>Simulated SQL injection, privilege escalation, and lateral movement.</li>
          <li>Used Wazuh SIEM and Sysmon telemetry to identify malicious activity.</li>
          <li>Performed incident response actions including system isolation and security hardening.</li>
          <li>Validated end-to-end attack and defence thinking aligned with SOC workflows.</li>
        </ul>
        <h4>Why this matters</h4>
        <ul>
          <li>Shows I understand both offensive activity and defensive visibility.</li>
          <li>Demonstrates practical SIEM investigation value, not just tool familiarity.</li>
          <li>Proves I can think in terms of workflow, evidence, and remediation.</li>
        </ul>
      `
    },
    honeypot: {
      tag: 'Case Study',
      title: 'Honeypot Deployment & Early Threat Monitoring',
      desc: 'A threat-monitoring project designed to observe attack behaviour and document defensive patterns.',
      meta: ['Cowrie', 'Linux', 'Monitoring', 'Threat Observation'],
      body: `
        <h4>Overview</h4>
        <p>This project focused on early threat monitoring through honeypot deployment and analysis of attacker behaviour.</p>
        <h4>What I built</h4>
        <ul>
          <li>Deployed honeypots to capture interaction attempts and intrusion behaviour.</li>
          <li>Observed patterns such as scans, login attempts, and attacker probing.</li>
          <li>Documented defensive takeaways from collected activity.</li>
        </ul>
      `
    },
    riskscanner: {
      tag: 'Case Study',
      title: 'Personal Cyber Risk Scanner',
      desc: 'A lightweight security assessment tool for detecting open ports and weak configurations with simple reporting.',
      meta: ['Python', 'Nmap', 'Streamlit', 'Reporting'],
      body: `
        <h4>Overview</h4>
        <p>Built as an independent project to provide quick visibility into open ports and basic configuration weaknesses.</p>
        <h4>What I built</h4>
        <ul>
          <li>Integrated Nmap with Python for scanning workflows.</li>
          <li>Created a Streamlit interface for simple usability.</li>
          <li>Added automated reporting to make results easier to review.</li>
        </ul>
      `
    },
    rat: {
      tag: 'Case Study',
      title: 'RAT Detection System',
      desc: 'A defensive endpoint project focused on suspicious RAT-like behaviours and useful detection signals.',
      meta: ['Python', 'Windows', 'Detection Logic'],
      body: `
        <h4>Overview</h4>
        <p>This project explored how to identify abnormal endpoint behaviours commonly associated with remote access malware.</p>
        <h4>Highlights</h4>
        <ul>
          <li>Behaviour-focused detection thinking.</li>
          <li>Better triage signals for analyst review.</li>
          <li>Improved incident storytelling and reporting structure.</li>
        </ul>
      `
    },
    smartattend: {
      tag: 'Case Study',
      title: 'SmartAttend — AI Attendance System',
      desc: 'An AI-enabled system combining computer vision, backend APIs, user workflows, and auditable reporting.',
      meta: ['YOLOv8', 'FastAPI', 'Streamlit', 'Computer Vision'],
      body: `
        <h4>Overview</h4>
        <p>SmartAttend was built as a production-minded AI system rather than just a model demo.</p>
        <h4>What it includes</h4>
        <ul>
          <li>AI-based attendance processing using computer vision.</li>
          <li>Backend API logic for workflows and records.</li>
          <li>Frontend interaction and reporting support.</li>
        </ul>
        <h4>Why it matters</h4>
        <ul>
          <li>Shows full-stack thinking alongside AI/ML ability.</li>
          <li>Demonstrates system design beyond pure model training.</li>
        </ul>
      `
    },
    backup: {
      tag: 'Case Study',
      title: 'Secure Backup Automation',
      desc: 'A repeatable backup workflow designed for resilience, consistency, and restore readiness.',
      meta: ['Linux', 'Automation', 'Recovery'],
      body: `
        <h4>Overview</h4>
        <p>This project focused on building reliable backup processes with a security-first mindset.</p>
        <h4>Highlights</h4>
        <ul>
          <li>Repeatable automation flow.</li>
          <li>Security-conscious handling of backup data.</li>
          <li>Useful for small environments that need dependable recovery support.</li>
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