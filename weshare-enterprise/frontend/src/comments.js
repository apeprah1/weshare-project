// frontend/src/api/comments.js
import { api } from './request.js';
import { buildQuery } from './utils.js';

const ROOT = '/api/shares/';

export async function getComments(shareId, { page } = {}, token) {
  const q = buildQuery({ page });
  return api(`${ROOT}${shareId}/comments/${q}`, 'GET', null, token);
}

export async function addComment(shareId, { content }, token) {
  return api(`${ROOT}${shareId}/comments/`, 'POST', { content }, token);
}

export async function deleteComment(shareId, commentId, token) {
  return api(`${ROOT}${shareId}/comments/${commentId}/`, 'DELETE', null, token);
}

