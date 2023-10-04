import useTodos from "../hooks/useTodos";

export default function TodoList() {
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
