import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../../data'; // Import data awal
import { toastSuccess, toastError } from '../../utils/Helpers/ToastHelpers';
import Card from '../../components/Card';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Heading from '../../components/Heading';

const Register = () => {
  const [form, setForm] = useState({ name: '', username: '', email: '', nim: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Ambil data dari LocalStorage, jika kosong ambil dari db.users (data awal)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || db.users;

    // 2. Cek apakah username sudah ada
    const userExists = storedUsers.find(u => u.username === form.username);
    if (userExists) {
      toastError("Username sudah digunakan!");
      return;
    }
    
    // 3. Tambah user baru ke array
    const newUser = { 
      id: storedUsers.length + 1, 
      ...form, 
      role: "user",
      permissions: ["view_modul"] 
    };
    
    const updatedUsers = [...storedUsers, newUser];

    // 4. Simpan kembali ke LocalStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    toastSuccess("Registrasi Berhasil! Silakan Login.");
    navigate('/login');
  };

  return (
    <Card className="max-w-md">
      <Heading level="h1" className="text-center mb-6">Daftar Akun Baru</Heading>
      <Form onSubmit={handleSubmit}>
        <Input label="Nama Lengkap" name="name" placeholder="Nama Lengkap" onChange={handleChange} required />
        <Input label="NIM" name="nim" placeholder="A11.2023.xxxxx" onChange={handleChange} required />
        <Input label="Email" name="email" type="email" placeholder="email@domain.com" onChange={handleChange} required />
        <Input label="Username" name="username" placeholder="Username Login" onChange={handleChange} required />
        <Input label="Password" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <Button variant="primary" className="w-full">Register</Button>
        <p className="text-center text-sm mt-4">
          Sudah punya akun? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </Form>
    </Card>
  );
};

export default Register;