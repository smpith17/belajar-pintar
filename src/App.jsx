import React, { useEffect } from 'react'; // 1. Tambahkan useEffect
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from './data'; // 2. Pastikan import data-nya

function App() {
  // 3. Tambahkan sinkronisasi ini
  useEffect(() => {
    const resources = ['users', 'dosens', 'mataKuliahs', 'mahasiswas', 'kelas', 'moduls'];
    
    resources.forEach(res => {
      // Jika di LocalStorage belum ada data, masukkan data dari file data.js
      if (!localStorage.getItem(res)) {
        localStorage.setItem(res, JSON.stringify(db[res]));
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;