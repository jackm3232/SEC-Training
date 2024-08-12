import { posts } from "./posts.js";

const filtered_posts = posts.filter((post) => {
  return post.userId === 1;
});

filtered_posts.forEach((post) => {
  console.log(post);
});
