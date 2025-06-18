import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Droplets, Phone } from "lucide-react";
import "../styles/UrgentPage.css";

const CheckStatus = () => {
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

  return (
    <div className="urgent-donation-container">
      <div className="urgent-header">
        <h1 className="urgent-title">Check Status</h1>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading requests...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {!loading && requests.length === 0 && <p style={{ textAlign: 'center' }}>No requests found.</p>}

      {requests.map((req) => (
        <div className="urgent-card-container" key={req.request_id}>
          <div className="urgent-card">
            <div className="urgent-card-content">
              <div className="urgent-info-item">
                <MapPin className="urgent-icon" />
                <p className="urgent-hospital-name">Center ID: {req.center_id}</p>
              </div>

              <div className="urgent-info-item">
                <Clock className="urgent-icon" />
                <p className="urgent-info-text">8 AM - 4 PM</p>
              </div>

              <div className="urgent-info-item">
                <Droplets className="urgent-icon" />
                <p className="urgent-info-text">{req.blood_type}</p>
              </div>

              <div className="urgent-info-item">
                <Phone className="urgent-icon" />
                <p className="urgent-info-text">06-5300460</p>
              </div>

              <div className="urgent-button-container">
                <div className="urgent-apply-button">Pending</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckStatus;
