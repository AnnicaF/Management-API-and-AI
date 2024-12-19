<script setup>
import '../assets/style/login.css'
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
        {{ isLoading ? "Logger ind..." : "Login to UmbracoWriter " }}
      </button>
    </div>
  </div>
</template>