import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useRandomUser() {
  return useQuery({
    queryKey: ['randomUser'],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.get(`${apiUrl}/user`);
      if (!Array.isArray(data) || data.length === 0) throw new Error('No users found');
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    },
  });
}
