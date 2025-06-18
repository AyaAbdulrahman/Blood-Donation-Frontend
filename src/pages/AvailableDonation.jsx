import '../styles/AvailableDonation.css';
import React, { useEffect, useState } from 'react';

const AvailableDonations = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/requests'); 
      if (!res.ok) throw new Error('Failed to fetch requests');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

const handleApply = async (center_id) => {
  const user_id =5; 
  const appointment_date = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const type = "available";

  try {
    const res = await fetch("http://localhost:5000/api/appointments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id, center_id, appointment_date, type })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to book appointment.");
    }

    alert("Appointment booked successfully!");
  } catch (err) {
    console.error("Error:", err);
    alert(`Error: ${err.message}`);
  }
};

  return (
    <div>
      <h2>Available Blood Requests</h2>
      {loading && <p>Loading requests...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      {requests.length === 0 && !loading && <p>No available requests at the moment.</p>}

      {requests.map((req) => (
        <div className="center-card" key={req.request_id}>
          <div className="availability-badge">Available</div>

          <div className="center-info">
            <h2 className="center-name">Center ID: {req.center_id}</h2> 
            <div className="center-details">
              <div className="detail-item">
                <span className="detail-label">Blood Type:</span>
                <span className="detail-value">{req.blood_type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Units Needed:</span>
                <span className="detail-value">{req.units_needed}</span>
              </div>
            </div>
          </div>

          <button
            className="apply-button"
            onClick={() => handleApply(req.center_id)}
            >
            Apply
            </button>

        </div>
      ))}
    </div>
  );
};

export default AvailableDonations;
