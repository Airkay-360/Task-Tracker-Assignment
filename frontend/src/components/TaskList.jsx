import TaskCard from './TaskCard';

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add the first one.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}