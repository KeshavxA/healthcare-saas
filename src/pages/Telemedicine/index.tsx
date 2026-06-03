import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Users, MessageSquare } from 'lucide-react';

const TelemedicineRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleEndCall = () => {
    navigate('/appointments');
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col font-sans">

      <header className="h-16 px-6 flex items-center justify-between bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <h1 className="text-white font-medium text-lg">Consultation Room {id}</h1>
          <span className="text-slate-400 text-sm px-2 py-1 bg-slate-800 rounded-md">00:15:23</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <Users className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 relative p-4 flex flex-col md:flex-row gap-4 overflow-hidden">

        <div className="flex-1 bg-slate-800 rounded-2xl overflow-hidden relative shadow-2xl ring-1 ring-slate-700">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200&h=800"
            alt="Patient"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-white text-sm font-medium">Rajesh Kumar (Patient)</span>
          </div>
        </div>


        <div className="absolute bottom-8 right-8 w-48 md:w-64 aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-2xl ring-2 ring-indigo-500 z-10">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-700">
              <span className="text-white font-medium">Doctor Camera Off</span>
            </div>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=300"
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
            <span className="text-white text-xs">You (Dr. Sharma)</span>
          </div>
        </div>
      </main>

      <footer className="h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-6 px-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full transition-all shadow-lg ${isMuted
              ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 ring-1 ring-red-500/50'
              : 'bg-slate-800 text-white hover:bg-slate-700 ring-1 ring-slate-700'
            }`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-4 rounded-full transition-all shadow-lg ${isVideoOff
              ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 ring-1 ring-red-500/50'
              : 'bg-slate-800 text-white hover:bg-slate-700 ring-1 ring-slate-700'
            }`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>

        <button
          onClick={handleEndCall}
          className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 ml-8"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default TelemedicineRoom;
