import React from "react";
import { Users, Activity, Calendar, HeartPulse } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        <p className={`text-xs mt-2 ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend} from last month
        </p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hospital Overview</h1>
        <p className="text-slate-500">Welcome back, Dr. Sharma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value="248" 
          icon={Users} 
          trend="+12%" 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Critical Cases" 
          value="12" 
          icon={Activity} 
          trend="-4%" 
          color="bg-rose-500" 
        />
        <StatCard 
          title="Appointments" 
          value="34" 
          icon={Calendar} 
          trend="+8%" 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Recovery Rate" 
          value="87%" 
          icon={HeartPulse} 
          trend="+2%" 
          color="bg-emerald-500" 
        />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center">
        <p className="text-slate-400 italic">Detailed charts and tables are being implemented...</p>
      </div>
    </div>
  );
};

export default DashboardPage;
