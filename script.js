// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// Smooth scroll for all anchor links (offset for fixed nav)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const navH = document.querySelector('.navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// Navbar shadow on scroll
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ─────────────────────────────────────────────
// SERVICE AREA MAP  (Leaflet.js + OpenStreetMap)
// ─────────────────────────────────────────────
// Leaflet is loaded via CDN in index.html.
// To add your service area polygon:
//   1. Replace the coordinate pairs in serviceAreaCoords below.
//      Each pair is [latitude, longitude].
//   2. Uncomment the L.polygon(...) block.
//   3. Update the "Primary coverage" paragraph in index.html.
//
// To find coordinates: right-click any point on Google Maps → "What's here?"

const mapEl = document.getElementById('service-map');
if (mapEl && typeof L !== 'undefined') {
  // Center map on Houma, LA
  const map = L.map('service-map').setView([29.5958, -90.7195], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  // TODO: Replace these example coordinates with your real service area boundary.
  // const serviceAreaCoords = [
  //   [29.70, -90.90],
  //   [29.70, -90.55],
  //   [29.45, -90.55],
  //   [29.45, -90.90],
  // ];
  //
  // L.polygon(serviceAreaCoords, {
  //   color:       '#1b2d50',
  //   fillColor:   '#1b2d50',
  //   fillOpacity: 0.15,
  //   weight:      2
  // }).addTo(map).bindPopup('ASAP Appraisals Service Area');
}