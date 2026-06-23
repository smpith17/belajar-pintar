import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { db } from '../../data'; // Pastikan path ke file data.js benar
import { toastSuccess, toastError } from '../../utils/Helpers/ToastHelpers';

import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Card from '../../components/Card';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulasi jeda loading agar terasa natural
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mencari user di file data.js lokal
      const user = db.users.find(
        (u) => u.username === username && u.password === password
      );

      // Validasi hasil
      if (user) {
        // Simpan status ke LocalStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        
        toastSuccess('Login Berhasil! Selamat datang, ' + user.name);
        navigate(from, { replace: true });
      } else {
        setError('Username atau password salah!');
        toastError('Login Gagal! Username atau password salah.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan sistem.');
      toastError('Gagal melakukan proses login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Logo & Branding */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">Belajar Pintar</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Platform Pembelajaran Digital Interaktif</p>
      </div>

      <Card className="w-full max-w-md">
        <Heading level="h1" className="text-center mb-6">Masuk</Heading>
        
        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-2 rounded mb-4 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Input 
            label="Username" 
            icon="👤" 
            placeholder="Masukan Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          
          <Input 
            label="Password" 
            icon="🔒" 
            type={showPassword ? "text" : "password"} 
            placeholder="Masukan password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            rightAction={
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="text-blue-500 text-xs font-medium hover:underline focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3 mt-2"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Login'}
          </Button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Belum Punya Akun?{' '}
            <Link to="/register" className="text-blue-500 font-medium hover:underline">
              Daftar di sini
            </Link>
          </div>
        </Form>
      </Card>
      
      {/* Footer Login */}
      <p className="text-center text-xs text-gray-400 mt-8">
        © 2026 Belajar Pintar. Created with ❤️ for Education.
      </p>
    </div>
  );
};

export default Login;