// PICTORA - Booking Form Handler
'use strict';

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
  
  // Pre-fill readonly fields
  if (service) {
    document.querySelector('[name="service"]').value = decodeURIComponent(service);
  }
  if (packageName) {
    document.querySelector('[name="package"]').value = decodeURIComponent(packageName);
  }
  if (price) {
    document.querySelector('[name="price"]').value = decodeURIComponent(price);
  }
  
  // Update breadcrumb
  updateBreadcrumb(service);
  
  // Set minimum date to today
  const dateInput = document.querySelector('[name="eventDate"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
  
  // Form submission
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', window.PICTORA.WhatsApp.handlers.booking);
  }
}

function updateBreadcrumb(service) {
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb && service) {
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a>
      <span class="breadcrumb-separator">›</span>
      <a href="services.html">Services</a>
      <span class="breadcrumb-separator">›</span>
      <span>${decodeURIComponent(service)}</span>
      <span class="breadcrumb-separator">›</span>
      <a href="packages.html?service=${service}">Packages</a>
      <span class="breadcrumb-separator">›</span>
      <span>Booking</span>
    `;
  }
}
