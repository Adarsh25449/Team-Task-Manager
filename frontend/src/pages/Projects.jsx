import { useEffect, useState } from "react";
import API from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const getProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async (e) => {
    e.preventDefault();
    await API.post("/projects", form);
    alert("Project created");
    getProjects();
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="container">
      <h2>Projects</h2>

      <form onSubmit={createProject}>
        <input placeholder="Project Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button>Create Project</button>
      </form>

      {projects.map((p) => (
        <div className="card" key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <small>ID: {p._id}</small>
        </div>
      ))}
    </div>
  );
}

export default Projects;