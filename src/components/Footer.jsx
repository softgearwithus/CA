import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-100 to-slate-200 border-t border-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5" /> 14 Dinanath Chatterjee Street, BELGHARIA Kolkata 56</li>
            <li className="flex items-center gap-3"><Phone className="h-5 w-5" /> +91 9038581472</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5" /> cssandeeprajbhar@gmail.com</li>
          </ul>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Office Hours</h4>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat: 9:00 AM - 12:00 Noon</p>
            <p className="text-red-600 font-medium">Closed on Sundays</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-blue-700">About</a></li>
            <li><a href="#services" className="hover:text-blue-700">Services</a></li>
            <li><a href="#consultation" className="hover:text-blue-700">Consultation</a></li>
            <li><a href="#youtube" className="hover:text-blue-700">YouTube</a></li>
            <li><Link to="/admin" className="hover:text-blue-700">Admin</Link></li>
          </ul>
        </div>

        {/* Core Services */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Core Services</h3>
          <ul className="space-y-2">
            <li>Company Registration</li>
            <li>ROC Filings & Compliance</li>
            <li>Taxation & GST</li>
            <li>FEMA, RBI, ESOPs</li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Policy</h3>
          <ul className="space-y-2">
            <li><a href="#privacy" className="hover:text-blue-700">Privacy Policy</a></li>
            <li><a href="#disclaimer" className="hover:text-blue-700">Disclaimer</a></li>
            <li><a href="#terms" className="hover:text-blue-700">Terms & Conditions</a></li>
          </ul>
          <div className="flex gap-4 mt-6">
            <a href="#"><Facebook className="h-5 w-5 hover:text-blue-600" /></a>
            <a href="#"><Twitter className="h-5 w-5 hover:text-blue-400" /></a>
            <a href="#"><Instagram className="h-5 w-5 hover:text-pink-500" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} CS Sandeep Rajbhar. All Rights Reserved.
      </div>
    </footer>
  );
}