function MyItems() {
    const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>My Shared Items</h2>
      <p>This page is protected. Only logged-in users can view it.</p>
       <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default MyItems;
