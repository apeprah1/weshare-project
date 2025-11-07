// frontend/src/api/notifications.js
import { api } from './request.js';
import { buildQuery } from './utils.js';

const BASE = '/api/notifications/';

export async function getNotifications({ page, page_size, unread } = {}, token) {
  const q = buildQuery({ page, page_size, unread });
  return api(`${BASE}${q}`, 'GET', null, token);
}

export async function markNotificationRead(notificationId, token) {
  return api(`${BASE}${notificationId}/read/`, 'POST', null, token);
}

export async function markAllRead(token) {
  return api(`${BASE}read-all/`, 'POST', null, token);
}

