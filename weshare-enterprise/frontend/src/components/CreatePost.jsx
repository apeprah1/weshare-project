import React, { useState } from "react";
import { api } from "../api";

export default function CreatePost({ onCreated }) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Step 1: Create the post
      const postRes = await api.post("/posts/", { content });
      const postId = postRes.data.id;

      // Step 2: Upload media if a file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("media_type", mediaType);
        formData.append("post", postId);
        await api.post("/media/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setContent("");
      setFile(null);
      if (onCreated) onCreated();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="3"
        style={{ width: "100%" }}
      />
      <div>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            if (e.target.files[0]?.type.startsWith("video")) setMediaType("video");
            else setMediaType("image");
          }}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}
