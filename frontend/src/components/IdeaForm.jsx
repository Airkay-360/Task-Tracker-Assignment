import { useState } from 'react';
import { isValidTitle } from '../validation.mjs';

export default function IdeaForm({ onIdeaCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
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
      await onIdeaCreated({ title: title.trim(), category: category.trim() });
      setTitle('');
      setCategory('');
      setSuccessMessage('Idea successfully added!');
    } catch (err) {
      setError('Failed to save idea.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title">Title: </label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSaving} />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="category">Category: </label>
        <input id="category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isSaving} />
      </div>
      
      <button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Submit Idea'}</button>
    </form>
  );
}