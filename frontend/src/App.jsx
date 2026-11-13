import { useEffect, useState } from 'react';
import { getTasks, createTask } from './api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskSummary from './components/TaskSummary';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async (signal) => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks(signal);
      setTasks(data);
    } catch (err) {
      if (err.name !== 'AbortError') setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadTasks(controller.signal);
    return () => controller.abort();
  }, []);

  const handleTaskCreated = async (newTaskData) => {
    const newTask = await createTask(newTaskData);
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>Campus Task Tracker</h1>
      
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskSummary tasks={tasks} />
      
      <hr />
      <h2>All Tasks</h2>
      
      {loading && <p>Loading tasks…</p>}
      {error && (<div><p style={{ color: 'red' }}>{error}</p><button onClick={() => loadTasks()}>Retry</button></div>)}
      {!loading && !error && <TaskList tasks={tasks} />}
    </div>
  );
}