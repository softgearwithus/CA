// FloatingCTA.jsx
import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-16 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919038581472"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg transition transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Call Button */}
      <a
        href="tel:+919038581472"
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg transition transform hover:scale-110"
        aria-label="Call Now"
      >
        <FaPhoneAlt size={24} />
      </a>
    </div>
  );
}
