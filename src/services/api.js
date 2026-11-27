const API_URL = import.meta.env.VITE_API_URL || 'https://adminmainwebsite-backend.onrender.com/api';

export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_URL}/services`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.filter((s) => s.isActive) : null;
  } catch {
    return null;
  }
};

export const fetchPlatforms = async () => {
  try {
    const res = await fetch(`${API_URL}/platforms`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.filter((p) => p.isActive) : null;
  } catch {
    return null;
  }
};

export const fetchCareers = async () => {
  try {
    const res = await fetch(`${API_URL}/careers`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.filter((c) => c.isActive) : null;
  } catch {
    return null;
  }
};

export const fetchCollaborations = async () => {
  try {
    const res = await fetch(`${API_URL}/collaborations`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.filter((c) => c.isActive) : null;
  } catch {
    return null;
  }
};

export const fetchAboutCompany = async () => {
  try {
    const res = await fetch(`${API_URL}/about-company`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export const fetchTeamMembers = async () => {
  try {
    const res = await fetch(`${API_URL}/team`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.filter((t) => t.isActive) : null;
  } catch {
    return null;
  }
};

export const fetchContactDetails = async () => {
  try {
    const res = await fetch(`${API_URL}/contact-details`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export const fetchDispatch = async () => {
  try {
    const res = await fetch(`${API_URL}/dispatch`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.filter((d) => d.isActive) : null;
  } catch {
    return null;
  }
};
