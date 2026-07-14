const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const html = document.documentElement;

const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

// Mobile navigation
const menu = $('[data-menu]');
const menuToggle = $('[data-menu-toggle]');
if (menu && menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

// Theme
const syncThemeLabel = () => {
  $$('[data-theme-name]').forEach(element => {
    element.textContent = html.dataset.theme === 'green' ? 'Green' : 'Blue';
  });
};
syncThemeLabel();
$$('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'green' ? 'blue' : 'green';
  localStorage.setItem('portfolio-theme', html.dataset.theme);
  syncThemeLabel();
}));

// Simple / technical explanation depth
$$('[data-depth]').forEach(button => button.addEventListener('click', () => {
  html.dataset.depth = button.dataset.depth;
  localStorage.setItem('portfolio-depth', button.dataset.depth);
  $$('[data-depth]').forEach(item => item.classList.toggle('is-active', item === button));
}));
$$(`[data-depth="${html.dataset.depth}"]`).forEach(button => button.classList.add('is-active'));

// Persistent visitor routes
const routes = {
  recruiter: { title: 'Recruiter route', text: 'Resume → About → Featured projects → Contact', href: '/resume/', label: 'Open resume' },
  technical: { title: 'Technical manager route', text: 'Projects → Labs → Case files → GitHub', href: '/projects/', label: 'Review projects' },
  learner: { title: 'Learning route', text: 'Glossary → Blog → Labs → Projects', href: '/glossary/', label: 'Open glossary' },
  business: { title: 'Practical security route', text: 'Services → Scope → Contact', href: '/services/', label: 'View services' }
};
$$('[data-route]').forEach(button => button.addEventListener('click', () => {
  $$('[data-route]').forEach(item => item.classList.toggle('is-active', item === button));
  localStorage.setItem('portfolio-route', button.dataset.route);
  const route = routes[button.dataset.route];
  const output = $('[data-route-output]');
  if (output) {
    output.innerHTML = `<strong>${route.title}</strong><p>${route.text}</p><a class="button button--primary" href="${route.href}">${route.label}</a>`;
  }
}));
const savedRoute = localStorage.getItem('portfolio-route');
if (savedRoute) $(`[data-route="${savedRoute}"]`)?.click();

// Pagefind full-text search: indexes rendered page text, headings and project content.
const dialog = $('[data-search-dialog]');
const searchInput = $('[data-search-input]');
const searchResults = $('[data-search-results]');
let pagefind;

async function loadPagefind() {
  if (pagefind) return pagefind;
  pagefind = await import('/pagefind/pagefind.js');
  await pagefind.init();
  return pagefind;
}

function googleFallback(query) {
  const encodedSiteQuery = encodeURIComponent(`site:manarthpatel.com ${query}`);
  const encodedWebQuery = encodeURIComponent(query);
  return `
    <div class="search-empty">
      <p>No matching content was found on this website.</p>
      <div class="search-fallbacks">
        <a class="button" target="_blank" rel="noreferrer" href="https://www.google.com/search?q=${encodedSiteQuery}">Search this site on Google</a>
        <a class="button" target="_blank" rel="noreferrer" href="https://www.google.com/search?q=${encodedWebQuery}">Search the wider web</a>
        <a class="button" href="/contact/">Ask Manarth</a>
      </div>
    </div>`;
}

async function renderSearch() {
  const query = searchInput?.value.trim() || '';
  if (!searchResults) return;
  if (!query) {
    searchResults.innerHTML = '<p class="search-hint">Search any project, tool, skill, framework, article, service, or glossary term.</p>';
    return;
  }

  searchResults.innerHTML = '<p class="search-hint">Searching the website…</p>';
  try {
    const api = await loadPagefind();
    const search = await api.search(query);
    const data = await Promise.all(search.results.slice(0, 12).map(result => result.data()));
    searchResults.innerHTML = data.length
      ? data.map(result => `
          <a class="search-result" href="${escapeHtml(result.url)}">
            <strong>${escapeHtml(result.meta?.title || result.url)}</strong>
            <span>${result.excerpt || ''}</span>
          </a>`).join('')
      : googleFallback(query);
  } catch (error) {
    searchResults.innerHTML = googleFallback(query);
  }
}

$$('[data-search-open]').forEach(button => button.addEventListener('click', () => {
  dialog?.showModal();
  if (searchInput) searchInput.value = '';
  renderSearch();
  setTimeout(() => searchInput?.focus(), 0);
}));
searchInput?.addEventListener('input', renderSearch);
addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    dialog?.showModal();
    searchInput?.focus();
  }
  if (event.key === 'Escape' && dialog?.open) dialog.close();
});

$('[data-year]')?.replaceChildren(String(new Date().getFullYear()));

// Animated network background, disabled when reduced motion is requested.
const canvas = $('[data-network]');
if (canvas && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const context = canvas.getContext('2d');
  let width;
  let height;
  let nodes = [];

  function resize() {
    width = innerWidth;
    height = innerHeight;
    canvas.width = width;
    canvas.height = height;
    nodes = Array.from({ length: Math.min(65, Math.max(28, Math.floor(width * height / 26000))) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18
    }));
  }

  addEventListener('resize', resize);
  resize();

  (function draw() {
    context.clearRect(0, 0, width, height);
    const rgb = html.dataset.theme === 'green' ? '27,233,140' : '45,124,255';
    nodes.forEach((node, index) => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
      context.fillStyle = `rgba(${rgb},.65)`;
      context.beginPath();
      context.arc(node.x, node.y, 1.4, 0, Math.PI * 2);
      context.fill();
      for (let next = index + 1; next < nodes.length; next += 1) {
        const other = nodes[next];
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance < 125) {
          context.strokeStyle = `rgba(${rgb},${(1 - distance / 125) * 0.14})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }());
}
