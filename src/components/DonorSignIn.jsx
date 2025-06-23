import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Auth.css'; 

const DonorSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const location = useLocation(); 
  const role = location.state?.role || "donor";

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credential: email,       
        password,
        role                     // the role passed from Home
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    navigate(role === "center" ? "/center-main" : "/donor-main");  // Redirect based on role

  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <div className="auth-form">
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="btn-danger w-100">
            Sign In
          </Button>

          <div className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DonorSignIn;
