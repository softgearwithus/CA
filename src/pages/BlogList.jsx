import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BottomNavbar from "../components/BottomNavbar";

// Dummy Blog Data
const blogs = [
  {
    id: 1,
    title: "The Future of Technology in India",
    excerpt:
      "India is rapidly evolving as a tech hub. Let's explore the trends shaping its future...",
    content:
      "India is becoming a global leader in technology adoption. With initiatives like Digital India, AI innovation, and the rise of startups, the country is moving towards a strong digital economy. In this blog, we will discuss upcoming tech revolutions such as AI, blockchain, and quantum computing.",
    author: "Ayush Pathania",
    date: "5 Sept 2025",
    image:
      "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "How Startups are Changing the Market",
    excerpt:
      "Startups are driving innovation and transforming industries in India...",
    content:
      "The Indian startup ecosystem has witnessed exponential growth. With government schemes, investor interest, and a young workforce, startups are becoming game-changers. From fintech to edtech, every sector is witnessing disruption.",
    author: "Softgear Team",
    date: "1 Sept 2025",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Why Digital Marketing is Crucial for SMEs",
    excerpt:
      "Small businesses need digital marketing more than ever to stay relevant...",
    content:
      "Digital marketing has become the backbone for SMEs to reach their target audience. With tools like SEO, social media, and paid ads, small businesses can compete with big brands. This blog explains key strategies SMEs must adopt.",
    author: "Softgear Tech",
    date: "28 Aug 2025",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60",
  },
];

const BlogList = () => {
  return (
    <>
      <BottomNavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">Our Blogs</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
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
                  {blog.date} • {blog.author}
                </p>
                <p className="text-gray-700 mb-3">{blog.excerpt}</p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-amber-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;
