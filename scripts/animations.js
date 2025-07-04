// Space Animations with enhanced effects - Optimized for performance
document.addEventListener('DOMContentLoaded', () => {
  // Delay non-critical animations
  setTimeout(() => {
    initSpaceAnimations();
  }, 300);
  
  // Initialize critical UI elements immediately
  initScrollAnimations();
  initProjectCards();
  initSkillBars();
  initContactForm();
  
  // Delay heavy animations
  setTimeout(() => {
    initParallaxEffects();
    init3DEffects();
  }, 600);
});
// Remove duplicate initialization
// initPageTransitions(); // Already initialized elsewhere

// Interactive Background Effect - Optimized for performance
function initInteractiveBackground() {
  const container = document.querySelector('.animated-bg');
  if (!container) return;
  
  // Create interactive particles - reduced count for better performance
  const particleCount = Math.min(25, Math.floor(window.innerWidth / 50)); // Reduced particle count
  const particles = [];
  
  // Remove existing particles
  const existingParticles = container.querySelectorAll('.interactive-particle');
  existingParticles.forEach(p => p.remove());
  
  // Create new particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('interactive-particle');
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    
    // Random size
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.2;
    particle.style.opacity = opacity.toString();
    
    // Store original position
    particle.dataset.originalX = x;
    particle.dataset.originalY = y;
    
    container.appendChild(particle);
    particles.push(particle);
  }
  
  // Add mouse move listener with throttling for performance
  let lastMoveTime = 0;
  const moveThrottle = 30; // Only process every 30ms
  
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMoveTime < moveThrottle) return;
    lastMoveTime = now;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => {
      particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        // Calculate distance
        const dx = mouseX - particleX;
        const dy = mouseY - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Move particles away from mouse with distance falloff
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 10;
          
          const originalX = parseFloat(particle.dataset.originalX);
          const originalY = parseFloat(particle.dataset.originalY);
          
          const offsetX = -Math.cos(angle) * force;
          const offsetY = -Math.sin(angle) * force;
          
          particle.style.left = `${originalX + offsetX}%`;
          particle.style.top = `${originalY + offsetY}%`;
          particle.style.transform = 'scale(1.5)';
        } else {
          // Return to original position
          const originalX = parseFloat(particle.dataset.originalX);
          const originalY = parseFloat(particle.dataset.originalY);
          
          const currentX = parseFloat(particle.style.left);
          const currentY = parseFloat(particle.style.top);
          
          particle.style.left = `${originalX + (currentX - originalX) * 0.9}%`;
          particle.style.top = `${originalY + (currentY - originalY) * 0.9}%`;
          particle.style.transform = '';
        }
      });
    });
  });
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.speed || 0.2);
      const offset = scrollY * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  });
  
  // Add mouse parallax for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      const heroElements = hero.querySelectorAll('.hero-parallax');
      heroElements.forEach(element => {
        const speed = parseFloat(element.dataset.speed || 0.1);
        const offsetX = -mouseX * 20 * speed;
        const offsetY = -mouseY * 20 * speed;
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });
  }
}

