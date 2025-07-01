async function getPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  return res.json();
}
export default async function PostPage() {
  const post = await getPost();
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>{' '}
    </div>
  );
}
