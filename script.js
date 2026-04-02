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
        <div style="font-size:3rem; margin-bottom:1rem;">&#10003;</div>
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
  if (desc) desc.textContent = `You're claiming "${name}" (${amount}). Once claimed, it's yours — no one else can take it. You'll have 3–4 weeks to build and submit.`;
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
        <div style="font-size:3rem; margin-bottom:1rem;">&#9889;</div>
        <h3 class="modal__title" style="text-align:center;">Bounty Claimed</h3>
        <p class="modal__desc" style="text-align:center;">You're locked in. Check your email for next steps and the full spec. Start building!</p>
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
        <div style="font-size:3rem; margin-bottom:1rem;">&#10003;</div>
        <h3 class="modal__title" style="text-align:center;">Nomination Received</h3>
        <p class="modal__desc" style="text-align:center;">Thanks! We'll review your suggestion and reach out if we move forward with this speaker.</p>
      </div>
    `;
  }).catch(() => {
    submitBtn.textContent = 'Submit Nomination →';
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
        <div style="font-size:3rem; margin-bottom:1rem;">&#10003;</div>
        <h3 class="modal__title" style="text-align:center;">Application Submitted</h3>
        <p class="modal__desc" style="text-align:center;">We've got your application. The YCC Tech Division reviews on a rolling basis — expect to hear back within one week.</p>
      </div>
    `;
  }).catch(() => {
    submitBtn.textContent = 'Submit Application →';
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
