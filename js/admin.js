// PICTORA - Admin panel logic (package price manager)
'use strict';

// 🔑 Change this password to your own. (Client-side gate only — see note in admin.html)
const ADMIN_PASSWORD = 'pictora2026';

// Working copy that the form edits (populated on load).
let working = { packageData: null, comboBenefits: null, settings: null };

// ---------- Login ----------
document.addEventListener('DOMContentLoaded', function () {
  const loginBox = document.getElementById('login');
  const editor = document.getElementById('editor');
  const pwInput = document.getElementById('adminPassword');
  const err = document.getElementById('loginError');

  function unlock() {
    loginBox.hidden = true;
    editor.hidden = false;
    sessionStorage.setItem('pictora_admin', '1');
    loadData();
  }

  function tryLogin() {
    if (pwInput.value === ADMIN_PASSWORD) {
      err.textContent = '';
      unlock();
    } else {
      err.textContent = 'Incorrect password';
      pwInput.value = '';
    }
  }

  document.getElementById('loginBtn').addEventListener('click', tryLogin);
  pwInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryLogin(); });

  // Stay unlocked for the session
  if (sessionStorage.getItem('pictora_admin') === '1') unlock();

  document.getElementById('saveBtn').addEventListener('click', saveData);
  document.getElementById('reloadBtn').addEventListener('click', loadData);
});

function setStatus(msg, kind) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'admin-status' + (kind ? ' ' + kind : '');
}

// ---------- Load ----------
async function loadData() {
  setStatus('Loading…');
  // Start from the bundled site defaults (defined in packages.js / supabase-config.js)
  let base = {
    packageData: clone(packageData),
    comboBenefits: clone(comboBenefits),
    settings: Object.assign({}, window.DEFAULT_SETTINGS || {})
  };

  try {
    const sb = window.getSupabase && window.getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from('site_config')
        .select('key, data')
        .in('key', [window.PACKAGES_CONFIG_KEY, window.SETTINGS_CONFIG_KEY]);
      if (error) throw error;
      (data || []).forEach((row) => {
        if (row.key === window.PACKAGES_CONFIG_KEY && row.data) {
          if (row.data.packageData) base.packageData = row.data.packageData;
          if (Array.isArray(row.data.comboBenefits)) base.comboBenefits = row.data.comboBenefits;
        }
        if (row.key === window.SETTINGS_CONFIG_KEY && row.data) {
          base.settings = Object.assign(base.settings, row.data);
        }
      });
      setStatus((data && data.length ? 'Loaded live data from Supabase' : 'No saved data yet — showing defaults. Press "Save changes" to publish.'), (data && data.length ? 'ok' : ''));
    } else {
      setStatus('Supabase not loaded — showing defaults (cannot save).', 'err');
    }
  } catch (e) {
    setStatus('Could not reach Supabase — showing defaults. ' + (e.message || ''), 'err');
  }

  working = base;
  renderEditor();
}

// ---------- Render ----------
let navChips = [];

function renderEditor() {
  const body = document.getElementById('editorBody');
  body.innerHTML = '';
  navChips = [];

  // Jump navigation (filled as sections are built)
  const nav = document.createElement('div');
  nav.className = 'admin-nav';
  body.appendChild(nav);

  // 1) Settings (contact / social / offer banner)
  const settingsSection = makeSection('⚙ Contact, Social & Offers', 'settings', body);
  renderSettings(settingsSection.body);

  // 2) Each package category
  Object.keys(working.packageData).forEach((catKey) => {
    const cat = working.packageData[catKey];
    const sec = makeSection(cat.title, 'cat-' + catKey, body);

    // Editable category name
    sec.body.appendChild(textRow('Category name', cat.title, (v) => {
      cat.title = v; sec.titleEl.textContent = v || cat.title;
    }, 'Category title'));

    if (Array.isArray(cat.subCategories)) {
      cat.subCategories.forEach((sub) => {
        sec.body.appendChild(textRow('Sub-category name', sub.title, (v) => { sub.title = v; }, 'e.g., Mehndi', 'admin-sub-row'));
        sub.packages.forEach((pkg) => sec.body.appendChild(tierEl(pkg)));
      });
    } else if (Array.isArray(cat.packages)) {
      cat.packages.forEach((pkg) => sec.body.appendChild(tierEl(pkg)));
    }

    sec.body.appendChild(noteEl(cat));
  });

  // 3) Combo benefits
  if (Array.isArray(working.comboBenefits)) {
    const sec = makeSection('Combo Benefits', 'combo', body);
    working.comboBenefits.forEach((combo) => {
      const tier = document.createElement('div');
      tier.className = 'admin-tier';
      tier.appendChild(textRow('Tier name', combo.tier, (v) => { combo.tier = v; }, 'Basic / Standard / Premium'));
      tier.appendChild(featuresEl(combo, 'Benefits (one per line)'));
      sec.body.appendChild(tier);
    });
  }

  // Build jump nav
  navChips.forEach((c) => {
    const a = document.createElement('button');
    a.className = 'admin-chip';
    a.textContent = c.label;
    a.addEventListener('click', () => document.getElementById(c.id).scrollIntoView({ behavior: 'smooth', block: 'start' }));
    nav.appendChild(a);
  });
}

// Collapsible section with a clickable header; returns {body, titleEl}
function makeSection(title, id, parent) {
  const section = document.createElement('div');
  section.className = 'glass-card admin-cat collapsed'; // start closed by default
  section.id = 'sec-' + id;

  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  const chev = document.createElement('span');
  chev.className = 'admin-chev';
  chev.textContent = '▾';
  head.appendChild(titleEl);
  head.appendChild(chev);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'admin-cat-body';

  head.addEventListener('click', () => section.classList.toggle('collapsed'));

  section.appendChild(head);
  section.appendChild(bodyEl);
  parent.appendChild(section);

  navChips.push({ label: title.replace(/^[⚙🎉]\s*/, ''), id: 'sec-' + id });
  return { body: bodyEl, titleEl: titleEl };
}

