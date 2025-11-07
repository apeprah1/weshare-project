// frontend/src/api/users.js
import { api } from './request.js';
import { buildQuery } from './utils.js';

const BASE = '/api/users/';

export async function getUser(userId, token) {
  return api(`${BASE}${userId}/`, 'GET', null, token);
}

export async function updateUser(userId, data, token) {
  return api(`${BASE}${userId}/`, 'PATCH', data, token);
}

export async function searchUsers({ q, page, page_size } = {}, token) {
  const query = buildQuery({ q, page, page_size });
  return api(`${BASE}${query}`, 'GET', null, token);
}