import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages - Auth
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Pages - Admin
import Dashboard from '../pages/Admin/Dashboard';
import Modul from '../pages/Admin/Modul/Modul'; // <--- PASTIKAN INI ADA
import Kelas from '../pages/Admin/Kelas';       // <--- PASTIKAN INI ADA
import Dosen from '../pages/Admin/Dosen';
import MataKuliah from '../pages/Admin/MataKuliah';
import Users from '../pages/Admin/Users';

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* PENTING: Pisahkan route Modul dan Kelas */}
        <Route path="modul" element={<Modul />} /> 
        <Route path="kelas" element={<Kelas />} />
        
        <Route path="dosen" element={<Dosen />} />
        <Route path="matakuliah" element={<MataKuliah />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Router;