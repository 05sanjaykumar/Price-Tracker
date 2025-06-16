// src/components/Sidebar.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, CirclePower, UserCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserPrompts } from "@/services/api";

type Props = {
  userId: string;
  onPromptSelect: (data: { prompt: string; response: string }) => void;
};

const Sidebar = ({ userId, onPromptSelect }: Props) => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<{ prompt: string; response: string }[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await getUserPrompts(userId);
      const promptArray = res.data

      if (Array.isArray(promptArray)) {
        setPrompts(promptArray.slice(0, 10));
      } else {
        console.warn("Expected array but got:", promptArray);
      }
    } catch (error) {
      console.error("Failed to fetch prompt history", error);
    }
  };

  fetchHistory();
}, [userId]);


  const handleLogout = () => {
    localStorage.setItem('token', '');
    navigate('/auth');
  };

  return (
    <motion.aside
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className='flex h-screen w-64 flex-col border-r border-r-gray-800 bg-black text-gray-300'
    >
      {/* User Info */}
      <div className='mt-auto border-b border-gray-800 p-4'>
        <div className='flex items-center gap-3 rounded-lg p-2 hover:bg-gray-800/60'>
          <UserCircle className="h-9 w-9" />
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-white'>Admin User</span>
            <span className='text-xs text-gray-500'>admin@tracer.ai</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 overflow-y-auto'>
        <ul className='space-y-2'>
          {/* History Toggle */}
          <li>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className='w-full flex items-center justify-between rounded-lg p-3 text-sm font-medium hover:bg-gray-800/60'
            >
              <span className='flex items-center'>
                <History className='h-5 w-5 mr-3' />
                Trace History
              </span>
              {showHistory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Prompt Dropdown */}
            {showHistory && (
              <ul className='mt-2 space-y-1 pl-8 pr-2 text-xs text-gray-400 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700'>
                {prompts.length === 0 ? (
                  <li className="text-gray-600 italic">No prompts saved.</li>
                ) : (
                  prompts.map((prompt, idx) => (
                    <button
                        key={idx}
                        onClick={() => onPromptSelect({ prompt: prompt.prompt, response: prompt.response })}
                        className="block w-full text-left p-2 hover:bg-gray-700 rounded text-sm"
                    >
                        {prompt.prompt.slice(0, 30)}...
                    </button>
                    ))
                )}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Footer - Logout */}
      <button
        className='flex h-16 shrink-0 items-center justify-center border-t border-gray-800 hover:bg-gray-900'
        onClick={handleLogout}
      >
        <h1 className='mr-3 text-xl font-bold tracking-wider text-white'>Log Out</h1>
        <CirclePower className="h-8 w-8 text-red-400" />
      </button>
    </motion.aside>
  );
};

export default Sidebar;
