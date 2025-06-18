import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import '../styles/EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const userId = 5;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    bloodType: '',
    lastDonated: '',
    location: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/donors/${userId}`);
        const data = await res.json();

        setFormData({
          fullName: data.full_name || '',
          email: data.email || '',
          password: data.password || '',
          phoneNumber: data.phone_number || '',
          bloodType: data.blood_type || '',
          lastDonated: data.last_donated?.split('T')[0] || '',
          location: data.location || ''
        });
      } catch (err) {
        console.error("Failed to fetch donor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/donors/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password,
          blood_type: formData.bloodType,
          last_donated: formData.lastDonated,
          location: formData.location
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile.");
      }

      alert("Profile updated successfully!");
      navigate('/profile');
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container text-center">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <Container className="edit-profile-container">
      <Card className="edit-profile-card">
        <Card.Body className="edit-profile-content">
          <h2 className="edit-profile-title">Edit Profile</h2>
          
          <Form onSubmit={handleSubmit} className="edit-profile-form">
            <Form.Group controlId="fullName">
              <Form.Label className="form-label">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="form-label">Update password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label className="form-label">Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="lastDonated">
              <Form.Label className="form-label">Last Donated</Form.Label>
              <Form.Control
                type="date"
                name="lastDonated"
                value={formData.lastDonated}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="bloodType">
              <Form.Label className="form-label">Blood Type</Form.Label>
              <Form.Select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                disabled
              >
                <option value="" disabled>Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label className="form-label">Location</Form.Label>
              <Form.Select
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="" disabled>Select location</option>
                <option value="Amman">Amman</option>
                <option value="Aqaba">Aqaba</option>
                <option value="Irbid">Irbid</option>
                <option value="Zarqa">Zarqa</option>
                <option value="Madaba">Madaba</option>
              </Form.Select>              
            </Form.Group>

            <Button variant="danger" type="submit" className="save-button">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;
