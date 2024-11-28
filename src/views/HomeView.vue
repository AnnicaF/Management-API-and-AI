<template>
    <div class="home-view">
      <!-- Hent bruger-knap -->
      <button @click="fetchUser" :disabled="isLoading" class="fetch-user-button">
        {{ isLoading ? "Henter data..." : "Hent Bruger" }}
      </button>
  
      <!-- Viser brugerdata -->
      <div v-if="user" class="user-info">
        <h3>Hej, {{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
      </div>
  
      <!-- Viser fejlbesked -->
      <div v-if="error" class="error-message">
        <p>Fejl: {{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getToken, getCurrentUser } from "../services/apiService";
  
  export default {
    data() {
      return {
        user: null,
        isLoading: false,
        error: null,
      };
    },
    methods: {
      async fetchUser() {
        this.isLoading = true;
        this.error = null;
  
        try {
          // Hent adgangstoken
          const token = await getToken();
  
          // Hent brugerdata
          const user = await getCurrentUser(token);
  
          // Gem brugerdata i komponentens state
          this.user = user;
        } catch (error) {
          this.error = error.response?.data?.error_description || "Kunne ikke hente brugerdata.";
          console.error("Noget gik galt:", error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .home-view {
    text-align: center;
    margin: 20px;
  }
  
  .fetch-user-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .fetch-user-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .user-info {
    margin-top: 20px;
  }
  
  .error-message {
    margin-top: 20px;
    color: red;
  }
  </style>
  