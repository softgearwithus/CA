import { Link, useLocation, useNavigate } from "react-router-dom";

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

  const handleServicesClick = () => {
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

  return (
    <nav className="sticky bottom-0 top-0 z-50 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-300 shadow-xl">
      <div className="hidden md:flex justify-center gap-10 py-4 text-lg text-white font-bold">
        {navLinks.map((link) =>
          link.name === "Services" ? (
            <button
              key={link.name}
              onClick={handleServicesClick}
              className="hover:underline focus:outline-none"
            >
              {link.name}
            </button>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:underline ${
                location.pathname === link.path ? "underline" : ""
              }`}
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
