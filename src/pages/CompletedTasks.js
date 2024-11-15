import React, { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import './CompletedTasks.css';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [allTasks, setallTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = storedTasks.filter((task) => task.status === 'Completed');
    setallTasks(storedTasks);
    setCompletedTasks(completed);
    setFilteredTasks(completed);
  }, [allTasks]);

  useEffect(() => {
    const filtered = completedTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
    setFilteredTasks(filtered);
  }, [searchQuery, priorityFilter, completedTasks]);

  return (
    <div className="completed-tasks-page">
      <h1>Completed Tasks</h1>


      <div className="filter-section">
        <input
          type="text"
          placeholder="Search completed tasks..."
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
        <p>No completed tasks.</p>
      )}
    </div>
  );
};

export default CompletedTasks;
