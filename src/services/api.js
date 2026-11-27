const API_URL = import.meta.env.VITE_API_URL || 'https://adminmainwebsite-backend.onrender.com/api';

const requestCache = new Map();
const CACHE_TTL_MS = 3000;

function cachedFetchJson(endpoint) {
  const now = Date.now();
  const cached = requestCache.get(endpoint);
  if (cached && now - cached.ts < CACHE_TTL_MS) {
    return cached.promise;
  }

  const promise = fetch(`${API_URL}${endpoint}`, { cache: 'no-store' })
    .then(async (res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .catch(() => null);

  requestCache.set(endpoint, { ts: now, promise });
  return promise;
}

export const fetchServices = async () => {
  const data = await cachedFetchJson('/services');
  return Array.isArray(data) ? data.filter((s) => s.isActive) : null;
};

export const fetchPlatforms = async () => {
  const data = await cachedFetchJson('/platforms');
  return Array.isArray(data) ? data.filter((p) => p.isActive) : null;
};

export const fetchCareers = async () => {
  const data = await cachedFetchJson('/careers');
  return Array.isArray(data) ? data.filter((c) => c.isActive) : null;
};

export const fetchCollaborations = async () => {
  const data = await cachedFetchJson('/collaborations');
  return Array.isArray(data) ? data.filter((c) => c.isActive) : null;
};

export const fetchAboutCompany = async () => {
  return cachedFetchJson('/about-company');
};

export const fetchTeamMembers = async () => {
  const data = await cachedFetchJson('/team');
  return Array.isArray(data) ? data.filter((t) => t.isActive) : null;
};

export const fetchContactDetails = async () => {
  return cachedFetchJson('/contact-details');
};

export const fetchDispatch = async () => {
  const data = await cachedFetchJson('/dispatch');
  return Array.isArray(data) ? data.filter((d) => d.isActive) : null;
};

export const fetchSiteContent = async () => {
  return cachedFetchJson('/site-content');
};
