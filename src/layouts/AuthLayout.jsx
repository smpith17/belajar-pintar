import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center font-sans p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;