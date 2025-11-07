// src/test/loginAndSharesTest.js
import { api } from './api/request';

export async function testFlow() {
  // 1) Login
  const { access } = await api('/api/auth/token/', 'POST', {
    username: 'alice',
    password: 'SecretPass123',
  });
  localStorage.setItem('access', access);

  const token = () => localStorage.getItem('access');

  // 2) List shares
  const list1 = await api('/api/shares/', 'GET', null, token());
  console.log('Shares before create:', list1);

  // 3) Create
  const created = await api('/api/shares/', 'POST',
    { title: 'From UI', description: 'Hello from frontend' }, token());
  console.log('Created:', created);

  // 4) List again
  const list2 = await api('/api/shares/', 'GET', null, token());
  console.log('Shares after create:', list2);

  // 5) Delete
  await api(`/api/shares/${created.id}/`, 'DELETE', null, token());
  const list3 = await api('/api/shares/', 'GET', null, token());
  console.log('Shares after delete:', list3);

  return { list1, created, list2, list3 };
}