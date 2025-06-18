
# 🩸 Blood Donation Frontend System

This is the frontend of the Blood Donation Management System built with **React.js**. It supports user registration, login, profile editing, appointment booking, and management by both donors and blood donation centers.

---

## 🚀 Features

### 👤 Donor Portal
- View available and urgent donation requests
- Apply for appointments
- Check appointment status
- View and edit personal profile

### 🏥 Center Dashboard
- Manage posts and campaigns
- View and respond to donor appointments
- Visual dashboard with appointment status chart (Recharts)

### 🌐 Pages
- `Home`: Welcome page
- `Login / Register`: Auth system (static user for now)
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
  │   ├── AvailableDonations.jsx
  │   ├── UrgentDonations.jsx
  │   ├── CheckStatus.jsx
  │   ├── Profile.jsx
  │   ├── EditProfile.jsx
  │   ├── CenterMain.jsx
  │   └── ...
  ├── styles/
  ├── assets/
  ├── App.js
  ├── main.jsx
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

Make sure to have the backend server running in parallel on port `5000`.

---
