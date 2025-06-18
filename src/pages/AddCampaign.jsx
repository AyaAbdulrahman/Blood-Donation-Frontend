import { useState } from "react"
import { Form, Button, Container, Card } from "react-bootstrap"
import "../styles/AddCampaign.css"

const AddCampaign = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  })

  const handleInputChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

 const handleSubmit = async (e) => {
  e.preventDefault();

  const center_id = 6; 
  const units_needed = parseInt(form.targetAmount);

  if (!center_id || form.bloodTypes.length === 0 || !units_needed) {
    alert("Please fill out all required fields.");
    return;
  }

  try {
    for (const bloodType of form.bloodTypes) {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          center_id,
          blood_type: bloodType,
          units_needed,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }
      console.log("Success:", data);
    }

    alert("Post(s) submitted successfully!");
    
  } catch (error) {
    console.error("Submission error:", error);
    alert(`Error: ${error.message}`);
  }
};


  return (
    <div className="add-campaign-container">
      {/* Header */}
      <header className="add-campaign-header">
        <div className="header-left">
          <div className="logo">
            <div className="center-name">Center Name</div>
          </div>
        </div>
        <button className="logout-btn">Log out</button>
      </header>

      {/* Main Content */}
      <Container className="add-campaign-main">
        <div className="form-wrapper">
          <h2 className="form-title">Add Campaign</h2>

          <Card className="form-card">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Title Section */}
                <div className="form-section">
                  <Form.Label className="section-label">Title:</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="title here"
                    className="form-input"
                  />
                </div>

                {/* Description Section */}
                <div className="form-section">
                  <Form.Label className="section-label">Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="description here"
                    className="form-input form-textarea"
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Submit Button */}
          <div className="submit-section">
            <Button onClick={handleSubmit} className="submit-btn">
              Post
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AddCampaign
