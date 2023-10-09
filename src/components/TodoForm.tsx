import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";
import { TODO_API_URL } from "../constants/todos";

interface AddTodoContext {
  prevTodos: Todo[];
}

export default function TodoForm() {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios.post<Todo>(TODO_API_URL, todo).then((res) => res.data),

    // Optimistic update
    onMutate: (newTodo: Todo) => {
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
        newTodo,
        ...todos,
      ]);

      // Returning context
      return { prevTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      // APPROUCH 1 -> Invalidate the cache

      // APPROUCH 2 -> Update the data directly in cache

      queryClient.setQueriesData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (_error, _newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData(["todos"], context.prevTodos);
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  const submitFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current && ref.current.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current?.value,
        userId: 1,
        completed: false,
      });
    }
  };
  return (
    <>
      {addTodo.error && <p>{addTodo.error.message}</p>}
      <form onSubmit={(e) => submitFrom(e)}>
        <input ref={ref} type="text" />
        <button>Add Todo</button>
      </form>
    </>
  );
}
