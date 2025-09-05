import { motion } from "framer-motion";

const complianceUpdates = [
  { title: "MCA new Update etc...", date: "Dated" },
  { title: "SEBI new Update etc...", date: "Dated" },
  { title: "RBI new Update etc...", date: "Dated" },
];

const newsletters = [
  { month: "July 2025" },
  { month: "Aug 2025" },
  { month: "Sept 2025" },
];

const complianceEvents = [
  { title: "Compliance", desc: "Filing for GSTR 3B", due: "Due Date" },
  { title: "Compliance", desc: "Filing for GSTR 3B", due: "Due Date" },
];

export default function ComplianceSection() {
  return (
    <section className="px-6 md:px-16 py-12 mt-14 bg-gradient-to-r from-blue-100 to-blue-200 max-w-7xl mx-auto rounded-xl shadow-lg">
      {/* Section Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Compliance Center
      </motion.h2>

      {/* Flex Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Compliance Update */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Compliance Update
          </h3>
          <div className="space-y-4">
            {complianceUpdates.map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-100 rounded-lg p-3 shadow-sm hover:bg-blue-200 transition"
              >
                <p className="text-gray-800 font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Newsletter
          </h3>
          <div className="space-y-4">
            {newsletters.map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-100 rounded-lg p-3 shadow-sm hover:bg-blue-200 transition flex justify-between items-center"
              >
                <p className="text-gray-700">Monthly Newsletter</p>
                <p className="text-lg font-semibold text-blue-900">
                  {item.month}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Calendar */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Compliance Calendar
          </h3>
          <div className="bg-black text-white rounded-lg text-center font-bold text-lg py-3 mb-4">
            JULY 2025
          </div>
          <div className="space-y-4">
            {complianceEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-blue-100 rounded-lg p-3 shadow-sm hover:bg-blue-200 transition"
              >
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">{event.desc}</p>
                <p className="text-sm text-gray-700">{event.due}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
