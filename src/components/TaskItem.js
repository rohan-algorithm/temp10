import React, { useState } from 'react';
import './TaskItem.css';
import toast from 'react-hot-toast';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
  });

  const handleRemove = (taskId) => {
    const filteredTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(filteredTasks);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    toast.success("Task removed successfully");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, ...editTask } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.success("Task updated successfully");
    setIsEditing(false);
  };

  const handleMarkComplete = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: 'Completed' } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.success("Task marked as complete");
  };

  return (
    <div
      className={`task-item ${task.status} ${isDragging ? 'dragging' : ''}`}
      ref={drag}
    >
      <div className="task-content">
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={editTask.title}
              onChange={handleEditChange}
              className="edit-input"
              placeholder="Title"
            />
            <textarea
              name="description"
              value={editTask.description}
              onChange={handleEditChange}
              className="edit-input"
              placeholder="Description"
            />
            <input
              type="date"
              name="dueDate"
              value={editTask.dueDate}
              onChange={handleEditChange}
              className="edit-input"
            />
            <select
              name="priority"
              value={editTask.priority}
              onChange={handleEditChange}
              className="edit-input"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="task-title">{task.title}</p>
            <p className="task-description">{task.description}</p>
            <div className="task-meta">
              <span className={`task-priority ${task.priority.toLowerCase()}`}>
                {task.priority} Priority
              </span>
              <span className="task-date">{task.dueDate}</span>
            </div>
          </>
        )}
      </div>
      {/* Text-Based Remove Button */}
      <button
        className="remove-button"
        onClick={() => handleRemove(task.id)}
        aria-label="Remove task"
      >
        X
      </button>
      {/* Three-Dot Button for Edit Toggle */}
      <button
        className="three-dot-button"
        onClick={handleEditToggle}
        aria-label="Edit task"
      >
        ⋮
      </button>
      {/* Conditionally render Mark as Complete Button */}
      {task.status !== 'Completed' && (
        <button
          className="mark-complete-button"
          onClick={handleMarkComplete}
          aria-label="Mark task as complete"
        >
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default TaskItem;
