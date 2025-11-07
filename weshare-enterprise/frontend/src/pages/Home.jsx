import React, { useState } from "react";
import CreatePost from "../components/CreatePost";
import Timeline from "../components/Timeline";

export default function Home() {
  const [reload, setReload] = useState(false);

  return (
    <div className="home-page">
      <CreatePost onCreated={() => setReload(!reload)} />
      <Timeline key={reload} />
    </div>
  );
}
