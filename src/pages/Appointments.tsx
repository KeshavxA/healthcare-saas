import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Calendar as CalendarIcon, Filter, X, Video, Clock, User, FileText } from "lucide-react";

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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const navigate = useNavigate();

  const handleSelectEvent = (event: Appointment) => {
    setSelectedAppointment(event);
  };

  const closeModal = () => setSelectedAppointment(null);

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
          onSelectEvent={handleSelectEvent}
          popup
          tooltipAccessor={(event) => `${event.title} - ${event.doctorName}`}
        />
      </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col scale-in-center">
            
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-white">Appointment Details</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{selectedAppointment.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    selectedAppointment.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                    selectedAppointment.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                  }`}>
                    {selectedAppointment.status}
                  </span>
                  <span className="text-sm bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                    {selectedAppointment.type}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{selectedAppointment.patientName}</p>
                    <p className="text-xs text-slate-500">Patient</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{selectedAppointment.doctorName}</p>
                    <p className="text-xs text-slate-500">Attending Doctor</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {format(selectedAppointment.start, 'PPpp')}
                    </p>
                    <p className="text-xs text-slate-500">
                      Duration: {Math.round((selectedAppointment.end.getTime() - selectedAppointment.start.getTime()) / 60000)} mins
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close
              </button>
              
              {selectedAppointment.isVirtual && selectedAppointment.meetingLink && (
                <button 
                  onClick={() => navigate(selectedAppointment.meetingLink as string)}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm shadow-indigo-200 dark:shadow-none flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Join Virtual Call
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
