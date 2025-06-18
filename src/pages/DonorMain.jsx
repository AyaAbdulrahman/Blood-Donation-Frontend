import React from 'react';
import { Button, Stack, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/DonorMain.css';
import heroImage from '../assets/hero-image.png';

const DonorMain = () => {

  const navigate = useNavigate();
  const handleHeroClick = () => {
    window.open('https://www.healthline.com/health/benefits-of-donating-blood#benefits', '_blank');
  };

  return (
    <>
      <div className="main-content">
        <div className="content-grid">
          {/* Hero Section */}
          <div className="hero-section">
            <Card className="hero-card" onClick={handleHeroClick}>
              <div className="hero-image-container">
                <Card.Img 
                  variant="top"
                  src={heroImage} 
                  alt="Donate Blood and Save Lives" 
                  className="hero-image"
                />
                <div className="hero-overlay">
                  <div className="hero-text">
                    <Card.Text className="hero-subtitle">SAVE A LIFE</Card.Text>
                    <Card.Title className="hero-title">GIVE BLOOD</Card.Title>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="sidebar">
            {/* Status Buttons */}
            <Stack gap={3} className="status-buttons">
              <Button variant="light" className="status-button urgent"
               onClick={() => navigate('/urgent-donation')}>
                <span className="status-icon">🚨</span>
                <span className="status-text">Urgent</span>
              </Button>
              <Button variant="light" className="status-button available"
              onClick={() => navigate('/available-donation')}>
                <span className="status-icon">📅</span>
                <span className="status-text">Available</span>
              </Button>
              <Button variant="light" className="status-button campaigns"
                onClick={() => navigate('/campaigns')}>
                <span className="status-icon">📢</span>
                <span className="status-text">Campaigns</span>
              </Button>

            </Stack>

            {/* Next Appointments */}
            <div className="appointments-section">
              <h3 className="appointments-title">Next Appointments:</h3>
              <Card className="appointment-card">
                <Card.Body className="appointment-info">
                  <div className="appointment-calendar">
                    📅
                  </div>
                  <Button variant="danger" className="check-status-btn"
                  onClick={() => navigate('/check')}>
                    Check status
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorMain;