// PICTORA - Supabase connection config
// Shared by the public packages page (read) and the admin panel (read/write).
'use strict';

window.SUPABASE_URL = 'https://asmwvhbcwtjdmjanhgcv.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbXd2aGJjd3RqZG1qYW5oZ2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDk1NzQsImV4cCI6MjA5OTA4NTU3NH0.hx-bO1kP9iOXxM3lsq2vJjyqjuaqSFGPBdjfrys26bc';

// Row keys used in the site_config table
window.PACKAGES_CONFIG_KEY = 'packages';
window.SETTINGS_CONFIG_KEY = 'settings';

// Default contact / social settings (used until the admin saves custom values)
window.DEFAULT_SETTINGS = {
  whatsapp: '+94 78 992 9233',
  email: 'pictoraofficial.lk',
  address: 'Kattankudy, Sri Lanka',
  facebook: 'https://www.facebook.com/share/1Xc4SdkyMV/',
  instagram: 'https://www.instagram.com/pic_tora_?igsh=MTNxcmhhdWd1NTA3Zg==',
  tiktok: 'https://www.tiktok.com/@pictora_?_r=1&_t=ZS-93TOFRjoMjZ',
  youtube: 'https://youtube.com/@pic_tora?si=rgOhpAOVcmwIbuFD'
};

// Lazily create a single Supabase client (requires the supabase-js CDN script).
window.getSupabase = function () {
  if (!window.supabase || !window.supabase.createClient) return null;
  if (!window._sbClient) {
    window._sbClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }
  return window._sbClient;
};

// Cache-first config loader. Reads from localStorage if the cached copy is
// younger than 15 minutes; otherwise fetches from Supabase and refreshes the
// cache. On any network error it falls back to the (stale) cached copy.
window.SITE_CONFIG_TTL_MS = 15 * 60 * 1000; // 15 minutes

window.loadSiteConfig = async function (key, ttlMs) {
  ttlMs = ttlMs || window.SITE_CONFIG_TTL_MS;
  const cacheKey = 'pictora_cfg_' + key;
  let stale = null;
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      stale = parsed.d;
      if (Date.now() - parsed.t < ttlMs) return parsed.d; // fresh — no network call
    }
  } catch (e) { /* ignore cache errors */ }

  const sb = window.getSupabase && window.getSupabase();
  if (!sb) return stale;
  try {
    const { data, error } = await sb.from('site_config').select('data').eq('key', key).maybeSingle();
    if (error) return stale;
    const value = data ? data.data : null;
    try { localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d: value })); } catch (e) {}
    return value;
  } catch (e) {
    return stale;
  }
};

// Called by the admin after saving so the next public page load fetches fresh.
window.clearSiteConfigCache = function () {
  try {
    localStorage.removeItem('pictora_cfg_' + window.PACKAGES_CONFIG_KEY);
    localStorage.removeItem('pictora_cfg_' + window.SETTINGS_CONFIG_KEY);
  } catch (e) {}
};
