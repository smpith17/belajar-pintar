import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../Api';

// Fetch All Kelas with nested data simulation
export const useFetchKelas = () => {
  return useQuery({
    queryKey: ['kelas'],
    queryFn: async () => {
      const resKelas = await Api.get('/kelas');
      const kelasData = resKelas.data;

      const [dosens, mks, mhs] = await Promise.all([
        Api.get('/dosens').then(r => r.data),
        Api.get('/mataKuliahs').then(r => r.data),
        Api.get('/mahasiswas').then(r => r.data)
      ]);

      return kelasData.map(k => ({
        ...k,
        dosen: dosens.find(d => d.id === k.dosenId),
        mataKuliah: mks.find(m => m.id === k.mataKuliahId),
        mahasiswaList: k.mahasiswaIds ? k.mahasiswaIds.map(id => mhs.find(m => m.id === id)) : []
      }));
    },
  });
};

// Create Kelas
export const useAddKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => Api.post('/kelas', newData),
    onSuccess: () => queryClient.invalidateQueries(['kelas']),
  });
};

// Update Kelas (Untuk Assign Mahasiswa)
export const useUpdateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => Api.patch(`/kelas/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries(['kelas']),
  });
};

// ==================================================
// FUNGSI YANG HILANG (DELETE)
// ==================================================
export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => Api.delete(`/kelas/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['kelas']);
    },
  });
};
// ==================================================

// Helper: Hitung SKS Dosen
export const getDosenSks = async (dosenId) => {
  const res = await Api.get(`/kelas?dosenId=${dosenId}`);
  const kelasList = res.data;
  const mkRes = await Api.get('/mataKuliahs');
  const mkList = mkRes.data;
  
  return kelasList.reduce((total, k) => {
    const mk = mkList.find(m => m.id === k.mataKuliahId);
    return total + (mk?.sks || 0);
  }, 0);
};

// Helper: Hitung SKS Mahasiswa
export const getMahasiswaSks = async (mhsId) => {
  const res = await Api.get('/kelas');
  const allKelas = res.data;
  const mkRes = await Api.get('/mataKuliahs');
  const mkList = mkRes.data;

  const myClasses = allKelas.filter(k => k.mahasiswaIds?.includes(mhsId));
  
  return myClasses.reduce((total, k) => {
    const mk = mkList.find(m => m.id === k.mataKuliahId);
    return total + (mk?.sks || 0);
  }, 0);
};