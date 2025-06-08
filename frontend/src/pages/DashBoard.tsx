// src/components/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashBoard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            alert('signin or login first')
          navigate('/dashboard');
        }
      }, [])
      

    const suggestions = [
        { icon: Clock, text: "Sony WH-1000XM5 Price" },
        { icon: Clock, text: "M2 Macbook Air Deals" },
        { icon: Zap, text: "Trace a new product URL" },
        { icon: Zap, text: "Compare two items" },
    ];

    return (
        <div className='flex min-h-screen w-full bg-gray-900 font-sans'>
            <Sidebar />

            <main className='flex-1 p-4 md:p-8'>
                <div className='mx-auto max-w-3xl mt-4'>
                    {/* Search Bar and Suggestions Container */}
                    <div
                        className="relative"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    >
                        <motion.div
                            layout // Animates the change in shape/size
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                            className="relative"
                        >
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Trace items, compare products, or ask AI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-full border-2 border-transparent bg-gray-800/80 py-6 pl-12 pr-4 text-base text-gray-50 backdrop-blur-sm transition-all duration-300 focus:border-violet-500 focus:bg-gray-800 focus:outline-none focus:ring-0"
                            />
                        </motion.div>

                        {/* Suggestions Dropdown */}
                        <AnimatePresence>
                            {isFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute mt-2 w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-800/90 p-2 shadow-lg backdrop-blur-md"
                                >
                                    <ul>
                                        {suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                className="flex cursor-pointer items-center gap-3 rounded-md p-3 text-sm text-gray-300 hover:bg-violet-500/20"
                                                // This prevents the blur event from firing immediately
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={() => {
                                                    setSearchTerm(suggestion.text);
                                                    setIsFocused(false);
                                                }}
                                            >
                                                <suggestion.icon className="h-4 w-4 text-gray-400" />
                                                <span>{suggestion.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Placeholder for content below the search bar */}
                    <div className="Content mt-10 text-center text-gray-500">
                        <p>Search results or tracked items will appear here.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashBoard;