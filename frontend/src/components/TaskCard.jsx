export default function TaskCard({ task }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px', borderRadius: '4px' }}>
      <strong>{task.title}</strong> — <span style={{ color: 'blue' }}>Priority: {task.priority}</span>
    </div>
  );
}