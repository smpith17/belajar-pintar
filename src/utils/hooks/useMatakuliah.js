import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../Api';

export const useFetchMatakuliah = () => {
  return useQuery({
    queryKey: ['mataKuliahs'],
    queryFn: async () => {
      const res = await Api.get('/mataKuliahs');
      return res.data;
    },
  });
};

export const useAddMatakuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => Api.post('/mataKuliahs', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mataKuliahs'] }),
  });
};

export const useUpdateMatakuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => Api.put(`/mataKuliahs/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mataKuliahs'] }),
  });
};

export const useDeleteMatakuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => Api.delete(`/mataKuliahs/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mataKuliahs'] }),
  });
};