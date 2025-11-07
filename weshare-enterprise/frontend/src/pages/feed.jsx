// frontend/src/pages/Feed.jsx
import { useEffect, useState } from 'react';
import { getShares, likeShare } from '../api';

export default function Feed({ token }) {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    getShares({}, token)
      .then(data => setShares(data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1>WeShare Feed</h1>
      {shares.map(s => (
        <article key={s.id}>
          <strong>@{s.author_username}</strong>
          <p>{s.content}</p>
          <button onClick={() => likeShare(s.id, token)}>❤️ Like</button>
        </article>
      ))}
    </div>
  );
}