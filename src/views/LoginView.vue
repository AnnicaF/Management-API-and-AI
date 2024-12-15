<template>
    <div class="login-page">
      <div class="left-side">
        <img src="../assets/images/login.jpg" alt="Login Image" class="login-image"/>
        <img src="../assets/images/umbraco_logo_white_horizontal.svg" alt="Umbraco Logo" class="umb-logo"/>
      </div>
      <div class="right-side">
        <h1>Welcome</h1>
        <h3>Log into the UmbracoWriter to use this service </h3>
        <button @click="login" :disabled="isLoading" class="login-button">
          {{ isLoading ? "Logger ind..." : "Login to UmbracoWriter " }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getToken, getCurrentUser } from '../services/apiService';
  import { useRouter } from 'vue-router';
  
  const isLoading = ref(false);
  const error = ref(null);
  const router = useRouter();
  
  const login = async () => {
    isLoading.value = true;
    error.value = null;
  
    try {
      const token = await getToken();
      const user = await getCurrentUser(token);
  
      console.log("Brugerdata:", user);
  
      router.push('/home');
    } catch (err) {
      error.value = err.response?.data?.error_description || "Kunne ikke hente brugerdata.";
      console.error("Fejl ved login:", err);
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    height: 100vh;
    justify-content: space-between;
  }
  
  .left-side {
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    position: relative; 
  }
  
  .login-image {
    max-width: 100%;
    width: 650px;
    object-fit: cover;
    margin: 19px 0; 
    margin-left: 15px;
    border-radius: 15px; 
  }
  
  .umb-logo {
    position: absolute; 
    top: 35px; 
    left: 35px; 
    width: 80px; 
    height: auto;
    z-index: 9999;
  }
  
  .right-side {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    align-items: center;
    text-align: center;
    padding: 20px;
  }
  
  h1 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 38px;
    color: #3545B0;
    font-weight: 200;
  }
  
  h3 {
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 38px;
  }
  
  .login-button {
    padding: 12px 60px;
    background-color: #1B254F;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .login-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  