// 3D Effects - Optimized for performance
function init3DEffects() {
  const cards = document.querySelectorAll('.project-card, .detail-card');
  if (cards.length === 0) return;
  
  // Throttle function to limit the rate of function calls
  function throttle(callback, limit) {
    let waiting = false;
    return function() {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }
  
  cards.forEach(card => {
    // Create glare element once instead of on every mousemove
    const glare = document.createElement('div');
    glare.classList.add('card-glare');
    card.appendChild(glare);
    
    // Use throttled mousemove handler
    card.addEventListener('mousemove', throttle((e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Reduce calculation complexity
      const angleX = (y - centerY) / 25; // Less sensitive
      const angleY = (centerX - x) / 25; // Less sensitive
      
      // Use transform property directly instead of multiple style changes
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.03, 1.03, 1.03)`;
      
      // Simplified shadow calculation
      const shadowX = (x - centerX) / 15;
      const shadowY = (y - centerY) / 15;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.15)`;
      
      // Simplified glare effect
      const glareX = Math.round((x / rect.width) * 100);
      const glareY = Math.round((y / rect.height) * 100);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)`;
    }, 30)); // Throttle to 30ms
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.boxShadow = '';
      glare.style.background = 'none';
    });
  });
}

// Enhanced Space Animations - Optimized for performance
function initSpaceAnimations() {
  const container = document.querySelector('.animated-bg');
  if (!container) return;

  // Clear existing stars and nebulas
  const existingStars = container.querySelectorAll('.space-star, .space-nebula');
  existingStars.forEach(star => star.remove());

  // Create stars based on screen size - reduced count for better performance
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const starCount = Math.floor((screenWidth * screenHeight) / 16000); // Reduced density by half
  const nebulaCount = Math.min(3, Math.floor(screenWidth / 800)); // Fewer nebulas

  // Create stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('space-star');
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    
    // Random size with more variation
    const size = Math.random() * 4 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random opacity
    const minOpacity = 0.2;
    const maxOpacity = 0.9;
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
    star.style.setProperty('--min-opacity', minOpacity.toString());
    star.style.setProperty('--max-opacity', maxOpacity.toString());
    
    // Random animation duration
    const duration = Math.random() * 4 + 2;
    star.style.setProperty('--twinkle-duration', `${duration}s`);
    
    // Add interactive behavior
    star.addEventListener('mouseover', () => {
      const nearbyStars = getNearbyElements(star, '.space-star', 100);
      nearbyStars.forEach(nearbyStar => {
        nearbyStar.style.transform = 'scale(1.5)';
        setTimeout(() => {
          nearbyStar.style.transform = '';
        }, 500);
      });
    });
    
    container.appendChild(star);
  }

  // Create nebulas
  for (let i = 0; i < nebulaCount; i++) {
    const nebula = document.createElement('div');
    nebula.classList.add('space-nebula');
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    nebula.style.left = `${x}%`;
    nebula.style.top = `${y}%`;
    
    // Random size with more variation
    const size = Math.random() * 200 + 100;
    nebula.style.width = `${size}px`;
    nebula.style.height = `${size}px`;
    
    // Random opacity
    const minOpacity = 0.3;
    const maxOpacity = 0.5;
    nebula.style.setProperty('--min-opacity', minOpacity.toString());
    nebula.style.setProperty('--max-opacity', maxOpacity.toString());
    
    // Random color with more vibrant options
    const hue = Math.random() * 360;
    const saturation = Math.random() * 30 + 70; // 70-100%
    const lightness = Math.random() * 20 + 50; // 50-70%
    nebula.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`;
    
    // Random animation durations
    const pulseDuration = Math.random() * 10 + 10;
    const floatDuration = Math.random() * 20 + 20;
    const rotationDuration = Math.random() * 60 + 60;
    nebula.style.setProperty('--pulse-duration', `${pulseDuration}s`);
    nebula.style.setProperty('--float-duration', `${floatDuration}s`);
    nebula.style.setProperty('--rotation-duration', `${rotationDuration}s`);
    
    // Add interactive behavior
    nebula.addEventListener('mouseover', () => {
      const nearbyNebulas = getNearbyElements(nebula, '.space-nebula', 300);
      nearbyNebulas.forEach(nearbyNebula => {
        const currentHue = parseInt(getComputedStyle(nearbyNebula).backgroundColor.match(/\d+/g)[0]);
        const newHue = (currentHue + 30) % 360;
        nearbyNebula.style.backgroundColor = `hsla(${newHue}, ${saturation}%, ${lightness}%, 0.3)`;
      });
    });
    
    container.appendChild(nebula);
  }
  
  // Add shooting stars periodically
  setInterval(createShootingStar, 3000, container);
}

// Helper function to get nearby elements
function getNearbyElements(element, selector, radius) {
  const nearby = [];
  const allElements = document.querySelectorAll(selector);
  const rect1 = element.getBoundingClientRect();
  const x1 = rect1.left + rect1.width / 2;
  const y1 = rect1.top + rect1.height / 2;
  
  allElements.forEach(el => {
    if (el === element) return;
    
    const rect2 = el.getBoundingClientRect();
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;
    
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (distance < radius) {
      nearby.push(el);
    }
  });
  
  return nearby;
}

// Create shooting star effect
function createShootingStar(container) {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  
  // Random position at the top
  const startX = Math.random() * 100;
  star.style.left = `${startX}%`;
  star.style.top = '0';
  
  // Random size
  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size * 30}px`;
  
  // Random angle
  const angle = Math.random() * 30 + 30; // 30-60 degrees
  star.style.transform = `rotate(${angle}deg)`;
  
  container.appendChild(star);
  
  // Remove after animation completes
  setTimeout(() => {
    star.remove();
  }, 1000);
}

// Add new parallax effects for depth
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  let ticking = false;
  let scrollY = window.scrollY;
  
  const updateParallax = () => {
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.2;
      const offset = scrollY * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Add interactive background that responds to cursor
function initInteractiveBackground() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const createGradientFollower = () => {
    let follower = document.querySelector('.cursor-follower');
    if (!follower) {
      follower = document.createElement('div');
      follower.classList.add('cursor-follower');
      hero.appendChild(follower);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const updatePosition = () => {
      posX += (mouseX - posX) * 0.05;
      posY += (mouseY - posY) * 0.05;
      
      follower.style.left = `${posX}px`;
      follower.style.top = `${posY}px`;
      
      requestAnimationFrame(updatePosition);
    };
    
    updatePosition();
  };
  
  createGradientFollower();
}

// Add smooth page transitions
function initPageTransitions() {
  const transitionElement = document.createElement('div');
  transitionElement.classList.add('page-transition');
  document.body.appendChild(transitionElement);
  
  // Handle internal navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href').startsWith('/') || link.getAttribute('href').includes(window.location.hostname)) {
      e.preventDefault();
      const targetUrl = link.href;
      
      // Start transition
      transitionElement.classList.add('active');
      
      // Navigate after transition completes
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    }
  });
  
  // Handle page load
  window.addEventListener('load', () => {
    transitionElement.classList.add('loaded');
    setTimeout(() => {
      transitionElement.classList.remove('active', 'loaded');
    }, 500);
  });
}

// Enhanced scroll animations with IntersectionObserver
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.dataset.animate;
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
          element.classList.add('animated', animation);
          element.style.opacity = '1';
        }, delay * 1000);
        
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.2 });
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
}

// Project Cards - Only handle 3D tilt effect
function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  if (cards.length === 0) return;

  // Throttle function to limit the rate of function calls
  function throttle(callback, limit) {
    let waiting = false;
    return function() {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        requestAnimationFrame(() => {
          setTimeout(() => {
            waiting = false;
          }, limit);
        });
      }
    };
  }

  cards.forEach(card => {
    // Use throttled mousemove handler for 3D tilt only
    card.addEventListener('mousemove', throttle((e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate 3D tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 30;
      const angleY = (centerX - x) / 30;

      // Apply only the 3D transform, no scale or other effects
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    }, 20), { passive: true });

    // Reset transform on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }, { passive: true });
  });
}

// Enhanced skill bars with dynamic animations
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const percentage = progressBar.getAttribute('data-percentage');
        const delay = Array.from(skillBars).indexOf(progressBar) * 100;
        
        // Add particles for skill completion
        setTimeout(() => {
          progressBar.style.width = percentage + '%';
          
          // Add completion effect when bar reaches 100%
          if (parseInt(percentage) >= 90) {
            setTimeout(() => {
              createSkillCompletionEffect(progressBar);
            }, 1000);
          }
        }, delay);
        
        observer.unobserve(progressBar);
      }
    });
  }, { threshold: 0.2 });
  
  skillBars.forEach(bar => observer.observe(bar));
  
  // Create particle burst effect for high skill levels
  function createSkillCompletionEffect(progressBar) {
    const container = progressBar.closest('.skill-bar');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('skill-particle');
      
      // Position at the end of the progress bar
      particle.style.left = `${rect.width}px`;
      particle.style.top = `${rect.height / 2}px`;
      
      // Random direction
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 3 + 2;
      const size = Math.random() * 6 + 4;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Set animation properties
      particle.style.setProperty('--angle', angle);
      particle.style.setProperty('--speed', speed);
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }
}

// Enhanced contact form with interactive elements
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  const inputs = form.querySelectorAll('.form-input');
  
  inputs.forEach(input => {
    // Focus effects
    input.addEventListener('focus', () => {
      const formGroup = input.closest('.form-group');
      formGroup.classList.add('focused');
      
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('input-ripple');
      formGroup.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.transform = 'scale(100)';
        ripple.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
    
    input.addEventListener('blur', () => {
      const formGroup = input.closest('.form-group');
      if (input.value === '') {
        formGroup.classList.remove('focused');
      }
    });
    
    // Check if input has value on page load
    if (input.value !== '') {
      input.closest('.form-group').classList.add('focused');
    }
  });
  
  // Form submission animation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button[type="submit"]');
    button.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
      button.classList.remove('loading');
      button.classList.add('success');
      button.innerHTML = 'Message Sent <span class="btn-icon">✓</span>';
      
      // Reset form
      setTimeout(() => {
        form.reset();
        inputs.forEach(input => {
          input.closest('.form-group').classList.remove('focused');
        });
        
        button.classList.remove('success');
        button.innerHTML = 'Send Message <span class="btn-arrow">→</span>';
      }, 3000);
    }, 1500);
  });
}