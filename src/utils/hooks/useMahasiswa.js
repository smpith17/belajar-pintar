import { useQuery } from '@tanstack/react-query';
import Api from '../Api';

export const useFetchMahasiswas = () => {
  return useQuery({
    queryKey: ['mahasiswas'],
    queryFn: async () => {
      const res = await Api.get('/mahasiswas');
      return res.data;
    },
  });
};