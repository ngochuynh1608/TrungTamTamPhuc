// ==============================
// NAVIGATION
// ==============================
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav__link');

// Sticky header
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  updateActiveLink();
  handleScrollTop();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
  navToggle.classList.toggle('open');
  const isOpen = navList.classList.contains('open');
  navToggle.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Active link on scroll
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ==============================
// SCROLL TO TOP
// ==============================
const scrollTopBtn = document.getElementById('scroll-top');

function handleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==============================
// SCROLL ANIMATIONS
// ==============================
const fadeElements = document.querySelectorAll(
  '.service-card, .team-card, .testimonial-card, .process__step, .about__content, .contact__info, .contact__form'
);

fadeElements.forEach(el => {
  el.classList.add('fade-in');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat__num');
      statNums.forEach(num => {
        const text = num.textContent;
        const value = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        animateCounter(num, value, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) statsObserver.observe(heroStats);

// ==============================
// CONTACT FORM
// ==============================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
  btn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Gửi thành công!';
    btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  }, 1500);
});

// ==============================
// SMOOTH SCROLL FOR ANCHORS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPos = target.offsetTop - headerHeight - 16;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});
