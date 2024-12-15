<template>
    <div class="user-info">
      <button @click="fetchUser" :disabled="isLoading" class="fetch-user-button">
        {{ isLoading ? "Henter data..." : "Hent Bruger" }}
      </button>
  
      <div v-if="user">
        <h3>Hej, {{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
      </div>
  
      <div v-if="error" class="error-message">
        <p>Fejl: {{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getToken, getCurrentUser } from '../services/apiService';
  
  const user = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  
  const fetchUser = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const token = await getToken();
      user.value = await getCurrentUser(token);
    } catch (err) {
      error.value = err.response?.data?.error_description || "Kunne ikke hente brugerdata.";
      console.error("Fejl ved hentning af bruger:", err);
    } finally {
      isLoading.value = false;
    }
  };
  
  defineExpose({
    fetchUser,
    user,
    isLoading,
    error
  });
  </script>
  
  <style scoped>
  .fetch-user-button {
    padding: 10px 20px;
    margin: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .fetch-user-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .error-message {
    color: red;
  }
  </style>
  