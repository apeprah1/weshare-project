// frontend/src/api/uploads.js
import { BASE_URL } from './request.js';
import { safeFormData } from './utils.js';

const BASE = '/api/uploads/';

export async function uploadMedia({ file, alt_text }, token) {
  const fd = safeFormData({ file, alt_text });

  const res = await fetch(`${BASE_URL}${BASE}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: fd, // Let browser set multipart boundary; do NOT set Content-Type
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  return res.json();
}