import '../styles/CenterMain.css';
import React, { useEffect, useState } from 'react';
import center1 from '../assets/center1.png'; 
import center2 from '../assets/center2.png'; 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const CenterMain = () => {

  const navigate = useNavigate();
  const [centers, setCenters] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/centers/6");
        const data = await res.json();
        setCenters(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching centers:', error);
        setLoading(false);
      }
    };

    fetchCenter();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments/user/5");
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const appointmentStats = appointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(appointmentStats).map(([status, count]) => ({
    status,
    count
  }));

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <div className="full-name">{centers.center_name}</div>
          </div>
        </div>
        <button className="logout-btn">
          Log out
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2 className="card-title">
            <img src={center1} alt="Post Icon" className="card-icon" />
            Add post
          </h2>
          <div className="card-actions">
            <button className="card-btn post" 
            onClick={() => navigate('/add-post')}>
            Add</button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">
            <img src={center1} alt="Post Icon" className="card-icon" />
            Add campaign
          </h2>
          <div className="card-actions">
            <button className="card-btn post" 
            onClick={() => navigate('/add-campaign')}>Add</button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">
            <img src={center2} alt="Post Icon" className="card-icon" />
            Accept/reject
          </h2>
          <div className="card-actions">
            <button className="card-btn post"
             onClick={() => navigate('/manage-req')}>
             
             Manage</button>
          </div>
        </div>

        <div className="dashboard-card chart-card">
          <h2 className="card-title">Appointment Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default CenterMain;
