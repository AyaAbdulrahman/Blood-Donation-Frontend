import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; 
import logo from '../assets/logo.png'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-main">
        {/* Left Side - Logo */}
        <div className="home-left">
          <img src={logo} alt="App Logo" className="home-logo" />       
        </div>

        {/* Right Side - Welcome & Buttons */}
        <div className="home-right">
          <h1>Welcome!</h1>
          <p>Are you a...</p>

          {/* Pass donor role to signup */}
          <button onClick={() => navigate("/donor-main", { state: { role: "donor" } })}>
            Donor
          </button>

          <p>or a...</p>

          {/* Pass center role to login */}
          <button onClick={() => navigate("/center-main", { state: { role: "center" } })}>
            Center
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        &copy; 2025 Blood Donation App
      </footer>
    </div>
  );
};

export default Home;
