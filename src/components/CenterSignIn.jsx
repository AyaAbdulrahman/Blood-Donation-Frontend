import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; 

const CenterSignIn = () => {
  const [centerName, setCenterName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = "center";  // hardcoded as the form is for centers only

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential: centerName,
          password,
          role
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/center-main"); 

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <div className="auth-form">
        <h2 className="text-center mb-4">Center Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Center Name</Form.Label>
            <Form.Control
              type="text"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
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
        </Form>
      </div>
    </div>
  );
};

export default CenterSignIn;
