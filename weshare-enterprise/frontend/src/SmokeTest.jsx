// src/test/SmokeTest.jsx
import { useEffect } from 'react';
import { testFlow } from './loginAndSharesTest';

export default function SmokeTest() {
  useEffect(() => {
    testFlow().catch(err => console.error('Smoke test failed:', err));
  }, []);
  return <div>Running smoke test… check console.</div>;
}
