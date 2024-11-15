import './App.css';
import Sidebar from './components/Sidebar';

import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Board';
import Tasks from './pages/Tasks';
import UpcomingTasks from './pages/UpcomingTasks';
import OverdueTasks from './pages/OverdueTasks';
import CompletedTasks from './pages/CompletedTasks';
import AddTask from './pages/AddTask';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className='app'>
          <Sidebar />
          <div className='main-content'>
          
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/upcoming-tasks" element={<UpcomingTasks />} />
              <Route path="/overdue-tasks" element={<OverdueTasks />} />
              <Route path="/completed-tasks" element={<CompletedTasks />} />
              <Route path="/add-task" element={<AddTask />} />
            </Routes>
          </div>
          <Toaster />
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
