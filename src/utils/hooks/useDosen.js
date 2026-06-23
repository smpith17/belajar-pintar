import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../data'; // Pastikan path benar

// Helper untuk sinkronisasi LocalStorage
const getStoredDosens = () => JSON.parse(localStorage.getItem('dosens')) || db.dosens;
const saveStoredDosens = (data) => localStorage.setItem('dosens', JSON.stringify(data));

// Fetch dengan Pagination (tetap bisa dipakai)
export const useFetchDosens = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ['dosens', page, limit],
    queryFn: async () => {
      const allData = getStoredDosens();
      // Simulasi slicing untuk pagination
      const startIndex = (page - 1) * limit;
      const paginatedData = allData.slice(startIndex, startIndex + limit);
      
      return { data: paginatedData, totalCount: allData.length };
    },
    keepPreviousData: true,
  });
};

export const useAddDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => {
      const currentData = getStoredDosens();
      const newItem = { ...newData, id: Date.now() }; // Generate ID unik
      saveStoredDosens([...currentData, newItem]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosens'] });
    },
  });
};

export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newData }) => {
      const currentData = getStoredDosens();
      const updatedData = currentData.map(item => item.id === id ? { ...item, ...newData } : item);
      saveStoredDosens(updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosens'] });
    },
  });
};

export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const currentData = getStoredDosens();
      const filteredData = currentData.filter(item => item.id !== id);
      saveStoredDosens(filteredData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosens'] });
    },
  });
};