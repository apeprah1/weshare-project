// frontend/src/api/likes.js
import { api } from './request.js';

const ROOT = '/api/posts/';

export async function likePost(postId, token) {
  return api(`${ROOT}${postId}/like/`, 'POST', null, token);
}

export async function unlikePost(postId, token) {
  return api(`${ROOT}${postId}/unlike/`, 'POST', null, token);
}