import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const filters = ["Company Law", "Gst.", "Tax.", "RBI.", "Other"];

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://ca-backend-tau.vercel.app/api/blogs"); // your API
        const data = await res.json();
        if (data.success) {
          setBlogs((data.data || []).slice(0, 4)); // show only first 3-4 blogs
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
          {blogs.map((blog, index) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id || index}
              className="block bg-[#E6C69D] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <motion.img
                src={blog.image || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-44 object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {blog.content}
                </p>
                <span className="text-amber-600 font-semibold hover:underline mt-2 inline-block">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

