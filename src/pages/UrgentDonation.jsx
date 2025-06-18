import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Droplets, Phone } from "lucide-react"
import "../styles/UrgentPage.css"

const UrgentDonation = () => {
  const navigate = useNavigate()

const handleApply = async (center_id) => {
  const user_id =5; 
  const appointment_date = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const type = "urgent";

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

    alert("Urgent booked successfully!");
  } catch (err) {
    console.error("Error:", err);
    alert(`Error: ${err.message}`);
  }
};
  return (
    <div className="urgent-donation-container">
      {/* Header */}
      <div className="urgent-header">
        <h1 className="urgent-title">Urgent</h1>
      </div>

      {/* Main Card */}
      <div className="urgent-card-container">
        <div className="urgent-card">
          <div className="urgent-card-content">
            {/* Hospital Name */}
            <div className="urgent-info-item">
              <MapPin className="urgent-icon" />
              <p className="urgent-hospital-name">King Hussein Cancer Center</p>
            </div>

            {/* Hours */}
            <div className="urgent-info-item">
              <Clock className="urgent-icon" />
              <p className="urgent-info-text">8 AM - 4 PM</p>
            </div>

            {/* Blood Type */}
            <div className="urgent-info-item">
              <Droplets className="urgent-icon" />
              <p className="urgent-info-text">O-, O-</p>
            </div>

            {/* Phone */}
            <div className="urgent-info-item">
              <Phone className="urgent-icon" />
              <p className="urgent-info-text">06-5300460</p>
            </div>

            {/* Apply Button */}
            <button
            className="apply-button"
             onClick={() => handleApply(6)}
              >
                Apply
              </button>

          </div>
        </div>
      </div>

    </div>
  )
}

export default UrgentDonation;
