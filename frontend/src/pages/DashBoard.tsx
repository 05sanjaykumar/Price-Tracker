// src/components/Dashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "@/utils/decodeToken";
import Sidebar from "@/components/Sidebar";
import InputResponse from "@/components/InputResponse";
import HistoryView from "@/components/HistoryView";

const Dashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<{ prompt: string; response: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      navigate("/auth");
    } else {
      const decoded = decodeToken(token);
      setUserId(decoded?.userId);
    }
  }, []);

  if (!userId) return null;

  return (
    <div className="flex h-screen w-full bg-[rgb(33,33,33)] text-white">
      <Sidebar userId={userId} onPromptSelect={setSelectedPrompt} />

      <main className="flex-1 overflow-y-auto p-6">
        {selectedPrompt ? (
          <HistoryView
            prompt={selectedPrompt.prompt}
            response={selectedPrompt.response}
            onQuit={() => setSelectedPrompt(null)}
          />
        ) : (
          <InputResponse userId={userId} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
