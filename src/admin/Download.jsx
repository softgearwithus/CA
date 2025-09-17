import React, { useState } from "react";

function DownloadAdmin() {
  const [formData, setFormData] = useState({
    companyAct: "",
    section: "",
    mbp: "",
    fileUrl: "",
  });
  const [uploadMessage, setUploadMessage] = useState("");
  const [downloadCount] = useState(42); // dummy count
  const API_URL = import.meta.env.VITE_BACKEND_API;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUploadMessage("✅ File uploaded successfully!");
        setFormData({ companyAct: "", section: "", mbp: "", fileUrl: "" });
      } else {
        setUploadMessage("❌ " + data.message);
      }
    } catch (err) {
      setUploadMessage("⚠️ Server error, please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
        Admin Panel – Manage Downloads
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Upload New File
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="companyAct"
              placeholder="Company Act"
              value={formData.companyAct}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={formData.section}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="mbp"
              placeholder="Form (e.g., MBP 1)"
              value={formData.mbp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="fileUrl"
              placeholder="File URL"
              value={formData.fileUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </form>
          {uploadMessage && (
            <p className="mt-4 text-center font-medium">{uploadMessage}</p>
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Downloads Stats
          </h2>
          <p className="text-5xl font-bold text-blue-700">{downloadCount}</p>
          <p className="text-gray-600 mt-2">Total Downloads</p>
        </div>
      </div>
    </div>
  );
}

export default DownloadAdmin;
