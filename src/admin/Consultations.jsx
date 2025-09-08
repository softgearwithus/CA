import { useEffect, useState } from "react";
import axios from "axios";

export default function Consultations() {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/consultations")
      .then(res => setConsultations(res.data))
      .catch(() => console.log("Could not fetch consultations"));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Consultations</h1>
      {consultations.length === 0 ? (
        <p>No consultations yet.</p>
      ) : (
        <ul className="space-y-2">
          {consultations.map((c) => (
            <li key={c._id} className="bg-white p-2 rounded shadow">
              <strong>{c.name}</strong> - {c.email} <br />
              {c.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
