import { useEffect, useState } from "react";
import axios from "axios";

export default function ComplianceCenter() {
  const [updates, setUpdates] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [u, n, e] = await Promise.all([
      axios.get("http://localhost:5000/api/admin/compliance/update"),
      axios.get("http://localhost:5000/api/admin/compliance/newsletter"),
      axios.get("http://localhost:5000/api/admin/compliance/event"),
    ]);
    setUpdates(u.data.data);
    setNewsletters(n.data.data);
    setEvents(e.data.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
        Compliance Center
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 📦 Compliance Update */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">
            Compliance Update
          </h2>
          <div className="space-y-3">
            {updates.length === 0 && <p className="text-gray-500">No updates</p>}
            {updates.map((u) => (
              <div
                key={u._id}
                className="p-3 bg-blue-50 rounded-lg shadow-sm"
              >
                <p className="font-medium">{u.title}</p>
                <p className="text-sm text-gray-600">{u.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 📦 Newsletter */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">
            Our Newsletter
          </h2>
          <div className="space-y-3">
            {newsletters.length === 0 && (
              <p className="text-gray-500">No newsletters</p>
            )}
            {newsletters.map((n) => (
              <button
                key={n._id}
                onClick={() => window.open(n.driveLink, "_blank")}
                className="flex justify-between w-full p-3 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100"
              >
                <span>Monthly Newsletter</span>
                <span className="font-bold text-blue-700">
                  {n.month} 2025
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 📦 Compliance Calendar */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">
            Compliance Calendar
          </h2>
          <div className="bg-black text-white text-center rounded-md py-2 mb-4 font-bold">
            {events.length > 0
              ? new Date(events[0].due).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })
              : "No Events"}
          </div>
          <div className="space-y-3">
            {events.length === 0 && (
              <p className="text-gray-500">No compliance events</p>
            )}
            {events.map((e) => (
              <div
                key={e._id}
                className="p-3 bg-blue-50 rounded-lg shadow-sm"
              >
                <p className="font-medium">Compliance</p>
                <p className="text-sm">{e.title}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(e.due).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
