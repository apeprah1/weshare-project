import { useEffect, useState } from "react";
import { api } from "../api";

export default function CommentsThread({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null); // parent comment id

  const loadComments = () => {
    api
      .get(`/comments/?post=${postId}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Error loading comments:", err));
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await api.post("/comments/", {
        post: postId,
        content: newComment,
        parent: replyTo,
      });
      setNewComment("");
      setReplyTo(null);
      loadComments();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const res = await api.post(`/comments/${commentId}/like/`);
      setComments((old) =>
        old.map((c) =>
          c.id === commentId
            ? { ...c, likes_count: res.data.likes_count, is_liked: res.data.liked }
            : {
                ...c,
                replies: c.replies?.map((r) =>
                  r.id === commentId
                    ? {
                        ...r,
                        likes_count: res.data.likes_count,
                        is_liked: res.data.liked,
                      }
                    : r
                ),
              }
        )
      );
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  const topLevel = comments.filter((c) => c.parent === null);

  return (
    <div style={{ marginTop: "1rem" }}>
      <h5>Comments</h5>

      {topLevel.map((c) => (
        <CommentNode
          key={c.id}
          comment={c}
          onLike={handleLikeComment}
          onReply={setReplyTo}
        />
      ))}

      <form onSubmit={handleAddComment} style={{ marginTop: "0.5rem" }}>
        {replyTo && (
          <p style={{ fontSize: "0.85rem" }}>
            Replying to comment #{replyTo}{" "}
            <button type="button" onClick={() => setReplyTo(null)}>
              cancel
            </button>
          </p>
        )}
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: "100%" }}
        />
      </form>
    </div>
  );
}

function CommentNode({ comment, onLike, onReply, level = 0 }) {
  return (
    <div style={{ marginLeft: level * 16, marginTop: "0.5rem" }}>
      <strong>@{comment.author_name}</strong>{" "}
      <span style={{ fontSize: "0.85rem", color: "#555" }}>
        {new Date(comment.created_at).toLocaleString()}
      </span>
      <div>{comment.content}</div>
      <button onClick={() => onLike(comment.id)}>
        {comment.is_liked ? "Unlike" : "Like"} ({comment.likes_count})
      </button>
      <button onClick={() => onReply(comment.id)} style={{ marginLeft: "0.5rem" }}>
        Reply
      </button>

      {comment.replies &&
        comment.replies.map((r) => (
          <CommentNode
            key={r.id}
            comment={r}
            onLike={onLike}
            onReply={onReply}
            level={level + 1}
          />
        ))}
    </div>
  );
}
