import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "#services" }, // handled manually
  { name: "Blogs", path: "/blogs" },
  { name: "Downloads", path: "/downloads" },
  { name: "Vacancy", path: "/vacancy" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

export default function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleServicesClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu
    if (location.pathname === "/") {
      // Already on home page, just scroll
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home first and add state so home can scroll later
      navigate("/", { state: { scrollTo: "services" } });
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when any link is clicked
  };

  return (
    <nav className="sticky bottom-0 md:top-0 z-50 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-300 shadow-xl">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center gap-6 lg:gap-10 py-4 text-base lg:text-lg text-white font-bold">
        {navLinks.map((link) =>
          link.name === "Services" ? (
            <button
              key={link.name}
              onClick={handleServicesClick}
              className="hover:underline focus:outline-none transition-all duration-200 px-2 py-1"
            >
              {link.name}
            </button>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:underline transition-all duration-200 px-2 py-1 ${location.pathname === link.path ? "underline" : ""
                }`}
            >
              {link.name}
            </Link>
          )
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header with Hamburger */}
        <div className="flex justify-between items-center px-4 py-3">
          <span className="text-white font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 px-4 pb-4">
            {navLinks.map((link) =>
              link.name === "Services" ? (
                <button
                  key={link.name}
                  onClick={handleServicesClick}
                  className="block w-full text-left text-white font-semibold py-3 px-2 hover:bg-white/20 rounded-lg transition-all duration-200 focus:outline-none focus:bg-white/20"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`block text-white font-semibold py-3 px-2 hover:bg-white/20 rounded-lg transition-all duration-200 ${location.pathname === link.path ? "bg-white/20" : ""
                    }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
