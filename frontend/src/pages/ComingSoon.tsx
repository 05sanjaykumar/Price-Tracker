import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const ComingSoon: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CardContent>
            <h1 className="text-4xl font-bold mb-4 text-indigo-600">
              Coming Soon
            </h1>
            <p className="text-gray-600 mb-6">
              We’re working hard to bring something amazing. Stay in the loop!
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
