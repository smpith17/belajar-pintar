import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
      <div 
        className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;