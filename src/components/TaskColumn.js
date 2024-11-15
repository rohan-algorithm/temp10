// TaskColumn.js
import React from 'react';
import TaskItem from './TaskItem';
import { useDrop } from 'react-dnd';
import './TaskColumn.css';

const TaskColumn = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToColumn(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  let tasksByStatus = todos;
  if (status === "Overdue") tasksByStatus = inProgress;
  if (status === "Completed") tasksByStatus = closed;

  tasksByStatus = tasksByStatus || [];

  const addItemToColumn = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  // Dynamic class based on status
  const columnClass = `col ${status.toLowerCase()}`;

  return (
    <div className={columnClass} ref={drop} style={{ backgroundColor: isOver ? '#f0f8ff' : '' }}>
      <h1>{status.toUpperCase()}</h1>
      <div className="taskList">
        {tasksByStatus.length > 0 ? (
          tasksByStatus.map((task) => (
            <TaskItem key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))
        ) : (
          <p className="empty-column">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
