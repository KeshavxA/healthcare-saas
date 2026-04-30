import React from "react";
import {
  Users,
  Activity,
  Calendar,
  HeartPulse,
  PlusCircle,
  Download,
  Search,
  ExternalLink
} from "lucide-react";
import { mockPatients } from "../../constants/mockData";

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        <p className={`text-xs mt-2 font-medium ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend} <span className="text-slate-400 font-normal">from last month</span>
        </p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, color }: any) => (
  <button className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
    <div className={`p-3 rounded-xl ${color} text-white group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm font-semibold text-slate-700">{label}</span>
  </button>
);

const DashboardPage = () => {
  const recentPatients = mockPatients.slice(0, 5);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hospital Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back, Dr. Sharma 👋</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Add Patient
          </button>
        </div>
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Patients</h3>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Patient</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Condition</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                          {patient.name[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-800">{patient.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{patient.condition}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${patient.status === 'Critical' ? 'bg-rose-100 text-rose-600' :
                          patient.status === 'Stable' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-indigo-100 text-indigo-600'
                        }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                <Search className="text-white w-6 h-6" />
              </div>
              <h4 className="text-white font-bold mb-1">Global Search</h4>
              <p className="text-indigo-100 text-xs opacity-80">Find patients, reports, or doctors instantly</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <QuickAction icon={Calendar} label="New Schedule" color="bg-indigo-500" />
            <QuickAction icon={Activity} label="Vitals Check" color="bg-rose-500" />
            <QuickAction icon={Users} label="Staff Directory" color="bg-amber-500" />
            <QuickAction icon={HeartPulse} label="Health Reports" color="bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
