import { useState } from "react";
import usePosts from "../hooks/usePosts";

export default function PostList() {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const {
    data: posts,
    isLoading,
    error,
  } = usePosts({ userId, page, pageSize });

  if (error) <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <select
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId}
      >
        <option value="">Select User</option>
        <option value="1">User 1</option>
        <option value="2">User 2 </option>
        <option value="3">User 3</option>
      </select>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
}
