// src/services/authService.js
import { useRouter } from 'vue-router';

export const useAuthService = () => {
  const router = useRouter();

  // Funktion til at logge ud
  const logout = () => {
    // Ryd eventuelle gemte data (f.eks. token og brugerdata)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  

     // Ryd konsollen
  console.clear();
  
    // Send brugeren tilbage til login-siden
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
