import { useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    setBlogs([...blogs, { id: Date.now(), title, content }]);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <form onSubmit={handleAddBlog} className="bg-white p-4 rounded shadow mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="border p-2 w-full mb-2"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Blog</button>
      </form>

      <ul className="space-y-2">
        {blogs.map((b) => (
          <li key={b.id} className="bg-white p-3 rounded shadow">
            <h2 className="font-bold">{b.title}</h2>
            <p>{b.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
