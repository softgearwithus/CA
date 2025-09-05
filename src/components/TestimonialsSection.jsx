import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Hannah Morales",
    feedback:
      "Boost your product and service’s credibility by adding testimonials from your clients. People love recommendations so feedback from others who’ve tried it is invaluable.",
  },
  {
    name: "Teddy Yuhui",
    feedback:
      "Boost your product and service’s credibility by adding testimonials from your clients. People love recommendations so feedback from others who’ve tried it is invaluable.",
  },
  {
    name: "Lorna Alvarado",
    feedback:
      "Boost your product and service’s credibility by adding testimonials from your clients. People love recommendations so feedback from others who’ve tried it is invaluable.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-6 md:px-16 py-16 mt-14 bg-gradient-to-b from-blue-100 to-blue-200 text-center">
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Feedback from Clients
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Why you should hire our firm.
      </motion.p>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 leading-relaxed mb-4">
              “{item.feedback}”
            </p>
            <span className="block text-blue-800 font-semibold italic">
              – {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
