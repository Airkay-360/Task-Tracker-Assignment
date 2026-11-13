export default function IdeaList({ ideas }) {
  if (ideas.length === 0) {
    return <p>No ideas yet. Add the first one.</p>;
  }

  return (
    <ul>
      {ideas.map((idea) => (
        <li key={idea.id}>
          <strong>{idea.title}</strong> — <em>{idea.category}</em>
        </li>
      ))}
    </ul>
  );
}