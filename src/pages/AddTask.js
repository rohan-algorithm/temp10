import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './AddTask.css';

const AddTask = () => {
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Upcoming'
  });

  const navigate = useNavigate();

  const handleAddTask = () => {
    if (!task.title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    const newTask = { ...task, id: Date.now().toString() };


    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));


    toast.success("Task added successfully!");


    navigate('/tasks');
  };

  return (
    <div className="add-task-page">
      <h1>Add New Task</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default AddTask;
