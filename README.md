useQuery and usemutation are two custom hooks from react-query library
query for get data
mutation for changing data

```javascript

  const postQuery = useQuery({
    // a key uniquely identifies this query
    queryKey: ["posts"],
    // function queries our data
    queryFn: (obj) => wait(1000).then(() => {
      console.log(obj)
      return [...POSTS]
    }), // query function expect to return a promise
  })


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
})
```
