import React, { useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
const API_URL = import.meta.env.VITE_BACKEND_API;

export default function AdminBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch blogs on load
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    setLoading(true);

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
        throw new Error(`Request failed with status ${res.status}: ${text}`);
      }

      const data = await res.json();
      setBlogs([data.data, ...blogs]);

      setTitle("");
      setContent("");
      setImage(null);

      alert("Blog posted successfully!");
    } catch (err) {
      console.error("Error uploading blog:", err);
      alert("Error uploading blog: " + (err.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id));
        alert("Blog deleted successfully ✅");
      } else {
        const err = await res.json();
        alert("Failed to delete blog: " + err.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Blog Panel</h2>

      {/* Blog Form */}
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

        <Editor
  apiKey="5xs0yljb82dq3ugaderpd4dig4ci54cgj8knjkcvjpac8cw7" // free version
  value={content}
  init={{
    height: 400,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
  }}
  onEditorChange={(newValue) => setContent(newValue)}
/>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-2"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-48 h-48 object-cover mt-2 rounded-lg"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white p-3 rounded-lg text-lg font-semibold transition-colors`}
        >
          {loading ? "Posting..." : "Post Blog"}
        </button>
      </form>

      {/* Blog List */}
      <h3 className="text-2xl font-semibold mt-10 mb-6 text-gray-800">
        Posted Blogs
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.length === 0 ? (
          <p>No blogs posted yet.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
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
                <h4 className="font-bold text-xl text-gray-900 mb-3">
                  {blog.title}
                </h4>
               

                {/* ✅ Delete Button */}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
