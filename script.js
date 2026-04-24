// ============================================
// YCC Tech Division | Interactions
// ============================================

// --- Scroll Reveal ---
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
    observer.observe(el);
  });
}

// --- Mobile Nav ---
function toggleMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay = document.getElementById('mobileNav');
  hamburger.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
}

function closeMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay = document.getElementById('mobileNav');
  if (hamburger) hamburger.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// --- Modals ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach((m) => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

// --- Prize Submission Modal ---
document.addEventListener('DOMContentLoaded', () => {
  // Open submit modal buttons (prize page)
  document.querySelectorAll('#openSubmitBtn, #openSubmitBtn2').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('submitModal');
    });
  });
});

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const modal = form.closest('.modal');
  const inputs = form.querySelectorAll('input, textarea');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Disable button while submitting
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  // Map form fields to Google Form entry IDs
  const formData = new FormData();
  formData.append('entry.1959953317', inputs[0].value); // Name(s)
  formData.append('entry.1856506585', inputs[1].value); // Yale Email
  formData.append('entry.1178034338', inputs[2].value); // Project Name
  formData.append('entry.440314620', inputs[3].value);  // GitHub Repo URL
  formData.append('entry.1430845286', inputs[4].value); // Demo Video URL
  formData.append('entry.1862832929', inputs[5].value); // Problem Description

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSdDYEbXk7wJczWrNNqj6W8C4vjJ729pGUPhlOLQSqV4_R7RtQ/formResponse', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }).then(() => {
    modal.innerHTML = `
      <div style="text-align:center; padding:2rem 0;">
        <div style="font-size:1.5rem; margin-bottom:1rem; font-family:var(--font-mono); color:var(--green);">Done</div>
        <h3 class="modal__title" style="text-align:center;">Submission Received</h3>
        <p class="modal__desc" style="text-align:center;">We've got your entry. Good luck!</p>
        <button class="btn btn--outline" onclick="closeModal('submitModal')" style="margin:0 auto;">Close</button>
      </div>
    `;
  }).catch(() => {
    submitBtn.textContent = 'Submit Entry';
    submitBtn.disabled = false;
    alert('Something went wrong. Please try again or email ycctechdivision@gmail.com.');
  });
}

// --- Bounty Claim ---
function claimBounty(name, amount) {
  const nameInput = document.getElementById('claimBountyName');
  const desc = document.getElementById('claimModalDesc');
  if (nameInput) nameInput.value = name;
  if (desc) desc.textContent = `You're claiming "${name}" (${amount}). Wait for our email confirmation before starting work. You'll have one week from confirmation to build and submit.`;
  openModal('claimModal');
}

function handleClaim(e) {
  e.preventDefault();
  const form = e.target;
  const modal = form.closest('.modal');
  const inputs = form.querySelectorAll('input, textarea');
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.textContent = 'Claiming...';
  submitBtn.disabled = true;

  // Map form fields to Google Form entry IDs
  const formData = new FormData();
  formData.append('entry.1719970910', inputs[0].value); // Bounty Name
  formData.append('entry.124487336', inputs[1].value);  // Your Name
  formData.append('entry.491030897', inputs[2].value);  // Yale Email
  formData.append('entry.1811676908', inputs[3].value); // GitHub Profile URL
  formData.append('entry.1766604249', inputs[4].value); // Approach Plan

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSer8h6fEt3lseuZ6E6sd01t85CuDNtUVWyfTby_gMHcfyzPyw/formResponse', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }).then(() => {
    modal.innerHTML = `
      <div style="text-align:center; padding:2rem 0;">
        <div style="font-size:1.5rem; margin-bottom:1rem; font-family:var(--font-mono); color:var(--accent);">Done</div>
        <h3 class="modal__title" style="text-align:center;">Bounty Claimed</h3>
        <p class="modal__desc" style="text-align:center;">Claim received. Watch your email — we'll send confirmation and the full spec before you start building.</p>
        <button class="btn btn--outline" onclick="closeModal('claimModal')" style="margin:0 auto;">Close</button>
      </div>
    `;
  }).catch(() => {
    submitBtn.textContent = 'Claim This Bounty';
    submitBtn.disabled = false;
    alert('Something went wrong. Please try again or email ycctechdivision@gmail.com.');
  });
}

