async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}
export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>{' '}
    </div>
  );
}
