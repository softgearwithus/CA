import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Mic } from "lucide-react";

const filters = ["Company Law", "Gst.", "Tax.", "RBI.", "Other"];

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_API;

  // ✅ Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="px-6 md:px-20 py-12 mt-14 bg-[#E6E2F2] rounded-xl shadow-md max-w-7xl mx-auto">
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-blue-900 mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Our Blogs
      </motion.h2>

      {/* Search Bar */}
      <div className="flex items-center justify-between bg-white rounded-full shadow-sm px-4 py-2 mb-6 max-w-lg">
        <div className="flex items-center w-full">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Blogs..."
            className="flex-1 outline-none bg-transparent text-gray-700"
          />
        </div>
        <Mic className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            className="bg-[#D1C5F0] hover:bg-[#C2B4E3] text-gray-700 font-medium px-4 py-1 rounded-full text-sm transition"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      {loading ? (
        <p className="text-gray-600">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-600">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.slice(0, 4).map((blog, index) => (
            <motion.div
              key={blog._id}
              className="bg-[#E6C69D] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/blogs/${blog._id}`}>
                <img
                  src={blog.image || "https://via.placeholder.com/300"}
                  alt={blog.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>
                  <span className="text-amber-600 text-sm mt-2 inline-block">
                    Read more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Show More Link */}
      {blogs.length > 4 && (
        <div className="text-center mt-8">
          <Link
            to="/blogs"
            className="text-blue-700 font-medium hover:underline"
          >
            View All Blogs →
          </Link>
        </div>
      )}
    </section>
  );
}