// --- Speaker Nomination ---
function handleSpeakerNom(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea');
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  const formData = new FormData();
  formData.append('entry.815230633', inputs[0].value); // Your Name
  formData.append('entry.449643019', inputs[1].value); // Yale Email
  formData.append('entry.829256281', inputs[2].value); // Speaker Name
  formData.append('entry.370585796', inputs[3].value); // Connection to Yale
  formData.append('entry.985445584', inputs[4].value); // Why them?

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSex2InTgYVKJ70h378S1DM4EDfs_jQYKuVEusdux0AjXgL8dg/formResponse', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }).then(() => {
    form.innerHTML = `
      <div style="text-align:center; padding:2rem 0;">
        <div style="font-size:1.5rem; margin-bottom:1rem; font-family:var(--font-mono); color:var(--green);">Done</div>
        <h3 class="modal__title" style="text-align:center;">Nomination Received</h3>
        <p class="modal__desc" style="text-align:center;">Thanks! We'll review your suggestion and reach out if we move forward with this speaker.</p>
      </div>
    `;
  }).catch(() => {
    submitBtn.textContent = 'Submit Nomination';
    submitBtn.disabled = false;
    alert('Something went wrong. Please try again or email ycctechdivision@gmail.com.');
  });
}

// --- Dream Board Application ---
function handleDreamboard(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea');
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  const formData = new FormData();
  formData.append('entry.123697669', inputs[0].value);   // Your Name
  formData.append('entry.1930971643', inputs[1].value);  // Yale Email
  formData.append('entry.1833541954', inputs[2].value);  // Project Title
  formData.append('entry.1286104526', inputs[3].value);  // Project Description
  formData.append('entry.912288944', inputs[4].value);   // Components Needed
  formData.append('entry.1738379913', inputs[5].value);  // Total Estimated Cost
  formData.append('entry.650469324', inputs[6].value);   // Team Members
  formData.append('entry.1272954879', inputs[7].value);  // Other Funding

  fetch('https://docs.google.com/forms/d/e/1FAIpQLScUkfUGIs50FOiF-BEiShilgO4IfeVSpD6CFB3hydSKsguFoA/formResponse', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }).then(() => {
    form.innerHTML = `
      <div style="text-align:center; padding:2rem 0;">
        <div style="font-size:1.5rem; margin-bottom:1rem; font-family:var(--font-mono); color:var(--green);">Done</div>
        <h3 class="modal__title" style="text-align:center;">Application Submitted</h3>
        <p class="modal__desc" style="text-align:center;">We've got your application. The YCC Tech Division reviews on a rolling basis. Expect to hear back within one week.</p>
      </div>
    `;
  }).catch(() => {
    submitBtn.textContent = 'Submit Application';
    submitBtn.disabled = false;
    alert('Something went wrong. Please try again or email ycctechdivision@gmail.com.');
  });
}

// --- Bounty Filters ---
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.bounty-card');

      cards.forEach((card) => {
        const status = card.dataset.status;
        if (filter === 'all' || status === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// --- Bounty Card Expand/Collapse ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bounty-card').forEach((card) => {
    const detail = card.querySelector('.bounty-card__detail');
    if (!detail) return;

    // Make the card content area clickable to toggle detail
    const contentArea = card.querySelector('.bounty-card__desc');
    if (contentArea) {
      contentArea.style.cursor = 'pointer';
      contentArea.addEventListener('click', () => {
        detail.classList.toggle('open');
      });
    }

    // Also add a "View spec" text
    const tags = card.querySelector('.bounty-card__tags');
    if (tags) {
      const specToggle = document.createElement('button');
      specToggle.className = 'bounty-card__tag';
      specToggle.style.cssText = 'cursor:pointer; color:var(--accent); border-color:var(--accent); background:none;';
      specToggle.textContent = 'View Spec';
      specToggle.addEventListener('click', () => {
        const isOpen = detail.classList.toggle('open');
        specToggle.textContent = isOpen ? 'Hide Spec' : 'View Spec';
      });
      tags.appendChild(specToggle);
    }
  });
});

