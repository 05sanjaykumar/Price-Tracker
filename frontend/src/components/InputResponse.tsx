// src/components/InputResponse.tsx
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { askAI, saveUserPrompt } from '@/services/api';

type Props = {
  userId: string;
};

const InputResponse = ({ userId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setAiResponse("");

    try {
      const { data } = await askAI(searchTerm);
      setAiResponse(data.summary);
    } catch (error: any) {
      console.error("[AI Error]", error);
      const message = error.response?.data?.error || "Failed to fetch AI response.";
      setAiResponse(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrompt = async () => {
    if (!userId || !aiResponse || !searchTerm) return;
    try {
      await saveUserPrompt({
        userId,
        prompt: searchTerm,
        response: aiResponse,
      });
      alert("Prompt saved!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed.");
    }
  };

  return (
    <div className='mx-auto max-w-3xl mt-4'>
      <Input
        type="text"
        placeholder="Ask AI something..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
        className="w-full rounded-full border-2 border-transparent bg-gray-800/80 py-6 pl-12 pr-4 text-base text-gray-50 focus:border-violet-500"
      />
      <button
        onClick={handleAskAI}
        className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
      >
        Ask AI
      </button>

      <div className="Content mt-10 text-left text-gray-200 whitespace-pre-wrap">
        {loading ? (
          <p className="text-violet-400">Thinking...</p>
        ) : aiResponse ? (
          <div className="mt-4 flex items-center gap-4 flex-col">
            <p className="text-green-400 flex-1">{aiResponse}</p>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={handleSavePrompt}
            >
              📌 Save
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputResponse;
