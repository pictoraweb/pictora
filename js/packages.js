// PICTORA - Packages Logic
// Renders all photography package categories on one page

'use strict';

// ========================================
// PACKAGE DATA
// ========================================
let packageData = {
  // Wedding Photography groups the three wedding functions (Mehndi / Wedding / Waleema)
  wedding: {
    title: "Wedding Photography",
    subCategories: [
      {
        key: "mehndi",
        title: "Mehndi",
        packages: [
          { name: "Basic Package", price: "Rs. 5,000", features: ["50 Edited Photos", "Full Color Grading"], popular: false },
          { name: "Standard Package", price: "Rs. 7,500", features: ["75 Edited Photos", "Full Color Grading"], popular: true },
          { name: "Premium Package", price: "Rs. 10,000", features: ["100 Edited Photos", "Full Color Grading"], popular: false }
        ]
      },
      {
        key: "wedding",
        title: "Wedding / Nikah",
        packages: [
          { name: "Basic Package", price: "Rs. 12,500", features: ["100 Edited Photos", "Full Color Grading"], popular: false },
          { name: "Standard Package", price: "Rs. 17,500", features: ["150 Edited Photos", "Full Color Grading"], popular: true },
          { name: "Premium Package", price: "Rs. 25,500", features: ["200 Edited Photos", "Full Color Grading"], popular: false }
        ]
      },
      {
        key: "waleema",
        title: "Waleema",
        packages: [
          { name: "Basic Package", price: "Rs. 10,000", features: ["75 Edited Photos", "Full Color Grading"], popular: false },
          { name: "Standard Package", price: "Rs. 15,000", features: ["100 Edited Photos", "Full Color Grading"], popular: true },
          { name: "Premium Package", price: "Rs. 20,000", features: ["125 Edited Photos", "Full Color Grading"], popular: false }
        ]
      }
    ]
  },

  outdoor: {
    title: "Outdoor Photoshoot",
    packages: [
      { name: "Basic Package", price: "Rs. 7,500", features: ["Selected Photos Edited", "Full Color Grading"], popular: false },
      { name: "Standard Package", price: "Rs. 10,000", features: ["Selected Photos Edited", "Full Color Grading"], popular: true },
      { name: "Premium Package", price: "Rs. 15,000", features: ["Selected Photos Edited", "Full Color Grading"], popular: false }
    ]
  },

  portrait: {
    title: "Portrait Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 4,000 – 5,000", features: ["Includes 1 Person", "Additional Person: Rs. 2,000"], popular: false },
      { name: "Standard Package", price: "Rs. 8,000 – 10,000", features: ["Includes 1 Person", "Additional Person: Rs. 3,000"], popular: true },
      { name: "Premium Package", price: "Rs. 10,000 – 15,000", features: ["Includes 1 Person", "Additional Person: Rs. 5,000"], popular: false }
    ]
  },

  birthday: {
    title: "Birthday Party Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 5,000 – 8,000", features: [], popular: false },
      { name: "Standard Package", price: "Rs. 10,000 – 15,000", features: [], popular: true },
      { name: "Premium Package", price: "Rs. 15,000 – 20,000", features: [], popular: false }
    ]
  },

  event: {
    title: "Event Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 10,000 – 15,000", features: ["50 – 100 Guests", "350 Edited Photos"], popular: false },
      { name: "Standard Package", price: "Rs. 20,000 – 30,000", features: ["100 – 200 Guests", "500 Edited Photos"], popular: true },
      { name: "Premium Package", price: "Rs. 35,000 – 50,000", features: ["200 – 300 Guests", "750 Edited Photos"], popular: false }
    ],
    note: "Additional 50 Guests: Rs. 10,000"
  },

  product: {
    title: "Product Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 7,500", features: ["Up to 10 Products", "20 Edited Photos", "Color Grading + White Background"], popular: false },
      { name: "Standard Package", price: "Rs. 12,500", features: ["Up to 20 Products", "40 Edited Photos", "Advanced Retouch + Color Grading"], popular: true },
      { name: "Premium Package", price: "Rs. 20,000", features: ["Up to 40 Products", "80 Edited Photos", "Premium Retouch + Creative Lighting + Lifestyle Shots"], popular: false }
    ]
  },

  food: {
    title: "Food Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 10,000", features: ["Up to 10 Dishes", "25 Edited Photos"], popular: false },
      { name: "Standard Package", price: "Rs. 15,000", features: ["Up to 20 Dishes", "50 Edited Photos"], popular: true },
      { name: "Premium Package", price: "Rs. 25,000", features: ["Up to 35 Dishes", "80 Edited Photos + Creative Styling"], popular: false }
    ]
  },

  fashion: {
    title: "Fashion / Model Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 12,500", features: ["1 Outfit", "25 Edited Photos"], popular: false },
      { name: "Standard Package", price: "Rs. 20,000", features: ["Up to 3 Outfits", "50 Edited Photos"], popular: true },
      { name: "Premium Package", price: "Rs. 30,000", features: ["Up to 5 Outfits", "100 Edited Photos + Premium Skin Retouch"], popular: false }
    ]
  },

  realestate: {
    title: "Real Estate / Interior Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 10,000", features: ["Small Property", "30 Edited Photos"], popular: false },
      { name: "Standard Package", price: "Rs. 17,500", features: ["Medium Property", "50 Edited Photos"], popular: true },
      { name: "Premium Package", price: "Rs. 25,000", features: ["Large Property", "80 Edited Photos + Detail Shots"], popular: false }
    ]
  },

  lifestyle: {
    title: "Lifestyle / Street Photography",
    packages: [
      { name: "Basic Package", price: "Rs. 7,500", features: ["20 Edited Photos"], popular: false },
      { name: "Standard Package", price: "Rs. 12,500", features: ["40 Edited Photos"], popular: true },
      { name: "Premium Package", price: "Rs. 18,000", features: ["75 Edited Photos + Creative Editing"], popular: false }
    ]
  }
};

// ========================================
// COMBO BENEFITS (applies across all packages)
// ========================================
let comboBenefits = [
  { tier: "Basic", features: ["Free USB"] },
  { tier: "Standard", features: ["Free USB", "Free Photo Frame"] },
  { tier: "Premium", features: ["Free USB", "Free Photo Frame", "Free Album"] }
];

// ========================================
// LOAD LIVE PRICES FROM SUPABASE (fallback to the bundled defaults above)
// ========================================
let siteSettings = {};

async function loadPackagesFromSupabase() {
  try {
    if (!window.loadSiteConfig) return;
    const pkg = await window.loadSiteConfig(window.PACKAGES_CONFIG_KEY || 'packages');
    if (pkg) {
      if (pkg.packageData) packageData = pkg.packageData;
      if (Array.isArray(pkg.comboBenefits)) comboBenefits = pkg.comboBenefits;
    }
    const set = await window.loadSiteConfig(window.SETTINGS_CONFIG_KEY || 'settings');
    if (set) siteSettings = set;
  } catch (e) {
    // Network/offline — keep the bundled defaults.
  }
}

// Optional promotional banner shown at the top of the packages list.
function renderOfferBanner(container) {
  const text = siteSettings && siteSettings.offerBanner;
  if (!text) return;
  const banner = document.createElement('div');
  banner.className = 'offer-banner';
  banner.innerHTML = `<span class="offer-banner-icon">🎉</span><span>${text}</span>`;
  container.appendChild(banner);
}

// ========================================
// INITIALIZE PACKAGES PAGE
// ========================================
document.addEventListener('DOMContentLoaded', async function() {
  if (window.location.pathname.includes('packages.html')) {
    await loadPackagesFromSupabase();
    initPackagesPage();
    // Re-filter if the category changes via a #hash link while on this page
    window.addEventListener('hashchange', function() {
      window.scrollTo(0, 0);
      initPackagesPage();
    });
  }
});

function initPackagesPage() {
  // Which category was requested? Support ?service=wedding and #wedding
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('service') || (window.location.hash ? window.location.hash.slice(1) : '');

  if (requested && packageData[requested]) {
    renderSingleCategory(requested);
  } else {
    renderAllPackages();
  }
}

function renderAllPackages() {
  const container = document.querySelector('.packages-container');
  if (!container) return;

  setHeading('PICTORA Photography Packages', 'Choose the perfect package for your special moments');
  setHeroBack(false);

  container.innerHTML = '';
  renderOfferBanner(container);

  Object.keys(packageData).forEach(serviceKey => {
    container.appendChild(createCategorySection(packageData[serviceKey], serviceKey));
    // Combo Benefits belong to the Wedding category only
    if (serviceKey === 'wedding') {
      container.appendChild(createComboBenefitsSection());
    }
  });
}

