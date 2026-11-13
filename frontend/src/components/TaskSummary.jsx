export default function TaskSummary({ tasks }) {
  return (
    <div style={{ marginBottom: '15px', fontStyle: 'italic' }}>
      Total Tasks: {tasks.length}
    </div>
  );
}