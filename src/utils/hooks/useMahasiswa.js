import { useQuery } from '@tanstack/react-query';
import { db } from '../../data';

export const useFetchMahasiswas = () => {
  return useQuery({
    queryKey: ['mahasiswas'],
    queryFn: async () => {
      // Mengambil dari LocalStorage, jika belum ada ambil dari data.js
      const storedMahasiswas = JSON.parse(localStorage.getItem('mahasiswas')) || db.mahasiswas;
      return storedMahasiswas;
    },
  });
};