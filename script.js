// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// RAF-based smooth scroll with navbar offset
function smoothScrollTo(targetY, duration) {
  duration = duration || 650;
  var startY = window.scrollY;
  var distance = targetY - startY;
  var startTime = null;

  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var id = anchor.getAttribute('href');
    if (id === '#') return;
    var target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      var navH = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 72;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      smoothScrollTo(top);
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

  const serviceAreaCoords = [
    [29.8332491, -90.9258397],
    [29.5544071, -90.9014778],
    [29.4165705, -90.7505142],
    [29.512791,  -90.4904801],
    [29.6793975, -90.5039867],
    [29.7974409, -90.6275221],
    [29.8332491, -90.9258397],
  ];

  L.polygon(serviceAreaCoords, {
    color:       '#1b2d50',
    fillColor:   '#1b2d50',
    fillOpacity: 0.15,
    weight:      2
  }).addTo(map).bindPopup('ASAP Appraisals Service Area');
}