document.addEventListener('DOMContentLoaded', () => {

  // Scroll Animations
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 11, 20, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'rgba(5, 11, 20, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Form Handling
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent page reload
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
          contactForm.classList.add('hidden');
          formSuccess.classList.remove('hidden');
        } else {
          alert('There was an issue sending your message. Please try again or call us.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an issue sending your message. Please try again or call us.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