// --- Nav scroll effect ---
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const scroll = window.scrollY;
  if (scroll > 100) {
    nav.style.borderBottomColor = 'var(--border)';
  } else {
    nav.style.borderBottomColor = 'var(--border-light)';
  }
  lastScroll = scroll;
});

// --- Form Validation ---
function initFormValidation() {
  document.querySelectorAll('.modal__form').forEach((form) => {
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', (e) => {
      // Clear previous errors
      form.querySelectorAll('.form-error').forEach((el) => el.remove());
      form.querySelectorAll('.input-error').forEach((el) => el.classList.remove('input-error'));

      let firstInvalid = null;

      form.querySelectorAll('input, textarea').forEach((field) => {
        if (!field.checkValidity()) {
          field.style.borderColor = 'var(--accent)';

          let msg = 'This field is required';
          if (field.type === 'email' && field.value) {
            msg = 'Please enter a valid email address';
          } else if (field.type === 'url' && field.value) {
            msg = 'Please enter a valid URL (include https://)';
          }

          const error = document.createElement('div');
          error.className = 'form-error visible';
          error.textContent = msg;
          field.insertAdjacentElement('afterend', error);

          if (!firstInvalid) firstInvalid = field;
        } else {
          field.style.borderColor = '';
        }
      });

      if (firstInvalid) {
        e.preventDefault();
        e.stopImmediatePropagation();
        firstInvalid.focus();
      }
    });

    // Clear error styling on input
    form.addEventListener('input', (e) => {
      const field = e.target;
      if (field.checkValidity()) {
        field.style.borderColor = '';
        const next = field.nextElementSibling;
        if (next && next.classList.contains('form-error')) next.remove();
      }
    });
  });
}

// --- Typewriter ---
function initTypewriter() {
  document.querySelectorAll('[data-typewriter]').forEach((el) => {
    // Check if element is visible (skip hidden mobile/desktop spans)
    if (getComputedStyle(el).display === 'none') return;

    const text = el.textContent;
    el.textContent = '';
    el.classList.add('typewriter-active');

    let idx = 0;
    const speed = 40;

    function typeNext() {
      if (idx >= text.length) {
        el.classList.remove('typewriter-active');
        el.classList.add('typewriter-done');
        return;
      }
      el.textContent += text[idx];
      idx++;
      setTimeout(typeNext, speed);
    }

    // If inside a reveal element, wait for the reveal to finish before typing
    const revealParent = el.closest('.reveal');
    if (revealParent) {
      const observer = new MutationObserver(() => {
        if (revealParent.classList.contains('visible')) {
          observer.disconnect();
          setTimeout(typeNext, 300);
        }
      });
      observer.observe(revealParent, { attributes: true, attributeFilter: ['class'] });
    } else {
      typeNext();
    }
  });
}

// ============================================
// HACKER-FLARE
// ============================================

const REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Brand blinking caret ---
function initBrandCursor() {
  document.querySelectorAll('.nav__brand').forEach((brand) => {
    if (brand.querySelector('.brand-cursor')) return;
    const cursor = document.createElement('span');
    cursor.className = 'brand-cursor';
    cursor.textContent = '_';
    cursor.setAttribute('aria-hidden', 'true');
    brand.appendChild(cursor);
  });
}

// --- Keyboard shortcut hints + global keys ---
const NAV_KEYS = {
  h: { label: 'home',       href: 'index.html' },
  b: { label: 'bounties',   href: 'bounties.html' },
  p: { label: 'prize',      href: 'prize.html' },
  s: { label: 'speakers',   href: 'speakers.html' },
  d: { label: 'dreamboard', href: 'dreamboard.html' },
  e: { label: 'events',     href: 'events.html' },
};

