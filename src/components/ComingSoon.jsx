import React from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center text-white font-mono">
      <div className="text-center space-y-6 px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl font-bold text-[#ff0055] drop-shadow-lg"
        >
          Something Epic is Coming
        </motion.h1>

        <div className="text-lg sm:text-2xl flex justify-center items-center space-x-1">
          <span>Launching Soon</span>
          <span className="animate-bounce text-[#ff0055] delay-100">.</span>
          <span className="animate-bounce text-[#ff0055] delay-200">.</span>
          <span className="animate-bounce text-[#ff0055] delay-300">.</span>
        </div>

        {/* Optional Email Subscribe or Countdown */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-sm sm:text-base text-gray-400"
        >
          Stay tuned. We’re building something awesome for you.
        </motion.p>
      </div>
    </div>
  );
};

export default ComingSoon;
