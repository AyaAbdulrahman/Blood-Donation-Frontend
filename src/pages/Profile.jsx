import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <Container className="profile-container">
      <Card className="profile-card">
        <Card.Body className="profile-options">
          <Button 
            variant="light" 
            className="profile-option"
            onClick={() => navigate('/edit-profile')}
          >
            Edit information
            <span className="option-arrow">→</span>
          </Button>

          <Button 
            variant="light" 
            className="profile-option logout"
            onClick={() => navigate('/home')}

          >
            Logout
            <span className="option-arrow">→</span>
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;