function renderSingleCategory(serviceKey) {
  const container = document.querySelector('.packages-container');
  if (!container) return;

  const service = packageData[serviceKey];

  setHeading(`${service.title} Packages`, 'Choose the package that fits your needs');
  document.title = `${service.title} Packages - PICTORA`;

  container.innerHTML = '';
  renderOfferBanner(container);

  // Icon-only back button inside the hero card (top-left)
  setHeroBack(true);

  // Hide the category title here — it's already shown in the hero card
  container.appendChild(createCategorySection(service, serviceKey, true));
  // Combo Benefits belong to the Wedding category only
  if (serviceKey === 'wedding') {
    container.appendChild(createComboBenefitsSection());
  }

  // Link back to the full list at the bottom
  const back = document.createElement('div');
  back.className = 'packages-back';
  back.innerHTML = `<a href="packages.html">← View all photography packages</a>`;
  container.appendChild(back);
}

function setHeading(title, subtitle) {
  const h = document.querySelector('.page-title');
  const sub = document.querySelector('.section-subtitle');
  if (h) h.textContent = title;
  if (sub) sub.textContent = subtitle;
}

function setHeroBack(show) {
  const holder = document.getElementById('heroBack');
  if (!holder) return;
  holder.innerHTML = show
    ? `<a href="services.html" class="back-icon-btn" aria-label="Back to Services" title="Back to Services">
         <svg viewBox="0 0 24 24" fill="none">
           <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       </a>`
    : '';
}

function createCategorySection(service, serviceKey, hideTitle) {
  const section = document.createElement('div');
  section.className = 'package-category';
  section.id = serviceKey;

  section.innerHTML = hideTitle ? '' : `<h2 class="package-category-title">${service.title}</h2>`;

  if (service.subCategories) {
    // Grouped service (e.g. Wedding → Mehndi / Wedding / Waleema)
    service.subCategories.forEach(sub => {
      const subHeading = document.createElement('h3');
      subHeading.className = 'package-subcategory-title';
      subHeading.textContent = sub.title;
      section.appendChild(subHeading);
      section.appendChild(buildPackageGrid(sub.packages, sub.key, sub.title));
    });
  } else {
    section.appendChild(buildPackageGrid(service.packages, serviceKey, service.title));
  }

  if (service.note) {
    const note = document.createElement('p');
    note.className = 'package-category-note';
    note.textContent = service.note;
    section.appendChild(note);
  }

  return section;
}

function buildPackageGrid(packages, serviceKey, categoryTitle) {
  const grid = document.createElement('div');
  grid.className = 'grid grid-3 package-grid';
  packages.forEach(pkg => grid.appendChild(createPackageCard(pkg, serviceKey, categoryTitle)));
  return grid;
}

function createPackageCard(pkg, serviceKey, categoryTitle) {
  const card = document.createElement('div');
  card.className = `glass-card package-card ${pkg.popular ? 'package-popular' : ''}`;

  const features = pkg.features.map(feature => `<li>${feature}</li>`).join('');

  card.innerHTML = `
    ${pkg.popular ? '<div class="package-badge">POPULAR</div>' : ''}
    ${pkg.offer ? `<div class="package-offer">${pkg.offer}</div>` : ''}
    <h3 class="package-name">${pkg.name}</h3>
    <div class="package-price">${pkg.price}</div>
    ${features ? `<ul class="package-features">${features}</ul>` : ''}
    <div class="package-buttons">
      <button class="btn btn-primary btn-block book-package-btn"
              data-service="${serviceKey}"
              data-package="${categoryTitle} - ${pkg.name}"
              data-price="${pkg.price}">
        Book Now
      </button>
      <button class="btn btn-outline btn-block enquire-package-btn"
              data-service="${serviceKey}"
              data-package="${categoryTitle} - ${pkg.name}"
              data-price="${pkg.price}">
        Enquire on WhatsApp
      </button>
    </div>
  `;

  return card;
}

function createComboBenefitsSection() {
  const section = document.createElement('div');
  section.className = 'package-category';
  section.id = 'combo-benefits';

  const grid = document.createElement('div');
  grid.className = 'grid grid-3 package-grid';

  comboBenefits.forEach(combo => {
    const card = document.createElement('div');
    card.className = 'glass-card package-card combo-card';
    const features = combo.features.map(feature => `<li>${feature}</li>`).join('');
    card.innerHTML = `
      <h3 class="package-name">${combo.tier}</h3>
      <ul class="package-features">${features}</ul>
    `;
    grid.appendChild(card);
  });

  section.innerHTML = `<h2 class="package-category-title">Combo Benefits</h2>`;
  section.appendChild(grid);

  return section;
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
