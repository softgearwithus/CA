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
    phone: "",
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
        "http://localhost:5000/api/consultations", // ✅ Your backend URL
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // if backend uses cookies
        }
      );

      console.log("✅ Server Response:", res.data);

      if (res.data.success) {
        alert("Your consultation request has been submitted!");
        setShowModal(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Axios Error:", error);
      if (error.response) {
        console.error("🔴 Response Error:", error.response.data);
        alert(`Server Error: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        console.error("🟠 No response received:", error.request);
        alert("No response from server. Is backend running?");
      } else {
        console.error("⚠️ Setup Error:", error.message);
        alert("Something went wrong. Check console logs.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <FloatingCTA />

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-amber-200 px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
          Sandeep Rajbhar and Associates
        </h1>
        <div className="text-base md:text-lg text-right leading-tight">
          <p>Ph: 9038581472</p>
          <p>Email: cssandeeprajbhar@gmail.com</p>
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
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                placeholder="Your Message (Optional)"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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

      {/* ✅ Bottom Navbar Component */}
      <BottomNavbar />
    </div>
  );
}
