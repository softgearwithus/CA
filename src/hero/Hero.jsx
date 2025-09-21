import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import FloatingCTA from "../components/FloatingCTA";
import BottomNavbar from "../components/BottomNavbar";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    visitedBy: "",
    phone: "",
    designation: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Form submitted with data:", formData);

    setLoading(true);

    try {
      const res = await axios.post(
        "https://ca-backend-tau.vercel.app/api/consultations",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("✅ Server Response:", res.data);

      if (res.data.success) {
        alert("Your consultation request has been submitted!");
        setShowModal(false);
        setFormData({
          name: "",
          email: "",
          visitedBy: "",
          phone: "",
          designation: "",
          address: "",
          message: "",
        });
      } else {
        alert("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Axios Error:", error);
      alert("Something went wrong. Check console logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <FloatingCTA />

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-amber-200 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4 flex-shrink-0">
          <img
            src="/src/assets/logo.jpg"
            alt="Logo"
            className="h-16 w-16 object-cover rounded-full border-2 border-black shadow-sm"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
            Sandeep Rajbhar and Associates
          </h1>
        </div>
        <div className="flex-shrink-0 text-sm md:text-base text-right leading-tight text-blue-800">
          <p className="font-medium">Ph: 9038581472</p>
          <p className="font-medium">Email: cssandeeprajbhar@gmail.com</p>
        </div>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold text-blue-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Mycs<span className="text-red-500">O</span>nline
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-gray-700 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          from startup to Scale-up
        </motion.p>

        <motion.div
          className="mt-8 flex gap-6 flex-wrap justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white text-lg font-semibold shadow-md hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            Book Free Consultation
          </button>
          <a
            href="https://www.youtube.com/@Synopsis24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl border border-blue-400 text-blue-600 text-lg font-semibold hover:bg-blue-100 transition"
          >
            Explore YouTube Channel
          </a>
        </motion.div>
      </main>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[1000]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
              Book Your Free Consultation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Visited By */}
              <select
                name="visitedBy"
                value={formData.visitedBy}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Visited here by...</option>
                <option value="Youtube">Youtube</option>
                <option value="Facebook Page">Facebook Page</option>
                <option value="Google Search">Google Search</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Other">Other</option>
              </select>

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Designation */}
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Designation</option>
                <option value="Director/Founder/Business Owner">Director/Founder/Business Owner</option>
                <option value="CA/CS/CMA/Adv">CA / CS / CMA / Adv</option>
                <option value="Investor/IEPF">Investor / IEPF</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>

              {/* Address */}
              <textarea
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder="Please share your problem in short"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
