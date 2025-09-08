import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminApp() {
  const [showAuthModal, setShowAuthModal] = useState(true); // Show popup first
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/verify", {
        password,
      });

      if (res.data.success) {
        setShowAuthModal(false); // ✅ Hide popup on success
        setError("");
      }
    } catch (err) {
      setError("Access denied! Wrong password.");
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* ✅ Sidebar */}
      <aside className="w-48 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <nav className="space-y-2">
          <Link className="block hover:bg-gray-700 p-2 rounded" to="/admin">
            Dashboard
          </Link>
          <Link
            className="block hover:bg-gray-700 p-2 rounded"
            to="/admin/consultations"
          >
            Consultations
          </Link>
          <Link
            className="block hover:bg-gray-700 p-2 rounded"
            to="/admin/blogs"
          >
            Blogs
          </Link>
        </nav>
      </aside>

      {/* ✅ Modal Authentication */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-bold text-center mb-4">
              Admin Login
            </h2>
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