// Generic labelled text input row
function textRow(label, value, onInput, placeholder, extraClass) {
  const row = document.createElement('div');
  row.className = 'admin-row' + (extraClass ? ' ' + extraClass : '');
  row.innerHTML = `<label>${label}</label>`;
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'form-input';
  inp.value = value || '';
  if (placeholder) inp.placeholder = placeholder;
  inp.addEventListener('input', () => onInput(inp.value));
  row.appendChild(inp);
  return row;
}

function renderSettings(parent) {
  const s = working.settings || (working.settings = {});

  const fields = [
    { key: 'offerBanner', label: '🎉 Offer Banner (shown on packages page — leave empty to hide)', ph: 'e.g., Festival Season — 10% OFF all packages!' },
    { key: 'whatsapp', label: 'WhatsApp / Phone Number', ph: '+94 78 992 9233' },
    { key: 'email',    label: 'Email Address',           ph: 'pictoraofficial.lk' },
    { key: 'address',  label: 'Address / Location',      ph: 'Kattankudy, Sri Lanka' },
    { key: 'facebook', label: 'Facebook URL',            ph: 'https://facebook.com/...' },
    { key: 'instagram',label: 'Instagram URL',           ph: 'https://instagram.com/...' },
    { key: 'tiktok',   label: 'TikTok URL',              ph: 'https://tiktok.com/@...' },
    { key: 'youtube',  label: 'YouTube URL',             ph: 'https://youtube.com/@...' }
  ];

  fields.forEach((f) => {
    parent.appendChild(textRow(f.label, s[f.key] || '', (v) => {
      const t = v.trim();
      if (t) s[f.key] = t; else delete s[f.key];
    }, f.ph));
  });
}

function tierEl(pkg) {
  const el = document.createElement('div');
  el.className = 'admin-tier';

  const head = document.createElement('div');
  head.className = 'admin-tier-head';
  const nameInp = document.createElement('input');
  nameInp.type = 'text';
  nameInp.className = 'form-input admin-tier-name-input';
  nameInp.value = pkg.name || '';
  nameInp.placeholder = 'Package name';
  nameInp.addEventListener('input', () => { pkg.name = nameInp.value; });
  head.appendChild(nameInp);

  const pop = document.createElement('label');
  pop.className = 'admin-pop';
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = !!pkg.popular;
  cb.addEventListener('change', () => { pkg.popular = cb.checked; });
  pop.appendChild(cb);
  pop.appendChild(document.createTextNode('Popular'));
  head.appendChild(pop);
  el.appendChild(head);

  // Price + Offer (side by side)
  const priceRow = document.createElement('div');
  priceRow.className = 'admin-row admin-price-row';
  priceRow.innerHTML = `<label>Price</label>`;
  const price = document.createElement('input');
  price.type = 'text';
  price.className = 'form-input';
  price.value = pkg.price || '';
  price.placeholder = 'e.g., Rs. 12,500';
  price.addEventListener('input', () => { pkg.price = price.value; });
  priceRow.appendChild(price);
  el.appendChild(priceRow);

  // Offer badge (optional)
  el.appendChild(textRow('Offer badge (optional)', pkg.offer || '', (v) => {
    const t = v.trim();
    if (t) pkg.offer = t; else delete pkg.offer;
  }, 'e.g., SAVE 20% / Festival Offer'));

  // Features
  el.appendChild(featuresEl(pkg, 'Features (one per line)'));

  return el;
}

function featuresEl(obj, label) {
  const row = document.createElement('div');
  row.className = 'admin-row';
  row.innerHTML = `<label>${label}</label>`;
  const ta = document.createElement('textarea');
  ta.className = 'form-textarea admin-features';
  ta.value = (obj.features || []).join('\n');
  ta.addEventListener('input', () => {
    obj.features = ta.value.split('\n').map((s) => s.trim()).filter(Boolean);
  });
  row.appendChild(ta);
  return row;
}

function noteEl(cat) {
  const row = document.createElement('div');
  row.className = 'admin-row admin-note-row';
  row.innerHTML = `<label>Category note (optional, shown under the cards)</label>`;
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'form-input';
  inp.value = cat.note || '';
  inp.placeholder = 'e.g., Additional 50 Guests: Rs. 10,000';
  inp.addEventListener('input', () => {
    const v = inp.value.trim();
    if (v) cat.note = v; else delete cat.note;
  });
  row.appendChild(inp);
  return row;
}

// ---------- Save ----------
async function saveData() {
  const sb = window.getSupabase && window.getSupabase();
  if (!sb) { setStatus('Supabase not available — cannot save.', 'err'); return; }

  setStatus('Saving…');
  try {
    const now = new Date().toISOString();
    const { error } = await sb
      .from('site_config')
      .upsert([
        {
          key: window.PACKAGES_CONFIG_KEY,
          data: { packageData: working.packageData, comboBenefits: working.comboBenefits },
          updated_at: now
        },
        {
          key: window.SETTINGS_CONFIG_KEY,
          data: working.settings || {},
          updated_at: now
        }
      ], { onConflict: 'key' });
    if (error) throw error;
    if (window.clearSiteConfigCache) window.clearSiteConfigCache();
    setStatus('✔ Saved. Live prices, offers, contact & social links updated. (Public pages refresh within 15 min.)', 'ok');
  } catch (e) {
    setStatus('Save failed: ' + (e.message || e) + ' (Did you run sql/admin-setup.sql?)', 'err');
  }
}

// ---------- Utils ----------
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
