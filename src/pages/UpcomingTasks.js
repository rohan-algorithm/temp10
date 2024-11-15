import React, { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import './UpcomingTasks.css';

const UpcomingTasks = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const upcoming = storedTasks.filter((task) => task.status === 'Upcoming');
    setAllTasks(storedTasks);
    setUpcomingTasks(upcoming);
    setFilteredTasks(upcoming); 
  }, [allTasks]);


  useEffect(() => {
    const filtered = upcomingTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
    setFilteredTasks(filtered);
  }, [searchQuery, priorityFilter, upcomingTasks]);

  return (
    <div className="upcoming-tasks-page">
      <h1>Upcoming Tasks</h1>


      <div className="filter-section">
        <input
          type="text"
          placeholder="Search upcoming tasks..."
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

      {/* Task List */}
      {filteredTasks.length > 0 ? (
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
        <p>No upcoming tasks.</p>
      )}
    </div>
  );
};

export default UpcomingTasks;
