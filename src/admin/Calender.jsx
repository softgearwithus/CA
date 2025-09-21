import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // keep base calendar styles

const API_URL = import.meta.env.VITE_BACKEND_API;

// Helpers
const isValidDate = (d) => d instanceof Date && !isNaN(d.getTime());

// Convert a Date to a stable local YYYY-MM-DD key
const dateKey = (d) => {
  if (!isValidDate(d)) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

// Parse many incoming date formats robustly and return a Date object (local)
function parseDate(value) {
  if (!value && value !== 0) return null;

  // If already a Date
  if (value instanceof Date) return isValidDate(value) ? value : null;

  // If number (timestamp)
  if (typeof value === "number") {
    const d = new Date(value);
    return isValidDate(d) ? d : null;
  }

  if (typeof value === "string") {
    const s = value.trim();

    // ISO-ish (YYYY-MM-DD or full ISO)
    if (/^\d{4}-\d{2}-\d{2}(T.*|$)/.test(s)) {
      // If it's just YYYY-MM-DD, treat as local midnight
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [y, m, dd] = s.split("-");
        const d = new Date(Number(y), Number(m) - 1, Number(dd)); // local midnight
        return isValidDate(d) ? d : null;
      }
      // full ISO/timezone
      const d = new Date(s);
      if (isValidDate(d)) return d;
    }

    // DD-MM-YYYY or DD/MM/YYYY
    if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(s)) {
      const parts = s.split(/[-/]/);
      const [dd, mm, yyyy] = parts;
      const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd)); // local
      return isValidDate(d) ? d : null;
    }

    // Try loose parse fallback
    const loose = new Date(s);
    if (isValidDate(loose)) return loose;
  }

  return null;
}

