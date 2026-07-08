// PICTORA - Apply live contact / social settings from Supabase across the site.
'use strict';

(async function () {
  let settings = Object.assign({}, window.DEFAULT_SETTINGS || {});

  try {
    if (window.loadSiteConfig) {
      const data = await window.loadSiteConfig(window.SETTINGS_CONFIG_KEY || 'settings');
      if (data) settings = Object.assign(settings, data);
    }
  } catch (e) {
    // offline — use defaults
  }

  window.PICTORA_SETTINGS = settings;
  applySettings(settings);

  function applySettings(s) {
    // WhatsApp number used by every "Chat on WhatsApp" CTA
    if (window.PICTORA) {
      if (s.whatsapp) window.PICTORA.BUSINESS_WHATSAPP = String(s.whatsapp).replace(/\D/g, '');
      if (s.email) window.PICTORA.BUSINESS_EMAIL = s.email;
    }

    // Social links (matched by aria-label or title on the anchors)
    const socials = {
      facebook: s.facebook,
      instagram: s.instagram,
      tiktok: s.tiktok,
      youtube: s.youtube
    };
    document.querySelectorAll('a[aria-label], a[title]').forEach(function (a) {
      const key = (a.getAttribute('aria-label') || a.getAttribute('title') || '').toLowerCase();
      if (socials[key]) a.href = socials[key];
    });

    // Text fields (footer + contact cards)
    setText('whatsapp', s.whatsapp);
    setText('email', s.email);
    setText('address', s.address);

    // Anchor hrefs that should update but keep their own label (Call Now / Send Email / Get Directions)
    document.querySelectorAll('[data-site-href]').forEach(function (a) {
      const key = a.dataset.siteHref;
      if (key === 'whatsapp' && s.whatsapp) a.href = 'tel:' + String(s.whatsapp).replace(/\s/g, '');
      if (key === 'email' && s.email) a.href = 'mailto:' + s.email;
      if (key === 'address' && s.address) a.href = 'https://maps.google.com/?q=' + encodeURIComponent(s.address);
    });
  }

  function setText(key, val) {
    if (!val) return;
    document.querySelectorAll('[data-site="' + key + '"]').forEach(function (el) {
      el.textContent = val;
    });
  }
})();
