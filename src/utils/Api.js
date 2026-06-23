import { useEffect } from 'react';
import { db } from './data'; // Sesuaikan path-nya

function App() {
  useEffect(() => {
    // Sinkronisasi data awal ke LocalStorage jika belum ada
    const resources = ['users', 'dosens', 'mataKuliahs', 'mahasiswas', 'kelas', 'moduls'];
    
    resources.forEach(res => {
      if (!localStorage.getItem(res)) {
        localStorage.setItem(res, JSON.stringify(db[res]));
      }
    });
  }, []);

  // ... (sisa kode routing aplikasi kamu)
}