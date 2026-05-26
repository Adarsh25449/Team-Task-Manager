function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}

export default Dashboard;