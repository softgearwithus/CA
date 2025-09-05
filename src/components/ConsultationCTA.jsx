import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function ConsultationCTA() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    alert("Your consultation request has been submitted!");
  };

  return (
    <section className="w-full">
      {/* CTA Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-500 w-full text-center p-10 md:p-16 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <MessageSquare className="mx-auto w-12 h-12 mb-4" />

        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Book a Consultation
        </h2>

        <p className="text-2xl font-semibold bg-white/20 px-5 py-2 rounded-full inline-block mb-4">
          Just ₹299/-
        </p>

        <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl mx-auto">
          Get expert advice from <span className="font-semibold">CS Sandeep Rajbhar</span> 
          on how to legally structure, scale, and stay compliant. 
          No hidden fees — just clarity.
        </p>

        {/* Schedule Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all"
          onClick={() => setShowModal(true)}
        >
          Schedule Now
        </motion.button>
      </motion.div>

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
              Schedule Your Consultation
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
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
