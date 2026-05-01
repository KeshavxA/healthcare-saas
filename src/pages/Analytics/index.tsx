import React from "react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { analyticsData } from "../../constants/mockData";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const AnalyticsPage = () => {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hospital Analytics</h1>
        <p className="text-slate-500">Real-time performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Patient Admissions Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.monthlyAdmissions}>
                <defs>
                  <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="patients" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAdmissions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Condition Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.conditionBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={100} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Gender Demographics</h3>
          <div className="h-[300px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3 pr-10">
              {analyticsData.genderDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-slate-600 font-medium">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-2xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Weekly Summary</h3>
            <p className="text-indigo-100 mb-6 opacity-80">Your hospital efficiency is up by 15% this week compared to the national average.</p>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Download Report
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
