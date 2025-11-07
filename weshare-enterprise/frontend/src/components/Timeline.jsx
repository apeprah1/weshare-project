import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import CommentsThread from "./CommentsThread.jsx";

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get("/posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error loading posts:", err));
  }, []);

  const handleLikePost = async (postId) => {
    try {
      const res = await api.post(`/posts/${postId}/like/`);
      setPosts((old) =>
        old.map((p) =>
          p.id === postId
            ? { ...p, likes_count: res.data.likes_count, is_liked: res.data.liked }
            : p
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div>
      <h2>Timeline</h2>
      {posts.map((p) => (
        <div
          key={p.id}
          style={{ border: "1px solid #ddd", margin: "1rem 0", padding: "1rem" }}
        >
          <Link to={`/posts/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <h4>@{p.author_name}</h4>
            <p>{p.content}</p>
          </Link>

          <button onClick={() => handleLikePost(p.id)}>
            {p.is_liked ? "Unlike" : "Like"} ({p.likes_count})
          </button>

          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            {p.comments_count} comments
          </p>

          {/* Optional: small preview of comments or just leave to detail page */}
          {/* <CommentsThread postId={p.id} /> */}
        </div>
      ))}
    </div>
  );
}
