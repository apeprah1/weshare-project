// frontend/src/api/shares.js
import { api } from './request.js';
import { buildQuery } from './utils.js';

const BASE = '/api/shares/';

export async function getShares({ page, search } = {}, token) {
  const q = buildQuery({ page, search });
  return api(`${BASE}${q}`, 'GET', null, token);
}

export async function getShare(shareId, token) {
  return api(`${BASE}${shareId}/`, 'GET', null, token);
}

export async function createShare(data, token) {
  // data = { content: "post text", image?: fileId }
  return api(BASE, 'POST', data, token);
}

export async function updateShare(shareId, data, token) {
  return api(`${BASE}${shareId}/`, 'PATCH', data, token);
}

export async function deleteShare(shareId, token) {
  return api(`${BASE}${shareId}/`, 'DELETE', null, token);
}

export async function likeShare(shareId, token) {
  return api(`${BASE}${shareId}/like/`, 'POST', null, token);
}

export async function unlikeShare(shareId, token) {
  return api(`${BASE}${shareId}/unlike/`, 'POST', null, token);
}