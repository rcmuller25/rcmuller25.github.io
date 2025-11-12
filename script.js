// Progressive: simple client-side filtering and case-study rendering
document.getElementById('filter').addEventListener('change', function() {
  const value = this.value;
  const projects = document.querySelectorAll('.project-card');
  
  projects.forEach(project => {
    if (value === 'all' || project.dataset.tags.includes(value)) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
});

function openCase(e, id) {
  e.preventDefault();
  const cases = document.querySelectorAll('.case-study');
  cases.forEach(c => c.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  window.scrollTo({
    top: document.getElementById('projects').offsetTop - 20,
    behavior: 'smooth'
  });
}

function openDemo(e, url) {
  e.preventDefault();
  window.open(url, '_blank');
}

// Simple contact form handler — progressive enhancement
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // This would be replaced with actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.reset();
    showMsg('Message sent! I\'ll get back to you soon.');
  } catch (error) {
    showMsg('Something went wrong. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

function showMsg(txt) {
  const msg = document.createElement('div');
  msg.className = 'card';
  msg.style.position = 'fixed';
  msg.style.bottom = '20px';
  msg.style.right = '20px';
  msg.style.padding = '12px 20px';
  msg.style.animation = 'fadeIn 0.3s ease-out';
  msg.textContent = txt;
  document.body.appendChild(msg);
  
  setTimeout(() => {
    msg.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => msg.remove(), 300);
  }, 3000);
}

// Hire btn quickscroll
document.getElementById('hireBtn').addEventListener('click', function() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Case study toggle
function toggleCase(header) {
  const card = header.closest('.case-study-card');
  const content = card.querySelector('.case-study-content');
  const toggle = card.querySelector('.case-toggle');
  const isOpen = content.style.display === 'block';
  
  // Close all other case studies
  document.querySelectorAll('.case-study-content').forEach(c => {
    if (c !== content) {
      c.style.display = 'none';
      c.closest('.case-study-card').querySelector('.case-toggle').textContent = '+';
      c.closest('.case-study-card').querySelector('.case-toggle').style.transform = 'rotate(0deg)';
    }
  });
  
  // Toggle current case study
  if (isOpen) {
    content.style.display = 'none';
    toggle.textContent = '+';
    toggle.style.transform = 'rotate(0deg)';
  } else {
    content.style.display = 'block';
    toggle.textContent = '−';
    toggle.style.transform = 'rotate(90deg)';
  }
}

// Image modal functions
function openImageModal(imageSrc, caption) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  
  modal.style.display = 'block';
  modalImg.src = imageSrc;
  modalCaption.textContent = caption;
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}
