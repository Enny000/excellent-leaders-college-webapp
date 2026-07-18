(() => {
  "use strict";

  const DATA = window.ELC_DATA;
  const app = document.getElementById("app");
  const toastRegion = document.getElementById("toast-region");

  const state = {
    route: getRoute(),
    user: readJSON("elc-session", null),
    loginRole: "student",
    galleryFilter: "All"
  };

  const iconPaths = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    "map-pin": '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "chevron-down": '<path d="m7 10 5 5 5-5"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-left": '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    "book-open": '<path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11v18H6.5A3.5 3.5 0 0 0 3 23z"/><path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H13v18h4.5A3.5 3.5 0 0 1 21 23z"/>',
    leadership: '<path d="M12 3l2.2 4.5L19 8.2l-3.5 3.4.8 4.8L12 14.1 7.7 16.4l.8-4.8L5 8.2l4.8-.7z"/><path d="M5 21h14M8 18h8"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.7 3 7.9 7.5 9.5 4.5-1.6 7.5-4.8 7.5-9.5V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
    community: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.5-4.2 2.5-6 6-6s5.5 1.8 6 6M14 15c3.5-.8 6 .8 7 4.5"/>',
    languages: '<path d="M4 5h8M8 3v2c0 5-2.5 8-5 10M5 11c1.5 1.5 3.5 3 6 4M14 19l3.5-9 3.5 9M15.4 16h4.2"/>',
    calculator: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 16h9"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
    computer: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    palette: '<path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a1.5 1.5 0 0 1 0-3h3.2A5.8 5.8 0 0 0 21 8.2C21 5.3 17.2 3 12 3z"/><circle cx="7.5" cy="9" r="1"/><circle cx="10" cy="6.5" r="1"/><circle cx="14" cy="6.5" r="1"/><circle cx="17" cy="9" r="1"/>',
    activity: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.7-5 3.2-7 8-7s7.3 2 8 7"/>',
    users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.5-4.2 2.5-6 6-6s5.5 1.8 6 6M14.5 15c3.5-.7 5.7 1 6.5 4.5"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    home: '<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    grades: '<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5M8 17h7"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    classes: '<path d="M4 5h16v14H4z"/><path d="M8 5V3h8v2M8 10h8M8 14h5"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    children: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.5-4 2.2-6 5.5-6s5 2 5.5 6M14 15c3.4-.6 5.6 1 6.5 4.5"/>',
    gradebook: '<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M5 19a2 2 0 0 1 2-2h12M9 7h6M9 11h5"/>',
    attendance: '<circle cx="9" cy="8" r="3"/><path d="M3 20c.5-4.2 2.5-6 6-6 1.3 0 2.5.3 3.4.8M15 17l2 2 4-5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06-2.83 2.83-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.1 1.65V21H9.83v-.09A1.8 1.8 0 0 0 8.7 19.3a1.8 1.8 0 0 0-2 .36l-.06.06-2.83-2.83.06-.06a1.8 1.8 0 0 0 .36-2A1.8 1.8 0 0 0 2.58 13H2.5V9h.08A1.8 1.8 0 0 0 4.23 7.9a1.8 1.8 0 0 0-.36-2l-.06-.06L6.64 3l.06.06a1.8 1.8 0 0 0 2 .36A1.8 1.8 0 0 0 9.83 1.8V1.7h4v.1a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 2-.36l.06-.06 2.83 2.83-.06.06a1.8 1.8 0 0 0-.36 2A1.8 1.8 0 0 0 21.05 9h.08v4h-.08A1.8 1.8 0 0 0 19.4 15z"/>',
    logout: '<path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 8l4 4-4 4M18 12H8"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4"/>',
    announcement: '<path d="M3 11v2l11 4V7zM14 9h4a3 3 0 0 1 0 6h-4M6 14l1.5 6h3L9 15"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>'
  };

  function icon(name, extraClass = "") {
    return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.book}</svg>`;
  }

  function getRoute() {
    return (window.location.hash.replace(/^#/, "") || "/home").replace(/\/+$/, "") || "/home";
  }

  function routeTo(path) {
    const target = path.startsWith("/") ? path : `/${path}`;
    if (getRoute() === target) {
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = target;
  }

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function initials(name) {
    return String(name)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  function gradeFromScore(score) {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "E";
  }

  function showToast(title, message, type = "success") {
    const item = document.createElement("div");
    item.className = `toast ${type === "error" ? "error" : ""}`;
    item.innerHTML = `${icon(type === "error" ? "close" : "check")}<div><strong>${escapeHTML(title)}</strong><p>${escapeHTML(message)}</p></div>`;
    toastRegion.appendChild(item);
    window.setTimeout(() => item.remove(), 4200);
  }

  function openModal(content) {
    closeModal();
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.id = "app-modal";
    modal.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true">${content}</div>`;
    document.body.appendChild(modal);
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    document.getElementById("app-modal")?.remove();
    document.body.classList.remove("modal-open");
  }

  function brandMarkup(light = false) {
    return `
      <a class="brand" href="#/home" data-route="/home" aria-label="Excellent Leaders Secondary School home">
        <img src="assets/elc-crest.png" alt="Excellent Leaders Secondary School crest" />
        <span class="brand-copy">
          <span class="brand-name">Excellent Leaders Secondary School</span>
          <span class="brand-motto">Knowledge • Leadership • Discipline</span>
        </span>
      </a>`;
  }

  function navActive(...prefixes) {
    return prefixes.some((prefix) => state.route === prefix || state.route.startsWith(`${prefix}/`)) ? "active" : "";
  }

  function publicHeader() {
    return `
      <div class="topbar">
        <div class="container topbar-inner">
          <div class="topbar-group">
            <span class="topbar-item">${icon("map-pin")} ${escapeHTML(DATA.school.address)}</span>
            <a class="topbar-item" href="mailto:${DATA.school.email}">${icon("mail")} ${escapeHTML(DATA.school.email)}</a>
            <a class="topbar-item" href="tel:${DATA.school.phone.replace(/\s/g, "")}">${icon("phone")} ${escapeHTML(DATA.school.phone)}</a>
          </div>
          <div class="topbar-group">
            <span>Follow us:</span>
            <div class="topbar-social"><a class="social-link" href="#" aria-label="Facebook">f</a><a class="social-link" href="#" aria-label="Instagram">ig</a><a class="social-link" href="#" aria-label="YouTube">yt</a></div>
          </div>
        </div>
      </div>
      <header class="site-header">
        <div class="container navbar">
          ${brandMarkup()}
          <nav class="nav-links" id="site-nav" aria-label="Primary navigation">
            <div class="nav-item nav-item-mobile-portal">
              <button class="nav-link portal-menu-link" data-route="/portal/login">${icon("lock")} Portal Login</button>
            </div>
            <div class="nav-item"><button class="nav-link ${navActive("/home")}" data-route="/home">Home</button></div>
            <div class="nav-item has-menu">
              <button class="nav-link ${navActive("/about")}" data-nav-toggle>About ${icon("chevron-down")}</button>
              <div class="dropdown-menu">
                <a href="#/about" data-route="/about">Our Story</a>
                <a href="#/about#mission" data-route="/about">Mission & Values</a>
                <a href="#/about#principal" data-route="/about">Principal’s Message</a>
                <a href="#/about#staff" data-route="/about">Our Staff</a>
              </div>
            </div>
            <div class="nav-item has-menu">
              <button class="nav-link ${navActive("/academics")}" data-nav-toggle>Academics ${icon("chevron-down")}</button>
              <div class="mega-menu">
                <div class="mega-grid">
                  <div class="mega-feature">
                    <span class="icon-badge">${icon("book-open", "icon-lg")}</span>
                    <h3>Learning with purpose</h3>
                    <p>A balanced programme of core academics, practical skills and personal development.</p>
                    <a class="text-link" href="#/academics" data-route="/academics">Explore academics ${icon("arrow-right")}</a>
                  </div>
                  <div class="mega-column">
                    <h4>Academic Areas</h4>
                    <a href="#/academics" data-route="/academics">Curriculum</a>
                    <a href="#/academics" data-route="/academics">Subjects</a>
                    <a href="#/academics" data-route="/academics">Departments</a>
                    <a href="#/academics" data-route="/academics">Assessment</a>
                  </div>
                  <div class="mega-column">
                    <h4>Resources</h4>
                    <a href="#/gallery" data-route="/gallery">Facilities</a>
                    <a href="#/news" data-route="/news">School Calendar</a>
                    <a href="#/news" data-route="/news">Achievements</a>
                    <a href="#/academics" data-route="/academics">Academic Support</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="nav-item has-menu">
              <button class="nav-link ${navActive("/admissions")}" data-nav-toggle>Admissions ${icon("chevron-down")}</button>
              <div class="dropdown-menu">
                <a href="#/admissions" data-route="/admissions">How to Apply</a>
                <a href="#/admissions" data-route="/admissions">Requirements</a>
                <a href="#/admissions" data-route="/admissions">Fees & Support</a>
                <a href="#/admissions" data-route="/admissions">Application Enquiry</a>
              </div>
            </div>
            <div class="nav-item"><button class="nav-link ${navActive("/gallery")}" data-route="/gallery">Gallery</button></div>
            <div class="nav-item"><button class="nav-link ${navActive("/news")}" data-route="/news">News & Events</button></div>
            <div class="nav-item"><button class="nav-link ${navActive("/contact")}" data-route="/contact">Contact</button></div>
          </nav>
          <div class="nav-actions">
            <button class="btn btn-primary btn-sm" data-route="/portal/login">${icon("lock")} Portal Login</button>
            <button class="nav-menu-button" aria-label="Open navigation" data-mobile-menu>${icon("menu")}</button>
          </div>
        </div>
      </header>
      <div class="portal-overlay" id="nav-overlay" data-close-mobile-menu></div>`;
  }

  function publicFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer">
        <div class="container footer-main">
          <div class="footer-brand">
            ${brandMarkup()}
            <p>Excellent Leaders Secondary School develops knowledgeable, disciplined and confident young people prepared to lead and serve.</p>
            <div class="topbar-social"><a class="social-link" href="#" aria-label="Facebook">f</a><a class="social-link" href="#" aria-label="Instagram">ig</a><a class="social-link" href="#" aria-label="YouTube">yt</a></div>
          </div>
          <div>
            <h3 class="footer-title">Quick Links</h3>
            <div class="footer-links">
              <a href="#/about" data-route="/about">About the school</a>
              <a href="#/academics" data-route="/academics">Academics</a>
              <a href="#/admissions" data-route="/admissions">Admissions</a>
              <a href="#/gallery" data-route="/gallery">Campus gallery</a>
              <a href="#/news" data-route="/news">News & events</a>
            </div>
          </div>
          <div>
            <h3 class="footer-title">School Information</h3>
            <div class="footer-contact">
              <span>${icon("map-pin")} ${escapeHTML(DATA.school.address)}</span>
              <span>${icon("phone")} ${escapeHTML(DATA.school.phone)}</span>
              <span>${icon("mail")} ${escapeHTML(DATA.school.email)}</span>
              <span>${icon("clock")} ${escapeHTML(DATA.school.hours)}</span>
            </div>
          </div>
          <div>
            <h3 class="footer-title">School Updates</h3>
            <p>Receive admissions notices, calendar reminders and school news.</p>
            <form class="newsletter-form" data-form="newsletter">
              <label class="sr-only" for="newsletter-email">Email address</label>
              <input id="newsletter-email" name="email" type="email" required placeholder="Email address" />
              <button class="btn btn-primary btn-sm" type="submit" aria-label="Subscribe">${icon("arrow-right")}</button>
            </form>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© ${year} Excellent Leaders Secondary School. All rights reserved.</span>
          <div class="footer-legal"><a href="#/about">Privacy</a><a href="#/about">Terms</a><a href="#/contact" data-route="/contact">Support</a></div>
        </div>
      </footer>`;
  }

  function pageHero(title, description, current) {
    return `
      <section class="page-hero">
        <div class="container">
          <div class="breadcrumbs"><a href="#/home" data-route="/home">Home</a><span>/</span><span>${escapeHTML(current)}</span></div>
          <h1>${title}</h1>
          <p>${description}</p>
        </div>
      </section>`;
  }

  function pillarCards() {
    return DATA.pillars.map((item) => `
      <article class="pillar-card reveal">
        <span class="icon-badge">${icon(item.icon, "icon-lg")}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
      </article>`).join("");
  }

  function subjectCards(limit = DATA.subjects.length) {
    return DATA.subjects.slice(0, limit).map((item) => `
      <article class="subject-card reveal">
        <span class="icon-badge">${icon(item.icon, "icon-lg")}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
      </article>`).join("");
  }

  function departmentCards() {
    return DATA.departments.map((item, index) => `
      <article class="department-card ${item.accent} reveal">
        <span class="department-index">0${index + 1}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
        <small>${escapeHTML(item.lead)}</small>
      </article>`).join("");
  }

  function newsCards(items = DATA.news) {
    const sceneFiles = {
      achievement: "gallery-campus.svg",
      leadership: "gallery-leadership.svg",
      science: "gallery-science.svg"
    };
    return items.map((item) => `
      <article class="news-card reveal">
        <div class="news-scene"><img src="assets/${sceneFiles[item.scene] || "gallery-campus.svg"}" alt="${escapeHTML(item.title)}" /></div>
        <div class="news-card-body">
          <div class="meta"><span class="tag">${escapeHTML(item.tag)}</span><span>${escapeHTML(item.date)}</span></div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.excerpt)}</p>
          <button class="text-link" data-news-title="${escapeHTML(item.title)}">Read story ${icon("arrow-right")}</button>
        </div>
      </article>`).join("");
  }

  function eventItems() {
    return DATA.events.map((item) => `
      <article class="event-item">
        <div class="event-date"><strong>${escapeHTML(item.day)}</strong><small>${escapeHTML(item.month)}</small></div>
        <div><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.time)} • ${escapeHTML(item.place)}</p></div>
      </article>`).join("");
  }

  function galleryItems(items = DATA.gallery) {
    return items.map((item) => `
      <button class="gallery-item reveal" data-gallery-item="${escapeHTML(item.title)}" aria-label="Open ${escapeHTML(item.title)}">
        <img src="assets/${escapeHTML(item.file)}" alt="${escapeHTML(item.title)}" />
        <span class="gallery-caption"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.category)}</small></span>
      </button>`).join("");
  }

  function homePage() {
    return `
      <section class="hero">
        <div class="container hero-inner">
          <div class="hero-copy">
            <span class="eyebrow">Welcome to Excellent Leaders Secondary School</span>
            <h1>Building bright minds and <span class="accent">excellent leaders.</span></h1>
            <p class="hero-description">A professional, student-centred school community where academic excellence, strong character and practical leadership grow together.</p>
            <div class="hero-actions">
              <button class="btn btn-primary" data-route="/admissions">Apply for Admission ${icon("arrow-right")}</button>
              <button class="btn btn-ghost-light" data-route="/about">Discover Our School</button>
            </div>
            <div class="hero-trust"><span>${icon("check")} Safe learning environment</span><span>${icon("check")} Qualified teachers</span><span>${icon("check")} Parent partnership</span></div>
          </div>
          <div class="hero-visual">
            <img src="assets/hero-campus.svg" alt="Illustration of the Excellent Leaders Secondary School campus and students" />
            <div class="floating-card one"><span class="icon-badge">${icon("chart")}</span><div><strong>Strong progress</strong><small>Whole-child development</small></div></div>
            <div class="floating-card two"><span class="icon-badge">${icon("shield")}</span><div><strong>Character first</strong><small>Knowledge • Leadership • Discipline</small></div></div>
          </div>
        </div>
        <div class="hero-wave"></div>
      </section>

      <section class="pillar-strip">
        <div class="container pillar-grid">${pillarCards()}</div>
      </section>

      <section class="section">
        <div class="container about-grid">
          <div class="about-visual reveal">
            <img src="assets/about-learning.svg" alt="A teacher presenting a lesson to students" />
            <div class="about-badge"><span><strong>${new Date().getFullYear() - DATA.school.established}+</strong><small>years of purposeful learning</small></span></div>
          </div>
          <div class="reveal">
            <span class="eyebrow">About our school</span>
            <h2>Education that prepares learners for school, life and leadership.</h2>
            <p class="lead">Excellent Leaders Secondary School combines high academic expectations with discipline, wellbeing, creativity and service.</p>
            <ul class="check-list">
              <li>${icon("check")} Clear teaching, regular assessment and targeted academic support.</li>
              <li>${icon("check")} Leadership opportunities through clubs, projects and student service.</li>
              <li>${icon("check")} Consistent communication with parents and guardians.</li>
              <li>${icon("check")} A respectful culture built around responsibility and integrity.</li>
            </ul>
            <button class="btn btn-secondary" data-route="/about">Read Our Story ${icon("arrow-right")}</button>
          </div>
        </div>
      </section>

      <section class="stats-band">
        <div class="container stats-grid">
          <div class="stat-item"><span class="stat-value">${DATA.school.students}+</span><span class="stat-label">Learners supported</span></div>
          <div class="stat-item"><span class="stat-value">${DATA.school.teachers}</span><span class="stat-label">Teaching professionals</span></div>
          <div class="stat-item"><span class="stat-value">1:15</span><span class="stat-label">Teacher–student ratio</span></div>
          <div class="stat-item"><span class="stat-value">${DATA.school.awards}</span><span class="stat-label">Awards & honours</span></div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container">
          <div class="section-header">
            <div><span class="eyebrow">Academic programme</span><h2>Strong foundations. Practical learning.</h2><p class="lead">A balanced curriculum supports academic achievement, creativity, technology and healthy development.</p></div>
            <button class="btn btn-outline" data-route="/academics">View all academics ${icon("arrow-right")}</button>
          </div>
          <div class="card-grid">${subjectCards(8)}</div>
        </div>
      </section>

      <section class="section">
        <div class="container admissions-grid">
          <div class="admissions-visual reveal">
            <div class="admissions-card"><span class="eyebrow">Admissions</span><h3>Join a school community built for growth.</h3><p>Our admissions team will guide your family from first enquiry to successful enrolment.</p><button class="btn btn-primary" data-route="/admissions">Start an Enquiry</button></div>
          </div>
          <div>
            <span class="eyebrow">How to apply</span>
            <h2>A clear and supportive admissions process.</h2>
            <div class="step-list">${DATA.admissionsSteps.map((step) => `<div class="step-item reveal"><div class="step-number">${step.number}</div><div><h3>${step.title}</h3><p>${step.text}</p></div></div>`).join("")}</div>
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container">
          <div class="section-header center"><span class="eyebrow">Departments</span><h2>Learning teams focused on quality and progress.</h2><p class="lead">Our departments coordinate teaching, resources and support across the curriculum.</p></div>
          <div class="department-grid">${departmentCards()}</div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-header"><div><span class="eyebrow">School life</span><h2>Explore our learning community.</h2></div><button class="btn btn-outline" data-route="/gallery">Open Gallery ${icon("arrow-right")}</button></div>
          <div class="gallery-grid">${galleryItems(DATA.gallery.slice(0, 4))}</div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container news-event-grid">
          <div><div class="section-header"><div><span class="eyebrow">Latest stories</span><h2>News from ELC.</h2></div><button class="btn btn-outline btn-sm" data-route="/news">All News</button></div><div class="news-grid">${newsCards()}</div></div>
          <aside class="events-panel reveal"><span class="eyebrow">Calendar</span><h3>Upcoming Events</h3>${eventItems()}<button class="btn btn-primary btn-sm" data-route="/news">View full calendar</button></aside>
        </div>
      </section>

      <section class="section">
        <div class="container"><div class="section-header center"><span class="eyebrow">Our community</span><h2>What families and learners value.</h2></div><div class="testimonial-grid">${DATA.testimonials.map((item) => `<article class="testimonial-card reveal"><blockquote>${escapeHTML(item.quote)}</blockquote><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.role)}</small></article>`).join("")}</div></div>
      </section>

      ${callToAction()}`;
  }

  function callToAction() {
    return `
      <section class="cta-band">
        <div class="container cta-inner">
          <h2>Give your child a confident start and a strong path forward.</h2>
          <div class="cta-actions"><button class="btn btn-primary" data-route="/admissions">Apply Now</button><button class="btn btn-ghost-light" data-route="/contact">Book a School Visit</button></div>
        </div>
      </section>`;
  }

  function aboutPage() {
    return `
      ${pageHero("A school built around purpose, character and progress.", "Learn about the story, values and people behind Excellent Leaders Secondary School.", "About Us")}
      <section class="section">
        <div class="container page-split">
          <div class="reveal"><span class="eyebrow">Our story</span><h2>Excellent education begins with a clear purpose.</h2><p class="lead">Excellent Leaders Secondary School was established to provide disciplined, forward-looking education that equips learners with knowledge and the confidence to lead.</p><p>Our approach connects classroom learning to personal responsibility, communication, creativity and service. Teachers use regular assessment to understand progress and provide the right level of support or challenge.</p><p>Families are important partners. Through the parent portal, school meetings, progress reports and direct communication, parents and guardians remain informed and involved.</p></div>
          <div class="about-visual reveal"><img src="assets/hero-campus.svg" alt="Excellent Leaders Secondary School campus illustration" /></div>
        </div>
      </section>
      <section class="section section-soft" id="mission">
        <div class="container"><div class="section-header center"><span class="eyebrow">Mission & values</span><h2>Knowledge. Leadership. Discipline.</h2></div><div class="values-grid"><article class="value-card reveal"><span class="icon-badge">${icon("book-open", "icon-lg")}</span><h3>Our Mission</h3><p>To provide high-quality education that develops capable learners, responsible citizens and principled leaders.</p></article><article class="value-card reveal"><span class="icon-badge">${icon("eye", "icon-lg")}</span><h3>Our Vision</h3><p>To be a trusted school community recognised for academic progress, character and positive leadership.</p></article><article class="value-card reveal"><span class="icon-badge">${icon("shield", "icon-lg")}</span><h3>Our Values</h3><p>Knowledge, leadership, discipline, integrity, respect, service and continuous improvement.</p></article></div></div>
      </section>
      <section class="section" id="principal">
        <div class="container page-split"><div class="content-card reveal"><span class="eyebrow">Principal’s message</span><h2>Every learner can grow with the right expectations and support.</h2><p>Welcome to Excellent Leaders Secondary School. Our responsibility goes beyond helping students pass examinations. We help them develop habits of thought, behaviour and service that will remain valuable throughout life.</p><p>We expect learners to work hard, ask questions, respect others and take responsibility. In return, our staff commit to clear teaching, fair guidance, safe learning and constructive communication with every family.</p><p><strong>Head of School</strong><br /><span style="color:var(--muted)">Excellent Leaders Secondary School</span></p></div><div class="admissions-visual reveal"><div class="admissions-card"><h3>A culture of high expectations and genuine care.</h3><p>Professional teaching. Consistent standards. Strong family partnership.</p></div></div></div>
      </section>
      <section class="section section-soft" id="staff"><div class="container"><div class="section-header center"><span class="eyebrow">School leadership</span><h2>Meet our core team.</h2><p class="lead">A coordinated team supporting learning, wellbeing and school operations.</p></div><div class="staff-grid">${DATA.staff.map((person) => `<article class="staff-card reveal"><div class="staff-avatar">${person.initials}</div><h3>${person.name}</h3><span class="staff-role">${person.role}</span><p>${person.bio}</p></article>`).join("")}</div></div></section>
      ${callToAction()}`;
  }

  function academicsPage() {
    return `
      ${pageHero("A balanced curriculum for strong academic and personal growth.", "Explore subjects, departments, assessment and the learning support available to every student.", "Academics")}
      <section class="section"><div class="container"><div class="section-header center"><span class="eyebrow">Curriculum</span><h2>Core knowledge with practical application.</h2><p class="lead">Our curriculum is structured to build understanding, communication, problem-solving, creativity and digital confidence.</p></div><div class="card-grid">${subjectCards()}</div></div></section>
      <section class="section section-soft"><div class="container"><div class="section-header"><div><span class="eyebrow">Academic departments</span><h2>Coordinated teaching and support.</h2></div></div><div class="department-grid">${departmentCards()}</div></div></section>
      <section class="section"><div class="container page-split"><div><span class="eyebrow">Assessment & progress</span><h2>Clear evidence, useful feedback and timely support.</h2><p class="lead">Assessment helps teachers and families understand what a learner knows, what they can do and what should happen next.</p><ul class="check-list"><li>${icon("check")} Classwork, projects, practical tasks and formal assessments.</li><li>${icon("check")} Term reports with subject performance and teacher comments.</li><li>${icon("check")} Parent access to grades and attendance through the portal.</li><li>${icon("check")} Intervention, enrichment and study support where needed.</li></ul></div><div class="content-card reveal"><h3>Academic resources</h3><div class="policy-list"><div class="policy-row"><div><strong>Academic Calendar</strong><small>Term dates, assessments and school events</small></div>${icon("download")}</div><div class="policy-row"><div><strong>Curriculum Overview</strong><small>Subjects and learning priorities</small></div>${icon("download")}</div><div class="policy-row"><div><strong>Assessment Policy</strong><small>Grading, reporting and feedback</small></div>${icon("download")}</div><div class="policy-row"><div><strong>Student Support Guide</strong><small>Study support and wellbeing services</small></div>${icon("download")}</div></div></div></div></section>
      <section class="section section-dark"><div class="container"><div class="section-header center"><span class="eyebrow">Academic outcomes</span><h2>Progress that can be seen and supported.</h2></div><div class="stats-grid">${DATA.achievements.map((item) => `<div class="stat-item"><span class="stat-value">${item.value}</span><span class="stat-label">${item.label}</span></div>`).join("")}</div></div></section>
      ${callToAction()}`;
  }

  function admissionsPage() {
    return `
      ${pageHero("A welcoming admissions process for your family.", "Review the application steps, prepare your documents and send an enquiry to the admissions team.", "Admissions")}
      <section class="section"><div class="container admissions-grid"><div><span class="eyebrow">How to apply</span><h2>Four steps from enquiry to enrolment.</h2><div class="step-list">${DATA.admissionsSteps.map((step) => `<div class="step-item reveal"><div class="step-number">${step.number}</div><div><h3>${step.title}</h3><p>${step.text}</p></div></div>`).join("")}</div></div><div class="admissions-visual reveal"><div class="admissions-card"><span class="eyebrow">Admissions office</span><h3>We are ready to guide you.</h3><p>Email ${DATA.school.admissionsEmail} or call ${DATA.school.phone} for assistance with entry levels, assessments and enrolment.</p></div></div></div></section>
      <section class="section section-soft"><div class="container page-split"><div class="content-card reveal"><span class="eyebrow">Requirements</span><h2>Prepare the following information.</h2><ul class="check-list"><li>${icon("check")} Completed application or enquiry form.</li><li>${icon("check")} Copy of birth certificate or accepted identity document.</li><li>${icon("check")} Most recent school report or academic record.</li><li>${icon("check")} Passport-size photographs and parent/guardian details.</li><li>${icon("check")} Any relevant medical, learning or support information.</li></ul></div><div class="content-card reveal"><span class="eyebrow">Fees & support</span><h2>Transparent information before enrolment.</h2><p>Fee schedules depend on the student’s entry level, programme and school services. The admissions office provides the current schedule, payment dates and available support during the application process.</p><p><strong>Important:</strong> Confirm all fees directly with the school before making payment.</p><button class="btn btn-outline" data-route="/contact">Contact the Bursary</button></div></div></section>
      <section class="section"><div class="container contact-grid"><div class="contact-panel reveal"><span class="eyebrow">Start your enquiry</span><h2>Tell us about the prospective student.</h2><p>The admissions team will use this information to advise you on availability and next steps.</p><div class="contact-detail"><span class="icon-badge">${icon("mail")}</span><div><strong>Admissions email</strong><span>${DATA.school.admissionsEmail}</span></div></div><div class="contact-detail"><span class="icon-badge">${icon("phone")}</span><div><strong>Admissions telephone</strong><span>${DATA.school.phone}</span></div></div><div class="contact-detail"><span class="icon-badge">${icon("clock")}</span><div><strong>Office hours</strong><span>${DATA.school.hours}</span></div></div></div>${admissionsForm()}</div></section>
      ${callToAction()}`;
  }

  function admissionsForm() {
    return `<form class="form-card reveal" data-form="admissions"><h2>Admissions Enquiry</h2><p class="lead">Complete the form and the school can follow up.</p><div class="form-grid"><div class="form-group"><label class="form-label">Parent/Guardian name</label><input class="form-control" name="guardianName" required /></div><div class="form-group"><label class="form-label">Email address</label><input class="form-control" type="email" name="email" required /></div><div class="form-group"><label class="form-label">Phone number</label><input class="form-control" name="phone" required /></div><div class="form-group"><label class="form-label">Student name</label><input class="form-control" name="studentName" required /></div><div class="form-group"><label class="form-label">Entry level</label><select class="form-control" name="entryLevel" required><option value="">Select level</option><option>Primary</option><option>JHS 1</option><option>JHS 2</option><option>JHS 3</option><option>SHS / College</option></select></div><div class="form-group"><label class="form-label">Preferred start</label><select class="form-control" name="startTerm" required><option value="">Select term</option><option>Next available term</option><option>Term 1</option><option>Term 2</option><option>Term 3</option></select></div><div class="form-group full"><label class="form-label">Questions or relevant information</label><textarea class="form-control" name="message" placeholder="Tell us what you would like to know."></textarea></div></div><div class="form-actions"><button class="btn btn-secondary" type="submit">Submit Enquiry ${icon("arrow-right")}</button></div></form>`;
  }

  function galleryPage() {
    const categories = ["All", ...new Set(DATA.gallery.map((item) => item.category))];
    const items = state.galleryFilter === "All" ? DATA.gallery : DATA.gallery.filter((item) => item.category === state.galleryFilter);
    return `
      ${pageHero("A closer look at learning and life at ELC.", "Browse illustrations of our campus, academic programme, facilities, activities and student leadership.", "Gallery")}
      <section class="section"><div class="container"><div class="gallery-toolbar">${categories.map((category) => `<button class="filter-chip ${state.galleryFilter === category ? "active" : ""}" data-gallery-filter="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div><div class="gallery-grid">${galleryItems(items)}</div></div></section>
      ${callToAction()}`;
  }

  function newsPage() {
    return `
      ${pageHero("School news, achievements and upcoming events.", "Stay informed about academic progress, school life, community activities and important dates.", "News & Events")}
      <section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Latest updates</span><h2>News from our school community.</h2></div></div><div class="news-grid">${newsCards([...DATA.news, ...DATA.news.map((item, i) => ({ ...item, date: ["10 May 2026", "24 April 2026", "8 April 2026"][i], title: ["Reading programme celebrates student consistency", "Career and leadership talks connect learning to life", "Sports teams demonstrate discipline and teamwork"][i] }))])}</div></div></section>
      <section class="section section-soft"><div class="container"><div class="section-header center"><span class="eyebrow">School calendar</span><h2>Upcoming events.</h2></div><div class="values-grid">${DATA.events.map((item) => `<article class="content-card reveal"><div class="event-date" style="width:70px;margin-bottom:18px"><strong>${item.day}</strong><small>${item.month}</small></div><span class="tag">${item.category}</span><h3 style="font-family:Inter,sans-serif;margin:14px 0 8px">${item.title}</h3><p>${item.time} • ${item.place}</p><button class="text-link" data-event-title="${escapeHTML(item.title)}">Event details ${icon("arrow-right")}</button></article>`).join("")}</div></div></section>
      ${callToAction()}`;
  }

  function contactPage() {
    return `
      ${pageHero("We are ready to answer your questions.", "Contact the school office, admissions team or support desk, or arrange a visit to the campus.", "Contact")}
      <section class="section"><div class="container contact-grid"><div class="contact-panel reveal"><span class="eyebrow">Contact information</span><h2>Connect with Excellent Leaders Secondary School.</h2><p>Use the details below or send a message. For urgent student matters, call the school office directly.</p><div class="contact-detail"><span class="icon-badge">${icon("map-pin")}</span><div><strong>Campus address</strong><span>${DATA.school.address}</span></div></div><div class="contact-detail"><span class="icon-badge">${icon("phone")}</span><div><strong>Telephone</strong><span>${DATA.school.phone}</span></div></div><div class="contact-detail"><span class="icon-badge">${icon("mail")}</span><div><strong>Email</strong><span>${DATA.school.email}</span></div></div><div class="contact-detail"><span class="icon-badge">${icon("clock")}</span><div><strong>Office hours</strong><span>${DATA.school.hours}</span></div></div></div><form class="form-card reveal" data-form="contact"><h2>Send a Message</h2><div class="form-grid"><div class="form-group"><label class="form-label">Full name</label><input class="form-control" name="name" required /></div><div class="form-group"><label class="form-label">Email address</label><input class="form-control" type="email" name="email" required /></div><div class="form-group"><label class="form-label">Phone number</label><input class="form-control" name="phone" /></div><div class="form-group"><label class="form-label">Enquiry type</label><select class="form-control" name="type"><option>General enquiry</option><option>Admissions</option><option>Academic support</option><option>Accounts / fees</option><option>Portal support</option></select></div><div class="form-group full"><label class="form-label">Message</label><textarea class="form-control" name="message" required></textarea></div></div><div class="form-actions"><button class="btn btn-secondary" type="submit">Send Message ${icon("arrow-right")}</button></div></form></div></section>
      <section class="section section-soft"><div class="container"><div class="map-placeholder"><div class="map-pin">${icon("map-pin", "icon-xl")}</div></div><p style="text-align:center;color:var(--muted);margin-top:16px">Map placeholder — replace the address in <code>js/data.js</code> with the verified campus location before launch.</p></div></section>`;
  }

  function publicPage() {
    let content;
    switch (state.route) {
      case "/about": content = aboutPage(); break;
      case "/academics": content = academicsPage(); break;
      case "/admissions": content = admissionsPage(); break;
      case "/gallery": content = galleryPage(); break;
      case "/news": content = newsPage(); break;
      case "/contact": content = contactPage(); break;
      default: content = homePage(); break;
    }
    return `${publicHeader()}<main>${content}</main>${publicFooter()}`;
  }

  function loginPage() {
    const demo = DATA.demoUsers.find((item) => item.role === state.loginRole);
    return `
      <main class="portal-auth">
        <div class="portal-auth-shell">
          <section class="portal-auth-brand">
            <div class="portal-auth-copy">
              ${brandMarkup()}
              <span class="eyebrow">Secure school portal</span>
              <h1>One school. Four connected experiences.</h1>
              <p>Students, parents, teachers and administrators receive the information and tools appropriate to their role.</p>
              <div class="portal-benefits"><div class="portal-benefit">${icon("shield")} Role-based access and navigation</div><div class="portal-benefit">${icon("chart")} Grades, attendance and progress visibility</div><div class="portal-benefit">${icon("bell")} School notices and parent communication</div></div>
            </div>
          </section>
          <section class="portal-auth-panel">
            <div class="login-card">
              <span class="eyebrow">Portal access</span>
              <h2>Sign in to your account</h2>
              <p>Select a role and use the included demo account.</p>
              <div class="role-selector">${["student", "parent", "teacher", "admin"].map((role) => `<button class="role-button ${state.loginRole === role ? "active" : ""}" data-login-role="${role}">${icon(role === "admin" ? "settings" : role === "parent" ? "children" : role === "teacher" ? "users" : "user")}<span>${role}</span></button>`).join("")}</div>
              <form class="login-form" data-form="login">
                <input type="hidden" name="role" value="${state.loginRole}" />
                <div class="form-group"><label class="form-label">Email address</label><div class="input-with-icon">${icon("mail")}<input class="form-control" type="email" name="email" required value="${escapeHTML(demo.email)}" autocomplete="username" /></div></div>
                <div class="form-group"><label class="form-label">Password</label><div class="input-with-icon">${icon("lock")}<input class="form-control" type="password" name="password" required value="${escapeHTML(demo.password)}" autocomplete="current-password" /></div></div>
                <button class="btn btn-secondary" type="submit">Sign in as ${state.loginRole} ${icon("arrow-right")}</button>
              </form>
              <div class="login-help">Demo credentials: <code>${escapeHTML(demo.email)}</code> / <code>${escapeHTML(demo.password)}</code></div>
              <button class="back-link" data-route="/home">${icon("arrow-left")} Return to school website</button>
            </div>
          </section>
        </div>
      </main>`;
  }

  const portalMenus = {
    student: [
      ["dashboard", "Dashboard", "home"], ["grades", "My Grades", "grades"], ["attendance", "My Attendance", "attendance"], ["classes", "My Classes", "classes"], ["notifications", "Notifications", "bell"], ["profile", "Profile", "profile"]
    ],
    parent: [
      ["dashboard", "Dashboard", "home"], ["children", "My Children", "children"], ["grades", "Grades", "grades"], ["attendance", "Attendance", "attendance"], ["notifications", "Notifications", "bell"], ["profile", "Profile", "profile"]
    ],
    teacher: [
      ["dashboard", "Dashboard", "home"], ["classes", "My Classes", "classes"], ["students", "Students", "users"], ["gradebook", "Gradebook", "gradebook"], ["attendance", "Attendance", "attendance"], ["notifications", "Notifications", "bell"], ["profile", "Profile", "profile"]
    ],
    admin: [
      ["dashboard", "Dashboard", "home"], ["users", "Manage Users", "users"], ["classes", "Manage Classes", "classes"], ["teachers", "Manage Teachers", "user"], ["students", "Manage Students", "children"], ["grades", "Manage Grades", "gradebook"], ["attendance", "Attendance", "attendance"], ["notifications", "Notifications", "bell"], ["settings", "Settings", "settings"]
    ]
  };

  function portalSection() {
    const parts = state.route.split("/").filter(Boolean);
    return parts[2] || "dashboard";
  }

  function portalTitle(role, section) {
    const item = portalMenus[role].find(([key]) => key === section);
    return item ? item[1] : "Dashboard";
  }

  function getNotifications() {
    const readIds = readJSON("elc-read-notifications", []);
    return DATA.portal.notifications.map((item) => ({ ...item, read: item.read || readIds.includes(item.id) }));
  }

  function notificationList() {
    return `<div class="notification-list">${getNotifications().map((item) => `<div class="notification-item ${item.read ? "" : "unread"}"><span class="icon-badge">${icon("bell")}</span><div><strong>${item.title}</strong><small>${item.text}<br />${item.time}</small></div>${item.read ? "" : `<button data-mark-read="${item.id}" aria-label="Mark notification as read">${icon("check")}</button>`}</div>`).join("")}</div>`;
  }

  function portalShell() {
    const user = state.user;
    const section = portalSection();
    const role = user.role;
    const unread = getNotifications().filter((item) => !item.read).length;
    return `
      <main class="portal-shell">
        <aside class="portal-sidebar" id="portal-sidebar">
          ${brandMarkup()}
          <div class="portal-role-label">${escapeHTML(role)} portal</div>
          <nav class="portal-nav">${portalMenus[role].map(([key, label, iconName]) => `<button class="portal-nav-link ${section === key ? "active" : ""}" data-portal-section="${key}">${icon(iconName)} ${escapeHTML(label)}</button>`).join("")}</nav>
          <div class="sidebar-profile"><strong>${escapeHTML(user.name)}</strong><span>${escapeHTML(user.id)} • ${escapeHTML(role)}</span><button data-logout>${icon("logout")} Sign out</button></div>
        </aside>
        <div class="portal-overlay" id="portal-overlay" data-close-portal-menu></div>
        <section class="portal-main">
          <header class="portal-topbar">
            <div class="portal-topbar-left"><button class="portal-menu-button" data-portal-menu aria-label="Open portal menu">${icon("menu")}</button><div class="portal-search">${icon("search")}<input type="search" placeholder="Search the portal" aria-label="Search portal" /></div></div>
            <div class="portal-topbar-actions"><button class="portal-icon-button" data-portal-section="notifications" aria-label="Notifications">${icon("bell")}${unread ? '<span class="notification-dot"></span>' : ""}</button><div class="portal-avatar">${initials(user.name)}</div><div class="portal-user-name"><strong style="display:block;color:var(--navy);font-size:.88rem">${escapeHTML(user.name)}</strong><span style="display:block;color:var(--muted);font-size:.74rem;text-transform:capitalize">${escapeHTML(role)}</span></div></div>
          </header>
          <div class="portal-content">${renderPortalContent(role, section)}</div>
        </section>
      </main>`;
  }

  function pageHeader(title, description, action = "") {
    return `<div class="portal-page-header"><div><h1>${escapeHTML(title)}</h1><p>${escapeHTML(description)}</p></div>${action}</div>`;
  }

  function metricCard(label, value, note) {
    return `<article class="metric-card"><span class="metric-label">${escapeHTML(label)}</span><strong class="metric-value">${escapeHTML(value)}</strong><span class="metric-note">${escapeHTML(note)}</span></article>`;
  }

  function studentDashboard() {
    const d = DATA.portal.student;
    return `${pageHeader("Welcome back, Nana", `Here is today’s overview for ${d.level}.`)}<div class="metric-grid">${metricCard("Current average", `${d.average}%`, "Strong overall progress")}${metricCard("Attendance", `${d.attendance}%`, "Above school target")}${metricCard("Class position", d.rank, "Based on current total")}${metricCard("Next class", "10:20", "Integrated Science")}</div><div class="portal-grid"><div class="portal-card"><div class="card-header-row"><h2>Academic progress</h2><button class="text-link" data-portal-section="grades">View grades ${icon("arrow-right")}</button></div><div class="progress-ring-wrap"><div class="progress-ring" style="--progress:${d.average}" data-value="${d.average}%"></div><div><h3 style="margin-bottom:8px">A consistent term so far</h3><p style="color:var(--muted);margin-bottom:16px">Your strongest subjects are ICT, Integrated Science and English Language.</p><span class="status-pill">On track</span></div></div></div><div class="portal-card"><div class="card-header-row"><h2>Today’s classes</h2><button class="text-link" data-portal-section="classes">Full schedule</button></div><div class="schedule-list">${d.classes.slice(0, 3).map((item) => `<div class="schedule-item"><span class="schedule-time">${item.time}</span><div><strong>${item.title}</strong><small>${item.room} • ${item.teacher}</small></div></div>`).join("")}</div></div><div class="portal-card"><div class="card-header-row"><h2>Recent grades</h2><button class="text-link" data-portal-section="grades">All subjects</button></div>${gradeTable(d.grades.slice(0, 4))}</div><div class="portal-card"><div class="card-header-row"><h2>Notifications</h2><button class="text-link" data-portal-section="notifications">View all</button></div>${notificationList()}</div></div>`;
  }

  function gradeTable(grades) {
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Subject</th><th>Score</th><th>Grade</th><th>Teacher</th></tr></thead><tbody>${grades.map((g) => `<tr><td class="table-primary">${g.subject}</td><td>${g.score}%</td><td><span class="grade-badge">${g.grade}</span></td><td>${g.teacher}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function studentContent(section) {
    const d = DATA.portal.student;
    if (section === "dashboard") return studentDashboard();
    if (section === "grades") return `${pageHeader("My Grades", "Review current subject scores and teacher information.", `<button class="btn btn-outline btn-sm">${icon("download")} Download report</button>`)}<div class="portal-card">${gradeTable(d.grades)}</div>`;
    if (section === "attendance") return `${pageHeader("My Attendance", "Daily attendance records and term attendance rate.")}<div class="metric-grid">${metricCard("Attendance rate", `${d.attendance}%`, "Target: 95%")}${metricCard("Present days", "67", "Current term")}${metricCard("Late arrivals", "2", "Current term")}${metricCard("Absent days", "1", "Current term")}</div><div class="portal-grid"><div class="portal-card"><h2>Recent attendance</h2><div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Status</th><th>Check-in</th></tr></thead><tbody>${d.attendanceLog.map((item) => `<tr><td class="table-primary">${item.date}</td><td><span class="status-pill ${item.status === "Late" ? "warning" : ""}">${item.status}</span></td><td>${item.checkIn}</td></tr>`).join("")}</tbody></table></div></div><div class="portal-card"><h2>Weekly trend</h2>${attendanceChart()}</div></div>`;
    if (section === "classes") return `${pageHeader("My Classes", "Today’s schedule and subject teachers.")}<div class="portal-card"><div class="schedule-list">${d.classes.map((item) => `<div class="schedule-item"><span class="schedule-time">${item.time}</span><span class="icon-badge">${icon("classes")}</span><div><strong>${item.title}</strong><small>${item.room} • ${item.teacher}</small></div></div>`).join("")}</div></div>`;
    if (section === "notifications") return `${pageHeader("Notifications", "School notices and reminders for your account.")}<div class="portal-card">${notificationList()}</div>`;
    return profileContent();
  }

  function attendanceChart() {
    const values = [96, 98, 94, 97, 92, 96, 98];
    const labels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];
    return `<div class="chart-bars">${values.map((v) => `<div class="chart-bar" style="height:${v * 1.8}px"><span>${v}%</span></div>`).join("")}</div><div class="chart-labels">${labels.map((l) => `<span>${l}</span>`).join("")}</div>`;
  }

  function parentDashboard() {
    const children = DATA.portal.parent.children;
    return `${pageHeader("Family Dashboard", "A clear view of your children’s learning, attendance and school notices.")}<div class="child-card-grid">${children.map((child) => childCard(child)).join("")}</div><div class="portal-grid"><div class="portal-card"><div class="card-header-row"><h2>Recent academic results</h2><button class="text-link" data-portal-section="grades">View all</button></div>${gradeTable(DATA.portal.student.grades.slice(0, 4))}</div><div class="portal-card"><h2>Family notifications</h2>${notificationList()}</div></div>`;
  }

  function childCard(child) {
    return `<article class="child-card"><div class="child-header"><div class="portal-avatar">${initials(child.name)}</div><div><h3>${child.name}</h3><p>${child.level}</p></div></div><div class="child-stats"><div class="child-stat"><strong>${child.average}%</strong><small>Average</small></div><div class="child-stat"><strong>${child.attendance}%</strong><small>Attendance</small></div><div class="child-stat"><strong style="font-size:.9rem">${child.status}</strong><small>Status</small></div></div></article>`;
  }

  function parentContent(section) {
    const children = DATA.portal.parent.children;
    if (section === "dashboard") return parentDashboard();
    if (section === "children") return `${pageHeader("My Children", "Student profiles connected to your parent account.")}<div class="child-card-grid">${children.map((child) => childCard(child)).join("")}</div>`;
    if (section === "grades") return `${pageHeader("Grades", "Current academic results for your selected child.", `<button class="btn btn-outline btn-sm">${icon("download")} Download report</button>`)}<div class="portal-card"><div class="card-header-row"><h2>Nana Kofi Mensah — JHS 3 Gold</h2><span class="status-pill">Average 84%</span></div>${gradeTable(DATA.portal.student.grades)}</div>`;
    if (section === "attendance") return `${pageHeader("Attendance", "Attendance records for your selected child.")}<div class="metric-grid">${metricCard("Attendance rate", "96%", "Above target")}${metricCard("Present days", "67", "Current term")}${metricCard("Late arrivals", "2", "Current term")}${metricCard("Absent days", "1", "Current term")}</div><div class="portal-grid"><div class="portal-card"><h2>Recent log</h2><div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Status</th><th>Check-in</th></tr></thead><tbody>${DATA.portal.student.attendanceLog.map((item) => `<tr><td>${item.date}</td><td><span class="status-pill ${item.status === "Late" ? "warning" : ""}">${item.status}</span></td><td>${item.checkIn}</td></tr>`).join("")}</tbody></table></div></div><div class="portal-card"><h2>Weekly trend</h2>${attendanceChart()}</div></div>`;
    if (section === "notifications") return `${pageHeader("Notifications", "Important school communication for your family.")}<div class="portal-card">${notificationList()}</div>`;
    return profileContent();
  }

  function teacherDashboard() {
    const t = DATA.portal.teacher;
    return `${pageHeader("Teacher Dashboard", `Overview for ${t.department} and today’s teaching schedule.`)}<div class="metric-grid">${metricCard("Classes today", String(t.classesToday), "First class at 9:10 AM")}${metricCard("Students", String(t.students), "Across 3 classes")}${metricCard("Pending grades", String(t.pendingGrades), "Due this week")}${metricCard("Attendance", "93.6%", "Today’s class average")}</div><div class="portal-grid"><div class="portal-card"><div class="card-header-row"><h2>Today’s classes</h2><button class="text-link" data-portal-section="classes">Manage classes</button></div><div class="schedule-list">${t.classes.map((item) => `<div class="schedule-item"><span class="schedule-time">${item.time}</span><div><strong>${item.className} — ${item.subject}</strong><small>${item.students} students</small></div></div>`).join("")}</div></div><div class="portal-card"><h2>Teaching tasks</h2><div class="quick-list"><div class="quick-item"><span class="icon-badge">${icon("gradebook")}</span><div><strong>Complete mathematics gradebook</strong><small>18 scores pending</small></div></div><div class="quick-item"><span class="icon-badge">${icon("attendance")}</span><div><strong>Submit JHS 2 attendance</strong><small>Due by 3:30 PM</small></div></div><div class="quick-item"><span class="icon-badge">${icon("announcement")}</span><div><strong>Parent communication</strong><small>2 messages awaiting reply</small></div></div></div></div><div class="portal-card"><div class="card-header-row"><h2>Gradebook preview</h2><button class="text-link" data-portal-section="gradebook">Open gradebook</button></div>${teacherGradebookTable(false)}</div><div class="portal-card"><h2>Notifications</h2>${notificationList()}</div></div>`;
  }

  function teacherGradebookData() {
    const saved = readJSON("elc-gradebook", null);
    return saved || DATA.portal.teacher.gradebook;
  }

  function teacherGradebookTable(editable = true) {
    const rows = teacherGradebookData();
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Student</th><th>Classwork /20</th><th>Project /20</th><th>Exam /60</th><th>Total</th><th>Grade</th></tr></thead><tbody>${rows.map((row) => { const total = Number(row.classwork) + Number(row.project) + Number(row.exam); return `<tr data-grade-row="${row.id}"><td class="table-primary">${row.student}</td><td>${editable ? `<input class="grade-input" type="number" min="0" max="20" data-grade-field="classwork" value="${row.classwork}" />` : row.classwork}</td><td>${editable ? `<input class="grade-input" type="number" min="0" max="20" data-grade-field="project" value="${row.project}" />` : row.project}</td><td>${editable ? `<input class="grade-input" type="number" min="0" max="60" data-grade-field="exam" value="${row.exam}" />` : row.exam}</td><td class="grade-total">${total}</td><td><span class="grade-badge">${gradeFromScore(total)}</span></td></tr>`; }).join("")}</tbody></table></div>`;
  }

  function teacherContent(section) {
    const t = DATA.portal.teacher;
    if (section === "dashboard") return teacherDashboard();
    if (section === "classes") return `${pageHeader("My Classes", "Class groups, schedules and enrolment totals.")}<div class="portal-card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Class</th><th>Subject</th><th>Students</th><th>Time</th><th>Status</th></tr></thead><tbody>${t.classes.map((item) => `<tr><td class="table-primary">${item.className}</td><td>${item.subject}</td><td>${item.students}</td><td>${item.time}</td><td><span class="status-pill">Active</span></td></tr>`).join("")}</tbody></table></div></div>`;
    if (section === "students") return `${pageHeader("Students", "Learners in your assigned classes.", `<button class="btn btn-secondary btn-sm">${icon("plus")} Add note</button>`)}<div class="portal-card">${studentManagementTable()}</div>`;
    if (section === "gradebook") return `${pageHeader("Gradebook", "Enter and save assessment scores for JHS 3 Gold.", `<button class="btn btn-secondary btn-sm" data-save-gradebook>${icon("check")} Save changes</button>`)}<div class="portal-card">${teacherGradebookTable(true)}</div>`;
    if (section === "attendance") return `${pageHeader("Class Attendance", "Record attendance for JHS 3 Gold.", `<button class="btn btn-secondary btn-sm" data-save-attendance>${icon("check")} Save attendance</button>`)}<div class="portal-card">${attendanceRoster()}</div>`;
    if (section === "notifications") return `${pageHeader("Notifications", "School notices, tasks and communication.")}<div class="portal-card">${notificationList()}</div>`;
    return profileContent();
  }

  function studentManagementTable() {
    const names = ["Nana Kofi Mensah", "Adwoa Nyarko", "Kwame Addai", "Mabel Tetteh", "Isaac Osei", "Sena Dapaah", "Yaw Frimpong", "Esi Armah"];
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Student</th><th>Class</th><th>Average</th><th>Attendance</th><th>Status</th></tr></thead><tbody>${names.map((name, i) => `<tr><td class="table-primary">${name}</td><td>JHS 3 Gold</td><td>${[84, 86, 74, 91, 72, 80, 77, 88][i]}%</td><td>${[96, 98, 91, 99, 94, 95, 92, 97][i]}%</td><td><span class="status-pill ${i === 2 || i === 6 ? "warning" : ""}">${i === 2 || i === 6 ? "Monitor" : "On track"}</span></td></tr>`).join("")}</tbody></table></div>`;
  }

  function attendanceRoster() {
    const names = ["Nana Kofi Mensah", "Adwoa Nyarko", "Kwame Addai", "Mabel Tetteh", "Isaac Osei", "Sena Dapaah", "Yaw Frimpong", "Esi Armah"];
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Student</th><th>Status</th><th>Note</th></tr></thead><tbody>${names.map((name, i) => `<tr><td class="table-primary">${name}</td><td><select class="form-control" style="min-height:38px;padding:7px 10px" data-attendance-student="${escapeHTML(name)}"><option ${i !== 6 ? "selected" : ""}>Present</option><option ${i === 6 ? "selected" : ""}>Late</option><option>Absent</option><option>Excused</option></select></td><td><input class="form-control" style="min-height:38px;padding:7px 10px" placeholder="Optional note" /></td></tr>`).join("")}</tbody></table></div>`;
  }

  function adminDashboard() {
    const a = DATA.portal.admin;
    return `${pageHeader("Administration Dashboard", "School-wide operations, users, attendance and admissions overview.", `<button class="btn btn-secondary btn-sm" data-open-announcement>${icon("announcement")} New announcement</button>`)}<div class="metric-grid">${a.metrics.map((item) => metricCard(item.label, item.value, item.delta)).join("")}</div><div class="portal-grid"><div class="portal-card"><div class="card-header-row"><h2>Attendance overview</h2><button class="text-link" data-portal-section="attendance">View details</button></div>${attendanceChart()}</div><div class="portal-card"><h2>Operations summary</h2><div class="quick-list"><div class="quick-item"><span class="icon-badge">${icon("clipboard")}</span><div><strong>18 applications awaiting review</strong><small>Admissions queue</small></div></div><div class="quick-item"><span class="icon-badge">${icon("users")}</span><div><strong>4 staff profiles incomplete</strong><small>User administration</small></div></div><div class="quick-item"><span class="icon-badge">${icon("bell")}</span><div><strong>3 notices scheduled</strong><small>Communications</small></div></div></div></div><div class="portal-card"><div class="card-header-row"><h2>Recent users</h2><button class="text-link" data-portal-section="users">Manage users</button></div>${adminUserTable(a.users)}</div><div class="portal-card"><h2>Notifications</h2>${notificationList()}</div></div>`;
  }

  function adminUserTable(users) {
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th></tr></thead><tbody>${users.map((item) => `<tr><td class="table-primary">${item.name}</td><td>${item.role}</td><td>${item.email}</td><td><span class="status-pill">${item.status}</span></td></tr>`).join("")}</tbody></table></div>`;
  }

  function adminContent(section) {
    if (section === "dashboard") return adminDashboard();
    if (section === "users") return `${pageHeader("Manage Users", "Create, review and manage school portal accounts.", `<button class="btn btn-secondary btn-sm" data-add-user>${icon("plus")} Add user</button>`)}<div class="portal-card">${adminUserTable([...DATA.portal.admin.users, { name: "Ms. Esther Boateng", role: "Teacher", email: "eboateng@elc.demo", status: "Active" }, { name: "Abena Mensah", role: "Student", email: "abena@elc.demo", status: "Active" }])}</div>`;
    if (section === "classes") return `${pageHeader("Manage Classes", "Class groups, form teachers and student totals.", `<button class="btn btn-secondary btn-sm" data-generic-action="Class created">${icon("plus")} Add class</button>`)}<div class="portal-card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Class</th><th>Form teacher</th><th>Students</th><th>Room</th><th>Status</th></tr></thead><tbody>${[["JHS 3 Gold","Mr. Daniel Owusu",42,"B12"],["JHS 2 Emerald","Ms. Esther Boateng",41,"A08"],["JHS 1 Navy","Mrs. Adjoa Addo",43,"A04"],["Primary 6 Royal","Mr. Kwesi Asante",38,"P06"]].map((r) => `<tr><td class="table-primary">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="status-pill">Active</span></td></tr>`).join("")}</tbody></table></div></div>`;
    if (section === "teachers") return `${pageHeader("Manage Teachers", "Teaching staff, departments and assigned classes.", `<button class="btn btn-secondary btn-sm" data-generic-action="Teacher profile opened">${icon("plus")} Add teacher</button>`)}<div class="portal-card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Teacher</th><th>Department</th><th>Classes</th><th>Email</th><th>Status</th></tr></thead><tbody>${[["Mr. Daniel Owusu","Mathematics",3,"teacher@elc.demo"],["Ms. Esther Boateng","Languages",4,"eboateng@elc.demo"],["Mrs. Adjoa Addo","Science",3,"aaddo@elc.demo"],["Mr. Kwesi Asante","Humanities",4,"kasante@elc.demo"]].map((r) => `<tr><td class="table-primary">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="status-pill">Active</span></td></tr>`).join("")}</tbody></table></div></div>`;
    if (section === "students") return `${pageHeader("Manage Students", "Student records, classes and account status.", `<button class="btn btn-secondary btn-sm" data-generic-action="Student enrolment form opened">${icon("plus")} Add student</button>`)}<div class="portal-card">${studentManagementTable()}</div>`;
    if (section === "grades") return `${pageHeader("Manage Grades", "School-wide assessment completion and performance overview.")}<div class="metric-grid">${metricCard("Reports complete", "82%", "412 of 502 students")}${metricCard("Pending entries", "138", "Across 14 classes")}${metricCard("School average", "78.4%", "+2.1% this term")}${metricCard("Review flags", "23", "Academic support")}</div><div class="portal-card" style="margin-top:18px">${teacherGradebookTable(false)}</div>`;
    if (section === "attendance") return `${pageHeader("Attendance", "School-wide attendance trends and follow-up flags.")}<div class="metric-grid">${metricCard("Today", "94.8%", "816 present")}${metricCard("Late", "19", "2.2% of students")}${metricCard("Absent", "26", "3.0% of students")}${metricCard("Follow-up", "8", "Parent contact needed")}</div><div class="portal-grid"><div class="portal-card"><h2>Seven-week trend</h2>${attendanceChart()}</div><div class="portal-card"><h2>Attendance alerts</h2><div class="quick-list"><div class="quick-item"><span class="icon-badge">${icon("attendance")}</span><div><strong>JHS 1 Navy below target</strong><small>92.1% this week</small></div></div><div class="quick-item"><span class="icon-badge">${icon("children")}</span><div><strong>8 students need follow-up</strong><small>Three or more absences</small></div></div></div></div></div>`;
    if (section === "notifications") return `${pageHeader("Notifications", "Create and review school-wide communication.", `<button class="btn btn-secondary btn-sm" data-open-announcement>${icon("announcement")} New announcement</button>`)}<div class="portal-card">${notificationList()}</div>`;
    return settingsContent();
  }

  function profileContent() {
    const user = state.user;
    return `${pageHeader("Profile", "Review and update your portal contact details.")}<form class="portal-card" data-form="profile"><div class="form-grid"><div class="form-group"><label class="form-label">Full name</label><input class="form-control" name="name" value="${escapeHTML(user.name)}" /></div><div class="form-group"><label class="form-label">Portal ID</label><input class="form-control" value="${escapeHTML(user.id)}" disabled /></div><div class="form-group"><label class="form-label">Email address</label><input class="form-control" type="email" value="${escapeHTML(DATA.demoUsers.find((d) => d.role === user.role)?.email || "")}" /></div><div class="form-group"><label class="form-label">Telephone</label><input class="form-control" placeholder="Add telephone number" /></div><div class="form-group full"><label class="form-label">Address</label><input class="form-control" placeholder="Add contact address" /></div></div><div class="form-actions"><button class="btn btn-secondary" type="submit">Save profile</button></div></form>`;
  }

  function settingsContent() {
    return `${pageHeader("School Settings", "Update core school configuration and portal preferences.")}<form class="portal-card" data-form="settings"><div class="form-grid"><div class="form-group"><label class="form-label">School name</label><input class="form-control" value="${escapeHTML(DATA.school.name)}" /></div><div class="form-group"><label class="form-label">School email</label><input class="form-control" type="email" value="${escapeHTML(DATA.school.email)}" /></div><div class="form-group"><label class="form-label">Telephone</label><input class="form-control" value="${escapeHTML(DATA.school.phone)}" /></div><div class="form-group"><label class="form-label">Academic year</label><input class="form-control" value="2026 / 2027" /></div><div class="form-group full"><label class="form-label">Address</label><input class="form-control" value="${escapeHTML(DATA.school.address)}" /></div><div class="form-group"><label class="form-label">Default grading scale</label><select class="form-control"><option>Percentage (A–E)</option><option>Percentage (A–F)</option></select></div><div class="form-group"><label class="form-label">Portal maintenance mode</label><select class="form-control"><option>Off</option><option>On</option></select></div></div><div class="form-actions"><button class="btn btn-secondary" type="submit">Save settings</button></div></form>`;
  }

  function renderPortalContent(role, section) {
    if (role === "student") return studentContent(section);
    if (role === "parent") return parentContent(section);
    if (role === "teacher") return teacherContent(section);
    return adminContent(section);
  }

  function render() {
    state.route = getRoute();
    const isPortal = state.route.startsWith("/portal");

    if (isPortal && state.route !== "/portal/login" && !state.user) {
      routeTo("/portal/login");
      return;
    }

    if (state.user && isPortal && state.route !== "/portal/login") {
      const expectedPrefix = `/portal/${state.user.role}`;
      if (!state.route.startsWith(expectedPrefix)) {
        routeTo(`${expectedPrefix}/dashboard`);
        return;
      }
    }

    app.innerHTML = state.route === "/portal/login" ? loginPage() : isPortal ? portalShell() : publicPage();
    document.title = makeTitle();
    closeMobileMenus();
    initializeReveal();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function makeTitle() {
    if (state.route === "/portal/login") return "Portal Login | Excellent Leaders Secondary School";
    if (state.route.startsWith("/portal/") && state.user) return `${portalTitle(state.user.role, portalSection())} | ELC Portal`;
    const titles = { "/home": "Excellent Leaders Secondary School", "/about": "About Us", "/academics": "Academics", "/admissions": "Admissions", "/gallery": "Gallery", "/news": "News & Events", "/contact": "Contact" };
    return `${titles[state.route] || "Excellent Leaders Secondary School"}${state.route === "/home" ? "" : " | Excellent Leaders Secondary School"}`;
  }

  function initializeReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    nodes.forEach((node) => observer.observe(node));
  }

  function closeMobileMenus() {
    document.getElementById("site-nav")?.classList.remove("open");
    document.getElementById("nav-overlay")?.classList.remove("active");
    document.getElementById("portal-sidebar")?.classList.remove("open");
    document.getElementById("portal-overlay")?.classList.remove("active");
    document.body.classList.remove("nav-open");
  }

  function submitStoredForm(form, key, successTitle, successMessage) {
    const values = Object.fromEntries(new FormData(form).entries());
    const items = readJSON(key, []);
    items.push({ ...values, submittedAt: new Date().toISOString() });
    writeJSON(key, items);
    form.reset();
    showToast(successTitle, successMessage);
  }

  function handleLogin(form) {
    const values = Object.fromEntries(new FormData(form).entries());
    const user = DATA.demoUsers.find((item) => item.role === values.role && item.email.toLowerCase() === String(values.email).toLowerCase() && item.password === values.password);
    if (!user) {
      showToast("Sign-in failed", "Check the selected role, email address and password.", "error");
      return;
    }
    state.user = { role: user.role, name: user.name, id: user.id };
    writeJSON("elc-session", state.user);
    showToast("Welcome", `Signed in to the ${user.role} portal.`);
    routeTo(`/portal/${user.role}/dashboard`);
  }

  function saveGradebook() {
    const rows = [...document.querySelectorAll("[data-grade-row]")].map((row) => ({
      id: Number(row.dataset.gradeRow),
      student: row.querySelector(".table-primary").textContent.trim(),
      classwork: Number(row.querySelector('[data-grade-field="classwork"]').value),
      project: Number(row.querySelector('[data-grade-field="project"]').value),
      exam: Number(row.querySelector('[data-grade-field="exam"]').value)
    }));
    const valid = rows.every((row) => row.classwork >= 0 && row.classwork <= 20 && row.project >= 0 && row.project <= 20 && row.exam >= 0 && row.exam <= 60);
    if (!valid) {
      showToast("Scores not saved", "Classwork and project must be 0–20; exam must be 0–60.", "error");
      return;
    }
    writeJSON("elc-gradebook", rows);
    showToast("Gradebook saved", "The demo scores were saved in this browser.");
    render();
  }

  function announcementModal() {
    openModal(`<div class="modal-header"><div><span class="eyebrow">Communication</span><h2>Create announcement</h2></div><button class="modal-close" data-close-modal>${icon("close")}</button></div><form data-form="announcement"><div class="form-grid"><div class="form-group full"><label class="form-label">Title</label><input class="form-control" name="title" required /></div><div class="form-group"><label class="form-label">Audience</label><select class="form-control" name="audience"><option>All users</option><option>Students</option><option>Parents</option><option>Teachers</option></select></div><div class="form-group"><label class="form-label">Publish date</label><input class="form-control" type="date" name="publishDate" required /></div><div class="form-group full"><label class="form-label">Message</label><textarea class="form-control" name="message" required></textarea></div></div><div class="form-actions"><button class="btn btn-outline" type="button" data-close-modal>Cancel</button><button class="btn btn-secondary" type="submit">Publish announcement</button></div></form>`);
  }

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      event.preventDefault();
      routeTo(routeButton.dataset.route);
      return;
    }

    const mobileButton = event.target.closest("[data-mobile-menu]");
    if (mobileButton) {
      document.getElementById("site-nav")?.classList.add("open");
      document.getElementById("nav-overlay")?.classList.add("active");
      document.body.classList.add("nav-open");
      return;
    }

    if (event.target.closest("[data-close-mobile-menu]")) {
      closeMobileMenus();
      return;
    }

    const navToggle = event.target.closest("[data-nav-toggle]");
    if (navToggle && window.innerWidth <= 1120) {
      navToggle.closest(".nav-item")?.classList.toggle("is-open");
      return;
    }

    const galleryFilter = event.target.closest("[data-gallery-filter]");
    if (galleryFilter) {
      state.galleryFilter = galleryFilter.dataset.galleryFilter;
      render();
      return;
    }

    const galleryItem = event.target.closest("[data-gallery-item]");
    if (galleryItem) {
      const item = DATA.gallery.find((g) => g.title === galleryItem.dataset.galleryItem);
      if (item) openModal(`<div class="modal-header"><div><span class="eyebrow">${item.category}</span><h2>${item.title}</h2></div><button class="modal-close" data-close-modal>${icon("close")}</button></div><img src="assets/${item.file}" alt="${item.title}" style="width:100%;border-radius:18px" /><p style="margin:20px 0 0;color:var(--muted)">Illustrative placeholder for the school’s approved photography. Replace it with a verified campus image before production launch.</p>`);
      return;
    }

    const newsButton = event.target.closest("[data-news-title]");
    if (newsButton) {
      openModal(`<div class="modal-header"><div><span class="eyebrow">School news</span><h2>${newsButton.dataset.newsTitle}</h2></div><button class="modal-close" data-close-modal>${icon("close")}</button></div><p class="lead">This is a polished demo article view. The school content team can replace this text with the approved full story, photographs and related links.</p><p>Excellent Leaders Secondary School uses news updates to celebrate achievement, communicate school improvement and keep families connected to learning and school life.</p>`);
      return;
    }

    const eventButton = event.target.closest("[data-event-title]");
    if (eventButton) {
      const item = DATA.events.find((e) => e.title === eventButton.dataset.eventTitle);
      if (item) openModal(`<div class="modal-header"><div><span class="eyebrow">${item.category}</span><h2>${item.title}</h2></div><button class="modal-close" data-close-modal>${icon("close")}</button></div><div class="content-card" style="box-shadow:none"><p><strong>Date:</strong> ${item.day} ${item.month} 2026</p><p><strong>Time:</strong> ${item.time}</p><p><strong>Venue:</strong> ${item.place}</p><p>Contact the school office for attendance information and any event-specific requirements.</p></div>`);
      return;
    }

    const roleButton = event.target.closest("[data-login-role]");
    if (roleButton) {
      state.loginRole = roleButton.dataset.loginRole;
      render();
      return;
    }

    const portalSectionButton = event.target.closest("[data-portal-section]");
    if (portalSectionButton && state.user) {
      routeTo(`/portal/${state.user.role}/${portalSectionButton.dataset.portalSection}`);
      return;
    }

    if (event.target.closest("[data-portal-menu]")) {
      document.getElementById("portal-sidebar")?.classList.add("open");
      document.getElementById("portal-overlay")?.classList.add("active");
      document.body.classList.add("nav-open");
      return;
    }

    if (event.target.closest("[data-close-portal-menu]")) {
      closeMobileMenus();
      return;
    }

    if (event.target.closest("[data-logout]")) {
      localStorage.removeItem("elc-session");
      state.user = null;
      routeTo("/portal/login");
      showToast("Signed out", "Your portal session has ended.");
      return;
    }

    const markRead = event.target.closest("[data-mark-read]");
    if (markRead) {
      const ids = readJSON("elc-read-notifications", []);
      const id = Number(markRead.dataset.markRead);
      if (!ids.includes(id)) ids.push(id);
      writeJSON("elc-read-notifications", ids);
      render();
      return;
    }

    if (event.target.closest("[data-save-gradebook]")) {
      saveGradebook();
      return;
    }

    if (event.target.closest("[data-save-attendance]")) {
      showToast("Attendance saved", "The class attendance register was saved for this demo.");
      return;
    }

    if (event.target.closest("[data-open-announcement]")) {
      announcementModal();
      return;
    }

    if (event.target.closest("[data-add-user]")) {
      openModal(`<div class="modal-header"><div><span class="eyebrow">User administration</span><h2>Add portal user</h2></div><button class="modal-close" data-close-modal>${icon("close")}</button></div><form data-form="add-user"><div class="form-grid"><div class="form-group"><label class="form-label">Full name</label><input class="form-control" name="name" required /></div><div class="form-group"><label class="form-label">Role</label><select class="form-control" name="role"><option>Student</option><option>Parent</option><option>Teacher</option><option>Admin</option></select></div><div class="form-group full"><label class="form-label">Email</label><input class="form-control" type="email" name="email" required /></div></div><div class="form-actions"><button class="btn btn-outline" type="button" data-close-modal>Cancel</button><button class="btn btn-secondary" type="submit">Create user</button></div></form>`);
      return;
    }

    const genericAction = event.target.closest("[data-generic-action]");
    if (genericAction) {
      showToast("Demo action", genericAction.dataset.genericAction);
      return;
    }

    if (event.target.closest("[data-close-modal]") || event.target.classList.contains("modal-backdrop")) closeModal();
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    const type = form.dataset.form;
    if (!type) return;
    event.preventDefault();

    if (type === "login") return handleLogin(form);
    if (type === "newsletter") return submitStoredForm(form, "elc-newsletter", "Subscribed", "The email address was added to the local demo list.");
    if (type === "admissions") return submitStoredForm(form, "elc-admissions-enquiries", "Enquiry submitted", "The admissions enquiry was saved in this browser for demonstration.");
    if (type === "contact") return submitStoredForm(form, "elc-contact-messages", "Message received", "The contact message was saved in this browser for demonstration.");
    if (type === "profile") return showToast("Profile saved", "Your demo profile changes were saved for this session.");
    if (type === "settings") return showToast("Settings saved", "The demo school settings were updated for this session.");
    if (type === "announcement") {
      submitStoredForm(form, "elc-announcements", "Announcement published", "The announcement was saved in this browser.");
      closeModal();
      return;
    }
    if (type === "add-user") {
      submitStoredForm(form, "elc-added-users", "User created", "The demo portal user was saved in this browser.");
      closeModal();
    }
  });

  document.addEventListener("input", (event) => {
    if (!event.target.matches("[data-grade-field]")) return;
    const row = event.target.closest("[data-grade-row]");
    const classwork = Number(row.querySelector('[data-grade-field="classwork"]').value || 0);
    const project = Number(row.querySelector('[data-grade-field="project"]').value || 0);
    const exam = Number(row.querySelector('[data-grade-field="exam"]').value || 0);
    const total = classwork + project + exam;
    row.querySelector(".grade-total").textContent = total;
    row.querySelector(".grade-badge").textContent = gradeFromScore(total);
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1120) closeMobileMenus();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeMobileMenus();
    }
  });

  render();
  window.setTimeout(() => document.getElementById("loading-screen")?.classList.add("is-hidden"), 720);
})();

// if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
//   window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}));
// }

// Service worker disabled while developing with Live Server.
