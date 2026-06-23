import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../Api';

// Fetch Users
export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await Api.get('/users');
      return res.data;
    },
  });
};

// Update User (Role & Permission)
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => Api.patch(`/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};