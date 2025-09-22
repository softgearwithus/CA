import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function BlogDetails() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        // ✅ Take only first 3–4 blogs
        setBlogs((data.data || []).slice(0, 4));
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [API_URL]);

  if (loading) return <p className="p-6">Loading blogs...</p>;
  if (blogs.length === 0) return <p className="p-6">No blogs found.</p>;

  return (
    <>
  
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={blog.image || "https://via.placeholder.com/400"}
                alt={blog.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  {blog.excerpt || blog.content?.slice(0, 100) + "..."}
                </p>
                <Link
                  to={`/blogs/${blog._id || blog.id}`}
                  className="text-amber-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}
