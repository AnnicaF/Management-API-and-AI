import { useRouter } from 'vue-router';

export const useAuthService = () => {
  const router = useRouter();

  const logout = () => {
    // Ryd gemte data 
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
  console.clear();

    // Send brugeren tilbage til login siden
    router.push('/');
  };

  const getToken = () => {
    return localStorage.getItem('userToken');
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('userToken');
  };

  return {
    logout,
    getToken,
    isLoggedIn
  };
};