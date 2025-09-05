import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import BottomNavbar from "../components/BottomNavbar";

// Same blog data (could be moved to a separate file in future)
const blogs = [
  {
    id: 1,
    title: "The Future of Technology in India",
    content:
      "India is becoming a global leader in technology adoption. With initiatives like Digital India, AI innovation, and the rise of startups, the country is moving towards a strong digital economy. In this blog, we will discuss upcoming tech revolutions such as AI, blockchain, and quantum computing.",
    author: "Ayush Pathania",
    date: "5 Sept 2025",
    image:
      "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "How Startups are Changing the Market",
    content:
      "The Indian startup ecosystem has witnessed exponential growth. With government schemes, investor interest, and a young workforce, startups are becoming game-changers. From fintech to edtech, every sector is witnessing disruption.",
    author: "Softgear Team",
    date: "1 Sept 2025",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Why Digital Marketing is Crucial for SMEs",
    content:
      "Digital marketing has become the backbone for SMEs to reach their target audience. With tools like SEO, social media, and paid ads, small businesses can compete with big brands. This blog explains key strategies SMEs must adopt.",
    author: "Softgear Tech",
    date: "28 Aug 2025",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Blog Not Found</h2>
        <Link to="/blogs" className="text-amber-600 underline">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <BottomNavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-60 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          {blog.date} • {blog.author}
        </p>
        <p className="text-gray-800 leading-relaxed">{blog.content}</p>

        <div className="mt-6">
          <Link to="/blogs" className="text-amber-600 font-semibold hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
