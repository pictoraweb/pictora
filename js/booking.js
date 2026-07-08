// PICTORA - Booking Form Handler
'use strict';

// ========================================
// SERVICE-SPECIFIC BOOKING CONFIG
// Each service shows its own tailored fields + relabels the date/venue.
// ========================================
const SERVICE_CONFIG = {
  wedding: {
    title: 'Wedding Photography',
    dateLabel: 'Wedding Date',
    locationLabel: 'Ceremony Venue',
    fields: [
      { name: 'brideName',      label: "Bride's Name",                 type: 'text',   required: true },
      { name: 'groomName',      label: "Groom's Name",                 type: 'text',   required: true },
      { name: 'guests',         label: 'Approx. Number of Guests',     type: 'number', required: true, min: 1 },
      { name: 'receptionVenue', label: 'Reception Venue (if different)', type: 'text',  required: false }
    ]
  },
  mehndi: {
    title: 'Mehndi Photography',
    dateLabel: 'Mehndi Date',
    locationLabel: 'Venue',
    fields: [
      { name: 'guests',       label: 'Approx. Number of Guests', type: 'number', required: true, min: 1 },
      { name: 'functionSide', label: 'Function Side',            type: 'select', required: true, options: ['Bride Side', 'Groom Side', 'Both'] }
    ]
  },
  waleema: {
    title: 'Waleema Photography',
    dateLabel: 'Waleema Date',
    locationLabel: 'Reception Hall',
    fields: [
      { name: 'guests', label: 'Approx. Number of Guests', type: 'number', required: true, min: 1 }
    ]
  },
  outdoor: {
    title: 'Outdoor Photoshoot',
    dateLabel: 'Shoot Date',
    locationLabel: 'Preferred Location',
    fields: [
      { name: 'people',     label: 'Number of People',        type: 'number', required: true, min: 1 },
      { name: 'theme',      label: 'Preferred Theme / Concept', type: 'text',  required: false, placeholder: 'e.g., vintage, candid, nature' },
      { name: 'backupDate', label: 'Backup Date (weather)',   type: 'date',   required: false }
    ]
  },
  portrait: {
    title: 'Portrait Photography',
    dateLabel: 'Shoot Date',
    locationLabel: 'Location',
    fields: [
      { name: 'persons',   label: 'Number of Persons', type: 'number', required: true, min: 1 },
      { name: 'shootType', label: 'Shoot Type',        type: 'select', required: true, options: ['Indoor / Studio', 'Outdoor'] },
      { name: 'outfits',   label: 'Outfit Changes',    type: 'number', required: false, min: 1 }
    ]
  },
  birthday: {
    title: 'Birthday Party Photography',
    dateLabel: 'Party Date',
    locationLabel: 'Party Venue',
    fields: [
      { name: 'celebrant', label: "Birthday Person's Name", type: 'text',   required: true },
      { name: 'age',       label: 'Age Turning',           type: 'number', required: false, min: 1 },
      { name: 'theme',     label: 'Party Theme',           type: 'text',   required: false, placeholder: 'e.g., cartoon, floral' }
    ]
  },
  event: {
    title: 'Event Photography',
    dateLabel: 'Event Date',
    locationLabel: 'Event Venue',
    fields: [
      { name: 'eventType', label: 'Event Type',                type: 'select', required: true, options: ['Corporate', 'Party', 'Concert', 'Other'] },
      { name: 'guests',    label: 'Approx. Number of Guests',  type: 'number', required: true, min: 1 },
      { name: 'duration',  label: 'Coverage Duration (hours)', type: 'number', required: false, min: 1 }
    ]
  },
  product: {
    title: 'Product Photography',
    dateLabel: 'Preferred Date',
    locationLabel: 'Shoot Location',
    fields: [
      { name: 'productCount', label: 'Number of Products', type: 'number', required: true, min: 1 },
      { name: 'background',   label: 'Background Preference', type: 'select', required: false, options: ['White', 'Custom', 'Lifestyle'] }
    ]
  },
  food: {
    title: 'Food Photography',
    dateLabel: 'Preferred Date',
    locationLabel: 'Shoot Location',
    fields: [
      { name: 'dishCount', label: 'Number of Dishes', type: 'number', required: true, min: 1 },
      { name: 'styling',   label: 'Styling Notes',     type: 'text',   required: false, placeholder: 'e.g., rustic, bright, minimal' }
    ]
  },
  fashion: {
    title: 'Fashion / Model Photography',
    dateLabel: 'Preferred Date',
    locationLabel: 'Shoot Location',
    fields: [
      { name: 'models',  label: 'Number of Models', type: 'number', required: true, min: 1 },
      { name: 'outfits', label: 'Number of Outfits', type: 'number', required: false, min: 1 },
      { name: 'shootType', label: 'Shoot Type', type: 'select', required: false, options: ['Indoor / Studio', 'Outdoor'] }
    ]
  },
  realestate: {
    title: 'Real Estate / Interior Photography',
    dateLabel: 'Preferred Date',
    locationLabel: 'Property Address',
    fields: [
      { name: 'propertySize', label: 'Property Size', type: 'select', required: true, options: ['Small', 'Medium', 'Large'] },
      { name: 'rooms',        label: 'Number of Rooms', type: 'number', required: false, min: 1 }
    ]
  },
  lifestyle: {
    title: 'Lifestyle / Street Photography',
    dateLabel: 'Preferred Date',
    locationLabel: 'Preferred Location',
    fields: [
      { name: 'people', label: 'Number of People', type: 'number', required: false, min: 1 },
      { name: 'concept', label: 'Concept / Theme', type: 'text', required: false, placeholder: 'e.g., urban, candid, travel' }
    ]
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('booking.html')) {
    initBookingForm();
  }
});

