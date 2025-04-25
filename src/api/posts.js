import axios from "axios";

export function getPosts() {
  return axios
    .get("http://localhost:5173/posts", { params: { _sort: "title" } })
    .then((res) => res.data);
}
