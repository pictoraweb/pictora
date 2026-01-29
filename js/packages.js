// PICTORA - Packages Logic
// Handle package display and interactions

'use strict';

// ========================================
// PACKAGE DATA
// ========================================
const packageData = {
  wedding: {
    title: "Wedding Photography",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 12,500",
        duration: "4 Hours",
        features: [
          "1 Professional Photographer",
          "200+ Edited Photos",
          "Online Gallery",
          "Basic Editing",
          "Digital Delivery"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 28,500",
        duration: "8 Hours",
        features: [
          "1 Professional Photographer",
          "Walima",
          "400+ Edited Photos",
          "Online Gallery",
          "Advanced Editing",
          "Highlight Video (2-3 min)",
          "USB Drive",
          "Digital + Physical Delivery"
          
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 85,000",
        duration: "Full Day",
        features: [
          "2 Professional Photographers",
          "Walima",
          "Oudoor",
          "600+ Edited Photos",
          "Cinematic Highlight Video (5-7 min)",
          "Pre-wedding Shoot",
          "Premium Album (20 pages)",
          "USB Drive + Online Gallery",
          
        
        ],
        popular: false
      }
    ]
  },
  
  prewedding: {
    title: "Pre-Wedding / Engagement",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 5,000",
        duration: "2 Hours",
        features: [
          "1 Professional Photographer",
          "100+ Edited Photos",
          "Online Gallery",
          "Digital Delivery"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 10,000",
        duration: "4 Hours",
        features: [
          "1 Professional Photographer",
          "200+ Edited Photos",
          "Advanced Editing",
          "Online Gallery"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 25,000",
        duration: "Full Day",
        features: [
          "1 Professional Photographer",
          "300+ Edited Photos",
          "Cinematic Video (3-5 min)",
          "Premium Editing",
          "Album (20 pages)",
          "USB Drive + Online Gallery"
        ],
        popular: false
      }
    ]
  },
  
  event: {
    title: "Event Photography",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 12,000",
        duration: "3 Hours",
        features: [
          "1 Professional Photographer",
          "150+ Edited Photos",
          "Online Gallery",
          "Basic Editing",
          "Digital Delivery"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 25,000",
        duration: "6 Hours",
        features: [
          "1 Professional Photographer",
          "300+ Edited Photos",
          "Highlight Video (2-3 min)",
          "Online Gallery",
          "USB Drive",
          "Fast Delivery (3 days)"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 80,000",
        duration: "Full Day",
        features: [
          "2 Professional Photographers",
          "500+ Edited Photos",
          "Cinematic Video (5-7 min)",
          "Same Day Preview",
          "USB Drive + Online Gallery",
          "Express Editing"
        ],
        popular: false
      }
    ]
  },
  
  portrait: {
    title: "Portrait Photography",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 3,500",
        duration: "1.5 Hour",
        features: [
          "50+ Edited Photos",
          "Outdoor",
          "Basic Retouching",
          "Online Gallery",
          "Digital Delivery"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 8,000",
        duration: "2 Hours",
        features: [
          "80+ Edited Photos",
          "Multiple Outfits",
          "Advanced Retouching",
          "2 Locations",
          "Online Gallery"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 20,000",
        duration: "Half Day",
        features: [
          "100+ Edited Photos",
          "Multiple Outfits & Styles",
          "Professional Retouching",
          "3 Locations",
          "Printed Portfolio (10 pages)"
        ],
        popular: false
      }
    ]
  },
  
  product: {
    title: "Product Photography",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 5,000",
        duration: "Up to 10 Products",
        features: [
          "Custom Background",
          "3 Angles per Product",
          "Basic Editing",
          "High Resolution Images",
          "Commercial Use Rights"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 15,000",
        duration: "Up to 20 Products",
        features: [
          "White + Custom Backgrounds",
          "5 Angles per Product",
          "Advanced Editing",
          "Lifestyle Shots",
          "Commercial Use Rights"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 30,000",
        duration: "Up to 40 Products",
        features: [
          "Studio + Lifestyle Shots",
          "5 Angles",
          "Professional Retouching",
          "Model Integration",
          "Video Clips",
          "Full Commercial Rights"
        ],
        popular: false
      }
    ]
  },
  
  food: {
    title: "Food Photography",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 5,000",
        duration: "Up to 10 Dishes",
        features: [
          "Clean Styling",
          "Natural Lighting",
          "Basic Editing",
          "High Resolution",
          "Menu Use Rights"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 10,000",
        duration: "Up to 20 Dishes",
        features: [
          "Professional Styling",
          "Studio Lighting Setup",
          "Advanced Editing",
          "Multiple Angles",
          "Social Media Ready",
          "Commercial Rights"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 35,000",
        duration: "Up to 40 Dishes",
        features: [
          "Expert Food Styling",
          "Professional Setup",
          "Creative Compositions",
          "Video Content",
          "Behind-the-Scenes",
          "Full Commercial Rights"
        ],
        popular: false
      }
    ]
  },
  
  fashion: {
    title: "Fashion / Model Photography",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 20,000",
        duration: "2 Hours",
        features: [
          "1 Model",
          "50+ Edited Photos",
          "Studio Session",
          "Basic Retouching",
          "Digital Delivery"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 35,000",
        duration: "4 Hours",
        features: [
          "1-2 Models",
          "100+ Edited Photos",
          "Studio + Outdoor",
          "Advanced Retouching",
          "Multiple Outfits",
          "Online Portfolio"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 60,000",
        duration: "Full Day",
        features: [
          "Multiple Models",
          "200+ Edited Photos",
          "Multiple Locations",
          "Professional Retouching",
          "Creative Direction",
          "Printed Lookbook"
        ],
        popular: false
      }
    ]
  },
  
  realestate: {
    title: "Real Estate / Interior",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 5,000",
        duration: "Small Property",
        features: [
          "15-20 Photos",
          "HDR Processing",
          "Standard Angles",
          "Virtual Tour Ready",
          "Commercial Rights"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 10,000",
        duration: "Medium Property",
        features: [
          "30-40 Photos",
          "HDR + Twilight Shots",
          "Aerial Photography",
          "Floor Plan Integration",
          "Virtual Tour",
          "Commercial Rights"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 15,000",
        duration: "Large Property",
        features: [
          "50+ Photos",
          "Full HDR Processing",
          "Video Walkthrough",
          "3D Virtual Tour",
          "Full Commercial Rights"
        ],
        popular: false
      }
    ]
  },
  
  lifestyle: {
    title: "Lifestyle / Street Photography",
    packages: [
      {
        name: "Basic Package",
        price: "LKR 18,000",
        duration: "3 Hours",
        features: [
          "Candid Photography",
          "80+ Edited Photos",
          "Urban Locations",
          "Natural Editing Style",
          "Digital Delivery"
        ],
        popular: false
      },
      {
        name: "Standard Package",
        price: "LKR 30,000",
        duration: "Half Day",
        features: [
          "Candid + Posed",
          "150+ Edited Photos",
          "Multiple Locations",
          "Creative Editing",
          "Online Gallery + USB"
        ],
        popular: true
      },
      {
        name: "Premium Package",
        price: "LKR 50,000",
        duration: "Full Day",
        features: [
          "Documentary Style",
          "250+ Edited Photos",
          "Unlimited Locations",
          "Artistic Processing",
          "Photo Book (20 pages)",
          "USB + Online Gallery"
        ],
        popular: false
      }
    ]
  }
};