export default function ComplianceAdmin() {
  const [updates, setUpdates] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    updateTitle: "",
    updateDate: "", // input type="date" gives YYYY-MM-DD
    newsletterMonth: "",
    newsletterDriveLink: "",
    eventTitle: "",
    eventDesc: "",
    eventDue: "", // input type="date" gives YYYY-MM-DD
  });

  const [selectedDate, setSelectedDate] = useState(null); // for click-to-show

  // Fetch
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [uRes, nRes, eRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/compliance/update`).then((r) => r.json()),
        fetch(`${API_URL}/api/admin/compliance/newsletter`).then((r) =>
          r.json()
        ),
        fetch(`${API_URL}/api/admin/compliance/event`).then((r) => r.json()),
      ]);

      setUpdates(Array.isArray(uRes) ? uRes : uRes.data || []);
      setNewsletters(Array.isArray(nRes) ? nRes : nRes.data || []);
      setEvents(Array.isArray(eRes) ? eRes : eRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Create local-midnight Date from YYYY-MM-DD and save as ISO
  const makeISOFromInputDate = (yyyyMmDd) => {
    if (!yyyyMmDd) return null;
    const [y, m, d] = yyyyMmDd.split("-");
    const local = new Date(Number(y), Number(m) - 1, Number(d)); // local midnight
    return local.toISOString(); // store as ISO (UTC) but originated from local midnight
  };

  const addUpdate = async () => {
    if (!formData.updateTitle || !formData.updateDate)
      return alert("Title and Date are required");

    const iso = makeISOFromInputDate(formData.updateDate);

    await fetch(`${API_URL}/api/admin/compliance/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: formData.updateTitle, date: iso }),
    });

    setFormData((p) => ({ ...p, updateTitle: "", updateDate: "" }));
    fetchData();
  };

  const addNewsletter = async () => {
    if (!formData.newsletterMonth) return alert("Month is required");

    await fetch(`${API_URL}/api/admin/compliance/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        month: formData.newsletterMonth,
        driveLink: formData.newsletterDriveLink,
      }),
    });

    setFormData((p) => ({ ...p, newsletterMonth: "", newsletterDriveLink: "" }));
    fetchData();
  };

  const addEvent = async () => {
    if (!formData.eventTitle || !formData.eventDesc || !formData.eventDue)
      return alert("All event fields are required");

    const iso = makeISOFromInputDate(formData.eventDue);

    await fetch(`${API_URL}/api/admin/compliance/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.eventTitle,
        desc: formData.eventDesc,
        due: iso,
      }),
    });

    setFormData((p) => ({ ...p, eventTitle: "", eventDesc: "", eventDue: "" }));
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

  // Build maps keyed by local YYYY-MM-DD for calendar matching
  const eventsByKey = {};
  events.forEach((ev) => {
    const d = parseDate(ev.due || ev.date || ev.createdAt);
    const k = dateKey(d);
    if (k) {
      eventsByKey[k] = eventsByKey[k] || [];
      eventsByKey[k].push(ev);
    } else {
      console.warn("Invalid event date:", ev);
    }
  });

  const updatesByKey = {};
  updates.forEach((up) => {
    const d = parseDate(up.date);
    const k = dateKey(d);
    if (k) {
      updatesByKey[k] = updatesByKey[k] || [];
      updatesByKey[k].push(up);
    } else {
      // don't spam console but keep note
      // console.warn("Invalid update date:", up);
    }
  });

  // Calendar tile content: show small colored dots for updates/events
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const k = dateKey(date);
    const evs = eventsByKey[k] || [];
    const ups = updatesByKey[k] || [];
    if (!evs.length && !ups.length) return null;

    return (
      <div className="flex items-center justify-center mt-1 space-x-1">
        {ups.length > 0 && (
          <span
            title={`${ups.length} update(s)`}
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: "#16a34a" }} // green-500
          />
        )}
        {evs.length > 0 && (
          <span
            title={`${evs.length} event(s)`}
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: "#2563eb" }} // blue-600
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6">
        Admin Panel — Compliance Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Updates */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-3">Compliance Updates</h2>

          <div className="space-y-2">
            {updates.map((u) => {
              const d = parseDate(u.date);
              return (
                <div
                  key={u._id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <div>
                    <div className="font-medium">{u.title}</div>
                    <div className="text-xs text-gray-600">
                      {d ? d.toLocaleDateString("en-IN") : "Invalid date"}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete("update", u._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              name="updateTitle"
              value={formData.updateTitle}
              onChange={handleChange}
              placeholder="Title"
              className="flex-1 border p-2 rounded"
            />
            <input
              name="updateDate"
              type="date"
              value={formData.updateDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <button
              onClick={addUpdate}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Newsletters */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-3">Newsletters</h2>

          <div className="space-y-2">
            {newsletters.map((n) => (
              <div
                key={n._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <a
                  href={n.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  {n.month}
                </a>
                <button
                  onClick={() => handleDelete("newsletter", n._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              name="newsletterMonth"
              value={formData.newsletterMonth}
              onChange={handleChange}
              placeholder="Month"
              className="flex-1 border p-2 rounded"
            />
            <input
              name="newsletterDriveLink"
              value={formData.newsletterDriveLink}
              onChange={handleChange}
              placeholder="Drive Link"
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={addNewsletter}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Events */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-3">Events</h2>

          <div className="space-y-2">
            {events.map((ev) => {
              const d = parseDate(ev.due);
              return (
                <div
                  key={ev._id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <div>
                    <div className="font-medium">{ev.title}</div>
                    <div className="text-xs text-gray-600">
                      {ev.desc} — {d ? d.toLocaleDateString("en-IN") : "Invalid"}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete("event", ev._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-3 space-y-2">
            <input
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded"
            />
            <input
              name="eventDesc"
              value={formData.eventDesc}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
            />
            <div className="flex gap-2">
              <input
                name="eventDue"
                type="date"
                value={formData.eventDue}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <button
                onClick={addEvent}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-3">Compliance Calendar</h2>

        <Calendar
          onClickDay={(d) => setSelectedDate(d)}
          tileContent={tileContent}
          className="react-calendar w-full border rounded-lg p-2"
        />

        {/* Selected day details */}
        <div className="mt-4">
          <h3 className="font-medium">
            {selectedDate ? `Selected: ${dateKey(selectedDate)}` : "Click a date to see items"}
          </h3>
          {selectedDate && (
            <div className="mt-2 space-y-2">
              {(() => {
                const k = dateKey(selectedDate);
                const ups = updatesByKey[k] || [];
                const evs = eventsByKey[k] || [];
                if (!ups.length && !evs.length) {
                  return <div className="text-sm text-gray-600">No updates or events.</div>;
                }
                return (
                  <>
                    {ups.map((u) => (
                      <div key={u._id} className="p-2 bg-green-50 rounded">
                        <div className="font-medium">{u.title}</div>
                        <div className="text-xs text-gray-600">{parseDate(u.date)?.toLocaleString()}</div>
                      </div>
                    ))}
                    {evs.map((ev) => (
                      <div key={ev._id} className="p-2 bg-blue-50 rounded">
                        <div className="font-medium">{ev.title}</div>
                        <div className="text-xs text-gray-600">{ev.desc}</div>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
