import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
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
            <div className="flex items-center gap-2 mb-4">
              <Mail className="text-indigo-500" />
              <Input type="email" placeholder="Enter your email" className="flex-1" />
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Notify Me
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
