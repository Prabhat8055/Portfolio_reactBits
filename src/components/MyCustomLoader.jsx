import React from "react";

const MyCustomLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning Loader */}
        <div className="w-16 h-16 border-4 border-white border-t-[#ff0055] rounded-full animate-spin" />

        {/* Animated Text */}
        <div className="text-lg font-semibold flex space-x-1">
          <span>Loading</span>
          <span className="animate-bounce delay-100">.</span>
          <span className="animate-bounce delay-200">.</span>
          <span className="animate-bounce delay-300">.</span>
        </div>
      </div>
    </div>
  );
};

export default MyCustomLoader;
