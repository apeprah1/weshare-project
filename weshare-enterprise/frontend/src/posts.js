// frontend/src/api/posts.js
import { api } from './request.js';
import { buildQuery } from './utils.js';

const BASE = '/api/posts/';

export async function getPosts({ page, page_size, author, search, ordering } = {}, token) {
  const query = buildQuery({ page, page_size, author, search, ordering });
  return api(`${BASE}${query}`, 'GET', null, token);
}

export async function getPost(postId, token) {
  return api(`${BASE}${postId}/`, 'GET', null, token);
}

export async function createPost({ content, mediaIds = [] }, token) {
  return api(BASE, 'POST', { content, media_ids: mediaIds }, token);
}

export async function updatePost(postId, data, token) {
  return api(`${BASE}${postId}/`, 'PATCH', data, token);
}

export async function deletePost(postId, token) {
  return api(`${BASE}${postId}/`, 'DELETE', null, token);
}