function initKeyboardHints() {
  const entries = Object.entries(NAV_KEYS);
  document.querySelectorAll('.nav__links > li > a').forEach((a) => {
    const text = a.textContent.trim().toLowerCase();
    const found = entries.find(([, v]) => v.label === text);
    if (!found || a.querySelector('.kbd-hint')) return;
    const hint = document.createElement('span');
    hint.className = 'kbd-hint';
    hint.textContent = found[0];
    a.prepend(hint);
  });
}

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key.toLowerCase();
    const target = NAV_KEYS[key];
    if (!target) return;
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (here === target.href) return;
    location.href = target.href;
  });
}

// --- Command palette ---
const CMDK_ITEMS = [
  { icon: '›', label: 'home',        desc: 'overview',             go: 'index.html' },
  { icon: '›', label: 'bounties',    desc: '$200–$500 · ship it',  go: 'bounties.html' },
  { icon: '›', label: 'prize',       desc: '$1,000 · Apr 26',      go: 'prize.html' },
  { icon: '›', label: 'speakers',    desc: 'fireside chats',       go: 'speakers.html' },
  { icon: '›', label: 'dreamboard',  desc: 'hardware grants',      go: 'dreamboard.html' },
  { icon: '›', label: 'events',      desc: 'upcoming',             go: 'events.html' },
  { icon: '$', label: 'submit prize entry', desc: 'project submission',
    run: () => { if (location.pathname.endsWith('prize.html')) openModal('submitModal'); else { location.href = 'prize.html#submit'; } } },
  { icon: '@', label: 'email ycc',   desc: 'ycc@yale.edu',         run: () => (location.href = 'mailto:ycc@yale.edu') },
];

function initCmdk() {
  const overlay = document.createElement('div');
  overlay.className = 'cmdk';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="cmdk__box" role="dialog" aria-label="Command palette">
      <div class="cmdk__prompt">
        <span class="cmdk__prefix">$</span>
        <input type="text" class="cmdk__input" placeholder="jump to… (try: bounties, prize)" autocomplete="off" spellcheck="false" aria-label="Command input">
      </div>
      <div class="cmdk__results"></div>
      <div class="cmdk__footer">
        <span><kbd>↑↓</kbd>select</span>
        <span><kbd>↵</kbd>open</span>
        <span><kbd>esc</kbd>close</span>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.cmdk__input');
  const results = overlay.querySelector('.cmdk__results');
  let idx = 0;
  let filtered = CMDK_ITEMS.slice();

  const render = () => {
    if (!filtered.length) {
      results.innerHTML = `<div class="cmdk__empty">no matches. try: bounties, prize, speakers…</div>`;
      return;
    }
    results.innerHTML = filtered.map((item, i) => `
      <div class="cmdk__item ${i === idx ? 'selected' : ''}" data-idx="${i}">
        <div class="cmdk__item-left">
          <span class="cmdk__item-icon">${item.icon}</span>
          <span>${item.label}</span>
        </div>
        <span class="cmdk__item-desc">${item.desc}</span>
      </div>`).join('');
  };

  const filter = (q) => {
    q = q.trim().toLowerCase();
    filtered = q
      ? CMDK_ITEMS.filter((it) => it.label.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q))
      : CMDK_ITEMS.slice();
    idx = 0;
    render();
  };

  const run = (item) => {
    if (!item) return;
    close();
    if (item.go) location.href = item.go;
    else if (item.run) item.run();
  };

  const open = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    input.value = '';
    filter('');
    setTimeout(() => input.focus(), 10);
  };

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  input.addEventListener('input', (e) => filter(e.target.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(filtered.length - 1, idx + 1); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(0, idx - 1); render(); }
    else if (e.key === 'Enter') { e.preventDefault(); run(filtered[idx]); }
    else if (e.key === 'Escape') { close(); }
  });

  results.addEventListener('click', (e) => {
    const item = e.target.closest('.cmdk__item');
    if (!item) return;
    run(filtered[parseInt(item.dataset.idx, 10)]);
  });

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay.classList.contains('open') ? close() : open();
    }
  });
}

