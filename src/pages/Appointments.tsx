import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Appointments.css";
import { mockAppointments } from "../constants/mockData";
import { Appointment } from "../types";
import { Calendar as CalendarIcon, Filter } from "lucide-react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [view, setView] = useState("month");
  
  // Custom event styling based on appointment status
  const eventStyleGetter = (event: Appointment) => {
    let backgroundColor = "#4f46e5"; // Indigo 600
    
    if (event.status === "Completed") backgroundColor = "#10b981"; // Emerald 500
    if (event.status === "Cancelled") backgroundColor = "#ef4444"; // Red 500
    
    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "none",
        display: "block",
        padding: "2px 5px",
        fontSize: "0.85rem",
      },
    };
  };

  return (
    <div className="space-y-6 fade-in h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            Appointments
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage patient consultations and schedules
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none font-medium">
            <CalendarIcon className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1 min-h-[600px]">
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }}
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          onView={(newView) => setView(newView)}
          popup
          tooltipAccessor={(event) => `${event.title} - ${event.doctorName}`}
        />
      </div>
    </div>
  );
};

export default AppointmentsPage;
