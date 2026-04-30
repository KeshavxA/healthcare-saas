import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const SidebarItem = ({ icon: Icon, label, to, active }: any) => (
  <Link
    to={to}
    className={`flex items-center justify-between p-3 rounded-xl transition-all ${active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </div>
    {active && <ChevronRight className="w-4 h-4" />}
  </Link>
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">HealthCare</span>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            to="/dashboard"
            active={location.pathname === "/dashboard"}
          />
          <SidebarItem
            icon={Users}
            label="Patients"
            to="/patients"
            active={location.pathname === "/patients"}
          />
          <SidebarItem
            icon={BarChart3}
            label="Analytics"
            to="/analytics"
            active={location.pathname === "/analytics"}
          />
          <SidebarItem
            icon={Bell}
            label="Notifications"
            to="/notifications"
            active={location.pathname === "/notifications"}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            to="/settings"
            active={location.pathname === "/settings"}
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {user?.displayName?.[0] || user?.email?.[0] || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">
                {user?.displayName || "Admin User"}
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
import { HeartPulse } from "lucide-react"; 