// --- Matrix rain ---
function initMatrixRain() {
  if (REDUCED_MOTION) return;
  const hosts = document.querySelectorAll('.hero, .prize-hero, .events-hero');
  hosts.forEach((host) => {
    if (host.querySelector('.matrix-rain')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    canvas.setAttribute('aria-hidden', 'true');
    host.prepend(canvas);

    const ctx = canvas.getContext('2d');
    const glyphs = '01{}[]()<>/\\=+-*;:._|&@#$?!ycctechabcdef0123456789';
    const fontSize = 14;
    let drops = [];
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = host.offsetWidth;
      h = canvas.height = host.offsetHeight;
      const cols = Math.max(1, Math.floor(w / fontSize));
      drops = new Array(cols).fill(0).map(() => Math.random() * (h / fontSize));
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let running = true;
    let last = 0;
    const frameMs = 80; // ~12fps — readable trails

    const draw = (t) => {
      if (!running) return;
      if (t - last < frameMs) { requestAnimationFrame(draw); return; }
      last = t;

      ctx.fillStyle = 'rgba(10, 10, 10, 0.16)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = 'rgba(107, 159, 255, 0.75)';
        ctx.fillText(ch, x, y);
        ctx.fillStyle = '#c8dcff';
        ctx.fillText(ch, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
      requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !running) { running = true; requestAnimationFrame(draw); }
        else if (!en.isIntersecting) { running = false; }
      });
    });
    io.observe(host);

    requestAnimationFrame(draw);
  });
}

// --- Stat count-up ---
function initCountUp() {
  if (REDUCED_MOTION) return;
  const nodes = document.querySelectorAll('.hero__stat-value, .prize-hero__amount');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      const orig = el.textContent.trim();
      const m = orig.match(/^(\D*)(\d[\d,]*)(.*)$/);
      if (!m) return;
      const prefix = m[1], suffix = m[3];
      const num = parseInt(m[2].replace(/,/g, ''), 10);
      if (!Number.isFinite(num) || num <= 0) return;

      const dur = 1200;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);

      const step = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const v = Math.floor(ease(p) * num);
        el.textContent = prefix + v.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = orig;
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });

  nodes.forEach((n) => io.observe(n));
}

// --- Home system status bar ---
function initStatusBar() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const container = hero.querySelector('.container');
  if (!container || container.querySelector('.status-bar')) return;

  const bar = document.createElement('div');
  bar.className = 'status-bar';
  bar.innerHTML = `
    <span><span class="status-bar__dot"></span><strong>SYSTEM ONLINE</strong></span>
    <span class="status-bar__sep">│</span>
    <span>BUDGET <span class="status-bar__key">$5,000</span></span>
    <span class="status-bar__sep">│</span>
    <span>BOUNTIES <span class="status-bar__key">6</span></span>
    <span class="status-bar__sep">│</span>
    <span>[UTC] <span class="status-bar__key" id="utcClock">--:--:--</span></span>`;

  const label = container.querySelector('.hero__label');
  if (label) container.insertBefore(bar, label);
  else container.prepend(bar);

  const clock = bar.querySelector('#utcClock');
  const tick = () => {
    const d = new Date();
    const h = String(d.getUTCHours()).padStart(2, '0');
    const m = String(d.getUTCMinutes()).padStart(2, '0');
    const s = String(d.getUTCSeconds()).padStart(2, '0');
    clock.textContent = `${h}:${m}:${s}`;
  };
  tick();
  setInterval(tick, 1000);
}

