import { useEffect, useState } from 'react';
import { fetchBloodRequests } from '../api';

const BloodRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await fetchBloodRequests();
        setRequests(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  if (loading) return <div>Loading blood requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="requests-container">
      <h2>Available Blood Requests</h2>
      <ul className="requests-list">
        {requests.map((request) => (
          <li key={request.id} className="request-item">
            <h3>{request.blood_type} Needed</h3>
            <p>Location: {request.location}</p>
            <p>Urgency: {request.urgency_level}</p>
            <p>Requested by: {request.hospital_name}</p>
            <button>Respond to Request</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodRequestsList;