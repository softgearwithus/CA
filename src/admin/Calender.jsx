import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function ComplianceAdmin() {
  const [updates, setUpdates] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    updateTitle: "",
    updateDate: "",
    newsletterMonth: "",
    newsletterDriveLink: "",
    eventTitle: "",
    eventDesc: "",
    eventDue: "",
  });

  // Fetch all data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [u, n, e] = await Promise.all([
        fetch(`${API_URL}/api/admin/compliance/update`).then((r) => r.json()),
        fetch(`${API_URL}/api/admin/compliance/newsletter`).then((r) =>
          r.json()
        ),
        fetch(`${API_URL}/api/admin/compliance/event`).then((r) => r.json()),
      ]);
      setUpdates(u);
      setNewsletters(n);
      setEvents(e);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // ✅ Improved handleChange
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const addUpdate = async () => {
    if (!formData.updateTitle || !formData.updateDate) {
      return alert("Title and Date are required");
    }
    await fetch(`${API_URL}/api/admin/compliance/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.updateTitle,
        date: formData.updateDate,
      }),
    });
    setFormData((prev) => ({ ...prev, updateTitle: "", updateDate: "" }));
    fetchData();
  };

  const addNewsletter = async () => {
    if (!formData.newsletterMonth) return alert("Month is required");

    try {
      const res = await fetch(`${API_URL}/api/admin/compliance/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: formData.newsletterMonth,
          driveLink: formData.newsletterDriveLink, // ✅ always sent
        }),
      });

      const data = await res.json();
      console.log("Saved newsletter:", data);

      setFormData((prev) => ({
        ...prev,
        newsletterMonth: "",
        newsletterDriveLink: "",
      }));

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const addEvent = async () => {
    if (!formData.eventTitle || !formData.eventDesc || !formData.eventDue)
      return alert("All event fields are required");

    await fetch(`${API_URL}/api/admin/compliance/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.eventTitle,
        desc: formData.eventDesc,
        due: formData.eventDue,
      }),
    });

    setFormData((prev) => ({
      ...prev,
      eventTitle: "",
      eventDesc: "",
      eventDue: "",
    }));

    fetchData();
  };

  const handleDelete = async (type, id) => {
    try {
      await fetch(`${API_URL}/api/admin/compliance/${type}/${id}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
        Admin Panel – Compliance Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Compliance Update */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Compliance Update
          </h2>
          <input
            name="updateTitle"
            placeholder="Title"
            value={formData.updateTitle}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            name="updateDate"
            type="date"
            value={formData.updateDate}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={addUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Update
          </button>

          <div className="mt-4 space-y-2">
            {updates.map((u) => (
              <div
                key={u._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {u.title} – {u.date}
                </span>
                <button
                  onClick={() => handleDelete("update", u._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Newsletter
          </h2>
          <input
            name="newsletterMonth"
            placeholder="Month (e.g., Sept 2025)"
            value={formData.newsletterMonth}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
        <input
  name="newsletterDriveLink"
  placeholder="Google Drive Link"
  value={formData.newsletterDriveLink}
  onChange={handleChange}
  className="w-full p-2 mb-2 border rounded"
/>

          <button
            onClick={addNewsletter}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Newsletter
          </button>

          <div className="mt-4 space-y-2">
            {newsletters.map((n) => (
              <div
                key={n._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {n.month}{" "}
                  {n.driveLink && (
                    <a
                      href={n.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline ml-2"
                    >
                      View File
                    </a>
                  )}
                </span>
                <button
                  onClick={() => handleDelete("newsletter", n._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Compliance Event
          </h2>
          <input
            name="eventTitle"
            placeholder="Title"
            value={formData.eventTitle}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            name="eventDesc"
            placeholder="Description"
            value={formData.eventDesc}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            name="eventDue"
            type="date"
            value={formData.eventDue}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={addEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>

          <div className="mt-4 space-y-2">
            {events.map((e) => (
              <div
                key={e._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {e.title} – {e.desc} (Due: {new Date(e.due).toDateString()})
                </span>
                <button
                  onClick={() => handleDelete("event", e._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
