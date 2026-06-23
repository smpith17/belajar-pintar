import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../data';

// Helper LocalStorage
const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || db[key] || [];
const saveStoredData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Fetch Users
export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return getStoredData('users');
    },
  });
};

// Update User (Role & Permission)
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => {
      const currentData = getStoredData('users');
      const updated = currentData.map(user => 
        user.id === id ? { ...user, ...data } : user
      );
      saveStoredData('users', updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};