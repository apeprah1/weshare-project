// frontend/src/api/utils.js
export function buildQuery(params = {}) {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  if (!entries.length) return '';
  const query = new URLSearchParams(Object.fromEntries(entries)).toString();
  return `?${query}`;
}

// For file uploads (keeps non-file fields + File/Blob fields)
export function safeFormData(fields = {}) {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v.forEach(item => fd.append(`${k}[]`, item));
    } else if (v !== undefined && v !== null) {
      fd.append(k, v);
    }
  });
  return fd;
}