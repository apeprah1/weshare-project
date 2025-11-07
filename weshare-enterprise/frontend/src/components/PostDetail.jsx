import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import CommentsThread from "./CommentsThread.jsx";

export default function PostDetail() {
  const { id } = useParams(); // /posts/:id
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPost = () => {
    setLoading(true);
    api
      .get(`/posts/${id}/`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error loading post:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleLike = async () => {
    if (!post) return;
    try {
      const res = await api.post(`/posts/${post.id}/like/`);
      setPost((old) =>
        old
          ? {
              ...old,
              likes_count: res.data.likes_count,
              is_liked: res.data.liked,
            }
          : old
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <p>
        <Link to="/">&larr; Back to timeline</Link>
      </p>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h3>@{post.author_name}</h3>
        <p style={{ fontSize: "0.85rem", color: "#555" }}>
          {new Date(post.created_at).toLocaleString()}
        </p>

        <p>{post.content}</p>

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            {post.media.map((m) =>
              m.media_type === "image" ? (
                <img
                  key={m.id}
                  src={`http://127.0.0.1:8000${m.file}`}
                  alt="post media"
                  style={{ maxWidth: "100%", marginTop: "0.5rem" }}
                />
              ) : (
                <video
                  key={m.id}
                  src={`http://127.0.0.1:8000${m.file}`}
                  controls
                  style={{ maxWidth: "100%", marginTop: "0.5rem" }}
                />
              )
            )}
          </div>
        )}

        <div style={{ marginTop: "0.5rem" }}>
          <button onClick={handleLike}>
            {post.is_liked ? "Unlike" : "Like"} ({post.likes_count})
          </button>
          <span style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>
            {post.comments_count} comments
          </span>
        </div>
      </div>

      <CommentsThread postId={post.id} />
    </div>
  );
}
