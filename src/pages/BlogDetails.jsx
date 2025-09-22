import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";


export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    if (!id) return; // prevent calling API with undefined

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setBlog(data.data || null);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, API_URL]);

  if (loading) return <p className="p-6 text-center text-gray-600">Loading blog...</p>;
  if (!blog) return <p className="p-6 text-center text-gray-600">Blog not found.</p>;

  return (
    <>
    

      <section className="px-6 md:px-20 py-12 bg-[#F8F7FA] min-h-screen">
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Blog Image */}
          <img
            src={blog.image || "https://via.placeholder.com/800x400"}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-6 md:p-10">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              {blog.title}
            </h1>

            {/* Meta */}
            <p className="text-gray-500 mb-6">
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "Unknown Date"}{" "}
              • {blog.author || "Admin"}
            </p>

            {/* Blog Content */}
            <motion.div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {blog.content}
            </motion.div>

            {/* Back Button */}
            <div className="mt-10">
              <Link
                to="/blogs"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                ← Back to Blogs
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
