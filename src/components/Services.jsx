import { motion } from "framer-motion";

const services = [
  "Incorporation of Co/LLP",
  "IEPF Claim",
  "Tax Planning",
  "Book Keeping & Advisory",
  "Corporate Restructuring",
  "Due Diligence",
  "RBI & FEMA",
  "Strike off of Co/LLP",
  "Revival of Company",
  "GST",
  "Project Finance",
  "Project Report",
  "Drafting",
  "NGO & Section-8 Co",
  "CFO Services / Payroll Management",
  "Secretarial Audit",
  "Listing Compliances",
  "Merger & Amalgamation",
];

export default function ServicesSection() {
  return (
    <section id="services" className="px-6 md:px-20 py-12 mt-16 bg-[#e6e6e6] rounded-xl shadow-md max-w-6xl mx-auto">
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-blue-900 mb-10 text-left"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Our Services
      </motion.h2>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm text-center py-4 px-2 text-gray-700 font-medium text-base md:text-lg hover:shadow-md transition cursor-default"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {service}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
