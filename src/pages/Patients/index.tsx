import React, { useMemo } from "react";
import {
  Search,
  Grid2X2,
  List,
  UserPlus,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { usePatientStore } from "../../store/patientStore";
import { Patient } from "../../types";

const StatusBadge = React.memo(({ status }: { status: Patient["status"] }) => {
  const styles: any = {
    Active: "bg-indigo-100 text-indigo-600",
    Critical: "bg-rose-100 text-rose-600",
    Stable: "bg-emerald-100 text-emerald-600",
    Discharged: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
});

const PatientCard = React.memo(({ patient }: { patient: Patient }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-slate-400 hover:text-slate-600">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>

    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 text-xl shadow-inner">
        {patient.name[0]}
      </div>
      <div>
        <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{patient.name}</h3>
        <p className="text-sm text-slate-500 font-medium">{patient.condition}</p>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Calendar className="w-4 h-4 text-slate-400" />
        <span>Admitted: {patient.admissionDate}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <UserPlus className="w-4 h-4 text-slate-400" />
        <span>Dr. {patient.doctor.split(' ').pop()}</span>
      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
      <StatusBadge status={patient.status} />
      <div className="flex gap-2">
        <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors">
          <Phone className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors">
          <Mail className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
));

const PatientRow = React.memo(({ patient }: { patient: Patient }) => (
  <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600">
          {patient.name[0]}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">{patient.name}</p>
          <p className="text-xs text-slate-500">{patient.id}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4 text-sm text-slate-600 font-medium">{patient.condition}</td>
    <td className="py-4 px-4">
      <StatusBadge status={patient.status} />
    </td>
    <td className="py-4 px-4 text-sm text-slate-600 font-medium">{patient.doctor}</td>
    <td className="py-4 px-4 text-sm text-slate-600">{patient.admissionDate}</td>
    <td className="py-4 px-4 text-right">
      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
        <MoreVertical className="w-5 h-5" />
      </button>
    </td>
  </tr>
));

const PatientsPage = () => {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    patients
  } = usePatientStore();

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patients Directory</h1>
          <p className="text-slate-500">Manage and monitor patient records</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add New Patient
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, condition, or ID..."
            className="input-field pl-12 bg-slate-50 border-transparent focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <Grid2X2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-all">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Condition</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Admitted</th>
                <th className="py-4 px-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredPatients.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
