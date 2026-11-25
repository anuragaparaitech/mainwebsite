const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
