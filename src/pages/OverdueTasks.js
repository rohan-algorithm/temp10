import React, { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import './OverdueTasks.css';

const OverdueTasks = () => {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [allTasks, setallTasks] = useState([]);

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const overdue = storedTasks.filter((task) => task.status === 'Overdue');
    setallTasks(storedTasks);
    setOverdueTasks(overdue);
    setFilteredTasks(overdue); 
  }, [allTasks]);

  useEffect(() => {
    const filtered = overdueTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
    setFilteredTasks(filtered);
  }, [searchQuery, priorityFilter, overdueTasks]);

  return (
    <div className="overdue-tasks-page">
      <h1>Overdue Tasks</h1>


      <div className="filter-section">
        <input
          type="text"
          placeholder="Search overdue tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="priority-filter"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>


      {filteredTasks.length > 0 ? (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} tasks={allTasks} setTasks={setallTasks} />
          ))}
        </div>
      ) : (
        <p>No overdue tasks.</p>
      )}
    </div>
  );
};

export default OverdueTasks;
