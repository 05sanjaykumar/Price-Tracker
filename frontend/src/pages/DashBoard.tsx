// src/components/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { askAI } from '@/services/api';
import {  saveUserPrompt } from '@/services/api';
import { decodeToken } from '@/utils/decodeToken';



const DashBoard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            alert('signin or login first')
          navigate('/auth');
        } else {
        const decoded = decodeToken(token);
        setUserId(decoded?.userId); // Or decoded?._id, depending on your payload
    }
    }, [])

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
    return (
        <div className='flex max-h-screen w-full bg-gray-900 font-sans'>
            <Sidebar />

            <main className='flex-1 p-4 md:p-8 scroll-auto overflow-scroll'>
                <div className='mx-auto max-w-3xl mt-4'>
                    {/* Search Bar and Suggestions Container */}
                    <div
                        className="relative"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    >
                       
                        <Input
                            type="text"
                            placeholder="Trace items, compare products, or ask AI..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAskAI();
                            }}
                            className="w-full rounded-full border-2 border-transparent bg-gray-800/80 py-6 pl-12 pr-4 text-base text-gray-50 backdrop-blur-sm transition-all duration-300 focus:border-violet-500 focus:bg-gray-800 focus:outline-none focus:ring-0"
                        />
                        <button
                            onClick={handleAskAI}
                            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                        >
                            Ask AI
                        </button>

                    </div>
                    <div className='text-red-500'>
                        <strong >Note : </strong>
                        The search has been limited for top 30 results, it will take atleast 2-3 seconds for fetching from the web using bing, and AI will take atleast 2-3 seconds for summarisation, please atleast wait 10-20 seconds for the reponse before trying
                    </div>

                    {/* Placeholder for content below the search bar */}
                    <div className="Content mt-10 text-left text-gray-200 whitespace-pre-wrap">
                        {loading ? (
                            <p className="text-violet-400">Thinking...</p>
                        ) : (
                            <div>
                                {aiResponse && (
                                <div className="mt-4 flex items-center gap-4 flex-col">
                                    <p className="text-green-400 flex-1">{aiResponse}</p>
                                    <button
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    onClick={async () => {
                                        if (!userId) return;
                                        try {
                                            console.log('button clicked')
                                        await saveUserPrompt({
                                            userId,
                                            prompt: searchTerm,
                                            response: aiResponse,
                                        });
                                        alert("Prompt saved successfully!");
                                        } catch (err) {
                                        console.error("Save error:", err);
                                        alert("Failed to save prompt.");
                                        }
                                    }}
                                    >
                                    📌 Save
                                    </button>
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashBoard;