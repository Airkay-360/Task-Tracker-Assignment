import { useState } from 'react';
import { isValidTitle } from '../validation.mjs';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!isValidTitle(title)) {
      setError('Title cannot be empty or spaces-only');
      return;
    }

    setIsSaving(true);
    try {
      await onTaskCreated({ title: title.trim(), priority });
      setTitle('');
      setPriority('Medium');
      setSuccessMessage('Task successfully added!');
    } catch (err) {
      setError('Failed to save task.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title">Task Title: </label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSaving} />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="priority">Priority: </label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} disabled={isSaving}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      
      <button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Add Task'}</button>
    </form>
  );
}