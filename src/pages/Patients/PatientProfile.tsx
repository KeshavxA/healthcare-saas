import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatientStore } from '../../store/patientStore';
import { 
  ArrowLeft, User, Activity, AlertCircle, FileText, 
  Beaker, Plus, Printer, Save, Calendar, Clock, Download 
} from 'lucide-react';
import { Prescription } from '../../types';

const PatientProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, addPrescription } = usePatientStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'prescriptions'>('overview');

  const patient = useMemo(() => patients.find(p => p.id === id), [patients, id]);

  const [newRx, setNewRx] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: ''
  });

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Patient Not Found</h2>
        <button onClick={() => navigate('/patients')} className="btn-primary">Back to Patients</button>
      </div>
    );
  }

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRx.medication || !newRx.dosage) return;

    const prescription: Prescription = {
      id: `RX-${Math.floor(Math.random() * 10000)}`,
      medication: newRx.medication,
      dosage: newRx.dosage,
      frequency: newRx.frequency,
      duration: newRx.duration,
      date: new Date().toISOString().split('T')[0],
      doctor: 'Dr. Priya Sharma' // Mock current user
    };

    addPrescription(patient.id, prescription);
    setNewRx({ medication: '', dosage: '', frequency: '', duration: '' });
  };

  return (
    <div className="space-y-6 fade-in pb-10 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/patients')}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            {patient.name}
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
              {patient.id}
            </span>
          </h1>
          <p className="text-slate-500 font-medium">Detailed Electronic Health Record</p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-3xl shadow-inner flex-shrink-0 ring-4 ring-white dark:ring-slate-900">
          {patient.name[0]}
        </div>
        
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Gender / Age</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{patient.gender}, {patient.age} yrs</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Blood Group</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{patient.bloodGroup}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Weight / Height</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {patient.weight ? `${patient.weight} kg` : '--'} / {patient.height ? `${patient.height} cm` : '--'}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Primary Condition</p>
            <p className="font-semibold text-rose-600 dark:text-rose-400">{patient.condition}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'overview' 
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" /> Overview
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'history' 
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" /> Medical History & Labs
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'prescriptions' 
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> E-Prescriptions
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" /> Allergies
              </h3>
              {patient.allergies && patient.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, i) => (
                    <span key={i} className="px-3 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg text-sm font-medium">
                      {allergy}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No known allergies reported.</p>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" /> Recent Vitals
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500 mb-1">Blood Pressure</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">120/80 <span className="text-sm font-normal text-slate-400">mmHg</span></p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500 mb-1">Heart Rate</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">72 <span className="text-sm font-normal text-slate-400">bpm</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY & LABS TAB */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4">Past Medical History</h3>
              {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                <ul className="space-y-3">
                  {patient.medicalHistory.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm">No significant past medical history.</p>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-indigo-500" /> Lab Results
                </h3>
                <button className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-700">
                  <Download className="w-4 h-4" /> Download All
                </button>
              </div>

              {patient.labResults && patient.labResults.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500">
                        <th className="pb-3 font-medium">Test Name</th>
                        <th className="pb-3 font-medium">Result</th>
                        <th className="pb-3 font-medium">Normal Range</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {patient.labResults.map(lab => (
                        <tr key={lab.id} className="text-sm">
                          <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{lab.testName}</td>
                          <td className="py-3 text-slate-600 dark:text-slate-300">{lab.result}</td>
                          <td className="py-3 text-slate-500">{lab.normalRange}</td>
                          <td className="py-3 text-slate-500">{lab.date}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              lab.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 
                              lab.status === 'Abnormal' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {lab.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No recent lab results available.</p>
              )}
            </div>
          </div>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTab === 'prescriptions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Prescription Builder */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-600/20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" /> New Prescription
                </h3>
                <form onSubmit={handleAddPrescription} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-indigo-200 mb-1">Medication Name</label>
                    <input 
                      type="text" 
                      value={newRx.medication}
                      onChange={e => setNewRx({...newRx, medication: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="e.g. Amoxicillin"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-indigo-200 mb-1">Dosage</label>
                      <input 
                        type="text" 
                        value={newRx.dosage}
                        onChange={e => setNewRx({...newRx, dosage: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="500mg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-indigo-200 mb-1">Frequency</label>
                      <input 
                        type="text" 
                        value={newRx.frequency}
                        onChange={e => setNewRx({...newRx, frequency: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Twice daily"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-indigo-200 mb-1">Duration</label>
                    <input 
                      type="text" 
                      value={newRx.duration}
                      onChange={e => setNewRx({...newRx, duration: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="7 days"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-2.5 mt-2 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Prescription
                  </button>
                </form>
              </div>
            </div>

            {/* Active Prescriptions */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white px-2">Active Prescriptions</h3>
              
              {patient.prescriptions && patient.prescriptions.length > 0 ? (
                <div className="space-y-4">
                  {patient.prescriptions.map(rx => (
                    <div key={rx.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">{rx.medication}</h4>
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-xs font-bold">{rx.dosage}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <span className="font-medium">Sig:</span> {rx.frequency} for {rx.duration}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {rx.date}</span>
                          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {rx.doctor}</span>
                        </div>
                      </div>
                      <button className="self-start sm:self-center p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex items-center gap-2 text-sm font-medium">
                        <Printer className="w-4 h-4" /> Print
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 border border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 font-medium">No active prescriptions.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PatientProfilePage;
