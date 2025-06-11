# Admin Panel with OTP Authentication

### 👨‍💻 Candidate Name: Shravan More  
### 📄 Assignment: Admin Panel with OTP Authentication  

---

## 🚀 Project Overview

This is a minimal **Admin Dashboard** built with **Next.js**, implementing **OTP-based authentication** for secure admin access. After login, it displays a list of users retrieved from an authorized API. The app also supports user detail viewing and local caching for performance.

---

## 🔐 Features

- **Admin OTP Login Flow**
  - `sendOtp`: Sends OTP to the admin's phone
  - `verifyOtp`: Verifies OTP and retrieves token
- **Protected Routes**
  - `/admin/dashboard` is accessible only to authenticated users
- **User Management**
  - Fetch and display all users via `/users` API
  - Click a user to view their individual details
- **Search Functionality**
  - Search users by name on the dashboard
- **Caching**
  - Stores users in `localStorage` to avoid unnecessary re-fetching
- **Logout**
  - Clears token and cached data, redirects to login
- **Loading Indicators**
  - Displays status during data fetching
- **Modern UI**
  - Clean and responsive design with vanilla CSS

---

## 📁 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support)

---

## 🧪 API Endpoints Used

- `POST /auth/admin/sendOtp`
- `POST /auth/admin/verifyOtp`
- `GET /users`
- `GET /users/:id`

All API requests use **Bearer Token** for authentication.

---

## 🔄 Setup & Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/admin-panel-otp-auth.git
   cd admin-panel

2. Install dependencies:

    npm install

3. Run the development server:

    npm run dev

4. Open http://localhost:3000
