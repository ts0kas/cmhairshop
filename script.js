// Image sources
const IMGS = [
  'images/kourema1.png',
  'images/kourema2.png',
  'images/kourema3.png',
  'images/magazimesa.jpg',
  'images/magaziexo.png'
];

document.getElementById("heroBg").style.backgroundImage = "url('" + IMGS[3] + "')";
  document.getElementById("bookingBg").style.backgroundImage = "url('" + IMGS[4] + "')";
  for (let i = 0; i < 3; i++) { document.getElementById("img" + i).src = IMGS[i]; }

  document.querySelectorAll(".gallery-item").forEach(el => {
    el.addEventListener("click", () => {
      document.getElementById("lightboxImg").src = IMGS[parseInt(el.dataset.idx)];
      document.getElementById("lightbox").classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => { navbar.classList.toggle("scrolled", window.scrollY > 40); }, { passive: true });

  const btn = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");
  btn.addEventListener("click", () => { btn.classList.toggle("open"); menu.classList.toggle("open"); });
  function closeMobile() { btn.classList.remove("open"); menu.classList.remove("open"); }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // Count-up animation for stats
  function countUp(el, target, duration, suffix) {
    let start = 0;
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Each stat: { selector, target, suffix }
  const stats = [
    { el: document.querySelector('.why-stat:nth-child(1) .why-number'), target: 10,  suffix: '+' },
    { el: document.querySelector('.why-stat:nth-child(2) .why-number'), target: 500, suffix: '+' },
    { el: document.querySelector('.why-stat:nth-child(3) .why-number'), target: 100, suffix: '%' },
    { el: document.querySelector('.why-stat:nth-child(4) .why-number'), target: 5,   suffix: '★' },
  ];

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        stats.forEach(s => { if (s.el) countUp(s.el, s.target, 1800, s.suffix); });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const whySection = document.getElementById('why');
  if (whySection) statsObserver.observe(whySection);

  function closeLightbox() { document.getElementById("lightbox").classList.remove("active"); document.body.style.overflow = ""; }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
