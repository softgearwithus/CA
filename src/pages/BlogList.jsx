import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BottomNavbar from "../components/BottomNavbar";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    // Fetch blogs from backend
  const fetchBlogs = async () => {
  try {
    const res = await fetch(`${API_URL}/api/blogs`);
    const data = await res.json();
    console.log("API Response:", data); // 👈 check here
    setBlogs(data.data || []);  // access the array inside "data"

  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    setLoading(false);
  }
};

    fetchBlogs();
  }, []);

  if (loading) return <p className="p-6">Loading blogs...</p>;

  return (
    <>
      <BottomNavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">Our Blogs</h2>

        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                    {blog.author}
                  </p>
                  <p className="text-gray-700 mb-3">
                    {blog.excerpt || blog.content.slice(0, 100) + "..."}
                  </p>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-amber-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogList;
