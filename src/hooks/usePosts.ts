import { useQuery } from "@tanstack/react-query";
import { POST_API_URL } from "../constants/posts";
import axios from "axios";

interface Post {
  id: number;
  body: string;
  title: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number
  userId: number | undefined
}

const usePosts = (query: PostQuery) => {
  const params = {
    _start: ( query.page - 1 ) * query.pageSize,
    _limit: query.pageSize,
    userId: query.userId
  }

  if (Number.isNaN(params.userId)){
    delete params.userId
  }

  const fetchPosts = () => axios.get<Post []>(POST_API_URL, {
    params
  }).then((res) => res.data)
  return useQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: fetchPosts,
    staleTime: 50_000,
    keepPreviousData: true
  })
}

export default usePosts;
