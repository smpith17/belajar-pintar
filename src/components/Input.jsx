import React from 'react';

// Tambahkan ...rest untuk menangkap props tambahan seperti 'required'
const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  rightAction, 
  error,
  name,
  ...rest 
}) => {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 text-sm">{icon}</span>
          </div>
        )}
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} ${rightAction ? 'pr-24' : 'pr-4'} py-3 bg-gray-50 border ${error ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm`}
          {...rest} // Ini akan meneruskan properti 'required', 'type', dll
        />
        {rightAction && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightAction}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;