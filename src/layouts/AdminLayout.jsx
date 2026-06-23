import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { confirmLogout } from '../utils/Helpers/SwalHelpers.jsx';
// import { dummyModules } from '../Data/Dummy.js'; // Tidak dipakai jika pakai API

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = async () => {
    const isConfirmed = await confirmLogout();
    if (isConfirmed) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <aside className="w-64 bg-blue-900 text-white flex flex-col fixed h-full shadow-lg">
        {/* Header Logo */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold text-xl">
              BP
            </div>
            <div>
              <h2 className="text-xl font-bold">Belajar Pintar</h2>
              <p className="text-xs text-blue-300">Learning Platform</p>
            </div>
          </div>
        </div>
        
        {/* User Info */}
        <div className="p-4 border-b border-blue-800 bg-blue-800/30">
          <p className="text-sm font-semibold">{user.name || 'User'}</p>
          <p className="text-xs text-blue-300">{user.role || 'Role'}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white text-blue-900 shadow font-semibold' : 'text-blue-100 hover:bg-blue-800'}`
            }
          >
            <span>📊</span> Dashboard
          </NavLink>

          {/* MENU LAMA: Modul (Materi Pembelajaran) */}
          {/* Jika masih ingin menampilkan daftar materi React JS */}
          <NavLink 
            to="/admin/modul" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white text-blue-900 shadow font-semibold' : 'text-blue-100 hover:bg-blue-800'}`
            }
          >
            <span>📚</span> Modul Materi
          </NavLink>

          {/* MENU BARU: Manajemen Kelas */}
          <NavLink 
            to="/admin/kelas" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white text-blue-900 shadow font-semibold' : 'text-blue-100 hover:bg-blue-800'}`
            }
          >
            <span>🏫</span> Manajemen Kelas
          </NavLink>

          <NavLink 
            to="/admin/dosen" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white text-blue-900 shadow font-semibold' : 'text-blue-100 hover:bg-blue-800'}`
            }
          >
            <span>👨‍🏫</span> Dosen
          </NavLink>

          <NavLink 
            to="/admin/matakuliah" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white text-blue-900 shadow font-semibold' : 'text-blue-100 hover:bg-blue-800'}`
            }
          >
            <span>📖</span> Mata Kuliah
          </NavLink>

          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white text-blue-900 shadow font-semibold' : 'text-blue-100 hover:bg-blue-800'}`
            }
          >
            <span>👥</span> Manajemen User
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;