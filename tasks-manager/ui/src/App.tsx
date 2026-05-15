import { useState, useEffect, useCallback, useTransition } from 'react';
import './App.css';
import { fetchAllTasks } from './api';
import { AddTaskForm } from './components/AddTaskForm';
import { TasksList } from './components/TasksList';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();

  const loadTasks = useCallback(() => {
    startTransition(async () => {
      const result = await fetchAllTasks();
      if (result.success) {
        setTasks(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });
  }, [startTransition]);

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
