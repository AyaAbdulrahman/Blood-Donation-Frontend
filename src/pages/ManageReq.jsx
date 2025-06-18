import { useState } from "react"
import { Container, Card, Button } from "react-bootstrap"
import { FaUser, FaCheck, FaTimes } from "react-icons/fa"
import "../styles/ManageReq.css"

const ManageReq = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Ali Ahmad",
      bloodType: "AB",
      status: "pending",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      bloodType: "O+",
      status: "pending",
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      bloodType: "A-",
      status: "pending",
    },
  ])

  const handleAccept = (id) => {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status: "accepted" } : request)))
    console.log(`Accepted request for user ID: ${id}`)
  }

  const handleReject = (id) => {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status: "rejected" } : request)))
    console.log(`Rejected request for user ID: ${id}`)
  }

  const pendingRequests = requests.filter((request) => request.status === "pending")

  return (
    <div className="manage-requests-container">
      {/* Header */}
      <header className="manage-requests-header">
        <div className="header-left">
          <div className="logo">
            <div className="center-name">Center Name</div>
          </div>
        </div>
        <button className="logout-btn">Log out</button>
      </header>

      {/* Main Content */}
      <Container className="manage-requests-main">
        <div className="content-wrapper">
          <h2 className="page-title">Manage Requests</h2>

          <Card className="requests-card">
            <Card.Body>
              {pendingRequests.length === 0 ? (
                <div className="no-requests">
                  <p>No pending requests at the moment.</p>
                </div>
              ) : (
                <div className="requests-list">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="request-item">
                      <div className="user-info">
                        <div className="user-avatar">
                          <FaUser />
                        </div>
                        <div className="user-details">
                          <div className="user-name">{request.name}</div>
                          <div className="user-blood-type">Blood type: {request.bloodType}</div>
                        </div>
                      </div>
                      <div className="action-buttons">
                        <Button className="accept-btn" onClick={() => handleAccept(request.id)}>
                          <FaCheck />
                        </Button>
                        <Button className="reject-btn" onClick={() => handleReject(request.id)}>
                          <FaTimes />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default ManageReq
