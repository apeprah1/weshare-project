// frontend/src/api/follows.js
import { api } from './request.js';
import { buildQuery } from './utils.js';

const BASE = '/api/follows/';

export async function followUser(userId, token) {
  return api(`${BASE}${userId}/`, 'POST', null, token);
}

export async function unfollowUser(userId, token) {
  return api(`${BASE}${userId}/`, 'DELETE', null, token);
}

export async function getFollowers(userId, { page, page_size } = {}, token) {
  const q = buildQuery({ page, page_size });
  return api(`/api/users/${userId}/followers/${q}`, 'GET', null, token);
}

export async function getFollowing(userId, { page, page_size } = {}, token) {
  const q = buildQuery({ page, page_size });
  return api(`/api/users/${userId}/following/${q}`, 'GET', null, token);
}