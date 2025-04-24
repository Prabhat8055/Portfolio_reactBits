import React from "react";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xl font-semibold animate-pulse">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};

export default PreLoader;