// --- Live activity ticker (home only) ---
function initTicker() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (document.querySelector('.ticker')) return;

  const items = [
    { t: '04:22:07', tag: 'BOUNTY', msg: 'claim received:',  hl: 'hello-yale-starter', suf: '→ $200' },
    { t: '04:18:44', tag: 'PRIZE',  msg: 'submission accepted:', hl: 'YaleMaps', suf: '' },
    { t: '04:16:12', tag: 'DREAM',  msg: 'grant approved:',  hl: 'esp32-cam rig',      suf: '→ $85' },
    { t: '04:14:30', tag: 'BOUNTY', msg: 'shipped:',         hl: 'dining-api',         suf: '→ merged to main' },
    { t: '04:08:55', tag: 'SPEAK',  msg: 'nominated:',       hl: 'yale alum @ anthropic', suf: '' },
    { t: '04:04:01', tag: 'SYSTEM', msg: 'spring cohort initialized · 6 bounties deployed', hl: '', suf: '' },
    { t: '03:57:18', tag: 'BOUNTY', msg: 'claim received:',  hl: 'events-aggregator',  suf: '→ $200' },
    { t: '03:50:02', tag: 'PRIZE',  msg: 'ceremony scheduled:', hl: 'Sun Apr 26 · 6pm · Tsai City', suf: '' },
    { t: '03:41:37', tag: 'DREAM',  msg: 'grant approved:',  hl: 'raspi cluster',      suf: '→ $120' },
    { t: '03:33:09', tag: 'BOUNTY', msg: 'spec published:',  hl: 'spaces-api',         suf: '→ $500' },
    { t: '03:21:44', tag: 'SPEAK',  msg: 'confirmed:',       hl: 'fireside · Stanford TA → openai', suf: '' },
    { t: '03:09:22', tag: 'BOUNTY', msg: 'shipped:',         hl: 'map-api',            suf: '→ GeoJSON live' },
  ];

  const renderItem = (i) => `
    <span class="ticker__item">
      <span class="ticker__time">${i.t}</span>
      <span class="ticker__tag">[${i.tag}]</span>
      <span>${i.msg}${i.hl ? ' <span class="ticker__hl">' + i.hl + '</span>' : ''}${i.suf ? ' ' + i.suf : ''}</span>
    </span>`;

  const doubled = items.concat(items);

  const ticker = document.createElement('div');
  ticker.className = 'ticker';
  ticker.setAttribute('aria-label', 'Live activity feed');
  ticker.innerHTML = `
    <div class="ticker__label">● LIVE FEED</div>
    <div class="ticker__viewport">
      <div class="ticker__track">${doubled.map(renderItem).join('')}</div>
    </div>`;

  hero.parentNode.insertBefore(ticker, hero.nextSibling);
}

// --- Konami code easter egg ---
function initKonami() {
  const seq = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
  let pos = 0;
  // Capture phase so we run before the nav-shortcut handler and can swallow b/a mid-sequence.
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === seq[pos]) {
      pos++;
      if (key === 'b' || key === 'a') e.stopImmediatePropagation();
      if (pos === seq.length) { pos = 0; activateHackerMode(); }
    } else {
      pos = (key === seq[0]) ? 1 : 0;
    }
  }, true);
}

function activateHackerMode() {
  if (document.body.classList.contains('hacker-mode')) return;
  document.body.classList.add('hacker-mode');

  const flash = document.createElement('div');
  flash.className = 'konami-flash';
  flash.innerHTML = `<pre>╔══════════════════════════════════╗
║        ACCESS  GRANTED           ║
║      hacker_mode: ENGAGED        ║
║   ⌘K · [b] [p] [s] [d] [e] [h]   ║
╚══════════════════════════════════╝</pre>`;
  document.body.appendChild(flash);
  requestAnimationFrame(() => flash.classList.add('show'));
  setTimeout(() => flash.classList.remove('show'), 1700);
  setTimeout(() => flash.remove(), 2100);

  // Quiet console easter egg for devs peeking
  try {
    console.log('%c> ycc/tech · hacker_mode engaged', 'color:#6b9fff; font-family: ui-monospace, monospace; font-weight: 500;');
    console.log('%c  keys: h b p s d e · palette: ⌘K', 'color:#737373; font-family: ui-monospace, monospace;');
  } catch (_) {}
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initReveal();
  initFormValidation();
  initBrandCursor();
  initKeyboardHints();
  initKeyboardShortcuts();
  initCmdk();
  initMatrixRain();
  initCountUp();
  initStatusBar();
  initTicker();
  initKonami();
});