// ========================================
// INITIALIZE PACKAGES PAGE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('packages.html')) {
    initPackagesPage();
  }
});

function initPackagesPage() {
  // Get service from URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('service');
  
  if (!serviceKey || !packageData[serviceKey]) {
    showErrorMessage();
    return;
  }
  
  const service = packageData[serviceKey];
  
  // Update page title
  document.title = `${service.title} Packages - PICTORA`;
  
  // Update page heading
  const pageTitle = document.querySelector('.page-title');
  if (pageTitle) {
    pageTitle.textContent = `Packages for ${service.title}`;
  }
  
  // Update breadcrumb
  updateBreadcrumb(service.title);
  
  // Render packages
  renderPackages(service.packages, serviceKey);
}

function updateBreadcrumb(serviceTitle) {
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a>
      <span class="breadcrumb-separator">›</span>
      <a href="services.html">Services</a>
      <span class="breadcrumb-separator">›</span>
      <span>${serviceTitle}</span>
      <span class="breadcrumb-separator">›</span>
      <span>Packages</span>
    `;
  }
}

function renderPackages(packages, serviceKey) {
  const container = document.querySelector('.packages-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  packages.forEach(pkg => {
    const card = createPackageCard(pkg, serviceKey);
    container.appendChild(card);
  });
}

function createPackageCard(pkg, serviceKey) {
  const card = document.createElement('div');
  card.className = `glass-card package-card ${pkg.popular ? 'package-popular' : ''}`;
  
  const features = pkg.features.map(feature => `
    <li>${feature}</li>
  `).join('');
  
  card.innerHTML = `
    ${pkg.popular ? '<div class="package-badge">POPULAR</div>' : ''}
    <h3 class="package-name">${pkg.name}</h3>
    <div class="package-price">${pkg.price}</div>
    <div class="package-duration">${pkg.duration}</div>
    <ul class="package-features">
      ${features}
    </ul>
    <div class="package-buttons">
      <button class="btn btn-primary btn-block book-package-btn" 
              data-service="${serviceKey}" 
              data-package="${pkg.name}" 
              data-price="${pkg.price}">
        Book Now
      </button>
      <button class="btn btn-outline btn-block enquire-package-btn" 
              data-service="${serviceKey}" 
              data-package="${pkg.name}" 
              data-price="${pkg.price}">
        Enquire on WhatsApp
      </button>
    </div>
  `;
  
  return card;
}

function showErrorMessage() {
  const container = document.querySelector('.packages-container');
  if (container) {
    container.innerHTML = `
      <div class="glass-card" style="padding: 3rem; text-align: center;">
        <h2>Service Not Found</h2>
        <p style="color: var(--color-text-secondary); margin: 1rem 0 2rem;">
          The requested service could not be found.
        </p>
        <a href="services.html" class="btn btn-primary">View All Services</a>
      </div>
    `;
  }
}

// ========================================
// EVENT HANDLERS
// ========================================
document.addEventListener('click', function(e) {
  // Book Now button
  if (e.target.classList.contains('book-package-btn')) {
    const service = e.target.dataset.service;
    const packageName = e.target.dataset.package;
    const price = e.target.dataset.price;
    
    // Navigate to booking page with parameters
    window.location.href = `booking.html?service=${encodeURIComponent(service)}&package=${encodeURIComponent(packageName)}&price=${encodeURIComponent(price)}`;
  }
});
