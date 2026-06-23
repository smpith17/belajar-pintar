import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../data';

// Helper LocalStorage
const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || db[key] || [];
const saveStoredData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const useFetchKelas = () => {
  return useQuery({
    queryKey: ['kelas'],
    queryFn: async () => {
      const kelasData = getStoredData('kelas');
      const dosens = getStoredData('dosens');
      const mks = getStoredData('mataKuliahs');
      const mhs = getStoredData('mahasiswas');

      return kelasData.map(k => ({
        ...k,
        dosen: dosens.find(d => d.id === k.dosenId),
        mataKuliah: mks.find(m => m.id === k.mataKuliahId),
        mahasiswaList: k.mahasiswaIds ? k.mahasiswaIds.map(id => mhs.find(m => m.id === id)) : []
      }));
    },
  });
};

export const useAddKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => {
      const currentData = getStoredData('kelas');
      saveStoredData('kelas', [...currentData, { ...newData, id: Date.now() }]);
    },
    onSuccess: () => queryClient.invalidateQueries(['kelas']),
  });
};

export const useUpdateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => {
      const currentData = getStoredData('kelas');
      const updated = currentData.map(k => k.id === id ? { ...k, ...data } : k);
      saveStoredData('kelas', updated);
    },
    onSuccess: () => queryClient.invalidateQueries(['kelas']),
  });
};

export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const currentData = getStoredData('kelas');
      saveStoredData('kelas', currentData.filter(k => k.id !== id));
    },
    onSuccess: () => queryClient.invalidateQueries(['kelas']),
  });
};

// ==================================================
// HELPER (Sekarang sinkron dan sangat cepat)
// ==================================================

export const getDosenSks = (dosenId) => {
  const kelasList = getStoredData('kelas');
  const mkList = getStoredData('mataKuliahs');
  
  return kelasList
    .filter(k => k.dosenId === dosenId)
    .reduce((total, k) => {
      const mk = mkList.find(m => m.id === k.mataKuliahId);
      return total + (mk?.sks || 0);
    }, 0);
};

export const getMahasiswaSks = (mhsId) => {
  const allKelas = getStoredData('kelas');
  const mkList = getStoredData('mataKuliahs');

  const myClasses = allKelas.filter(k => k.mahasiswaIds?.includes(mhsId));
  
  return myClasses.reduce((total, k) => {
    const mk = mkList.find(m => m.id === k.mataKuliahId);
    return total + (mk?.sks || 0);
  }, 0);
};