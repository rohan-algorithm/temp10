import React, { useEffect, useState } from 'react';
import './Board.css';
import { v4 as uuidv4 } from 'uuid';
import TaskColumn from './TaskColumn';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import Logo from './Logo';
Modal.setAppElement('#root');

const Board = () => {
  const statuses = ["Upcoming", "Overdue", "Completed"];
  const priorities = ["All", "High", "Medium", "Low"]; // Priority options
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    dueDate: new Date().toISOString().split("T")[0], // Default to today
    priority: 'Medium',
    status: 'Upcoming',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState("All"); // Selected priority

  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  // Function to check if tasks are overdue and update their status
  const updateOverdueTasks = (loadedTasks) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const updatedTasks = loadedTasks.map(task => {
      if (task.dueDate < currentDate && task.status === 'Upcoming') {
        return { ...task, status: 'Overdue' };
      }
      return task;
    });

    // Save updated tasks to localStorage if any changes were made
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTasks;
  };

  useEffect(() => {
    // Load tasks from localStorage and check for overdue tasks
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const overdueCheckedTasks = updateOverdueTasks(storedTasks); // Check and update overdue tasks
    setTasks(overdueCheckedTasks); // Set tasks with updated overdue statuses
  }, []);

  useEffect(() => {
    // Filter tasks based on search query and priority
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedPriority === "All" || task.priority === selectedPriority)
    );

    // Group tasks by status
    setTodos(filteredTasks.filter((task) => task.status === 'Upcoming'));
    setInProgress(filteredTasks.filter((task) => task.status === 'Overdue'));
    setClosed(filteredTasks.filter((task) => task.status === 'Completed'));
  }, [tasks, searchQuery, selectedPriority]);

  const handleSubmit = () => {
    if (!task.title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0]; // Today's date
    const newTask = {
      ...task,
      id: uuidv4(),
      // Set status to "Overdue" if the due date is in the past
      status: task.dueDate < currentDate ? 'Overdue' : 'Upcoming'
    };

    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    toast.success("Task added successfully!");
    setIsModalOpen(false);
  };
  useEffect(() => {
    console.log("Modal open state:", isModalOpen);
  }, [isModalOpen]);
  

  return (
    <div className='board'>
      {/* Priority Filter and Search Bar */}

      <div className="navbar">
  <div className="navbar-logo">
    <h1>Task Manager</h1>
  </div>

  <div className="navbar-menu">
    <div className="priority-filter">
      <label>Filter by Priority:</label>
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className="priority-dropdown"
      >
        {priorities.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
    </div>

    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M10 2a8 8 0 105.292 14.584l4.577 4.577a1 1 0 101.414-1.414l-4.577-4.577A8 8 0 0010 2zm0 2a6 6 0 11-4.242 10.242A6 6 0 0110 4z" />
        </svg>
      </button>
    </div>
  </div>
</div>


      {/* Kanban Columns */}
      <div className='kanban'>
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            closed={closed}
          />
        ))}
      </div>

      <button className='floating-add-button' onClick={() => setIsModalOpen(true)}>
        +
      </button>
      

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder='Task Title'
          value={task.title}
          onChange={(e) =>
            setTask({
              ...task,
              title: e.target.value,
            })
          }
        />
        <textarea
          placeholder='Task Description'
          value={task.description}
          onChange={(e) =>
            setTask({
              ...task,
              description: e.target.value,
            })
          }
        />
        <input
          type="date"
          placeholder='Due Date'
          value={task.dueDate}
          onChange={(e) =>
            setTask({
              ...task,
              dueDate: e.target.value,
            })
          }
        />
        <select
          value={task.priority}
          onChange={(e) =>
            setTask({
              ...task,
              priority: e.target.value,
            })
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className='submit-button' onClick={handleSubmit}>
          Add Task
        </button>
      </Modal>
    </div>
  );
};

export default Board;
