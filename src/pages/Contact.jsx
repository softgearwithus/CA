import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import BottomNavbar from "../components/BottomNavbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
    <BottomNavbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-12 px-6 flex flex-col items-center">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-10"
      >
        Contact Us
      </motion.h1>

      {/* Free Consultation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-white rounded-3xl p-10 max-w-3xl w-full shadow-2xl text-center"
      >
        <h2 className="text-3xl font-extrabold mb-3">
          Book a Free Consultation
        </h2>
        <p className="text-lg opacity-90 mb-6">
          Get expert advice from <span className="font-semibold">CS Sandeep Rajbhar</span> 
          on how to legally structure, scale, and stay compliant. No hidden fees — just clarity.
        </p>
        <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-100 transition">
          Schedule Now
        </button>
      </motion.div>

      {/* Office Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 max-w-6xl w-full">
        
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-lg"
        >
          <iframe
            title="Our Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.2050646436853!2d88.37136207539903!3d22.632105479471373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a4f6b4a7e7%3A0x7d15f52b22d0e7e1!2sBelgharia%2C%20Kolkata%2C%20West%20Bengal%20700056!5e0!3m2!1sen!2sin!4v1694266540000!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>

        {/* Office Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center gap-6 bg-white rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-3xl font-bold text-blue-900 mb-2">Our Office</h3>
          <div className="flex items-start gap-3 text-gray-700">
            <MapPin className="text-blue-600 w-6 h-6 mt-1" />
            <p>
              14 Dinanath Chatterjee Street,
              <br /> Belgharia, Kolkata 700056, West Bengal, India
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-blue-600 w-6 h-6" />
            <p>+91 9038581472</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-blue-600 w-6 h-6" />
            <p>cssandeeprajbhar@gmail.com</p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600 w-6 h-6" />
            <p>Registration No: ************</p>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
