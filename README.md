# ScholarStream 

## Project Overview
ScholarStream is a comprehensive scholarship management and application platform built with modern web technologies. It enables students to discover, research, and apply for scholarships from universities worldwide, while providing administrators and moderators with tools to manage scholarships and review applications.


**Project Type**: Full-stack web application for scholarship discovery and management
---

**Live URL** : https://scholarstream-e6c33.web.app
Admin Email: admin@scholarstream.com
Admin Password: Admin@123


## Purpose & Key Features

ScholarStream bridges the gap between students seeking financial aid and educational institutions offering scholarships. It provides a centralized platform where:

- **Students** can discover and apply for scholarships
- **Moderators** can review and process scholarship applications
- **Admins** can manage the entire scholarship ecosystem

#### For Students

-  **Advanced Search & Filter**: Search scholarships by name, university, or degree
-  **Intelligent Filtering**: Filter by scholarship category and country
-  **Smart Sorting**: Sort by application deadline or fees
-  **Application Management**: Track and manage scholarship applications
-  **Rating & Reviews**: Read and write reviews for scholarships
-  **Profile Management**: Create and manage student profile
-  **Firebase Authentication**: Secure email/password and Google OAuth login


#### For Moderators

-  **Application Reviews**: Review student applications with approve/reject options
-  **Rating Management**: Manage scholarship ratings and reviews
-  **Dashboard**: View application statistics and metrics


#### For Administrators


-  **Scholarship Management**: Create, edit, and delete scholarships
-  **User Management**: Manage user roles and permissions
-  **Analytics**: View platform-wide statistics and insights
-  **System Administration**: Full control over the application


###  Security Features

- **JWT Token Verification**: Secure API endpoints with Firebase tokens
- **Role-Based Access Control**: Three-tier permission system (Student, Moderator, Admin)
- **Two-Layer Authentication**: Firebase token + MongoDB role verification
- **Data Validation**: Input validation and error handling on all endpoints


###  Additional Features

-  **Lazy Loading**: Efficient data fetching with pagination
-  **Responsive Design**: Mobile-friendly UI with TailwindCSS and DaisyUI
-  **Real-time Updates**: Instant feedback with toast notifications
-  **Modern Animations**: Smooth transitions with Framer Motion
-  **CORS Enabled**: Cross-origin resource sharing for external integrations


---

##  Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite 7** - Fast build tool
- **Tailwind CSS 4** - Styling
- **React Router 7** - Routing
- **Firebase** - Authentication
- **Axios** - HTTP client
- **React Query** - Data fetching
- **React Hook Form** - Form management
- **SweetAlert2** - Notifications
- **Recharts** - Data visualization


### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Firebase Admin SDK** - Authentication & verification
- **Stripe** - Payment processing
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment configuration


---

 ## NPM Packages Used 
 `react` (18.x) - UI library
- `react-router-dom` - Client-side routing
- `react-dom` - React DOM renderin
- `tailwindcss` - Utility-first CSS framework
- `daisyui` - DaisyUI component library
- `framer-motion` - Animation library
- `react-icons` - Icon library
- `react-toastify` - Toast notification library



