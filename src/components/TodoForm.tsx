import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodo();

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current && ref.current.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current?.value,
        userId: 1,
        completed: false,
      });
      if (addTodo.isSuccess) ref.current.value = "";
    }
  };

  return (
    <>
      {addTodo.error && <p>{addTodo.error.message}</p>}
      <form onSubmit={(e) => handleFormSubmission(e)}>
        <input ref={ref} type="text" />
        <button>Add Todo</button>
      </form>
    </>
  );
}
