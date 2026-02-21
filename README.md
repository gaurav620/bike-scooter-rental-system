# 🏍️ RideFleet — Electric Scooter Rental System

> Affordable electric scooter rentals near **JIS College of Engineering, Kalyani, West Bengal — 741235**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛵 **Electric Scooter Rentals** | Browse and book scooters starting at ₹29/hour |
| 🔐 **User Auth** | JWT-based login & registration with secure password hashing |
| 📋 **Dashboard** | View bookings, start/end rides, track status |
| 💳 **Razorpay Payments** | UPI, cards, net banking via Razorpay gateway |
| 📍 **Location-Based** | Service area: 5km radius from JIS College, Kalyani |
| 🌙 **Modern Dark UI** | Glassmorphism, gradients, micro-animations |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |
| 📄 **8 Info Pages** | About, Careers, Blog, Press, Help, Contact, FAQs, Partner |

---

## 🛠️ Tech Stack

```
Frontend  →  React 18 + React-Bootstrap + React Router + Axios
Backend   →  Node.js + Express.js + Mongoose
Database  →  MongoDB Atlas
Payments  →  Razorpay API
Auth      →  JWT + bcrypt
Styling   →  Custom CSS (dark theme, glassmorphism)
```

---

## 📁 Project Structure

```
bike-scooter-rental-system/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # API logic (auth, vehicles, bookings, payments, rides)
│   ├── models/          # Mongoose schemas (User, Vehicle, Booking)
│   ├── routes/          # Express routes
│   ├── server.js        # Entry point
│   └── .env sample      # Environment template
├── frontend/
│   ├── public/          # Static assets & scooter images
│   └── src/
│       ├── components/  # Hero, SearchBar, Footer, Locations, etc.
│       ├── pages/       # Home, Login, Register, Dashboard, Vehicles + 8 info pages
│       ├── services/    # Axios API config
│       └── utils/       # Auth helpers
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** Atlas account (or local MongoDB)
- **Razorpay** account (for payments)

### 1. Clone the repo

```bash
git clone https://github.com/gaurav620/bike-scooter-rental-system.git
cd bike-scooter-rental-system
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=2002
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start the backend:

```bash
npm start
# Server runs on http://localhost:2002
```

### 3. Setup Frontend

```bash
cd frontend
npm install
PORT=2001 npm start
# App runs on http://localhost:2001
```

---

## 📸 Screenshots

### Homepage

- Hero section with pricing, stats, and scooter image
- Search bar with date pickers
- How It Works, Why Choose Us, and Locations sections

### Vehicles Page

- Filter pills (All / Bikes / Scooters)
- Vehicle cards with images, specs, and Book Now buttons
- Booking modal with cost preview

### Dashboard

- Welcome card with user stats
- Booking cards with status badges
- Start Ride / End Ride / Pay actions

### Additional Pages

- About Us, Careers, Blog, Press
- Help Center, Contact Us, FAQs, Partner With Us

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get user profile |
| GET | `/api/vehicles` | Get all vehicles |
| POST | `/api/vehicles` | Add vehicle |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/my` | Get user's bookings |
| POST | `/api/payments/order` | Create Razorpay order |
| POST | `/api/payments/verify` | Verify payment |
| POST | `/api/rides/start` | Start a ride |
| POST | `/api/rides/end` | End a ride |

---

## 📍 Service Area

Currently serving **Kalyani, West Bengal — 741235** within a **5km radius** of JIS College of Engineering.

**Coverage includes:** JIS College, Kalyani Main Road, Kalyani Bus Stand, BCKV Area, Kalyani Railway Station & surroundings.

Other cities (Kolkata, Delhi, Mumbai, etc.) — **Coming Soon!**

---

## 👤 Author

**Gaurav Kumar (Saurav)**

- GitHub: [@gaurav620](https://github.com/gaurav620)

---

## 📄 License

This project is licensed under the MIT License.
