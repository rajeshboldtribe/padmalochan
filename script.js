let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}
// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// --- Solutions Carousel Slider ---
const solutionCards = Array.from(document.querySelectorAll('.solution-card'));
const leftArrow = document.querySelector('.solutions-carousel .carousel-arrow.left');
const rightArrow = document.querySelector('.solutions-carousel .carousel-arrow.right');
let solutionStart = 0;
const visibleCount = 4;

function updateSolutionSlider() {
    solutionCards.forEach((card, i) => {
        if (i >= solutionStart && i < solutionStart + visibleCount) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    // Disable/enable arrows
    if (leftArrow) leftArrow.classList.toggle('disabled', solutionStart === 0);
    if (rightArrow) rightArrow.classList.toggle('disabled', solutionStart + visibleCount >= solutionCards.length);
}
function showNextSolutions() {
    if (solutionStart + visibleCount < solutionCards.length) {
        solutionStart++;
        updateSolutionSlider();
    }
}
function showPrevSolutions() {
    if (solutionStart > 0) {
        solutionStart--;
        updateSolutionSlider();
    }
}
if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', showPrevSolutions);
    rightArrow.addEventListener('click', showNextSolutions);
    updateSolutionSlider();
}

document.addEventListener('DOMContentLoaded', function() {
  const breadcrumbHome = document.getElementById('breadcrumb-home');
  if (breadcrumbHome) {
    breadcrumbHome.addEventListener('click', function(e) {
      e.preventDefault();
      // Simulate HOME nav click
      const homeLink = document.querySelector('.header-nav a');
      if (homeLink) homeLink.click();
    });
  }

  // SPA Navigation for Home, About Us, Products
  const navLinks = document.querySelectorAll('.header-nav a');
  const aboutLink = document.getElementById('aboutus-link');
  const mainContent = document.getElementById('main-content');
  const aboutSection = document.getElementById('about-bharat-section');
  const productSection = document.getElementById('product-section');

  // Find Products link (4th link, index 3)
  const productsLink = Array.from(navLinks).find(a => a.textContent.trim().toUpperCase() === 'PRODUCTS');

  function setActiveNav(link) {
    navLinks.forEach(a => a.classList.remove('active'));
    if (link) link.classList.add('active');
  }

  function showSection(section) {
    if (mainContent) mainContent.classList.add('hidden');
    if (aboutSection) aboutSection.classList.add('hidden');
    if (productSection) productSection.classList.add('hidden');
    if (section) section.classList.remove('hidden');
  }

  // Home
  navLinks[0].addEventListener('click', function(e) {
    e.preventDefault();
    showSection(mainContent);
    setActiveNav(navLinks[0]);
    window.history.pushState({}, '', '/');
  });

  // About Us
  if (aboutLink) {
    aboutLink.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(aboutSection);
      setActiveNav(aboutLink);
      window.history.pushState({}, '', '/about-us');
    });
  }

  // Products
  if (productsLink && productSection) {
    productsLink.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(productSection);
      setActiveNav(productsLink);
      window.history.pushState({}, '', '/products');
    });
  }

  // Handle browser navigation (back/forward)
  window.addEventListener('popstate', function() {
    if (window.location.pathname === '/about-us') {
      showSection(aboutSection);
      setActiveNav(aboutLink);
    } else if (window.location.pathname === '/products') {
      showSection(productSection);
      setActiveNav(productsLink);
    } else {
      showSection(mainContent);
      setActiveNav(navLinks[0]);
    }
  });

  // On load, show correct section
  if (window.location.pathname === '/about-us') {
    showSection(aboutSection);
    setActiveNav(aboutLink);
  } else if (window.location.pathname === '/products') {
    showSection(productSection);
    setActiveNav(productsLink);
  } else {
    showSection(mainContent);
    setActiveNav(navLinks[0]);
  }

  // Breadcrumb Home in Product Page
  const breadcrumbHomeProduct = document.getElementById('breadcrumb-home-product');
  if (breadcrumbHomeProduct) {
    breadcrumbHomeProduct.addEventListener('click', function(e) {
      e.preventDefault();
      if (mainContent) mainContent.classList.remove('hidden');
      if (aboutSection) aboutSection.classList.add('hidden');
      if (productSection) productSection.classList.add('hidden');
      setActiveNav(navLinks[0]);
      window.history.pushState({}, '', '/');
    });
  }
}); 