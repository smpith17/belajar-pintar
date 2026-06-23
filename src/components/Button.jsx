import React from 'react';

const Button = ({ children, type = "button", variant = "primary", onClick, className = "" }) => {
  const baseStyle = "py-2 px-4 rounded-lg font-medium text-sm transition-colors focus:outline-none";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-200",
    success: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;