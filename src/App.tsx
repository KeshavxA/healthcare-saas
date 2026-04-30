import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import { Loader2 } from "lucide-react";
import { useNotifications } from "./hooks/useNotifications";

const LoginPage = lazy(() => import("./pages/Login"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const AnalyticsPage = lazy(() => import("./pages/Analytics"));
const PatientsPage = lazy(() => import("./pages/Patients"));

const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-slate-50">
    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
    <p className="text-slate-500 font-medium">Loading HealthCare SaaS...</p>
  </div>
);

function App() {
  const { registerSW } = useNotifications();

  React.useEffect(() => {
    registerSW();
  }, [registerSW]);

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AnalyticsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <PatientsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
