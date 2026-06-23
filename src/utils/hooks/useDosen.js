import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../Api';

// Fetch dengan Pagination
export const useFetchDosens = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ['dosens', page, limit], // Cache per page
    queryFn: async () => {
      const res = await Api.get('/dosens', {
        params: {
          _page: page,
          _limit: limit
        }
      });
      
      // JSON Server menyimpan total data di header 'x-total-count'
      const totalCount = parseInt(res.headers['x-total-count'] || '0', 10);
      
      return { data: res.data, totalCount };
    },
    keepPreviousData: true, // UX lebih smooth saat pindah halaman
  });
};

// ... Mutation hooks (add, update, delete) tetap sama seperti sebelumnya ...
export const useAddDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => Api.post('/dosens', newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosens'] });
    },
  });
};

export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newData }) => Api.put(`/dosens/${id}`, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosens'] });
    },
  });
};

export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => Api.delete(`/dosens/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosens'] });
    },
  });
};