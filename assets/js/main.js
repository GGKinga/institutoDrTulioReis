/**
 * main.js — Public website JavaScript for Instituto Dr Túlio Reis
 * Loads CMS content, handles navigation, forms, and animations.
 */
document.addEventListener('DOMContentLoaded', () => {
  CMS.init();
  loadSettings();
  loadServices();
  loadTeam();
  loadTestimonials();
  loadGallery();
  loadArticles();
  initNav();
  initForms();
  initScrollTop();
  initFadeIn();
});

// ── Settings (applies to navbar, hero, footer, contacts) ─────────
function loadSettings() {
  const s = CMS.get('settings');

  // Page title
  document.title = `${s.siteName} — ${s.tagline}`;

  // Navbar brand
  setText('#navBrandName', s.siteName);
  setText('#navBrandTag', s.tagline);

  // Hero
  setText('#heroTitle', s.heroTitle);
  setText('#heroSubtitle', s.heroSubtitle);
  setAttr('#heroCta', 'href', `#contato`);
  setText('#heroCta', s.heroCta);

  // Contact info
  setText('#contactPhone', s.phone);
  setText('#contactEmail', s.email);
  setText('#contactAddress', s.address);

  // WhatsApp button
  const wa = document.getElementById('btnWhatsApp');
  if (wa) wa.href = `https://wa.me/${s.whatsapp}?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.`;

  // Footer
  setText('#footerSiteName', s.siteName);
  setText('#footerTagline', s.tagline);
  setAttr('#footerFacebook', 'href', s.facebook || '#');
  setAttr('#footerInstagram', 'href', s.instagram || '#');
  setAttr('#footerYoutube', 'href', s.youtube || '#');
  setAttr('#footerLinkedin', 'href', s.linkedin || '#');
}

// ── Services section ──────────────────────────────────────────────
function loadServices() {
  const services = (CMS.get('services') || []).filter(s => s.active);
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  if (!services.length) {
    grid.innerHTML = '<p style="text-align:center;color:var(--gray-600)">Nenhum serviço cadastrado.</p>';
    return;
  }
  grid.innerHTML = services.map(s => `
    <div class="service-card fade-in">
      <div class="service-icon"><i class="fas ${s.icon || 'fa-star'}"></i></div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.description)}</p>
    </div>
  `).join('');
  initFadeIn();
}

// ── Team section ──────────────────────────────────────────────────
function loadTeam() {
  const team = (CMS.get('team') || []).filter(m => m.active);
  const grid = document.getElementById('teamGrid');
  if (!grid) return;

  grid.innerHTML = team.map(m => {
    const initials = m.name.split(' ').slice(0, 2).map(n => n[0]).join('');
    const avatarContent = m.photo
      ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}">`
      : initials;
    return `
      <div class="team-card fade-in">
        <div class="team-avatar">${avatarContent}</div>
        <h3>${esc(m.name)}</h3>
        <div class="role">${esc(m.role)}</div>
        <p class="bio">${esc(m.bio)}</p>
      </div>
    `;
  }).join('');
  initFadeIn();
}

// ── Testimonials section ──────────────────────────────────────────
function loadTestimonials() {
  const items = (CMS.get('testimonials') || []).filter(t => t.active);
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;

  grid.innerHTML = items.map(t => `
    <div class="testimonial-card fade-in">
      <div class="stars">${'★'.repeat(Math.min(5, t.rating || 5))}</div>
      <p class="testimonial-text">"${esc(t.text)}"</p>
      <div class="testimonial-author">
        <strong>${esc(t.name)}</strong>
        <small>${esc(t.role)}</small>
      </div>
    </div>
  `).join('');
  initFadeIn();
}

// ── Gallery section ───────────────────────────────────────────────
function loadGallery() {
  const items = CMS.get('gallery') || [];
  const grid = document.getElementById('galleryGrid');
  const section = document.getElementById('galeriaSection');
  if (!grid) return;

  if (!items.length) {
    if (section) section.style.display = 'none';
    return;
  }
  if (section) section.style.display = '';
  grid.innerHTML = items.map(img => `
    <div class="gallery-item">
      <img src="${esc(img.url)}" alt="${esc(img.caption || '')}">
    </div>
  `).join('');
}

// ── Articles section ──────────────────────────────────────────────
function loadArticles() {
  const articles = (CMS.get('articles') || []).filter(a => a.published);
  const grid = document.getElementById('articlesGrid');
  const section = document.getElementById('artigos');
  if (!grid) return;

  if (!articles.length) {
    if (section) section.style.display = 'none';
    return;
  }
  if (section) section.style.display = '';
  grid.innerHTML = articles.slice(0, 3).map(a => `
    <article class="article-card fade-in">
      <div class="article-img">
        ${a.coverImage ? `<img src="${esc(a.coverImage)}" alt="${esc(a.title)}">` : '<i class="fas fa-newspaper"></i>'}
      </div>
      <div class="article-body">
        <div class="article-meta">
          <i class="far fa-calendar-alt"></i> ${formatDate(a.date)} &nbsp;·&nbsp;
          <i class="far fa-user"></i> ${esc(a.author)}
        </div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.excerpt)}</p>
      </div>
    </article>
  `).join('');
  initFadeIn();
}

// ── Navbar ────────────────────────────────────────────────────────
function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

// ── Contact / Appointment forms ───────────────────────────────────
function initForms() {
  const apptForm = document.getElementById('appointmentForm');
  if (apptForm) {
    apptForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(apptForm));
      data.status = 'novo';
      CMS.addItem('appointments', data);
      apptForm.reset();
      showFormSuccess(apptForm, 'Agendamento enviado! Entraremos em contato em breve.');
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm));
      data.read = false;
      CMS.addItem('messages', data);
      contactForm.reset();
      showFormSuccess(contactForm, 'Mensagem enviada com sucesso! Responderemos em breve.');
    });
  }
}

function showFormSuccess(form, msg) {
  let el = form.querySelector('.form-success');
  if (!el) {
    el = document.createElement('div');
    el.className = 'form-success';
    form.prepend(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}

// ── Scroll-to-top button ──────────────────────────────────────────
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Fade-in observer ──────────────────────────────────────────────
function initFadeIn() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}

// ── Helpers ───────────────────────────────────────────────────────
function esc(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setText(sel, val) {
  const el = document.querySelector(sel);
  if (el) el.textContent = val || '';
}

function setAttr(sel, attr, val) {
  const el = document.querySelector(sel);
  if (el && val) el.setAttribute(attr, val);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
}
