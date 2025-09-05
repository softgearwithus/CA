import { motion } from "framer-motion";
import sandeep from "../assets/sandeep.jpg";

export default function AboutSection() {
  return (
    <section
      id="about-us"
      className="px-6 md:px-16 py-12 mt-10 bg-[#f5f7fa] rounded-xl shadow-md max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 border border-gray-200"
    >
      {/* Left Content */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Us
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4">
          I’m <strong>CS Sandeep Rajbhar</strong>, a passionate Company Secretary
          dedicated to helping Startups, MSMEs, and growing businesses stay
          compliant while scaling with confidence. With proven expertise in
          Company Law, ROC filings, Taxation, FEMA, GST, and Startup Advisory, I
          have successfully guided <strong>100+ clients</strong> — from
          incorporation and fundraising to compliance management and strategic
          exits.
        </p>
        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6">
          Beyond practice, I simplify complex legal and compliance topics through
          my YouTube channel <strong>“Synopsis 24”</strong>, where I teach
          thousands of entrepreneurs and professionals about company compliance,
          ESOPs, investor documentation, and practical legal insights — in a
          clear, relatable way.
        </p>
        <button className="px-6 py-3 rounded-md bg-gray-900 text-white text-base font-medium shadow-md hover:bg-gray-800 transition">
          GET IN TOUCH
        </button>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src={sandeep}
          alt="CS Sandeep Rajbhar"
          className="rounded-2xl shadow-lg w-64 md:w-80 object-cover"
        />
      </motion.div>
    </section>
  );
}
