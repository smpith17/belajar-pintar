import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../data';

// Helper LocalStorage
const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || db[key] || [];
const saveStoredData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const useFetchModuls = () => {
  return useQuery({
    queryKey: ['moduls'],
    queryFn: async () => {
      return getStoredData('moduls');
    },
  });
};

export const useToggleComplete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, currentStatus }) => {
      const currentData = getStoredData('moduls');
      const updatedData = currentData.map(modul => 
        modul.id === id ? { ...modul, completed: !currentStatus } : modul
      );
      saveStoredData('moduls', updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduls'] });
    },
  });
};