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

  function closeLightbox() { document.getElementById("lightbox").classList.remove("active"); document.body.style.overflow = ""; }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });