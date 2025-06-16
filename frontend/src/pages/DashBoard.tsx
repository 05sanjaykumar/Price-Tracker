import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { decodeToken } from '@/utils/decodeToken';
import InputResponse from '@/components/InputResponse';
import History from '@/components/History';

const DashBoard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [view, setView] = useState<'input' | 'history'>('input');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('signin or login first');
      navigate('/auth');
    } else {
      const decoded = decodeToken(token);
      setUserId(decoded?.userId);
    }
  }, []);

  return (
    <div className='flex max-h-screen w-full bg-gray-900 font-sans'>
      <Sidebar />

      <main className='flex-1 p-4 md:p-8 scroll-auto overflow-scroll'>
        <div className='flex justify-between items-center'>
          <button
            onClick={() => setView('input')}
            className={`px-4 py-2 rounded-lg mr-2 ${
              view === 'input' ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            Ask AI
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-lg ${
              view === 'history' ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            History
          </button>
        </div>

        {userId ? (
          <>
            {view === 'input' && <InputResponse userId={userId} />}
            {view === 'history' && <History userId={userId} />}
          </>
        ) : (
          <p className="text-white mt-4">Loading...</p>
        )}
      </main>
    </div>
  );
};

export default DashBoard; 