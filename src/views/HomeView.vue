<template>
    <div class="home-view">
      <!-- Hent bruger-knap -->
      <button @click="fetchUser" :disabled="isLoading" class="fetch-user-button">
        {{ isLoading ? "Henter data..." : "Hent Bruger" }}
      </button>
  
      <!-- Inputfelt og knap til at sende prompt til OpenAI -->
      <div class="openai-input">
        <textarea 
          v-model="userPrompt" 
          placeholder="Skriv din prompt her..." 
          rows="4" 
          cols="50"
        ></textarea>
  
        <button @click="fetchOpenAI" :disabled="isNodeLoading" class="fetch-openai-button">
          {{ isNodeLoading ? "Henter OpenAI..." : "Send Prompt til OpenAI" }}
        </button>
      </div>
  
      <!-- Viser brugerdata -->
      <div v-if="user" class="user-info">
        <h3>Hej, {{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
      </div>
  
      <!-- Viser OpenAI data -->
      <div v-if="aiResponse" class="ai-response">
        <h3>{{ aiResponse.title }}</h3>
        <p>{{ aiResponse.body }}</p>
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
  import { getToken, getCurrentUser, fetchOpenAIResponse, createContentNode } from "../services/apiService";
  import axios from 'axios';

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  
  export default {
    data() {
      return {
        user: null,
        aiResponse: null,
        isLoading: false,
        isNodeLoading: false,
        userPrompt: '',
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
  
      async fetchOpenAI() {
        this.isNodeLoading = true;
        this.error = null;
        this.aiResponse = null;

        try {
            const prompt = this.userPrompt.trim();
            if (!prompt) {
            throw new Error("Prompt kan ikke være tom.");
            }

            const token = await getToken();
            console.log("Token hentet:", token);

            // Send prompten til backend for at få OpenAI respons
            const response = await fetchOpenAIResponse(prompt, token);
            console.log("Respons modtaget:", response);

            // Validér OpenAI response
            if (!response || typeof response !== 'object' || !response.response) {
            throw new Error("Ugyldigt svar fra serveren.");
            }

            this.aiResponse = response.response; // Gem OpenAI responsen

            // Send kun title til Umbraco (for enkelhedens skyld)
            const umbracoResponse = await createContentNode({ title: this.aiResponse.title }, token);
            this.successMessage = "Content node er oprettet i Umbraco!";

        } catch (error) {
            this.error = error.message || "En ukendt fejl opstod.";
            console.error('Fejl ved OpenAI-anmodning:', error);
        } finally {
            this.isNodeLoading = false;
        }
        }
    },
  };
  </script>
  
  <style scoped>
  .home-view {
    text-align: center;
    margin: 20px;
  }
  
  .fetch-user-button,
  .fetch-openai-button {
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
  .fetch-openai-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .openai-input {
    margin-top: 20px;
  }
  
  textarea {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .user-info {
    margin-top: 20px;
  }
  
  .ai-response {
    margin-top: 20px;
    white-space: pre-wrap;
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
  