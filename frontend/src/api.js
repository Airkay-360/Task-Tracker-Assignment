const API_URL = 'http://localhost:8080/api/tasks';

export async function getTasks(signal) {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) {
    throw new Error('Failed to load tasks');
  }
  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to save task');
  }
  return response.json();
}