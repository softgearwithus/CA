import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import BottomNavbar from "../components/BottomNavbar";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);
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
  }, [id]);

  if (loading) return <p className="p-6">Loading blog...</p>;
  if (!blog) return <p className="p-6">Blog not found.</p>;

  return (
    <>
      <BottomNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          />
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{blog.title}</h1>
        <p className="text-gray-600 mb-6">
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString()
            : "Unknown Date"}{" "}
          • {blog.author || "Admin"}
        </p>

        {/* Render Rich HTML Content */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        <div className="mt-8">
          <Link
            to="/blogs"
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
