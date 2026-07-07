// PICTORA - Main JavaScript
// Global Functions and Utilities

'use strict';

// ========================================
// GLOBAL CONSTANTS
// ========================================
const BUSINESS_WHATSAPP = '94789929233'; // Replace with actual number
const BUSINESS_EMAIL = 'pictoraofficial.lk';
const BUSINESS_NAME = 'PICTORA';

// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initScrollTop();
  initSmoothScroll();
  initLazyLoading();
  initActivePageHighlight();
  initFormAutoSave();
});

// ========================================
// NAVBAR FUNCTIONS
// ========================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  
  if (!menuToggle || !mobileMenu) return;
  
  // Open menu
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close menu function
  function closeMenu() {
    mobileMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Close menu on close button
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }
  
  // Close menu on overlay click
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }
  
  // Close menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  if (!scrollTopBtn) {
    // Create scroll to top button if it doesn't exist
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);
  }
  
  const btn = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignore empty anchors or just #
      if (href === '#' || href === '') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for navbar height
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ========================================
// ACTIVE PAGE HIGHLIGHT
// ========================================
function initActivePageHighlight() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-link, .mobile-menu-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ========================================
// FORM AUTO-SAVE (LOCAL STORAGE)
// ========================================
function initFormAutoSave() {
  const forms = document.querySelectorAll('form[data-autosave]');
  
  forms.forEach(form => {
    const formId = form.id || 'default-form';
    
    // Load saved data
    loadFormData(form, formId);
    
    // Save on input
    form.addEventListener('input', function() {
      saveFormData(form, formId);
    });
    
    // Clear on submit
    form.addEventListener('submit', function() {
      clearFormData(formId);
    });
  });
}

function saveFormData(form, formId) {
  const formData = {};
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      formData[input.name] = input.checked;
    } else if (input.type === 'radio') {
      if (input.checked) {
        formData[input.name] = input.value;
      }
    } else {
      formData[input.name] = input.value;
    }
  });
  
  try {
    localStorage.setItem(`pictora-form-${formId}`, JSON.stringify(formData));
  } catch (e) {
    console.error('Error saving form data:', e);
  }
}

function loadFormData(form, formId) {
  try {
    const savedData = localStorage.getItem(`pictora-form-${formId}`);
    if (!savedData) return;
    
    const formData = JSON.parse(savedData);
    
    Object.keys(formData).forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      if (!input) return;
      
      if (input.type === 'checkbox') {
        input.checked = formData[name];
      } else if (input.type === 'radio') {
        if (input.value === formData[name]) {
          input.checked = true;
        }
      } else {
        input.value = formData[name];
      }
    });
  } catch (e) {
    console.error('Error loading form data:', e);
  }
}

function clearFormData(formId) {
  try {
    localStorage.removeItem(`pictora-form-${formId}`);
  } catch (e) {
    console.error('Error clearing form data:', e);
  }
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Remove after duration
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ========================================
// COPY TO CLIPBOARD
// ========================================
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMessage))
      .catch(err => {
        console.error('Error copying to clipboard:', err);
        fallbackCopy(text, successMessage);
      });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    showToast('Failed to copy. Please copy manually.');
    console.error('Error copying:', err);
  }
  
  document.body.removeChild(textarea);
}

// Add copy button event listeners
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('copy-btn')) {
    const textToCopy = e.target.dataset.copy;
    if (textToCopy) {
      copyToClipboard(textToCopy);
    }
  }
});

// ========================================
// FORM VALIDATION HELPERS
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateWhatsApp(number) {
  // Remove spaces and special characters
  const cleaned = number.replace(/[\s\-\(\)]/g, '');
  // Check if it's a valid Sri Lankan number
  const re = /^(\+94|94|0)?[0-9]{9,10}$/;
  return re.test(cleaned);
}

function formatWhatsAppNumber(number) {
  // Remove all non-digit characters
  let cleaned = number.replace(/\D/g, '');
  
  // Remove leading 0 if present
  if (cleaned.startsWith('0')) {
    cleaned = '94' + cleaned.substring(1);
  }
  
  // Add 94 if not present
  if (!cleaned.startsWith('94')) {
    cleaned = '94' + cleaned;
  }
  
  return cleaned;
}

function validateForm(form) {
  let isValid = true;
  const requiredInputs = form.querySelectorAll('[required]');
  
  requiredInputs.forEach(input => {
    const errorElement = input.parentElement.querySelector('.form-error');
    
    // Clear previous errors
    if (errorElement) {
      errorElement.textContent = '';
    }
    
    // Check if empty
    if (!input.value.trim()) {
      showFieldError(input, 'This field is required');
      isValid = false;
      return;
    }
    
    // Email validation
    if (input.type === 'email' && !validateEmail(input.value)) {
      showFieldError(input, 'Please enter a valid email address');
      isValid = false;
      return;
    }
    
    // WhatsApp validation
    if (input.type === 'tel' && input.name.includes('whatsapp')) {
      if (!validateWhatsApp(input.value)) {
        showFieldError(input, 'Please enter a valid WhatsApp number');
        isValid = false;
        return;
      }
    }
    
    // Date validation (must be future date)
    if (input.type === 'date') {
      const selectedDate = new Date(input.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        showFieldError(input, 'Please select a future date');
        isValid = false;
        return;
      }
    }
    
    // Clear error if valid
    input.classList.remove('error');
    if (errorElement) {
      errorElement.textContent = '';
    }
  });
  
  return isValid;
}

function showFieldError(input, message) {
  input.classList.add('error');
  
  let errorElement = input.parentElement.querySelector('.form-error');
  
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    input.parentElement.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
}

// ========================================
// LOADING STATE
// ========================================
function setLoading(element, isLoading) {
  if (isLoading) {
    element.classList.add('loading');
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.innerHTML = '<span class="spinner"></span>';
  } else {
    element.classList.remove('loading');
    element.disabled = false;
    element.textContent = element.dataset.originalText || element.textContent;
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// GLOBAL ERROR HANDLER
// ========================================
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
  // You can add error tracking here (e.g., send to analytics)
});

// ========================================
// EXPORT FOR USE IN OTHER FILES
// ========================================
window.PICTORA = {
  showToast,
  copyToClipboard,
  validateEmail,
  validateWhatsApp,
  formatWhatsAppNumber,
  validateForm,
  setLoading,
  debounce,
  throttle,
  BUSINESS_WHATSAPP,
  BUSINESS_EMAIL,
  BUSINESS_NAME
};
