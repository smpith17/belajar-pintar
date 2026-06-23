import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../../utils/Api';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cek username unik (sederhana)
      const res = await Api.get(`/users?username=${form.username}`);
      if (res.data.length > 0) {
        toastError("Username sudah digunakan!");
        return;
      }
      
      // Simpan ke db.json
      await Api.post('/users', { ...form, role: "user" });
      toastSuccess("Registrasi Berhasil! Silakan Login.");
      navigate('/login');
    } catch (err) {
      toastError("Gagal registrasi");
    }
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