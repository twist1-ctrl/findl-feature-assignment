import FeaturesPage from "./pages/FeaturesPage";

import { QueryClient, useQuery, useQueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useContext } from 'react';

function useRandomUserQuery() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.get(`${apiUrl}/user`);
      if (!Array.isArray(data) || data.length === 0) throw new Error('No users found');
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    },
    staleTime: 1000 * 60 * 5,
  });
}

const UserContext = createContext<any>(null);

export function useCurrentUser() {
  return useContext(UserContext);
}

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user, isLoading, isError } = useRandomUserQuery();
  return (
    <UserContext.Provider value={{ user, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};

function App() {
  return (
    <UserProvider>
      <FeaturesPage />
    </UserProvider>
  );
}

export default App;
