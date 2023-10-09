import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../hooks/useTodos";
import axios from "axios";
import { TODO_API_URL, CACHE_KEY_TODOS } from "../constants/todos";

interface AddTodoContext {
  prevTodos: Todo[];
}

const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios.post<Todo>(TODO_API_URL, todo).then((res) => res.data),

    // Optimistic update
    onMutate: (newTodo: Todo) => {
      const prevTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      // Returning context
      return { prevTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      // APPROUCH 1 -> Invalidate the cache, this not work in JSONPLACEHOLDER because data not actual saved

      // APPROUCH 2 -> Update the data directly in cache

      queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (_error, _newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData(CACHE_KEY_TODOS, context.prevTodos);
    },
  });
}

export default useAddTodo;
