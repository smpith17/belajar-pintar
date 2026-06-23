import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../Api';

export const useFetchModuls = () => {
  return useQuery({
    queryKey: ['moduls'],
    queryFn: async () => {
      const res = await Api.get('/moduls');
      return res.data;
    },
  });
};

export const useToggleComplete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, currentStatus }) => {
      return Api.patch(`/moduls/${id}`, { completed: !currentStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduls'] });
    },
  });
};