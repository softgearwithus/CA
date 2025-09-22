import { useEffect, useState } from "react";
import axios from "axios";

export default function ComplianceCenter() {
  const [updates, setUpdates] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [events, setEvents] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [u, n, e] = await Promise.all([
        axios.get(`${API_URL}/api/admin/compliance/update`),
        axios.get(`${API_URL}/api/admin/compliance/newsletter`),
        axios.get(`${API_URL}/api/admin/compliance/event`),
      ]);
      setUpdates(u.data.data || []);
      setNewsletters(n.data.data || []);
      setEvents(e.data.data || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  // ✅ Calendar days builder
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // weekday of 1st
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // total days

    const days = [];

    // Empty slots before 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  // ✅ Get events for a given date
  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(
      (e) => new Date(e.due).toDateString() === date.toDateString()
    );
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
            Compliance Updates
          </h2>
          <div className="space-y-3">
            {updates.length === 0 && <p className="text-gray-500">No updates</p>}
            {updates.map((u) => (
              <div key={u._id} className="p-3 bg-blue-50 rounded-lg shadow-sm">
                <p className="font-medium">{u.title}</p>
                <p className="text-xs text-gray-500">
                  {u.date
                    ? new Date(u.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "No date"}
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
                <span className="font-bold text-blue-700">{n.month}</span>
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
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-center font-semibold text-sm mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {getCalendarDays().map((day, i) => {
              const dayEvents = getEventsForDate(day);
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={`h-10 flex items-center justify-center rounded-lg cursor-pointer ${
                    !day
                      ? "bg-transparent"
                      : dayEvents.length > 0
                      ? "bg-red-400 text-white font-bold"
                      : "bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  {day ? day.getDate() : ""}
                </div>
              );
            })}
          </div>

          {/* 📌 Show events for selected date */}
          {selectedDate && (
            <div className="mt-4">
              <h3 className="font-semibold text-blue-700">
                Events on{" "}
                {selectedDate.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </h3>
              <div className="mt-2 space-y-2">
                {getEventsForDate(selectedDate).length === 0 ? (
                  <p className="text-gray-500 text-sm">No events</p>
                ) : (
                  getEventsForDate(selectedDate).map((e) => (
                    <div
                      key={e._id}
                      className="p-2 bg-blue-50 rounded-lg shadow-sm"
                    >
                      <p className="text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.desc}</p>
                      <p className="text-xs text-gray-500">
                        Due:{" "}
                        {new Date(e.due).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 📦 Full Event Details Section */}
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          All Compliance Events
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No compliance events available</p>
        ) : (
          <div className="space-y-3">
            {events.map((e) => (
              <div
                key={e._id}
                className="p-3 bg-blue-50 rounded-lg shadow-sm"
              >
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-gray-600">{e.desc}</p>
                <p className="text-xs text-gray-500">
                  Due:{" "}
                  {new Date(e.due).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
