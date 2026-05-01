import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  HeartPulse,
  ChevronLeft,
  Moon,
  Sun
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";

const SidebarItem = ({ icon: Icon, label, to, active, collapsed }: any) => (
  <Link
    to={to}
    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800"
      } ${collapsed ? "justify-center" : ""}`}
    title={collapsed ? label : ""}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
    </div>
    {!collapsed && active && <ChevronRight className="w-4 h-4" />}
  </Link>
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside 
        className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col transition-all duration-300 relative ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 shadow-sm z-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Logo */}
        <div className={`flex items-center gap-3 mb-10 px-2 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-indigo-100">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          {!isCollapsed && <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight whitespace-nowrap">HealthCare</span>}
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            to="/dashboard"
            active={location.pathname === "/dashboard"}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={Users}
            label="Patients"
            to="/patients"
            active={location.pathname === "/patients"}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={BarChart3}
            label="Analytics"
            to="/analytics"
            active={location.pathname === "/analytics"}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={Bell}
            label="Notifications"
            to="/notifications"
            active={location.pathname === "/notifications"}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            to="/settings"
            active={location.pathname === "/settings"}
            collapsed={isCollapsed}
          />
        </nav>

        {/* Footer / User */}
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Toggle Theme" : ""}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
            {!isCollapsed && <span className="font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>

          {!isCollapsed && (
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex-shrink-0 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                {user?.displayName?.[0] || user?.email?.[0] || "U"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                  {user?.displayName || "Admin User"}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto transition-colors duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
