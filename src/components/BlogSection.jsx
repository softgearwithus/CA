import { motion } from "framer-motion";
import { Search, Mic } from "lucide-react";

const blogs = [
  {
    title: "What is DIN No?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBmFJWkUXLY5wqN_qPOsuzUJPkx-7QwoFQEg&s",
    description:
      "What's special about your services or offerings? Give your audience a reason to choose you over your competition. Cite it above, then flesh it out here.",
  },
  {
    title: "Roc Action in case of Duplicate DIN",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/9/345280957/ZT/GY/XA/106212346/roc-compliance-service-500x500.jpg",
    description:
      "What's special about your services or offerings? Give your audience a reason to choose you over your competition. Cite it above, then flesh it out here.",
  },
  {
    title: "Process to get FCRA",
    image:
      "data:image/jpeg;base64,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",
    description:
      "What's special about your services or offerings? Give your audience a reason to choose you over your competition. Cite it above, then flesh it out here.",
  },
];

const filters = ["Company Law", "Gst.", "Tax.", "RBI.", "Other"];

export default function BlogSection() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            className="bg-[#E6C69D] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {blog.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
