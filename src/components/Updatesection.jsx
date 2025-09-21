import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function ComplianceSection() {
  const [updates, setUpdates] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [events, setEvents] = useState([]);

  // Default month = September 2025
  const [year] = useState(2025);
  const [month] = useState(8); // 0 = Jan, so 8 = Sept

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [u, n, e] = await Promise.all([
        fetch(`${API_URL}/api/admin/compliance/update`).then((res) => res.json()),
        fetch(`${API_URL}/api/admin/compliance/newsletter`).then((res) => res.json()),
        fetch(`${API_URL}/api/admin/compliance/event`).then((res) => res.json()),
      ]);
      setUpdates(u);
      setNewsletters(n);
      setEvents(e);
    } catch (err) {
      console.error("Error fetching compliance data:", err);
    }
  };

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      calendar.push(week);
    }
    return calendar;
  };

  const calendar = generateCalendar(year, month);
  const eventDates = events.map((e) => new Date(e.due).getDate());

  return (
    <section className="px-6 md:px-16 py-12 mt-14 bg-gradient-to-r from-blue-100 to-blue-200 max-w-7xl mx-auto rounded-xl shadow-lg">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Compliance Center
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Compliance Update */}
        <motion.div className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Compliance Update</h3>
          <div className="space-y-4">
            {updates.map((item) => (
              <div key={item._id} className="bg-blue-100 rounded-lg p-3 shadow-sm hover:bg-blue-200 transition">
                <p className="text-gray-800 font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Newsletter</h3>
          <div className="space-y-4">
            {newsletters.map((item) => (
              <div key={item._id} className="bg-blue-100 rounded-lg p-3 shadow-sm hover:bg-blue-200 transition flex justify-between items-center">
                <p className="text-gray-700">Monthly Newsletter</p>
                <p className="text-lg font-semibold text-blue-900">{item.month}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Calendar */}
        <motion.div className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Compliance Calendar</h3>
          <div className="bg-black text-white rounded-lg text-center font-bold text-lg py-3 mb-4">
            {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="font-semibold text-gray-700">{d}</div>
            ))}
            {calendar.flat().map((day, idx) => (
              <div key={idx} className={`h-10 flex items-center justify-center rounded-md ${
                day ? eventDates.includes(day) ? "bg-blue-500 text-white font-bold" : "bg-blue-100 text-gray-800" : ""
              }`}>
                {day || ""}
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {events.map((event) => (
              <div key={event._id} className="bg-blue-100 rounded-lg p-3 shadow-sm hover:bg-blue-200 transition">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">{event.desc}</p>
                <p className="text-sm text-gray-700">Due: {new Date(event.due).toDateString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
