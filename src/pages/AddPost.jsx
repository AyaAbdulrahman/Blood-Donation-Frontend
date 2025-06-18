import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import '../styles/AddPost.css';

const AddPost = () => {
  const [centers, setCenters] = useState([]);
  const [form, setForm] = useState({
    bloodTypes: [],
    urgency: 'normal',
    targetAmount: '450',
    date: '2025-01-30'
  });

  const handleCheckboxChange = (type) => {
    setForm((prev) => ({
      ...prev,
      bloodTypes: prev.bloodTypes.includes(type)
        ? prev.bloodTypes.filter((bt) => bt !== type)
        : [...prev.bloodTypes, type]
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const center_id = 6; 
  const units_needed = parseInt(form.targetAmount);

  if (!center_id || form.bloodTypes.length === 0 || !units_needed) {
    alert("Please fill out all required fields.");
    return;
  }

  try {
    for (const bloodType of form.bloodTypes) {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          center_id,
          blood_type: bloodType,
          units_needed,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }
      console.log("Success:", data);
    }

    alert("Post(s) submitted successfully!");
    // Optionally reset form here
  } catch (error) {
    console.error("Submission error:", error);
    alert(`Error: ${error.message}`);
  }
};


  return (
    <div className="add-post-container">
      {/* Header */}
      <header className="add-post-header">
        <div className="header-left">
          <div className="logo">
            <div className="center-name">{centers.center_name || 'Center Name'}</div>
          </div>
        </div>
        <button className="logout-btn">Log out</button>
      </header>

      {/* Main Content */}
      <Container className="add-post-main">
        <div className="form-wrapper">
          <h2 className="form-title">Add post</h2>
          
          <Card className="form-card">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Blood Types Section */}
                <div className="form-section">
                  <Form.Label className="section-label">Blood Types Needed</Form.Label>
                  <div className="blood-types-grid">
                    <div className="blood-types-column">
                      {['AB+', 'O+', 'A+', 'B+'].map((type) => (
                        <Form.Check
                          key={type}
                          type="checkbox"
                          id={`blood-${type}`}
                          label={type}
                          checked={form.bloodTypes.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                          className="blood-type-checkbox"
                        />
                      ))}
                    </div>
                    <div className="blood-types-column">
                      {['AB-', 'O-', 'A-', 'B-'].map((type) => (
                        <Form.Check
                          key={type}
                          type="checkbox"
                          id={`blood-${type}`}
                          label={type}
                          checked={form.bloodTypes.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                          className="blood-type-checkbox"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Urgency Level Section */}
                <div className="form-section">
                  <Form.Label className="section-label">Urgency Level</Form.Label>
                  <div className="urgency-options">
                    <Form.Check
                      type="radio"
                      name="urgency"
                      id="normal"
                      label={
                        <div className="urgency-label">
                          <span className="urgency-type">Normal</span>
                        </div>
                      }
                      checked={form.urgency === 'normal'}
                      onChange={() => setForm({ ...form, urgency: 'normal' })}
                      className="urgency-radio"
                    />
                    <Form.Check
                      type="radio"
                      name="urgency"
                      id="campaign"
                      label={
                        <div className="urgency-label">
                          <span className="urgency-type">Campaign</span>
                        </div>
                      }
                      checked={form.urgency === 'campaign'}
                      onChange={() => setForm({ ...form, urgency: 'campaign' })}
                      className="urgency-radio"
                    />
                    <Form.Check
                      type="radio"
                      name="urgency"
                      id="urgent"
                      label={
                        <div className="urgency-label">
                          <span className="urgency-type">Urgent</span>
                        </div>
                      }
                      checked={form.urgency === 'urgent'}
                      onChange={() => setForm({ ...form, urgency: 'urgent' })}
                      className="urgency-radio"
                    />
                  </div>
                </div>

                {/* Target Amount Section */}
                <div className="form-section">
                  <Form.Label className="section-label">Target Amount (milliliters)</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.targetAmount}
                    onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
                    placeholder="450"
                    className="form-input"
                  />
                </div>

                {/* Date Section */}
                <div className="form-section">
                  <Form.Label className="section-label">Date</Form.Label>
                  <div className="date-input-wrapper">
                    <Form.Control
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="form-input date-input"
                    />
                    <FaCalendarAlt className="calendar-icon" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="submit-section">
                  <Button type="submit" className="submit-btn">
                    Post
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AddPost;
