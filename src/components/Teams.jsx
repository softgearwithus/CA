import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "CS Sandeep Rajbhar",
    title: "Founder & Lead Consultant",
    description:
      "A qualified Company Secretary and Compliance Trainer, specializing in Corporate Law, Taxation, FEMA, and Secretarial Advisory. With years of experience, he has helped numerous organizations strengthen their compliance framework and grow sustainably.",
  },
  {
    name: "CS N Agrawal",
    title: "Senior Consultant",
    description:
      "Specializes in Corporate Law, Taxation, FEMA, and Listed Company Compliance. She is known for her attention to detail and ability to simplify complex legal processes for clients.",
  },
  {
    name: "CS G Singh",
    title: "Consultant",
    description:
      "Specializing in Taxation, GST, Listed Company Compliance, and NBFC Matters. Gurv has worked with domestic and overseas clients to ensure accurate filings and smooth compliance.",
  },
  {
    name: "CS H Adwani",
    title: "Consultant",
    description:
      "Expert in Secretarial work and Accounts. Hyasha ensures timely filings and assists in planning and regulatory adherence for both SMEs and large corporates.",
  },
  {
    name: "A Bhagat",
    title: "Legal Consultant",
    description:
      "Consultant at a renowned Law Proprietorship Firm and specializes in Incorporation, FEMA filings, and approvals, assisting legal requirements, ISO, and ROC-related registrations, and day-to-day compliance matters.",
  },
  {
    name: "Adv. P Kumar",
    title: "Legal Consultant",
    description:
      "Corporate Lawyer with a focus on Intellectual Property Rights. Assists clients with trademarks, designs, and patents. Has worked for HNI and global accounts for robust intellectual approach.",
  },
  {
    name: "CA N Sadani",
    title: "Tax & Indirect Law Consultant",
    description:
      "Tax & Indirect Law professional specializing in GST, Business Setup, Corporate Taxation, and Labour Regulations, helping clients remain compliant with both domestic and export norms.",
  },
];

export default function ExpertTeam() {
  return (
    <div className="bg-blue-50 py-16 px-6 flex flex-col items-center">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        Meet Our <span className="text-blue-600">Expert Team</span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-gray-700 max-w-4xl text-center mb-12"
      >
        At Sandeep Rajbhar & Associates (SRA), we believe that the right team is
        the backbone of delivering exceptional corporate compliance and advisory
        services. Our panel consists of experienced Company Secretaries,
        Chartered Accountants, Lawyers, and Consultants, each bringing unique
        expertise to help clients navigate the complexities of law, taxation,
        and business compliance.
      </motion.p>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-blue-900">{member.name}</h3>
            <p className="text-sm font-semibold text-blue-600 mb-2">
              {member.title}
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              {member.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
