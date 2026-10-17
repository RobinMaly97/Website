/**
 * ChickenLove landing page interactions — vanilla, no libraries.
 * Everything degrades gracefully: without JS the content is fully visible,
 * and prefers-reduced-motion disables parallax and count-ups.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Nav background on scroll ---------- */
const nav = document.getElementById('nav');
const onScrollNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
onScrollNav();
window.addEventListener('scroll', onScrollNav, { passive: true });

/* ---------- Hero title: animate letter by letter ---------- */
document.querySelectorAll('[data-split]').forEach((el) => {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.innerHTML = [...text]
    .map((c, i) => `<span class="ch" aria-hidden="true" style="--i:${i}">${c}</span>`)
    .join('');
});

/* ---------- Count-up numbers (German decimal comma) ---------- */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const fmt = (v) => v.toFixed(decimals).replace('.', ',');
  if (reduced) return (el.textContent = fmt(target));
  const start = performance.now();
  const dur = 1600;
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Scroll reveal ---------- */
document.querySelectorAll('.bars .bar').forEach((bar, i) => bar.style.setProperty('--n', i));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      el.querySelectorAll('[data-count]').forEach(countUp);
      el.querySelectorAll('[data-progress]').forEach((bar) => {
        bar.style.width = `${parseFloat(bar.dataset.progress) * 100}%`;
      });
      revealObserver.unobserve(el);
    });
  },
  { rootMargin: '0px 0px -12% 0px' },
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Sticky phone story ---------- */
const steps = [...document.querySelectorAll('.step')];
const screens = [...document.querySelectorAll('.stage__phone img')];
const tabs = [...document.querySelectorAll('.tabbar button')];
const glow = document.querySelector('.stage__glow');
const glowColors = ['#f2c08f', '#f0c9a0', '#e9b48a', '#c9cfa6', '#bfc79a', '#d4dcb4', '#f2c08f'];

function activate(index) {
  steps.forEach((s, i) => s.classList.toggle('is-active', i === index));
  screens.forEach((img, i) => {
    img.classList.toggle('is-active', i === index);
    img.classList.toggle('is-past', i < index);
  });
  tabs.forEach((t, i) => t.classList.toggle('is-active', i === index));
  if (glow) glow.style.setProperty('--glow', glowColors[index]);
}

const stepObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activate(Number(entry.target.dataset.step));
    });
  },
  // A step is "active" while it crosses the middle band of the viewport
  { rootMargin: '-45% 0px -45% 0px' },
);
steps.forEach((s) => stepObserver.observe(s));
activate(0);

tabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    const target = steps[Number(tab.dataset.go)];
    const y = target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.06;
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  }),
);

/* ---------- Parallax (uses the `translate` property so it composes with CSS animations) ---------- */
const parallax = [...document.querySelectorAll('[data-speed]')];
if (!reduced && parallax.length) {
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    parallax.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
      el.style.translate = `0 ${offset.toFixed(1)}px`;
    });
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) requestAnimationFrame(update);
      ticking = true;
    },
    { passive: true },
  );
  update();
}

/* ---------- Interactive egg counter ---------- */
const countEl = document.getElementById('egg-count');
const row = document.getElementById('egg-row');
const MAX_EGGS = 12;
let eggs = 3;

function renderEggs() {
  countEl.textContent = eggs;
  countEl.classList.remove('bump');
  void countEl.offsetWidth; // restart the bump animation
  countEl.classList.add('bump');
  while (row.children.length > eggs) row.lastElementChild.remove();
  while (row.children.length < eggs) {
    row.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24"><use href="#i-egg" /></svg>');
  }
}

if (countEl && row) {
  renderEggs();
  document.getElementById('egg-plus').addEventListener('click', () => {
    if (eggs < MAX_EGGS) eggs += 1;
    renderEggs();
  });
  document.getElementById('egg-minus').addEventListener('click', () => {
    if (eggs > 0) eggs -= 1;
    renderEggs();
  });
}
