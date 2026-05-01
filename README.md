# 🏥 HealthCare SaaS - B2B Medical Management Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-orange?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A premium B2B Healthcare SaaS platform built for hospitals and clinics to manage patient records, track real-time analytics, and streamline administrative workflows with a modern, high-performance interface.

---

## ✨ Key Features

-   🛡️ **Secure Authentication**: Firebase-powered login with route protection.
-   📊 **Interactive Analytics**: Real-time data visualization using Recharts (Admissions, Demographics, Conditions).
-   👥 **Patient Directory**: Advanced filtering and search with dual view modes (Grid & List).
-   🔔 **Push Notifications**: Integrated Service Workers for real-time critical patient alerts.
-   📱 **Fully Responsive**: Premium UI designed with Glassmorphism and Tailwind CSS.
-   ⚡ **Optimized Performance**: Lazy loading, component memoization, and efficient state management with Zustand.

---


### 🖥️ Dashboard Overview
![Dashboard](https://github.com/KeshavxA/healthcare-saas/raw/master/docs/screenshots/dashboard.png)

### 👥 Patients Directory
![Patients](https://github.com/KeshavxA/healthcare-saas/raw/master/docs/screenshots/patients.png)

---

## 🛠️ Tech Stack

-   **Frontend**: React 18, TypeScript, Tailwind CSS
-   **State Management**: Zustand (with Persist Middleware)
-   **Backend/Auth**: Firebase (Authentication, Analytics)
-   **Icons**: Lucide React
-   **Charts**: Recharts
-   **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/KeshavxA/healthcare-saas.git
    cd healthcare-saas
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your Firebase credentials:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

4.  **Run locally**:
    ```bash
    npm run dev
    ```

---

## 🌐 Live Demo

Check out the live application here: [healthcare-saas-murex.vercel.app](https://healthcare-saas-murex.vercel.app)

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
