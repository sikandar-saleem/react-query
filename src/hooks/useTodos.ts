import { useQuery } from "@tanstack/react-query";
import { TODO_API_URL } from "../constants/todos";
import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  userId: number,
  completed: boolean
}
const useTodos = () => {
  const fetchTodos = () =>
  axios.get<Todo[]>(TODO_API_URL).then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 50_000
  });
}

export default useTodos;