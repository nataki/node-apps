import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { fetchAllTasks } from './api';
import { AddTaskForm } from './components/AddTaskForm';
import { TasksList } from './components/TasksList';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(() => {
    setIsLoading(true);
    fetchAllTasks()
      .then((data) => setTasks(data))
      .catch(() => setError('Failed to load tasks'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  return (
    <>
      <h4>Tasks manager</h4>
      <AddTaskForm onTaskAdded={loadTasks} />
      <TasksList tasks={tasks} isLoading={isLoading} error={error} />
    </>
  );
}

export default App;
