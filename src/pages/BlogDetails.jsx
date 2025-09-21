import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import BottomNavbar from "../components/BottomNavbar";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.data);
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading blog...</p>;
  }

  if (!blog) {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <BottomNavbar />
        <h2 className="text-xl font-semibold">Blog not found</h2>
        <Link to="/blogs" className="text-amber-600 hover:underline block mt-4">
          ← Back to Blogs
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <BottomNavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-6">
            {new Date(blog.createdAt).toLocaleDateString()} •{" "}
            {blog.author || "Softgear Team"}
          </p>

          <div className="prose prose-lg text-gray-800 leading-relaxed">
            {blog.content}
          </div>

          <Link
            to="/blogs"
            className="mt-6 inline-block text-amber-600 hover:underline"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
