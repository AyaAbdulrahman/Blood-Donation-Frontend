
# 🩸 Blood Donation Frontend System

This is the frontend of the Blood Donation Management System built with **React.js**. It supports user registration, login, profile editing, appointment booking, and management by both donors and blood donation centers. It uses Reactbootstrap UI.

---

## 🚀 Features

### 👤 Donor 
- View available and urgent donation requests
- Apply for appointments
- Check appointment status
- View and edit personal profile

### 🏥 Donation Center Dashboard
- Manage posts and campaigns
- View and respond to donor appointments
- Visual dashboard with appointment status chart (Recharts)

### 🌐 Pages
- `Home`: Welcome page
- `Login / Register`: Auth system 
- `AvailableDonations`: Lists normal donation opportunities
- `UrgentDonations`: Displays urgent donation needs
- `CheckStatus`: Tracks donation request applications
- `Profile / EditProfile`: View and update donor info
- `CenterMain`: Main dashboard for blood centers

---

## ⚙️ Tech Stack

- **React.js**
- **React Bootstrap** for UI components
- **React Router** for navigation
- **Recharts** for charts
- **REST API** integration with a Node.js + PostgreSQL backend

---

## 📁 Project Structure


```
/src
  ├── components/
  │   ├── BloodRequestList.jsx
  │   ├── DonorSignIn.jsx
  │   ├── DonorSignUp.jsx
  │   └── Shared.jsx

  ├── pages/
  │   ├── AddCampaign.jsx
  │   ├── AddPost.jsx
  │   ├── AvailableDonation.jsx
  │   ├── CenterMain.jsx
  │   ├── CheckStatus.jsx
  │   ├── DonorCampaigns.jsx
  │   ├── DonorMain.jsx
  │   ├── EditProfile.jsx
  │   ├── Home.jsx
  │   ├── ManageReq.jsx
  │   ├── Profile.jsx
  │   └── UrgentDonation.jsx

  ├── styles/
  │   ├── AddCampaign.css
  │   ├── AddPost.css
  │   ├── Auth.css
  │   ├── AvailableDonation.css
  │   ├── CenterMain.css
  │   ├── DonorCampaign.css
  │   ├── DonorMain.css
  │   ├── EditProfile.css
  │   ├── Home.css
  │   ├── ManageReq.css
  │   ├── Profile.css
  │   ├── shared.css
  │   └── UrgentPage.css

  ├── App.js
  └── main.jsx
```
---

## 📊 Charts

Appointment status data (fetched from API) is visualized in a responsive `LineChart` using Recharts. It shows how many appointments are `pending`, `approved`, or `rejected`.

---

## 🔗 API Integration

Make sure the backend server is running at:
```
http://localhost:5000/api
```

Example Endpoints Used:
- `GET /requests` – Available and urgent requests
- `POST /appointments/` – Apply for donation
- `GET /appointments/user/:id` – Get user appointment history
- `GET /donors/:id` – Get donor info
- `PUT /donors/:id` – Update donor info
- `GET /centers/:id` – Fetch center name and data

---

## 🛠️ Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```



---
