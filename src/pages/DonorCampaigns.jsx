import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import '../styles/DonorCampaign.css'; 

const DonorCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/campaigns");
        const data = await res.json();
        setCampaigns(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="loading"><Spinner animation="border" variant="danger" /></div>;
  }

  return (
    <div className="campaigns-container">
      <h2 className="campaigns-title">Blood Donation Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns available.</p>
      ) : (
        campaigns.map((campaign) => (
          <Card key={campaign.campaign_id} className="campaign-card">
            <Card.Body>
              <Card.Title>{campaign.title}</Card.Title>
              <Card.Text>{campaign.info}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default DonorCampaigns;
