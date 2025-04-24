import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// useQuery and usemutation are two custom hooks from react-query library
// query for get data
// mutation for changing data
const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

function App() {
  const queryClient = useQueryClient();
  console.log(POSTS);

  const postQuery = useQuery({
    // a key uniquely identifies this query
    queryKey: ["posts"],
    // function queries our data
    queryFn: () => wait(1000).then(() => [...POSTS]), // query function expect to return a promise
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      wait(1000).then(() => {
        // push a new post into posts array
        POSTS.push({ id: crypto.randomUUID(), title });
      });
    },
    onSuccess: () => {
      // mark the "posts" query as stale
      // This forces TanStack Query to refetch the posts data
      // This ensures your UI stays in sync with the latest data after making changes
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // if the promise in queryFn is resolved
  if (postQuery.isLoading) return <h1>Loading...</h1>;
  // if the promise in queryFn is rejected
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <div>
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("new Post")}
      >
        Add New
      </button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
