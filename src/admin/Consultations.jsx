import { useEffect, useState } from "react";
import axios from "axios";

export default function Consultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/consultations");
        if (res.data.success) {
          setConsultations(res.data.data);
        } else {
          setError("Failed to fetch consultations.");
        }
      } catch (err) {
        console.error("Error fetching consultations:", err);
        setError("Could not fetch consultations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  if (loading) return <p className="text-gray-500">Loading consultations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Consultations</h1>

      {consultations.length === 0 ? (
        <p className="text-gray-600">No consultations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Email</th>
                <th className="px-4 py-2 text-left border-b">Phone</th>
                <th className="px-4 py-2 text-left border-b">Message</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{c.name}</td>
                  <td className="px-4 py-2 border-b">{c.email}</td>
                  <td className="px-4 py-2 border-b">{c.phone}</td>
                  <td className="px-4 py-2 border-b">
                    {c.message || <span className="text-gray-400">No message</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
