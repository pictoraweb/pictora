// PICTORA - WhatsApp Automation
// Handle all WhatsApp messaging functionality

'use strict';

// ========================================
// WHATSAPP HELPERS
// ========================================

/**
 * Format WhatsApp number for international use
 * @param {string} number - Phone number in any format
 * @returns {string} Formatted number (e.g., "94xxxxxxxxx")
 */
function formatWhatsAppNumber(number) {
  if (!number) return window.PICTORA.BUSINESS_WHATSAPP;
  
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

/**
 * Encode message for WhatsApp URL
 * @param {string} message - Message text
 * @returns {string} URL encoded message
 */
function encodeWhatsAppMessage(message) {
  return encodeURIComponent(message)
    .replace(/%0A/g, '%0A') // Preserve line breaks
    .replace(/'/g, '%27');
}

/**
 * Generate WhatsApp link
 * @param {string} phoneNumber - Phone number
 * @param {string} message - Pre-filled message
 * @returns {string} WhatsApp URL
 */
function generateWhatsAppLink(phoneNumber, message) {
  const formattedNumber = formatWhatsAppNumber(phoneNumber);
  const encodedMessage = encodeWhatsAppMessage(message);
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp chat
 * @param {string} phoneNumber - Phone number
 * @param {string} message - Pre-filled message
 * @param {boolean} newTab - Open in new tab (default: true)
 */
function openWhatsApp(phoneNumber, message, newTab = true) {
  const url = generateWhatsAppLink(phoneNumber, message);
  if (newTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

// ========================================
// MESSAGE TEMPLATES
// ========================================

/**
 * Generate general enquiry message
 * @param {string} subject - Enquiry subject
 * @param {string} details - Additional details
 * @returns {string} Formatted message
 */
function generateEnquiryMessage(subject, details = '') {
  let message = `Hi, I'd like to enquire about *${subject}*.`;
  
  if (details) {
    message += `\n\n${details}`;
  }
  
  message += `\n\nPlease provide more information.`;
  
  return message;
}

/**
 * Generate service enquiry message
 * @param {string} serviceName - Service name
 * @returns {string} Formatted message
 */
function generateServiceEnquiryMessage(serviceName) {
  return `Hi PICTORA,\n\nI'm interested in your *${serviceName}* service.\n\nCould you please provide more details about:\n- Available packages\n- Pricing\n- Booking process\n\nThank you!`;
}

/**
 * Generate package enquiry message
 * @param {string} serviceName - Service name
 * @param {string} packageName - Package name
 * @param {string} price - Package price
 * @returns {string} Formatted message
 */
function generatePackageEnquiryMessage(serviceName, packageName, price) {
  return `Hi PICTORA,\n\nI'm interested in the *${packageName}* for *${serviceName}*.\n\nPrice: ${price}\n\nCan you provide more details about:\n- What's included\n- Availability\n- Booking process\n\nThank you!`;
}

/**
 * Generate booking message
 * @param {Object} bookingData - Booking details
 * @returns {string} Formatted message
 */
function generateBookingMessage(bookingData) {
  const {
    service,
    package: packageName,
    price,
    name,
    whatsapp,
    email,
    eventDate,
    eventTime,
    location,
    message
  } = bookingData;
  
  return `*NEW BOOKING REQUEST*\n\n*Service:* ${service}\n*Package:* ${packageName}\n*Price:* ${price}\n\n*Customer Details:*\nName: ${name}\nWhatsApp: ${whatsapp}\nEmail: ${email}\n\n*Event Details:*\nDate: ${eventDate}\nTime: ${eventTime}\nLocation: ${location}\n\n*Special Requests:*\n${message || 'None'}`;
}

/**
 * Generate custom product order message
 * @param {Object} orderData - Order details
 * @returns {string} Formatted message
 */
function generateProductOrderMessage(orderData) {
  const {
    productType,
    productDetails,
    name,
    whatsapp,
    email,
    address,
    totalPrice,
    notes
  } = orderData;
  
  let message = `*NEW ORDER - ${productType.toUpperCase()}*\n\n`;
  message += `*Product Details:*\n${productDetails}\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${name}\n`;
  message += `WhatsApp: ${whatsapp}\n`;
  message += `Email: ${email || 'Not provided'}\n`;
  message += `Delivery Address: ${address}\n\n`;
  message += `*Total Price:* ${totalPrice}\n\n`;
  message += `*Note:* ${notes || 'None'}`;
  
  return message;
}

/**
 * Generate payment proof message
 * @param {Object} paymentData - Payment details
 * @returns {string} Formatted message
 */
function generatePaymentProofMessage(paymentData) {
  const {
    name,
    whatsapp,
    email,
    reference,
    amount,
    method,
    date,
    transactionRef,
    notes
  } = paymentData;
  
  return `*PAYMENT PROOF SUBMISSION*\n\n*Customer Details:*\nName: ${name}\nWhatsApp: ${whatsapp}\nEmail: ${email}\n\n*Payment Details:*\nReference: ${reference || 'N/A'}\nAmount: LKR ${amount}\nMethod: ${method}\nDate: ${date}\nTransaction Ref: ${transactionRef || 'N/A'}\n\n*Note:* ${notes || 'None'}\n\n_Screenshot attached below_ ⬇️`;
}

/**
 * Generate contact form message
 * @param {Object} contactData - Contact form data
 * @returns {string} Formatted message
 */
function generateContactMessage(contactData) {
  const { name, email, subject, message } = contactData;
  
  return `*NEW CONTACT MESSAGE*\n\nFrom: ${name}\nEmail: ${email}\n\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
}

// ========================================
// EVENT HANDLERS
// ========================================

/**
 * Handle service enquiry button clicks
 */
document.addEventListener('click', function(e) {
  // Service enquiry buttons
  if (e.target.classList.contains('enquire-service-btn')) {
    const serviceName = e.target.dataset.service;
    const message = generateServiceEnquiryMessage(serviceName);
    openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, message);
  }
  
  // Package enquiry buttons
  if (e.target.classList.contains('enquire-package-btn')) {
    const serviceName = e.target.dataset.service;
    const packageName = e.target.dataset.package;
    const price = e.target.dataset.price;
    const message = generatePackageEnquiryMessage(serviceName, packageName, price);
    openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, message);
  }
  
  // General enquiry buttons
  if (e.target.classList.contains('whatsapp-enquiry-btn')) {
    const subject = e.target.dataset.subject || 'PICTORA Services';
    const message = generateEnquiryMessage(subject);
    openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, message);
  }
  
  // Direct WhatsApp links
  if (e.target.classList.contains('whatsapp-link')) {
    e.preventDefault();
    const message = e.target.dataset.message || 'Hi, I have a question about PICTORA services.';
    openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, message);
  }
});

/**
 * Handle booking form submission
 */
function handleBookingSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  
  // Validate form
  if (!window.PICTORA.validateForm(form)) {
    window.PICTORA.showToast('Please fill all required fields correctly');
    return;
  }
  
  // Get form data
  const bookingData = {
    service: form.querySelector('[name="service"]').value,
    package: form.querySelector('[name="package"]').value,
    price: form.querySelector('[name="price"]').value,
    name: form.querySelector('[name="name"]').value,
    whatsapp: form.querySelector('[name="whatsapp"]').value,
    email: form.querySelector('[name="email"]').value,
    eventDate: form.querySelector('[name="eventDate"]').value,
    eventTime: form.querySelector('[name="eventTime"]').value,
    location: form.querySelector('[name="location"]').value,
    message: form.querySelector('[name="message"]')?.value || ''
  };
  
  // Generate message
  const whatsappMessage = generateBookingMessage(bookingData);
  
  // Open WhatsApp
  openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, whatsappMessage);
  
  // Show success message
  window.PICTORA.showToast('Redirecting to WhatsApp...');
  
  // Clear form data from localStorage
  if (form.id) {
    localStorage.removeItem(`pictora-form-${form.id}`);
  }
}

/**
 * Handle custom product order submission
 */
function handleProductOrderSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  
  // Validate form
  if (!window.PICTORA.validateForm(form)) {
    window.PICTORA.showToast('Please fill all required fields correctly');
    return;
  }
  
  // Get product type from URL or form
  const urlParams = new URLSearchParams(window.location.search);
  const productType = urlParams.get('product') || form.dataset.product;
  
  // Gather form data (this will be specific to each product type)
  const orderData = {
    productType: productType,
    productDetails: getProductDetails(form, productType),
    name: form.querySelector('[name="name"]').value,
    whatsapp: form.querySelector('[name="whatsapp"]').value,
    email: form.querySelector('[name="email"]')?.value || '',
    address: form.querySelector('[name="address"]').value,
    totalPrice: form.querySelector('.total-price')?.textContent || 'TBD',
    notes: form.querySelector('[name="notes"]')?.value || ''
  };
  
  // Generate message
  const whatsappMessage = generateProductOrderMessage(orderData);
  
  // Open WhatsApp
  openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, whatsappMessage);
  
  // Show success message
  window.PICTORA.showToast('Redirecting to WhatsApp...');
}

/**
 * Get product-specific details from form
 * @param {HTMLFormElement} form - The form element
 * @param {string} productType - Type of product
 * @returns {string} Formatted product details
 */
function getProductDetails(form, productType) {
  let details = '';
  
  switch(productType) {
    case 'photoframe':
      details = `Size: ${form.querySelector('[name="size"]')?.value || 'N/A'}\n`;
      details += `Type: ${form.querySelector('[name="type"]')?.value || 'N/A'}\n`;
      details += `Color: ${form.querySelector('[name="color"]')?.value || 'N/A'}\n`;
      details += `Quantity: ${form.querySelector('[name="quantity"]')?.value || 'N/A'}`;
      break;
      
    case 'editing':
      const editingTypes = Array.from(form.querySelectorAll('[name="editingType"]:checked'))
        .map(cb => cb.value).join(', ');
      details = `Editing Type: ${editingTypes}\n`;
      details += `Number of Photos: ${form.querySelector('[name="photoCount"]')?.value || 'N/A'}\n`;
      details += `Turnaround: ${form.querySelector('[name="turnaround"]')?.value || 'Standard'}`;
      break;
      
    case 'mug':
      details = `Mug Type: ${form.querySelector('[name="mugType"]')?.value || 'N/A'}\n`;
      details += `Print Sides: ${form.querySelector('[name="printSides"]')?.value || 'N/A'}\n`;
      details += `Quantity: ${form.querySelector('[name="quantity"]')?.value || 'N/A'}\n`;
      details += `Custom Text: ${form.querySelector('[name="customText"]')?.value || 'None'}`;
      break;
      
    case 'keytag':
      details = `Product: ${form.querySelector('[name="productType"]')?.value || 'N/A'}\n`;
      details += `Shape: ${form.querySelector('[name="shape"]')?.value || 'N/A'}\n`;
      details += `Size: ${form.querySelector('[name="size"]')?.value || 'N/A'}\n`;
      details += `Quantity: ${form.querySelector('[name="quantity"]')?.value || 'N/A'}`;
      break;
      
    default:
      details = 'Custom product - details provided in form';
  }
  
  return details;
}

/**
 * Handle payment proof submission
 */
function handlePaymentSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  
  // Validate form
  if (!window.PICTORA.validateForm(form)) {
    window.PICTORA.showToast('Please fill all required fields correctly');
    return;
  }
  
  // Get form data
  const paymentData = {
    name: form.querySelector('[name="name"]').value,
    whatsapp: form.querySelector('[name="whatsapp"]').value,
    email: form.querySelector('[name="email"]').value,
    reference: form.querySelector('[name="reference"]')?.value || '',
    amount: form.querySelector('[name="amount"]').value,
    method: form.querySelector('[name="method"]').value,
    date: form.querySelector('[name="date"]').value,
    transactionRef: form.querySelector('[name="transactionRef"]')?.value || '',
    notes: form.querySelector('[name="notes"]')?.value || ''
  };
  
  // Generate message
  const whatsappMessage = generatePaymentProofMessage(paymentData);
  
  // Open WhatsApp
  openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, whatsappMessage);
  
  // Show info message
  window.PICTORA.showToast('Please attach your payment screenshot in WhatsApp');
}

/**
 * Handle contact form submission
 */
function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  
  // Validate form
  if (!window.PICTORA.validateForm(form)) {
    window.PICTORA.showToast('Please fill all required fields correctly');
    return;
  }
  
  // Get form data
  const contactData = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    subject: form.querySelector('[name="subject"]').value,
    message: form.querySelector('[name="message"]').value
  };
  
  // Generate message
  const whatsappMessage = generateContactMessage(contactData);
  
  // Open WhatsApp
  openWhatsApp(window.PICTORA.BUSINESS_WHATSAPP, whatsappMessage);
  
  // Show success message
  window.PICTORA.showToast('Redirecting to WhatsApp...');
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
window.PICTORA.WhatsApp = {
  formatNumber: formatWhatsAppNumber,
  generateLink: generateWhatsAppLink,
  open: openWhatsApp,
  messages: {
    enquiry: generateEnquiryMessage,
    serviceEnquiry: generateServiceEnquiryMessage,
    packageEnquiry: generatePackageEnquiryMessage,
    booking: generateBookingMessage,
    productOrder: generateProductOrderMessage,
    payment: generatePaymentProofMessage,
    contact: generateContactMessage
  },
  handlers: {
    booking: handleBookingSubmit,
    productOrder: handleProductOrderSubmit,
    payment: handlePaymentSubmit,
    contact: handleContactSubmit
  }
};
