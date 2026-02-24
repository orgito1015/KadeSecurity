/* ============================================================
   Kade Security — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll behaviour ── */
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Scroll-reveal with IntersectionObserver ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
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

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ── Staggered card animations ── */
  const cardGroups = document.querySelectorAll('.services-grid, .why-grid');

  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card, .why-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, i * 120);
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardGroups.forEach((group) => {
      const cards = group.querySelectorAll('.service-card, .why-card');
      cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(28px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      });
      cardObserver.observe(group);
    });
  }

  /* ── Animated counter ── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const step = 16;
    const increments = Math.ceil(duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += target / increments;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const counters = document.querySelectorAll('.stat-number[data-target]');

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  /* ── Contact form ── */
  const form = document.getElementById('contactForm');
  const successMsg = document.querySelector('.form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn-submit');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Sending…';
      btn.disabled = true;

      // Simulate async send (replace with real endpoint if needed)
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.classList.add('show');
        }
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1600);
    });
  }

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveLink() {
    const scrollY = window.scrollY + 80;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchorLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

})();
