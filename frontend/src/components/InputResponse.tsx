// src/components/InputResponse.tsx
import { useState } from "react";
import { askAI, saveUserPrompt } from "@/services/api";
import { Input } from "@/components/ui/input";

const InputResponse = ({ userId }: { userId: string }) => {
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
      setAiResponse("Error occurred while fetching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-3xl mt-4'>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
        placeholder="Ask something..."
        className="mb-4"
      />
      <button
        onClick={handleAskAI}
        className="mb-4 px-4 py-2 bg-violet-600 text-white rounded"
      >
        Ask AI
      </button>

      <div className="text-green-400 whitespace-pre-wrap">
        {loading ? "Thinking..." : aiResponse}
      </div>

      {aiResponse && (
        <button
          onClick={async () => {
            try {
              await saveUserPrompt({ userId, prompt: searchTerm, response: aiResponse });
              alert("Saved!");
            } catch {
              alert("Failed to save.");
            }
          }}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
        >
          📌 Save
        </button>
      )}
    </div>
  );
};

export default InputResponse;
