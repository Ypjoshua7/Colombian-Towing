// Testimonial slider logic
document.addEventListener('DOMContentLoaded', function() {
  const testimonialCards = document.querySelectorAll('.testimonial-slider .testimonial-card');
  const leftArrow = document.querySelector('.testimonial-slider-controls .testimonial-arrow.left');
  const rightArrow = document.querySelector('.testimonial-slider-controls .testimonial-arrow.right');
  let current = 0;

  function showTestimonial(idx) {
    testimonialCards.forEach((card, i) => {
      card.style.display = (i === idx) ? 'block' : 'none';
    });
  }
  if (testimonialCards.length) showTestimonial(current);

  if (leftArrow) {
    leftArrow.addEventListener('click', function() {
      current = (current - 1 + testimonialCards.length) % testimonialCards.length;
      showTestimonial(current);
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', function() {
      current = (current + 1) % testimonialCards.length;
      showTestimonial(current);
    });
  }
});
// Portfolio filtering logic
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.portfolio-nav button');
  const items = document.querySelectorAll('.portfolio-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active from all buttons
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      if (cat === 'all') {
        items.forEach(item => item.style.display = 'block');
      } else {
        items.forEach(item => {
          if (item.getAttribute('data-category') === cat) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav ul');

  mobileMenuBtn.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuBtn.textContent = '☰';
        }
      }
    });
  });

  // Portfolio filter
  const portfolioButtons = document.querySelectorAll('.portfolio-nav button');
  portfolioButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      portfolioButtons.forEach((btn) => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
    });
  });

  // Animate elements on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeInOnScroll = function () {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial check
  fadeInOnScroll();

  // Check on scroll
  window.addEventListener('scroll', fadeInOnScroll);

  // Widgets toggle behavior
  const widgetToggles = document.querySelectorAll('.widget-toggle');
  if (widgetToggles.length) {
    widgetToggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        const card = this.closest('.widget-card');
        const isOpen = card.classList.contains('open');

        // Close other widgets if you want accordion behavior — comment this block if you want independent toggles
        const allCards = document.querySelectorAll('.widget-card');
        allCards.forEach(c => c.classList.remove('open'));

        if (!isOpen) {
          card.classList.add('open');
        }
      });
    });
  }

  /* Portfolio image modal viewer (only for images in .portfolio) */
  (function () {
    // create modal element
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
      <button class="modal-close" aria-label="Close full screen image">×</button>
      <img src="" alt="Full screen image" />
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.modal-close');

    // open modal when clicking a portfolio image
    document.querySelectorAll('.portfolio .portfolio-img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function (e) {
        modalImg.src = this.src;
        modalImg.alt = this.alt || 'Portfolio image';
        modal.classList.add('open');
        // prevent body scroll while modal open
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('open');
      modalImg.src = '';
      document.body.style.overflow = '';
    }

    // close handlers
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  })();
});