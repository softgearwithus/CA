// AdminBlog.jsx
import React, { useState } from "react";
const API_URL = import.meta.env.VITE_BACKEND_API;

export default function AdminBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", res.status, text);
        alert("Failed to post blog. Check console for details.");
        return;
      }

      const data = await res.json();
      console.log("Uploaded:", data);

      // Update blogs list and reset form
      setBlogs([data, ...blogs]);
      setTitle("");
      setContent("");
      setImage(null);

      alert("Blog posted successfully!"); // ✅ Success alert
    } catch (err) {
      console.error("Error uploading blog:", err);
      alert("Error posting blog. Check console.");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Blog Panel</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5"
      >
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          className="p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Post Blog
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-10 mb-6 text-gray-800">
        Posted Blogs
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-5">
              <h4 className="font-bold text-xl text-gray-900 mb-3">{blog.title}</h4>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