function initBookingForm() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get('service');
  const packageName = urlParams.get('package');
  const price = urlParams.get('price');

  const config = service ? SERVICE_CONFIG[service] : null;

  // Pre-fill readonly fields (show the nice service title when we have it)
  if (service) {
    document.querySelector('[name="service"]').value = config ? config.title : decodeURIComponent(service);
  }
  if (packageName) {
    document.querySelector('[name="package"]').value = decodeURIComponent(packageName);
  }
  if (price) {
    document.querySelector('[name="price"]').value = decodeURIComponent(price);
  }

  // Relabel generic date/venue + inject the service-specific fields
  if (config) {
    applyServiceConfig(config);
  }

  // Update breadcrumb
  updateBreadcrumb(service, config);

  // Set minimum date to today (event date + any injected date fields)
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(d => d.setAttribute('min', today));

  // Form submission
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', window.PICTORA.WhatsApp.handlers.booking);
  }
}

function applyServiceConfig(config) {
  // Relabel the generic date + venue fields to match the service
  const dateLabel = document.getElementById('dateLabel');
  const locationLabel = document.getElementById('locationLabel');
  if (dateLabel && config.dateLabel) dateLabel.textContent = config.dateLabel;
  if (locationLabel && config.locationLabel) locationLabel.textContent = config.locationLabel;

  // Build the service-specific fields
  const container = document.getElementById('serviceFields');
  if (!container || !config.fields || !config.fields.length) return;

  container.innerHTML = config.fields.map(renderField).join('');
}

function renderField(field) {
  const req = field.required ? 'required' : '';
  const reqStar = field.required ? ' required' : '';
  const min = field.min != null ? `min="${field.min}"` : '';
  const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : '';

  let input;
  if (field.type === 'select') {
    const opts = ['<option value="">Select...</option>']
      .concat(field.options.map(o => `<option value="${o}">${o}</option>`))
      .join('');
    input = `<select name="${field.name}" class="form-select js-service-field" data-label="${field.label}" ${req}>${opts}</select>`;
  } else {
    input = `<input type="${field.type}" name="${field.name}" class="form-input js-service-field" data-label="${field.label}" ${min} ${placeholder} ${req}>`;
  }

  return `
    <div class="form-group">
      <label class="form-label${reqStar}">${field.label}</label>
      ${input}
    </div>`;
}

function updateBreadcrumb(service, config) {
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb && service) {
    const label = config ? config.title : decodeURIComponent(service);
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a>
      <span class="breadcrumb-separator">›</span>
      <a href="services.html">Services</a>
      <span class="breadcrumb-separator">›</span>
      <span>${label}</span>
      <span class="breadcrumb-separator">›</span>
      <a href="packages.html#${service}">Packages</a>
      <span class="breadcrumb-separator">›</span>
      <span>Booking</span>
    `;
  }
}
