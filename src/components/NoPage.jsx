import React from "react";
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Oops! Page not found</p>
      <p className="text-gray-600 mb-6">The page you are looking for doesn’t exist or has been moved.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
