# ScholarStream

**A comprehensive scholarship discovery and management platform for students worldwide.**

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project

**ScholarStream** is a full-stack web application that bridges the gap between students seeking financial aid and educational institutions offering scholarships. It provides a centralized, user-friendly platform where students can discover, research, and apply for scholarships from universities worldwide, while administrators and moderators manage the scholarship ecosystem.

The platform addresses a critical pain point: students often struggle to find relevant scholarships due to scattered information across multiple websites. ScholarStream consolidates scholarship opportunities and streamlines the application process.

---

## Project Overview

ScholarStream is built with modern web technologies to provide a seamless experience across desktop and mobile devices. The application follows a three-tier architecture with distinct user roles and permissions:

- **Students**: Browse, filter, apply for scholarships, and manage applications
- **Moderators**: Review and process scholarship applications with approval/rejection capabilities
- **Administrators**: Full control over scholarships, users, and platform analytics

**Key Metrics:**

- Support for multiple scholarship types and categories
- Real-time application status tracking
- Integrated payment system with Stripe
- Role-based access control with JWT authentication
- Responsive design optimized for all devices

**Live Deployments:**

- 🌐 **Client**: [https://scholarstream-e6c33.web.app](https://scholarstream-e6c33.web.app)
- 🔧 **Server**: [https://scholar-stream-server-ten.vercel.app](https://scholar-stream-server-ten.vercel.app)

---

## Key Features

### For Students

- **Advanced Search & Filter** — Search scholarships by name, university, or degree
- **Intelligent Filtering** — Filter by scholarship category and country
- **Smart Sorting** — Sort scholarships by application deadline or fees
- **Application Management** — Track and manage scholarship applications in one place
- **Rating & Reviews** — Read and write reviews for scholarships
- **Profile Management** — Create and manage personalized student profile
- **Secure Authentication** — Firebase email/password and Google OAuth 2.0 login

### For Moderators

- **Application Review Dashboard** — Review student applications with approve/reject functionality
- **Rating Management** — Manage scholarship ratings and reviews
- **Dashboard Analytics** — View application statistics and key metrics
- **Status Tracking** — Monitor application processing workflow

### For Administrators

- **Scholarship Management** — Create, edit, and delete scholarships
- **User Management** — Manage user roles and permissions
- **Platform Analytics** — View platform-wide statistics and insights
- **System Administration** — Full control over the application

### Security Features

- **JWT Token Verification** — Secure API endpoints with Firebase tokens
- **Role-Based Access Control** — Three-tier permission system (Student, Moderator, Admin)
- **Two-Layer Authentication** — Firebase token + MongoDB role verification
- **Data Validation** — Input validation and error handling on all endpoints

### Additional Features

- **Lazy Loading** — Efficient data fetching with pagination
- **Responsive Design** — Mobile-friendly UI with Tailwind CSS and DaisyUI
- **Real-time Updates** — Instant feedback with toast notifications
- **Modern Animations** — Smooth transitions with Framer Motion
- **CORS Enabled** — Cross-origin resource sharing for external integrations
- **Payment Integration** — Stripe integration for scholarship fees

---

## Tech Stack

**Frontend:** React 19 · Vite 7 · Tailwind CSS 4 · DaisyUI · Firebase  
**Backend:** Node.js · Express 5 · MongoDB · Mongoose  
**Tools:** Git · VS Code · Firebase Admin SDK · JWT · Stripe · Axios

### Frontend Technologies

- **React 19** - UI framework
- **Vite 7** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Firebase 12** - Authentication and deployment
- **Axios 1.13** - HTTP client for API requests
- **React Query 5** - Server state management
- **React Hook Form 7** - Efficient form management
- **Framer Motion 12** - Animation library
- **SweetAlert2 11** - Beautiful alert notifications
- **Recharts 3** - Data visualization
- **Stripe** - Payment processing
- **React Toastify 11** - Toast notifications

### Backend Technologies

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - MongoDB object modeling
- **Firebase Admin SDK 13** - Backend authentication
- **JWT 9** - JSON Web Token authentication
- **Stripe 20** - Payment processing
- **CORS 2.8** - Cross-origin resource sharing
- **Dotenv 17** - Environment variables

---

## Dependencies

### Client Dependencies

```json
{
  "react": "^19.2.0",
  "vite": "^7.2.4",
  "tailwindcss": "^4.1.18",
  "firebase": "^12.8.0",
  "axios": "^1.13.4",
  "@tanstack/react-query": "^5.90.20",
  "react-router": "^7.13.0",
  "react-hook-form": "^7.71.1",
  "framer-motion": "^12.29.2",
  "sweetalert2": "^11.26.18",
  "recharts": "^3.7.0",
  "react-toastify": "^11.0.5"
}
```

### Server Dependencies

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.1.6",
  "mongodb": "^7.1.0",
  "firebase-admin": "^13.6.1",
  "jsonwebtoken": "^9.0.3",
  "stripe": "^20.3.1",
  "cors": "^2.8.6",
  "dotenv": "^17.2.4"
}
```

---

## Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Firebase Project** (for authentication)
- **Stripe Account** (for payments)

### Step 1: Clone the Repository

```bash
git clone https://github.com/aprova303/ScholarStream.git
cd ScholarStream
```

### Step 2: Install Dependencies

**For Frontend:**

```bash
cd client
npm install
```

**For Backend:**

```bash
cd server
npm install
```

### Step 3: Set Up Environment Variables

**Backend (.env):**
Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NODE_ENV=development
```

**Frontend (.env.local):**
Create a `.env.local` file in the `client` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Step 4: Run the Application

**Start Backend Server:**

```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend Development Server:**

```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### Step 5: Build for Production

**Build Frontend:**

```bash
cd client
npm run build
```

**Prepare Backend for Deployment:**

```bash
cd server
npm start
```

---

## Folder Structure

```plaintext
ScholarStream/
│
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   ├── scholarships.json        # Sample scholarship data
│   │   └── testimonial.json         # Testimonial data
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── AddReviewModal.jsx
│   │   │   ├── ApplicationDetailsModal.jsx
│   │   │   ├── ApplicationEditModal.jsx
│   │   │   ├── ReviewEditModal.jsx
│   │   │   ├── FeedbackModal.jsx
│   │   │   ├── RequestRoleModal.jsx
│   │   │   ├── ContactBanner.jsx
│   │   │   └── Logo.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Auth/                # Authentication pages
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── SocialLogin.jsx
│   │   │   ├── Home/                # Home page sections
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Banner.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── TopScholarships.jsx
│   │   │   │   ├── Categories.jsx
│   │   │   │   ├── HowItWorks.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── Testimonial.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Partners.jsx
│   │   │   │   ├── ContactUs.jsx
│   │   │   │   ├── Newsletter.jsx
│   │   │   │   └── Terms.jsx
│   │   │   ├── Dashboard/           # Dashboard pages
│   │   │   │   ├── Admin/
│   │   │   │   ├── Moderator/
│   │   │   │   └── Student/
│   │   │   ├── Payment/             # Payment pages
│   │   │   │   ├── CheckoutPage.jsx
│   │   │   │   └── PaymentFailurePage.jsx
│   │   │   ├── Scholarship/         # Scholarship pages
│   │   │   └── Shared/              # Shared pages
│   │   ├── contexts/                # React Context for state management
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthProvider.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── useAxiosSecure.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.jsx
│   │   │   ├── useRole.jsx
│   │   │   ├── useTheme.js
│   │   │   └── useThemContext.js
│   │   ├── layouts/                 # Layout components
│   │   │   ├── RootLayout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ModeratorLayout.jsx
│   │   │   └── StudentLayout.jsx
│   │   ├── routes/                  # Route definitions
│   │   │   ├── router.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── DashboardRedirect.jsx
│   │   │   └── DashboardWrappers.jsx
│   │   ├── services/                # API services
│   │   │   ├── api.js
│   │   │   └── paymentService.js
│   │   ├── firebase/                # Firebase configuration
│   │   │   └── firebase.init.js
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── eslint.config.js             # ESLint configuration
│   └── firebase.json                # Firebase configuration
│
├── server/                          # Backend Node.js application
│   ├── config/                      # Configuration files
│   │   ├── auth.js                  # Authentication config
│   │   └── firebase.js              # Firebase Admin config
│   ├── controllers/                 # Request handlers
│   │   ├── userController.js
│   │   ├── scholarshipController.js
│   │   ├── applicationController.js
│   │   ├── reviewController.js
│   │   ├── paymentController.js
│   │   ├── contactController.js
│   │   └── roleRequestController.js
│   ├── models/                      # MongoDB schemas
│   │   ├── User.js
│   │   ├── Scholarship.js
│   │   ├── Application.js
│   │   ├── Review.js
│   │   ├── Payment.js
│   │   ├── Contact.js
│   │   └── RoleRequest.js
│   ├── routes/                      # API routes
│   │   ├── userRoutes.js
│   │   ├── scholarshipRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── contactRoutes.js
│   │   └── roleRequestRoutes.js
│   ├── middleware/                  # Custom middleware
│   │   └── asyncHandler.js          # Async error handling
│   ├── index.js                     # Entry point
│   ├── package.json
│   ├── vercel.json                  # Vercel deployment config
│   ├── firebase-admin-service-key.json  # Firebase Admin credentials
│   ├── bootstrap-admin.js           # Admin setup script
│   └── seed-admin.js                # Seed admin data
│
└── README.md                        # Project documentation
```

---

## Environment Variables

### Backend (.env)

| Variable                 | Description               | Example                                              |
| ------------------------ | ------------------------- | ---------------------------------------------------- |
| `PORT`                   | Server port               | `5000`                                               |
| `MONGODB_URI`            | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET`             | JWT signing secret        | `your_secret_key_here`                               |
| `FIREBASE_PROJECT_ID`    | Firebase project ID       | `your-project-id`                                    |
| `FIREBASE_PRIVATE_KEY`   | Firebase private key      | `-----BEGIN PRIVATE KEY-----...`                     |
| `FIREBASE_CLIENT_EMAIL`  | Firebase client email     | `firebase-adminsdk@project.iam.gserviceaccount.com`  |
| `STRIPE_SECRET_KEY`      | Stripe secret key         | `sk_test_...`                                        |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key    | `pk_test_...`                                        |
| `NODE_ENV`               | Environment mode          | `development` or `production`                        |

### Frontend (.env.local)

| Variable                            | Description                  |
| ----------------------------------- | ---------------------------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API key             |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project ID          |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID`              | Firebase app ID              |
| `VITE_API_URL`                      | Backend API URL              |
| `VITE_STRIPE_PUBLISHABLE_KEY`       | Stripe publishable key       |

---

## Running the Application

### Development Mode

```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd client
npm run dev
```

### Production Mode

```bash
# Build frontend
cd client
npm run build

# Start backend
cd server
npm start
```

### Linting

```bash
cd client
npm run lint
```

---

## Contributions

This project was developed as a collaborative effort. Meet the team:

| Name  | Role                 | Contributions           |
| ----- | -------------------- | ----------------------- |
| Prova | Full-Stack Developer | Features & Development  |
| Team  | Contributors         | UI/UX & Database Design |

---

## How to Contribute

We welcome contributions! Follow these steps:

1. **Fork the Project**

   ```bash
   Click the "Fork" button on GitHub
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**

   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes and submit

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes before submitting
- Update documentation as needed

---

## License

Distributed under the **ISC License**. See `LICENSE.txt` for more information.

---

## Contact

**Project Links:**

- 🌐 **Live Site**: [https://scholarstream-e6c33.web.app](https://scholarstream-e6c33.web.app)
- 🔧 **Server**: [https://scholar-stream-server-ten.vercel.app](https://scholar-stream-server-ten.vercel.app)
- 📚 **Server Repository**: [https://github.com/aprova303/ScholarStream-server](https://github.com/aprova303/ScholarStream-server)

**Contact Information:**

- **Email**: [prova@gmail.com](mailto:prova@gmail.com)
- **Portfolio**: [Your Portfolio](https://yourportfolio.com)
- **GitHub**: [aprova303](https://github.com/aprova303)

**Test Credentials:**

- **Student Account** - Email: prova@gmail.com | Password: Prova@123
- **Admin Account** - Email: admin@scholarstream.com | Password: Admin@123

---

**Last Updated**: March 2026  
**Made with ❤️ by the ScholarStream Team**
