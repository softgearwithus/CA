import React, { useState, useEffect } from "react";

function DownloadAdmin() {
  const [formData, setFormData] = useState({
    companyAct: "",
    section: "",
    mbp: "",
    fileUrl: "",
  });
  const [uploads, setUploads] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [downloadCount, setDownloadCount] = useState(0);
  const API_URL = import.meta.env.VITE_BACKEND_API;

  // Fetch all downloads
  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/download`);
        const data = await res.json();
        setUploads(data);
        setDownloadCount(data.length);
      } catch (error) {
        console.error("Error fetching downloads:", error);
      }
    };
    fetchDownloads();
  }, [API_URL]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Ensure only Google Drive link is accepted
    if (!formData.fileUrl.includes("drive.google.com")) {
      setUploadMessage("❌ Please provide a valid Google Drive link.");
      return;
    }

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
        setUploads((prev) => [...prev, data]);
        setDownloadCount((prev) => prev + 1);
      } else {
        setUploadMessage("❌ " + data.message);
      }
    } catch (err) {
      setUploadMessage("⚠️ Server error, please try again later.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/download/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUploads((prev) => prev.filter((item) => item._id !== id));
        setDownloadCount((prev) => prev - 1);
      } else {
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // ✅ Convert Google Drive share link → direct download link
  const getDirectDownloadLink = (url) => {
    try {
      if (url.includes("file/d/")) {
        const fileId = url.split("file/d/")[1].split("/")[0];
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
      return url; // fallback if invalid
    } catch {
      return url;
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
              placeholder="Google Drive File URL"
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
          <p className="text-gray-600 mt-2">Total Files</p>
        </div>
      </div>

      {/* Download List */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Available Downloads
        </h2>
        {uploads.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Company Act</th>
                <th className="p-3">Section</th>
                <th className="p-3">Form</th>
                <th className="p-3">File</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{item.companyAct}</td>
                  <td className="p-3">{item.section}</td>
                  <td className="p-3">{item.mbp}</td>
                  <td className="p-3">
                    <a
                      href={getDirectDownloadLink(item.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DownloadAdmin;
