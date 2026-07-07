// PICTORA - Portfolio Gallery with Lightbox
'use strict';

// Sample portfolio data - replace with actual images
const portfolioData = [
  { id: 1, category: 'wedding', url: 'images/portfolio/wedding-1.jpg', alt: 'Wedding Photography' },
  { id: 2, category: 'wedding', url: 'images/portfolio/wedding-2.jpg', alt: 'Wedding Ceremony' },
  { id: 3, category: 'prewedding', url: 'images/portfolio/3.jpg', alt: 'Pre-Wedding Shoot' },
  { id: 4, category: 'event', url: 'images/portfolio/4.jpg', alt: 'Event Photography' },
  { id: 5, category: 'portrait', url: 'images/portfolio/5.jpg', alt: 'Portrait Photography' },
  { id: 6, category: 'product', url: 'images/portfolio/6.jpg', alt: 'Product Photography' },
  // Add more images here
];

let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [];

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('portfolio.html')) {
    initPortfolio();
  }
});

function initPortfolio() {
  renderPortfolio('all');
  initFilters();
  initLightbox();
}

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter portfolio
      const filter = this.dataset.filter;
      currentFilter = filter;
      renderPortfolio(filter);
    });
  });
}

function renderPortfolio(filter) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  
  // Filter images
  filteredImages = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);
  
  // Clear grid
  grid.innerHTML = '';
  
  // Render items
  filteredImages.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.dataset.index = index;
    
    div.innerHTML = `
      <img src="${item.url}" alt="${item.alt}" loading="lazy">
      <div class="portfolio-overlay">
        <span class="portfolio-category">${item.category}</span>
        <h3 class="portfolio-title">${item.alt}</h3>
      </div>
    `;
    
    div.addEventListener('click', function() {
      openLightbox(parseInt(this.dataset.index));
    });
    
    grid.appendChild(div);
  });
}

function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateLightbox(1));
  }
  
  // Close on overlay click
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLightbox();
      }
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  const lightbox = document.querySelector('.lightbox');
  const img = document.querySelector('.lightbox-image');
  const counter = document.querySelector('.lightbox-counter');
  
  if (!lightbox || !img) return;
  
  currentImageIndex = index;
  const item = filteredImages[index];
  
  img.src = item.url;
  img.alt = item.alt;
  
  if (counter) {
    counter.textContent = `${index + 1} / ${filteredImages.length}`;
  }
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function navigateLightbox(direction) {
  currentImageIndex += direction;
  
  // Loop around
  if (currentImageIndex < 0) {
    currentImageIndex = filteredImages.length - 1;
  } else if (currentImageIndex >= filteredImages.length) {
    currentImageIndex = 0;
  }
  
  openLightbox(currentImageIndex);
}
