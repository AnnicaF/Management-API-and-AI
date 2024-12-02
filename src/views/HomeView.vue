<template>
    <div class="home-view">
      <!-- Hent bruger-knap -->
      <button @click="fetchUser" :disabled="isLoading" class="fetch-user-button">
        {{ isLoading ? "Henter data..." : "Hent Bruger" }}
      </button>
  
      <!-- Opret content node-knap -->
      <button @click="createNode" :disabled="isNodeLoading" class="create-node-button">
        {{ isNodeLoading ? "Opretter..." : "Opret Content Node" }}
      </button>
  
      <!-- Viser brugerdata -->
      <div v-if="user" class="user-info">
        <h3>Hej, {{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
      </div>
  
      <!-- Viser succesbesked -->
      <div v-if="successMessage" class="success-message">
        <p>{{ successMessage }}</p>
      </div>
  
      <!-- Viser fejlbesked -->
      <div v-if="error" class="error-message">
        <p>Fejl: {{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getToken, getCurrentUser, createContentNode } from "../services/apiService";
  
  export default {
    data() {
      return {
        user: null,
        isLoading: false,
        isNodeLoading: false,
        successMessage: null,
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
      async createNode() {
        this.isNodeLoading = true;
        this.successMessage = null;
        this.error = null;
  
        // Request body data
        const requestData = {
          values: [],
          variants: [
            {
              culture: null,
              segment: null,
              name: "Content Node ", // Du kan ændre denne titel, hvis nødvendigt
            },
          ],
          parent: {
            id: "e9862648-dd5a-454a-bdad-3e3d6343b257", // Forælderens ID
          },
          documentType: {
            id: "c3b10a51-b8d3-4ad2-b5a0-15a3cd99b6ca", // DocumentType ID
          },
          template: {
            id: "518c282d-6591-4943-8b29-cfe9fdf70c58", // Template ID
          },
        };
  
        try {
          // Hent adgangstoken
          const token = await getToken();
  
          // Opret content node
          const response = await createContentNode(requestData, token);
          this.successMessage = "Content node oprettet med ID: " + response.id;
        } catch (error) {
          this.error = "Kunne ikke oprette content node. Tjek konsollen for detaljer.";
          console.error("Fejl ved oprettelse af content node:", error);
        } finally {
          this.isNodeLoading = false;
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
  
  .fetch-user-button,
  .create-node-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
  }
  
  .fetch-user-button:disabled,
  .create-node-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .user-info {
    margin-top: 20px;
  }
  
  .success-message {
    margin-top: 20px;
    color: green;
  }
  
  .error-message {
    margin-top: 20px;
    color: red;
  }
  </style>
  