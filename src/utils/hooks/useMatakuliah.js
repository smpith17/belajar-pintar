import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../data';

// Helper LocalStorage
const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || db[key] || [];
const saveStoredData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const useFetchMatakuliah = () => {
  return useQuery({
    queryKey: ['mataKuliahs'],
    queryFn: async () => {
      return getStoredData('mataKuliahs');
    },
  });
};

export const useAddMatakuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      const currentData = getStoredData('mataKuliahs');
      saveStoredData('mataKuliahs', [...currentData, { ...data, id: Date.now() }]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mataKuliahs'] }),
  });
};

export const useUpdateMatakuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => {
      const currentData = getStoredData('mataKuliahs');
      const updated = currentData.map(mk => mk.id === id ? { ...mk, ...data } : mk);
      saveStoredData('mataKuliahs', updated);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mataKuliahs'] }),
  });
};

export const useDeleteMatakuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const currentData = getStoredData('mataKuliahs');
      saveStoredData('mataKuliahs', currentData.filter(mk => mk.id !== id));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mataKuliahs'] }),
  });
};