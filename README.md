# BellCorp
note ---->  this is my submission for bellcorp studio interview process it lacks css because of lack of time 

# BellCorp Event Management

A full-stack event management application built with **React (Vite + Tailwind)** on the frontend and **Express + Sequelize + MySQL** on the backend.

---

## 🚀 Features
- User authentication (register/login with JWT)
- Event listing (fetch events from backend)
- Register for events
- View "My Registrations"
- Protected routes (only logged-in users can access certain pages)
- TailwindCSS styling + global theme
- Toast notifications for success/error feedback

---
## project structure
BellCorp/
├── server/                     # Backend (Express + Sequelize + MySQL)
│   ├── config/                  # Database + environment config
│   │   └── db.js
│   ├── controllers/             # Route handlers (business logic)
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── middleware/              # JWT auth, error handling
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/                  # Sequelize models
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── seed/                    # Database seeding scripts
│   │   └── seedEvents.js
│   ├── utils/                   # Helper functions (e.g., token generation)
│   │   └── generateToken.js
│   ├── server.js                # Entry point
│   └── package.json
│
├── client/                     # Frontend (React + Vite + Tailwind)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/              # Global state (AuthContext)
│   │   │   └── AuthContext.jsx
│   │   ├── pages/                # Page-level components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Events.jsx
│   │   │   └── MyRegistrations.jsx
│   │   ├── styles/               # Global + custom CSS
│   │   │   └── index.css
│   │   ├── App.jsx               # Main app with routing
│   │   └── main.jsx              # React entry point
│   └── package.json
│
├── .env                         # Environment variables
├── README.md                    # Documentation
└── package.json                 # Root package (optional if managing both together)
