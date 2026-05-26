import { useEffect, useState } from "react";
import API from "../api/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    project: "",
    dueDate: "",
  });

  const getTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    alert("Task created");
    getTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <h2>Tasks</h2>

      <form onSubmit={createTask}>
        <input placeholder="Task Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Member ID" onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
        <input placeholder="Project ID" onChange={(e) => setForm({ ...form, project: e.target.value })} />
        <input type="date" onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <button>Create Task</button>
      </form>

      {tasks.map((t) => (
        <div className="card" key={t._id}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <p>Status: {t.status}</p>
          <button onClick={() => updateStatus(t._id, "In Progress")}>In Progress</button>
          <button onClick={() => updateStatus(t._id, "Completed")}>Completed</button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;