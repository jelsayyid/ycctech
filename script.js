// ============================================
// YCC Tech Division — Interactions
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

  // Show success state
  modal.innerHTML = `
    <div style="text-align:center; padding:2rem 0;">
      <div style="font-size:3rem; margin-bottom:1rem;">✓</div>
      <h3 class="modal__title" style="text-align:center;">Submission Received</h3>
      <p class="modal__desc" style="text-align:center;">We've got your entry. You'll receive a confirmation email shortly. Good luck!</p>
      <button class="btn btn--outline" onclick="closeModal('submitModal')" style="margin:0 auto;">Close</button>
    </div>
  `;
}

// --- Bounty Claim ---
function claimBounty(name, amount) {
  const nameInput = document.getElementById('claimBountyName');
  const desc = document.getElementById('claimModalDesc');
  if (nameInput) nameInput.value = name;
  if (desc) desc.textContent = `You're claiming "${name}" (${amount}). Once claimed, it's yours — no one else can take it. You'll have 3–4 weeks to build and submit.`;
  openModal('claimModal');
}

function handleClaim(e) {
  e.preventDefault();
  const form = e.target;
  const modal = form.closest('.modal');

  modal.innerHTML = `
    <div style="text-align:center; padding:2rem 0;">
      <div style="font-size:3rem; margin-bottom:1rem;">⚡</div>
      <h3 class="modal__title" style="text-align:center;">Bounty Claimed</h3>
      <p class="modal__desc" style="text-align:center;">You're locked in. Check your email for next steps and the full spec. Start building!</p>
      <button class="btn btn--outline" onclick="closeModal('claimModal')" style="margin:0 auto;">Close</button>
    </div>
  `;
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

// Active filter button styling
const style = document.createElement('style');
style.textContent = `
  .active-filter {
    border-color: var(--text-primary) !important;
    color: var(--text-primary) !important;
    background: var(--bg-raised) !important;
  }
`;
document.head.appendChild(style);

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
      specToggle.textContent = '↓ View Spec';
      specToggle.addEventListener('click', () => {
        const isOpen = detail.classList.toggle('open');
        specToggle.textContent = isOpen ? '↑ Hide Spec' : '↓ View Spec';
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

// --- Init ---
document.addEventListener('DOMContentLoaded', initReveal);
