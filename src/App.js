import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchData();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch All tasks data
  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/task');
    const data = await res.json();
    return data;
  };

  // Fetch task data
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/task/${id}`);
    const data = await res.json();
    return data;
  };

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const data = await res.json();

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/task/${id}`, { method: 'DELETE' });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder status
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        showAdd={showAddTask}
        onAdd={() => setShowAddTask(!showAddTask)}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'Nothing to see here '
      )}
    </div>
  );
}

export default App;
