import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import '../styles/shared.css';

const Shared = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donors/5");
        const data = await res.json();
        setDonors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donors:', error);
        setLoading(false);
      }
    };

    fetchDonor();
  }, []);

  if (loading) {
    return <div className="loading"><Spinner animation="border" variant="danger" /></div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="user-profile">
            <div className="avatar">
              👤
            </div>
            <div className="user-info">
              <div className="full-name">{donors.full_name}</div>
              
            </div>
          </div>
          <div className="date-section">
            
            <div className="date-info">
              <div className="date">
                {new Date(donors.last_donated).toLocaleDateString('en-GB')}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <div className="nav-content">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${location.pathname === '/donor-main' ? 'active' : ''}`}
              onClick={() => navigate('/donor-main')}
            >
              Home
            </button>
            <button 
              className={`nav-tab ${location.pathname === '/profile' ? 'active' : ''}`}
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>

       {/* Footer - Make sure this is at the bottom */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="footer-text">
              Together we save lives through blood donation
            </div>
            <div className="footer-copyright">
              © 2024 Blood Donation App. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    
    </div>
  );
};

export default Shared;
