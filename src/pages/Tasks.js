import React, { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import './Tasks.css';

const Tasks = () => { 
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setAllTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []); 


  useEffect(() => {
    const filtered = allTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
    setFilteredTasks(filtered);
  }, [searchQuery, priorityFilter, allTasks]);

  return (
    <div className="tasks-page">
      <h1>All Tasks</h1>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search tasks..."
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

      {filteredTasks && filteredTasks.length > 0 ? (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              tasks={allTasks} 
              setTasks={setAllTasks}
            />
          ))}
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
